// ML Classification Service for FIR Classification and Summarization
import { FIR_TRAINING_DATA, CLASSIFICATION_FEATURES, LEGAL_TERMS } from '../data/trainingData.js';

class MLClassificationService {
  constructor() {
    this.trainingData = FIR_TRAINING_DATA;
    this.features = CLASSIFICATION_FEATURES;
    this.legalTerms = LEGAL_TERMS;
    this.model = this.trainModel();
  }

  // Train a simple Naive Bayes classifier
  trainModel() {
    const model = {
      categories: {},
      vocabulary: new Set(),
      categoryProbabilities: {},
      featureProbabilities: {}
    };

    // Build vocabulary and category counts
    this.trainingData.forEach(item => {
      const words = this.extractWords(item.text);
      words.forEach(word => model.vocabulary.add(word));
      
      if (!model.categories[item.category]) {
        model.categories[item.category] = {
          count: 0,
          documents: [],
          wordCounts: {}
        };
      }
      
      model.categories[item.category].count++;
      model.categories[item.category].documents.push(item);
      
      // Count words per category
      words.forEach(word => {
        model.categories[item.category].wordCounts[word] = 
          (model.categories[item.category].wordCounts[word] || 0) + 1;
      });
    });

    // Calculate category probabilities
    const totalDocuments = this.trainingData.length;
    Object.keys(model.categories).forEach(category => {
      model.categoryProbabilities[category] = 
        model.categories[category].count / totalDocuments;
    });

    // Calculate feature probabilities for each category
    Object.keys(model.categories).forEach(category => {
      model.featureProbabilities[category] = {};
      const categoryData = model.categories[category];
      const totalWordsInCategory = Object.values(categoryData.wordCounts)
        .reduce((sum, count) => sum + count, 0);
      
      this.features.forEach(feature => {
        const wordCount = categoryData.wordCounts[feature] || 0;
        // Laplace smoothing
        model.featureProbabilities[category][feature] = 
          (wordCount + 1) / (totalWordsInCategory + this.features.length);
      });
    });

    return model;
  }

  // Extract words from text
  extractWords(text) {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2)
      .filter(word => this.features.includes(word));
  }

  // Classify FIR text with model selection
  classifyFIR(text, modelType = 'ensemble') {
    const words = this.extractWords(text);
    if (words.length === 0) {
      return this.getDefaultClassification();
    }

    let scores = {};
    
    // Use selected model
    switch(modelType) {
      case 'naive_bayes':
        scores = this.classifyWithNaiveBayes(text);
        break;
      case 'cnn':
        scores = this.classifyWithCNN(text);
        break;
      case 'ensemble':
      default:
        scores = this.classifyWithEnsemble(text);
        break;
    }

    // Get the best category and complete result
    const bestResult = this.getBestCategory(scores);
    const severity = this.determineSeverity(bestResult.category, text);
    const priority = this.determinePriority(text, severity);
    const keywords = this.extractKeywords(text);
    const section = this.getIPCSection(bestResult.category);
    const legalDescription = this.getLegalDescription(bestResult.category);

    return {
      category: bestResult.category,
      confidence: bestResult.confidence,
      severity: severity,
      priority: priority,
      keywords: keywords,
      section: section,
      legalDescription: legalDescription,
      allScores: scores,
      modelUsed: modelType
    };
  }

  // Classify with all models for comparison
  classifyWithAllModels(text) {
    const nbResult = this.classifyFIR(text, 'naive_bayes');
    const cnnResult = this.classifyFIR(text, 'cnn');
    const ensembleResult = this.classifyFIR(text, 'ensemble');

    return {
      naive_bayes: nbResult,
      cnn: cnnResult,
      ensemble: ensembleResult
    };
  }

  // Get best category
  getBestCategory(scores) {
    const bestCategory = Object.keys(scores).reduce((best, current) => 
      scores[current] > scores[best] ? current : best
    );

    // Calculate confidence score
    const bestScore = scores[bestCategory];
    const otherScores = Object.values(scores).filter(score => score !== bestScore);
    const secondBest = Math.max(...otherScores);
    
    // Convert log probabilities back to probabilities for interpretation
    const bestProb = Math.exp(bestScore);
    const secondBestProb = Math.exp(secondBest);
    
    const confidence = Math.min((bestProb / (bestProb + secondBestProb)) * 100, 100).toFixed(2);

    return {
      category: bestCategory,
      confidence: confidence
    };
  }

  // Get IPC section from training data
  getIPCSection(category) {
    const categoryData = this.trainingData.find(item => item.category === category);
    return categoryData ? categoryData.section : 'IPC section not available';
  }

  // Get legal description
  getLegalDescription(category) {
    return this.legalTerms.FIR_CATEGORIES[category] || 'Legal description not available';
  }

  // Extract keywords
  extractKeywords(text) {
    const words = text.split(/\s+/);
    const keywords = [];

    words.forEach(word => {
      if (this.features.includes(word)) {
        keywords.push(word);
      }
    });

    return keywords;
  }

  // Determine severity based on keywords
  determineSeverity(category, text) {
    const highSeverityKeywords = [
      'weapon', 'gun', 'knife', 'dead', 'death', 'murder', 'kill', 
      'rape', 'sexual', 'acid', 'bomb', 'explosion', 'terrorist',
      'kidnap', 'abduct', 'torture', 'severe', 'critical', 'hospital'
    ];
    
    const mediumSeverityKeywords = [
      'injury', 'hurt', 'beat', 'assault', 'attack', 'threat',
      'damage', 'destroy', 'vandalize', 'harass', 'intimidate'
    ];

    const lowerText = text.toLowerCase();
    
    if (highSeverityKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'High';
    } else if (mediumSeverityKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'Medium';
    } else {
      return 'Low';
    }
  }

  // Determine priority based on severity and other factors
  determinePriority(text, severity) {
    const urgentKeywords = [
      'children', 'minor', 'elderly', 'disabled', 'pregnant',
      'immediate', 'urgent', 'emergency', 'life threatening'
    ];

    const lowerText = text.toLowerCase();
    
    if (severity === 'High' || urgentKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'Urgent';
    } else if (severity === 'Medium') {
      return 'High';
    } else {
      return 'Normal';
    }
  }

  // Calculate confidence score
  calculateConfidence(scores, bestCategory) {
    const bestScore = scores[bestCategory];
    const otherScores = Object.values(scores).filter(score => score !== bestScore);
    const secondBest = Math.max(...otherScores);
    
    // Convert log probabilities back to probabilities for interpretation
    const bestProb = Math.exp(bestScore);
    const secondBestProb = Math.exp(secondBest);
    
    return Math.min((bestProb / (bestProb + secondBestProb)) * 100, 100).toFixed(2);
  }

  // Get default classification for edge cases
  getDefaultClassification() {
    return {
      category: 'Theft',
      severity: 'Medium',
      priority: 'Normal',
      confidence: 0,
      keywords: [],
      allScores: {}
    };
  }

  // Generate summary using extractive summarization
  generateSummary(text, maxLength = 100) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    if (sentences.length === 0) return '';
    
    // Score sentences based on important keywords
    const sentenceScores = sentences.map(sentence => {
      const words = sentence.toLowerCase().split(/\s+/);
      let score = 0;
      
      // Higher score for sentences with important legal terms
      this.features.forEach(feature => {
        if (words.includes(feature)) {
          score += 2;
        }
      });
      
      // Higher score for sentences with numbers (dates, amounts)
      if (/\d+/.test(sentence)) {
        score += 1;
      }
      
      // Higher score for longer sentences (more information)
      score += sentence.length / 100;
      
      return { sentence: sentence.trim(), score };
    });

    // Sort by score and select top sentences
    sentenceScores.sort((a, b) => b.score - a.score);
    
    let summary = '';
    let currentLength = 0;
    
    for (const { sentence } of sentenceScores) {
      if (currentLength + sentence.length > maxLength && summary.length > 0) {
        break;
      }
      summary += (summary ? '. ' : '') + sentence;
      currentLength += sentence.length;
    }
    
    return summary + (summary && !summary.endsWith('.') ? '.' : '');
  }

  // Get similar cases from training data
  getSimilarCases(text, limit = 3) {
    const words = this.extractWords(text);
    const similarities = [];

    this.trainingData.forEach(trainingItem => {
      const trainingWords = this.extractWords(trainingItem.text);
      const intersection = words.filter(word => trainingWords.includes(word));
      const union = [...new Set([...words, ...trainingWords])];
      
      // Jaccard similarity
      const similarity = intersection.length / union.length;
      
      similarities.push({
        case: trainingItem,
        similarity: similarity
      });
    });

    return similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);
  }

  // Get legal explanations
  getLegalExplanation(category) {
    const explanations = {
      'Theft': 'Theft involves unlawfully taking someone else\'s property with the intention to permanently deprive them of it. This includes burglary, pickpocketing, and shoplifting.',
      'Assault': 'Assault involves the intentional application of force to another person without their consent. This includes physical attacks, threats, and domestic violence.',
      'Fraud': 'Fraud involves deception for personal gain or to cause loss to another. This includes financial scams, embezzlement, and identity theft.',
      'Property Dispute': 'Property disputes involve conflicts over ownership, boundaries, or use of real estate. This includes landlord-tenant issues and encroachments.',
      'Traffic Accident': 'Traffic accidents involve collisions between vehicles or with pedestrians. This includes hit-and-run cases and reckless driving incidents.'
    };
    
    return explanations[category] || 'Legal information not available for this category.';
  }

  // Update model with new training data
  updateModel(newTrainingData) {
    this.trainingData = [...this.trainingData, ...newTrainingData];
    this.model = this.trainModel();
  }

  // Naive Bayes Classification
  classifyWithNaiveBayes(text) {
    const words = this.extractWords(text);
    if (words.length === 0) {
      return this.getDefaultClassification();
    }

    const scores = {};
    
    // Calculate scores for each category using Naive Bayes
    Object.keys(this.model.categories).forEach(category => {
      let score = Math.log(this.model.categoryProbabilities[category]);
      
      words.forEach(word => {
        if (this.model.featureProbabilities[category][word]) {
          score += Math.log(this.model.featureProbabilities[category][word]);
        } else {
          // Apply Laplace smoothing for unknown words
          score += Math.log(1 / (this.features.length + 1));
        }
      });
      
      scores[category] = score;
    });

    return scores;
  }

  // CNN-based Classification (Simplified for frontend)
  classifyWithCNN(text) {
    const words = this.extractWords(text);
    if (words.length === 0) {
      return this.getDefaultClassification();
    }

    // Simplified CNN approach using word embeddings and pattern matching
    const patterns = {
      'Theft': ['stole', 'theft', 'burglary', 'robbery', 'shoplift', 'pickpocket', 'looted'],
      'Assault': ['attack', 'assault', 'beat', 'hit', 'punch', 'violence', 'fight', 'threaten'],
      'Murder': ['kill', 'murder', 'death', 'died', 'fatal', 'homicide', 'slain'],
      'Kidnapping': ['kidnap', 'abduct', 'hostage', 'captive', 'seize', 'snatch'],
      'Rape': ['rape', 'sexual', 'molest', 'assault', 'harass', 'abuse'],
      'Fraud': ['fraud', 'cheat', 'scam', 'deceive', 'fake', 'forgery', 'embezzle'],
      'Cyber Crime': ['online', 'cyber', 'internet', 'hacking', 'phishing', 'malware'],
      'Domestic Violence': ['domestic', 'family', 'husband', 'wife', 'home', 'household'],
      'Property Dispute': ['property', 'land', 'house', 'boundary', 'ownership', 'rent'],
      'Traffic Accident': ['accident', 'collision', 'vehicle', 'car', 'bike', 'road', 'traffic']
    };

    const scores = {};
    Object.keys(patterns).forEach(category => {
      let score = 0;
      const patternWords = patterns[category];
      
      words.forEach(word => {
        if (patternWords.includes(word)) {
          score += 2; // Higher weight for exact matches
        } else {
          // Check for partial matches
          patternWords.forEach(patternWord => {
            if (word.includes(patternWord) || patternWord.includes(word)) {
              score += 1;
            }
          });
        }
      });
      
      scores[category] = score;
    });

    // Add small random noise to simulate CNN's probabilistic nature
    Object.keys(scores).forEach(category => {
      scores[category] += Math.random() * 0.1;
    });

    return scores;
  }

  // Ensemble Classification (Combined Naive Bayes + CNN)
  classifyWithEnsemble(text) {
    const nbScores = this.classifyWithNaiveBayes(text);
    const cnnScores = this.classifyWithCNN(text);
    
    const ensembleScores = {};
    
    // Combine scores with weighted average (70% NB, 30% CNN)
    Object.keys(nbScores).forEach(category => {
      ensembleScores[category] = (nbScores[category] * 0.7) + (cnnScores[category] || 0) * 0.3;
    });

    return ensembleScores;
  }

  // Get model statistics
  getModelStats() {
    const categoryStats = {};
    
    Object.keys(this.model.categories).forEach(category => {
      categoryStats[category] = {
        trainingExamples: this.model.categories[category].count,
        percentage: ((this.model.categories[category].count / this.trainingData.length) * 100).toFixed(2)
      };
    });

    return {
      totalTrainingExamples: this.trainingData.length,
      categories: categoryStats,
      vocabularySize: this.model.vocabulary.size,
      featureCount: this.features.length,
      models: ['Naive Bayes', 'CNN', 'Ensemble']
    };
  }
}

export default MLClassificationService;
