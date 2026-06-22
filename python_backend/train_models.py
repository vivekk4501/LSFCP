"""
One-click training script for all AI/ML models.
"""

import os
import sys
sys.path.append(os.path.dirname(__file__))

from models.naive_bayes import train_and_save as train_nb
from models.cnn_classifier import train_and_save as train_cnn


def train_all():
    print("=" * 60)
    print("LSFCP AI MODEL TRAINING")
    print("=" * 60)

    print("\n[1/2] Training Naive Bayes Classifier...")
    print("-" * 40)
    nb_acc = train_nb()

    print("\n[2/2] Training CNN Classifier...")
    print("-" * 40)
    cnn_acc = train_cnn()

    print("\n" + "=" * 60)
    print("TRAINING COMPLETE")
    print("=" * 60)
    print(f"Naive Bayes Accuracy: {nb_acc:.4f}")
    print(f"CNN Accuracy: {cnn_acc:.4f}")
    print("\nModels saved in python_backend/models/")
    print("  - nb_model.pkl")
    print("  - cnn_model.h5")
    print("  - cnn_tokenizer.pkl")
    print("  - cnn_encoder.pkl")
    print("=" * 60)


if __name__ == "__main__":
    train_all()
