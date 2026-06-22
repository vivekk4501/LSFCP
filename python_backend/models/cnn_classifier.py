"""
CNN Text Classifier for FIR categorization.
Uses word embeddings + 1D Convolutions for text classification.
"""

import os
import sys
import numpy as np
import pickle
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Embedding, Conv1D, GlobalMaxPooling1D, Dense, Dropout
from tensorflow.keras.utils import to_categorical
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score

sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from data.sample_fir_data import get_training_data

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'cnn_model.h5')
TOKENIZER_PATH = os.path.join(os.path.dirname(__file__), 'cnn_tokenizer.pkl')
ENCODER_PATH = os.path.join(os.path.dirname(__file__), 'cnn_encoder.pkl')

MAX_WORDS = 10000
MAX_LEN = 200
EMBEDDING_DIM = 128


class CNNFIRClassifier:
    def __init__(self):
        self.model = None
        self.tokenizer = None
        self.encoder = None
        self.is_trained = False

    def prepare_data(self, texts, labels):
        self.encoder = LabelEncoder()
        y = self.encoder.fit_transform(labels)
        y = to_categorical(y)

        self.tokenizer = Tokenizer(num_words=MAX_WORDS, oov_token='<OOV>')
        self.tokenizer.fit_on_texts(texts)
        X = self.tokenizer.texts_to_sequences(texts)
        X = pad_sequences(X, maxlen=MAX_LEN, padding='post', truncating='post')

        return X, y

    def build_model(self, num_classes):
        model = Sequential([
            Embedding(MAX_WORDS, EMBEDDING_DIM, input_length=MAX_LEN),
            Conv1D(128, 5, activation='relu'),
            Conv1D(64, 3, activation='relu'),
            GlobalMaxPooling1D(),
            Dense(64, activation='relu'),
            Dropout(0.5),
            Dense(num_classes, activation='softmax')
        ])
        model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
        self.model = model
        return model

    def train(self, texts, labels, epochs=30, batch_size=8):
        X, y = self.prepare_data(texts, labels)
        num_classes = y.shape[1]

        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=np.argmax(y, axis=1)
        )

        self.build_model(num_classes)

        from tensorflow.keras.callbacks import EarlyStopping
        es = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)

        self.model.fit(X_train, y_train, validation_split=0.2, epochs=epochs,
                       batch_size=batch_size, callbacks=[es], verbose=1)

        y_pred = self.model.predict(X_test)
        y_pred_classes = np.argmax(y_pred, axis=1)
        y_true_classes = np.argmax(y_test, axis=1)
        acc = accuracy_score(y_true_classes, y_pred_classes)
        print(f"CNN Accuracy: {acc:.4f}")
        print(classification_report(y_true_classes, y_pred_classes, target_names=self.encoder.classes_))

        self.is_trained = True
        return acc

    def predict(self, text):
        if not self.is_trained:
            raise ValueError("Model not trained.")
        seq = self.tokenizer.texts_to_sequences([text])
        padded = pad_sequences(seq, maxlen=MAX_LEN, padding='post', truncating='post')
        proba = self.model.predict(padded, verbose=0)[0]
        best_idx = int(np.argmax(proba))
        return {
            'category': self.encoder.classes_[best_idx],
            'confidence': round(float(proba[best_idx]) * 100, 2),
            'all_probabilities': {cls: round(float(p) * 100, 2) for cls, p in zip(self.encoder.classes_, proba)}
        }

    def save(self, model_path=MODEL_PATH, tokenizer_path=TOKENIZER_PATH, encoder_path=ENCODER_PATH):
        if not self.is_trained:
            raise ValueError("Model not trained. Cannot save.")
        self.model.save(model_path)
        with open(tokenizer_path, 'wb') as f:
            pickle.dump(self.tokenizer, f)
        with open(encoder_path, 'wb') as f:
            pickle.dump(self.encoder, f)
        print(f"CNN model saved.")

    def load(self, model_path=MODEL_PATH, tokenizer_path=TOKENIZER_PATH, encoder_path=ENCODER_PATH):
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found: {model_path}")
        self.model = load_model(model_path)
        with open(tokenizer_path, 'rb') as f:
            self.tokenizer = pickle.load(f)
        with open(encoder_path, 'rb') as f:
            self.encoder = pickle.load(f)
        self.is_trained = True
        print(f"CNN model loaded.")


def train_and_save():
    texts, labels = get_training_data()
    clf = CNNFIRClassifier()
    acc = clf.train(texts, labels)
    clf.save()
    return acc


if __name__ == "__main__":
    train_and_save()
