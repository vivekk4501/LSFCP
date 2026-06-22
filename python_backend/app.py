"""
Flask REST API for LSFCP AI Backend.
Endpoints:
  POST /api/classify/nb     -> Naive Bayes classification
  POST /api/classify/cnn    -> CNN classification
  POST /api/classify/both   -> Both models with ensemble
  POST /api/summarize       -> NLP summarization
  GET  /api/health          -> Health check
"""

import os
import sys
import time
from flask import Flask, request, jsonify
from flask_cors import CORS

sys.path.append(os.path.dirname(__file__))

from models.naive_bayes import NaiveBayesFIRClassifier, MODEL_PATH as NB_PATH
from models.cnn_classifier import CNNFIRClassifier, MODEL_PATH as CNN_PATH
from models.nlp_summarizer import LegalSummarizer

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

nb_classifier = None
cnn_classifier = None
summarizer = None


def load_models():
    global nb_classifier, cnn_classifier, summarizer
    print("Loading AI models...")

    nb_classifier = NaiveBayesFIRClassifier()
    if os.path.exists(NB_PATH):
        try:
            nb_classifier.load()
        except Exception as e:
            print(f"NB load error: {e}")
    else:
        print(f"Warning: NB model not found. Train first: python train_models.py")

    cnn_classifier = CNNFIRClassifier()
    if os.path.exists(CNN_PATH):
        try:
            cnn_classifier.load()
        except Exception as e:
            print(f"CNN load error: {e}")
    else:
        print(f"Warning: CNN model not found. Train first: python train_models.py")

    summarizer = LegalSummarizer()
    print("Models loaded.")


@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'ok',
        'models': {
            'naive_bayes': nb_classifier.is_trained if nb_classifier else False,
            'cnn': cnn_classifier.is_trained if cnn_classifier else False,
            'summarizer': summarizer.use_transformer if summarizer else False
        }
    })


@app.route('/api/classify/nb', methods=['POST'])
def classify_nb():
    data = request.get_json()
    text = data.get('text', '').strip()
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    if not nb_classifier or not nb_classifier.is_trained:
        return jsonify({'error': 'Naive Bayes model not loaded. Train first.'}), 503

    start = time.time()
    result = nb_classifier.predict(text)
    result['model'] = 'naive_bayes'
    result['inference_time_ms'] = round((time.time() - start) * 1000, 2)
    return jsonify(result)


@app.route('/api/classify/cnn', methods=['POST'])
def classify_cnn():
    data = request.get_json()
    text = data.get('text', '').strip()
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    if not cnn_classifier or not cnn_classifier.is_trained:
        return jsonify({'error': 'CNN model not loaded. Train first.'}), 503

    start = time.time()
    result = cnn_classifier.predict(text)
    result['model'] = 'cnn'
    result['inference_time_ms'] = round((time.time() - start) * 1000, 2)
    return jsonify(result)


@app.route('/api/classify/both', methods=['POST'])
def classify_both():
    data = request.get_json()
    text = data.get('text', '').strip()
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    results = {}
    start = time.time()

    if nb_classifier and nb_classifier.is_trained:
        results['naive_bayes'] = nb_classifier.predict(text)
    if cnn_classifier and cnn_classifier.is_trained:
        results['cnn'] = cnn_classifier.predict(text)

    if not results:
        return jsonify({'error': 'No models loaded. Train first.'}), 503

    if 'naive_bayes' in results and 'cnn' in results:
        nb_probs = results['naive_bayes']['all_probabilities']
        cnn_probs = results['cnn']['all_probabilities']
        all_classes = set(nb_probs.keys()) | set(cnn_probs.keys())
        ensemble = {}
        for cls in all_classes:
            p1 = nb_probs.get(cls, 0)
            p2 = cnn_probs.get(cls, 0)
            ensemble[cls] = round((p1 + p2) / 2, 2)
        best_cls = max(ensemble, key=ensemble.get)
        results['ensemble'] = {
            'category': best_cls,
            'confidence': ensemble[best_cls],
            'all_probabilities': ensemble
        }

    results['total_inference_time_ms'] = round((time.time() - start) * 1000, 2)
    return jsonify(results)


@app.route('/api/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get('text', '').strip()
    max_length = data.get('max_length', 150)
    min_length = data.get('min_length', 30)
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    if not summarizer:
        return jsonify({'error': 'Summarizer not loaded'}), 503

    start = time.time()
    summary = summarizer.summarize(text, max_length=max_length, min_length=min_length)
    return jsonify({
        'summary': summary,
        'original_length': len(text),
        'summary_length': len(summary),
        'compression_ratio': round(len(summary) / max(len(text), 1), 3),
        'model_used': 'bart' if summarizer.use_transformer else 'nltk',
        'inference_time_ms': round((time.time() - start) * 1000, 2)
    })


if __name__ == '__main__':
    load_models()
    print("Starting LSFCP AI Backend on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
