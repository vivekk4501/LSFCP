// ML Summarization Service for Legal Document Summarization
import { SUMMARIZATION_TRAINING_DATA } from '../data/trainingData.js';

class MLSummarizationService {
  constructor() {
    this.trainingData = SUMMARIZATION_TRAINING_DATA;
    this.sentencePatterns = this.initializeSentencePatterns();
    this.legalTerms = this.initializeLegalTerms();
    this.importanceWeights = this.initializeImportanceWeights();
  }

  // Initialize sentence patterns for extractive summarization
  initializeSentencePatterns() {
    return {
      // High importance patterns
      highImportance: [
        /\b(murder|killed|dead|death|rape|sexual assault|kidnapped|abducted)\b/gi,
        /\b(rs\.?\s*\d+[\d,]*\s*lakhs?|\d+\s*lakhs?)\b/gi,
        /\b(arrested|police|court|investigation|case|charged)\b/gi,
        /\b(hospital|injured|fractured|medical|treatment)\b/gi,
        /\b(threatened|assaulted|attacked|beat|violence)\b/gi
      ],
      // Medium importance patterns
      mediumImportance: [
        /\b(complainant|victim|report|alleges|states)\b/gi,
        /\b(date|time|when|where|location|address)\b/gi,
        /\b(stole|robbed|burglary|theft|fraud|cheating)\b/gi,
        /\b(witness|evidence|cctv|footage|proof)\b/gi,
        /\b(damaged|destroyed|loss|worth|value)\b/gi
      ],
      // Low importance patterns
      lowImportance: [
        /\b(the|and|or|but|however|therefore|because)\b/gi,
        /\b(very|quite|rather|somewhat|slightly)\b/gi,
        /\b(said|told|mentioned|stated|reported)\b/gi
      ]
    };
  }

  // Initialize legal terms for better extraction
  initializeLegalTerms() {
    return [
      'murder', 'rape', 'assault', 'kidnapping', 'theft', 'robbery', 'fraud',
      'burglary', 'domestic violence', 'cyber crime', 'defamation',
      'property dispute', 'public nuisance', 'traffic accident',
      'dowry death', 'breach of trust', 'attempt to murder',
      'ipc', 'court', 'police', 'investigation', 'arrested',
      'charged', 'case', 'legal', 'complaint', 'evidence',
      'witness', 'victim', 'accused', 'suspect'
    ];
  }

  // Initialize importance weights for different types of information
  initializeImportanceWeights() {
    return {
      // Critical information
      critical: {
        crime: 10,
        injury: 9,
        death: 10,
        arrest: 8,
        amount: 7,
        location: 6,
        time: 5
      },
      // Important information
      important: {
        witness: 6,
        evidence: 7,
        hospital: 6,
        treatment: 5,
        investigation: 6,
        court: 5,
        legal: 5
      },
      // Supporting information
      supporting: {
        background: 3,
        description: 2,
        details: 2,
        statements: 3,
        reports: 4
      }
    };
  }

  // Main summarization function
  generateSummary(text, targetLength = 100) {
    if (!text || text.trim().length === 0) {
      return "No text provided for summarization.";
    }

    try {
      // Try extractive summarization first
      const extractiveSummary = this.extractiveSummarization(text, targetLength);
      
      // If extractive is too short or fails, use abstractive
      if (extractiveSummary.length < targetLength * 0.3) {
        return this.abstractiveSummarization(text, targetLength);
      }
      
      return extractiveSummary;
    } catch (error) {
      console.error('Summarization error:', error);
      return this.fallbackSummarization(text, targetLength);
    }
  }

  // Extractive summarization - selects most important sentences
  extractiveSummarization(text, targetLength) {
    const sentences = this.splitIntoSentences(text);
    const scoredSentences = sentences.map(sentence => ({
      text: sentence,
      score: this.calculateSentenceScore(sentence)
    }));

    // Sort by score and select top sentences
    scoredSentences.sort((a, b) => b.score - a.score);
    
    let summary = '';
    let currentLength = 0;
    
    for (const sentenceObj of scoredSentences) {
      if (currentLength >= targetLength) break;
      
      const sentence = sentenceObj.text.trim();
      if (sentence.length > 0) {
        summary += (summary ? ' ' : '') + sentence;
        currentLength += sentence.split(' ').length;
      }
    }

    return this.cleanSummary(summary);
  }

  // Calculate importance score for a sentence
  calculateSentenceScore(sentence) {
    let score = 0;
    const lowerSentence = sentence.toLowerCase();

    // Score based on importance patterns
    this.sentencePatterns.highImportance.forEach(pattern => {
      const matches = lowerSentence.match(pattern);
      if (matches) score += matches.length * 5;
    });

    this.sentencePatterns.mediumImportance.forEach(pattern => {
      const matches = lowerSentence.match(pattern);
      if (matches) score += matches.length * 3;
    });

    this.sentencePatterns.lowImportance.forEach(pattern => {
      const matches = lowerSentence.match(pattern);
      if (matches) score += matches.length * 1;
    });

    // Score based on legal terms
    this.legalTerms.forEach(term => {
      if (lowerSentence.includes(term.toLowerCase())) {
        score += 2;
      }
    });

    // Score based on numbers and amounts
    const numbers = sentence.match(/\b\d+(?:,\d{3})*(?:\.\d+)?\b/g);
    if (numbers) score += numbers.length * 2;

    // Score based on dates
    if (/\b\d{1,2}\/\d{1,2}\/\d{4}\b|\b\d{1,2}\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+\d{4}\b/i.test(sentence)) {
      score += 3;
    }

    // Penalty for very short or very long sentences
    const wordCount = sentence.split(' ').length;
    if (wordCount < 5) score -= 2;
    if (wordCount > 30) score -= 1;

    return Math.max(0, score);
  }

  // Abstractive summarization - generates new summary text
  abstractiveSummarization(text, targetLength) {
    const sentences = this.splitIntoSentences(text);
    const keyInfo = this.extractKeyInformation(text);
    
    let summary = '';
    
    // Start with the most important information
    if (keyInfo.crime) {
      summary += `${keyInfo.crime} `;
    }
    
    if (keyInfo.date && keyInfo.location) {
      summary += `on ${keyInfo.date} at ${keyInfo.location}. `;
    } else if (keyInfo.date) {
      summary += `on ${keyInfo.date}. `;
    } else if (keyInfo.location) {
      summary += `at ${keyInfo.location}. `;
    }
    
    if (keyInfo.victim) {
      summary += `Victim: ${keyInfo.victim}. `;
    }
    
    if (keyInfo.amount) {
      summary += `Amount: ${keyInfo.amount}. `;
    }
    
    if (keyInfo.injury) {
      summary += `Injuries: ${keyInfo.injury}. `;
    }
    
    if (keyInfo.action) {
      summary += `Action: ${keyInfo.action}. `;
    }
    
    if (keyInfo.status) {
      summary += `Status: ${keyInfo.status}. `;
    }

    // If summary is still too short, add more details
    if (summary.split(' ').length < targetLength * 0.5) {
      const additionalSentences = sentences
        .filter(s => this.calculateSentenceScore(s) > 3)
        .slice(0, 2);
      
      additionalSentences.forEach(sentence => {
        if (summary.split(' ').length < targetLength) {
          summary += sentence + ' ';
        }
      });
    }

    return this.cleanSummary(summary);
  }

  // Extract key information from text
  extractKeyInformation(text) {
    const keyInfo = {
      crime: null,
      date: null,
      location: null,
      victim: null,
      amount: null,
      injury: null,
      action: null,
      status: null
    };

    const sentences = this.splitIntoSentences(text);
    
    sentences.forEach(sentence => {
      const lowerSentence = sentence.toLowerCase();
      
      // Extract crime type
      if (!keyInfo.crime) {
        const crimes = ['murder', 'rape', 'assault', 'kidnapping', 'theft', 'robbery', 'fraud', 'burglary'];
        for (const crime of crimes) {
          if (lowerSentence.includes(crime)) {
            keyInfo.crime = crime.charAt(0).toUpperCase() + crime.slice(1);
            break;
          }
        }
      }
      
      // Extract date
      if (!keyInfo.date) {
        const dateMatch = sentence.match(/\b(\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2}\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+\d{4})\b/i);
        if (dateMatch) {
          keyInfo.date = dateMatch[1];
        }
      }
      
      // Extract location
      if (!keyInfo.location) {
        const locationPatterns = [
          /at\s+([^,.]+)/i,
          /in\s+([^,.]+)/i,
          /on\s+([^,.]+(?:street|road|avenue|lane))/i,
          /(\d+\s+[^,.]+(?:street|road|avenue|lane))/i
        ];
        
        for (const pattern of locationPatterns) {
          const match = sentence.match(pattern);
          if (match && match[1]) {
            keyInfo.location = match[1].trim();
            break;
          }
        }
      }
      
      // Extract amount
      if (!keyInfo.amount) {
        const amountMatch = sentence.match(/(?:rs\.?\s*)?(\d+(?:,\d{3})*(?:\.\d+)?\s*(?:lakhs?|crores?|thousand))/i);
        if (amountMatch) {
          keyInfo.amount = amountMatch[0];
        }
      }
      
      // Extract injury
      if (!keyInfo.injury) {
        const injuryWords = ['injured', 'fractured', 'bruises', 'hospital', 'medical', 'treatment'];
        for (const word of injuryWords) {
          if (lowerSentence.includes(word)) {
            keyInfo.injury = word;
            break;
          }
        }
      }
      
      // Extract action/status
      if (!keyInfo.action) {
        const actionWords = ['arrested', 'police', 'investigation', 'case', 'complaint', 'filed'];
        for (const word of actionWords) {
          if (lowerSentence.includes(word)) {
            keyInfo.action = word;
            break;
          }
        }
      }
      
      if (!keyInfo.status) {
        const statusWords = ['ongoing', 'pending', 'investigation', 'arrested', 'released', 'hospitalized'];
        for (const word of statusWords) {
          if (lowerSentence.includes(word)) {
            keyInfo.status = word;
            break;
          }
        }
      }
    });

    return keyInfo;
  }

  // Fallback summarization using simple heuristics
  fallbackSummarization(text, targetLength) {
    const sentences = this.splitIntoSentences(text);
    
    // Take first few sentences that contain important information
    const importantSentences = sentences.filter(sentence => 
      this.calculateSentenceScore(sentence) > 2
    ).slice(0, 3);
    
    let summary = importantSentences.join(' ');
    
    // Truncate if too long
    const words = summary.split(' ');
    if (words.length > targetLength) {
      summary = words.slice(0, targetLength).join(' ') + '...';
    }
    
    return this.cleanSummary(summary);
  }

  // Split text into sentences
  splitIntoSentences(text) {
    return text
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }

  // Clean and format summary
  cleanSummary(summary) {
    return summary
      .replace(/\s+/g, ' ')
      .replace(/\s*[.!?]\s*/g, '. ')
      .replace(/\.$/, '')
      .trim();
  }

  // Get model statistics
  getModelStats() {
    return {
      totalTrainingExamples: this.trainingData.length,
      averageOriginalLength: this.trainingData.reduce((sum, item) => sum + item.original.length, 0) / this.trainingData.length,
      averageSummaryLength: this.trainingData.reduce((sum, item) => sum + item.summary.length, 0) / this.trainingData.length,
      averageCompressionRatio: this.trainingData.reduce((sum, item) => sum + (item.summary.length / item.original.length), 0) / this.trainingData.length * 100
    };
  }

  // Test summarization with training data
  testSummarization() {
    const results = [];
    
    this.trainingData.forEach((example, index) => {
      const generatedSummary = this.generateSummary(example.original, 100);
      const originalWords = example.original.split(' ').length;
      const generatedWords = generatedSummary.split(' ').length;
      const targetWords = 100;
      
      results.push({
        index,
        original: example.original.substring(0, 100) + '...',
        expected: example.summary,
        generated: generatedSummary,
        compressionRatio: (generatedWords / originalWords * 100).toFixed(2),
        lengthAccuracy: Math.abs(generatedWords - targetWords) <= 20 ? 'Good' : 'Poor'
      });
    });
    
    return results;
  }
}

export default MLSummarizationService;
