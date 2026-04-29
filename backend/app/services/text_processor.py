"""
NLP text preprocessing pipeline for spam classification.

Refactored from the original spam.py — same pipeline ensuring
prediction consistency with training data preprocessing.
"""
import nltk
import string
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer


def ensure_nltk_data():
    """Download required NLTK data packages if not present."""
    for package in ['punkt', 'punkt_tab', 'stopwords']:
        try:
            nltk.data.find(f'tokenizers/{package}' if 'punkt' in package else f'corpora/{package}')
        except LookupError:
            nltk.download(package, quiet=True)


# Initialize on module load
ensure_nltk_data()

# Reusable stemmer instance
_stemmer = PorterStemmer()
_stop_words = set(stopwords.words('english'))
_punctuation = set(string.punctuation)


def transform_text(text: str) -> str:
    """
    Preprocess text for spam classification.
    
    Pipeline:
    1. Convert to lowercase
    2. Tokenize into words
    3. Keep only alphanumeric tokens
    4. Remove English stopwords and punctuation
    5. Apply Porter stemming
    
    Args:
        text: Raw input message string.
        
    Returns:
        Preprocessed text string ready for vectorization.
    """
    # Step 1: Lowercase
    text = text.lower()
    
    # Step 2: Tokenize
    tokens = nltk.word_tokenize(text)
    
    # Step 3: Keep only alphanumeric
    tokens = [token for token in tokens if token.isalnum()]
    
    # Step 4: Remove stopwords and punctuation
    tokens = [
        token for token in tokens
        if token not in _stop_words and token not in _punctuation
    ]
    
    # Step 5: Porter stemming
    tokens = [_stemmer.stem(token) for token in tokens]
    
    return " ".join(tokens)
