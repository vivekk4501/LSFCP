"""
NLP Summarization for Legal Documents.
Primary: Hugging Face BART transformer (abstractive)
Fallback: NLTK extractive summarization
"""

import nltk
from collections import Counter

try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt', quiet=True)

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords', quiet=True)

TRANSFORMERS_AVAILABLE = False
try:
    from transformers import pipeline
    TRANSFORMERS_AVAILABLE = True
except ImportError:
    pass


class LegalSummarizer:
    def __init__(self):
        self.bart_pipeline = None
        self.use_transformer = False

        if TRANSFORMERS_AVAILABLE:
            try:
                print("Loading BART summarization model...")
                self.bart_pipeline = pipeline(
                    "summarization",
                    model="facebook/bart-large-cnn",
                    device=-1
                )
                self.use_transformer = True
                print("BART model loaded successfully.")
            except Exception as e:
                print(f"Could not load BART model: {e}")
                print("Falling back to NLTK extractive summarization.")
                self.use_transformer = False

    def summarize(self, text, max_length=150, min_length=30):
        if not text or len(text.strip()) < 50:
            return "Text too short to summarize. Please provide at least a few sentences."

        if self.use_transformer:
            return self._bart_summarize(text, max_length, min_length)
        else:
            return self._nltk_summarize(text, max_length)

    def _bart_summarize(self, text, max_length, min_length):
        try:
            result = self.bart_pipeline(text[:1024], max_length=max_length,
                                        min_length=min_length, do_sample=False)
            return result[0]['summary_text'].strip()
        except Exception as e:
            print(f"BART summarization failed: {e}")
            return self._nltk_summarize(text, max_length)

    def _nltk_summarize(self, text, max_sentences=5):
        from nltk.tokenize import sent_tokenize, word_tokenize
        from nltk.corpus import stopwords

        sentences = sent_tokenize(text)
        if len(sentences) <= max_sentences:
            return text

        stop_words = set(stopwords.words('english'))
        words = word_tokenize(text.lower())
        words = [w for w in words if w.isalnum() and w not in stop_words]
        word_freq = Counter(words)

        sentence_scores = {}
        for i, sent in enumerate(sentences):
            sent_words = word_tokenize(sent.lower())
            sent_words = [w for w in sent_words if w.isalnum()]
            score = sum(word_freq.get(w, 0) for w in sent_words) / max(len(sent_words), 1)
            sentence_scores[i] = score

        top_indices = sorted(sentence_scores, key=sentence_scores.get, reverse=True)[:max_sentences]
        top_indices.sort()
        return ' '.join(sentences[i] for i in top_indices).strip()


def summarize_legal_text(text):
    summarizer = LegalSummarizer()
    return summarizer.summarize(text)


if __name__ == "__main__":
    sample_text = """
    The appellant, a resident of Mumbai, filed a complaint against the respondent alleging breach of contract.
    The dispute arose from a property transaction where the respondent agreed to sell a commercial plot
    for Rs. 5 crores but later backed out claiming the agreement was not binding. The appellant argued
    that a registered agreement was signed and a token amount of Rs. 50 lakhs was paid. The lower court
    dismissed the case citing lack of evidence for the remaining payment terms. The appellant then
    approached the High Court which set aside the lower court's order and directed a retrial.
    The Supreme Court, after hearing both parties, held that the agreement was indeed valid and binding
    under Section 10 of the Indian Contract Act, 1872. The court directed the respondent to either
    complete the sale or return the token amount with 12% interest per annum.
    """
    print("=" * 60)
    print("LEGAL TEXT SUMMARIZATION")
    print("=" * 60)
    print(f"Original length: {len(sample_text)}")
    result = summarize_legal_text(sample_text)
    print(f"\nSummary ({len(result)} chars):")
    print(result)
