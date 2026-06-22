// Data Persistence Service
class DataPersistenceService {
  constructor() {
    this.STORAGE_KEYS = {
      FIR_CASES: 'lawai_fir_cases',
      SUMMARIZATIONS: 'lawai_summarizations',
      EVIDENCE: 'lawai_evidence',
      USER_PROFILE: 'lawai_user_profile',
      CLASSIFICATION_MODEL: 'lawai_classification_model',
      SUMMARIZATION_MODEL: 'lawai_summarization_model',
      TRAINING_DATA: 'lawai_training_data',
      APP_SETTINGS: 'lawai_app_settings'
    };
  }

  // Save data to localStorage
  saveData(key, data) {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
      return true;
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
      return false;
    }
  }

  // Load data from localStorage
  loadData(key) {
    try {
      const serializedData = localStorage.getItem(key);
      if (serializedData === null) {
        return null;
      }
      return JSON.parse(serializedData);
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      return null;
    }
  }

  // Remove data from localStorage
  removeData(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing data from localStorage:', error);
      return false;
    }
  }

  // Clear all app data
  clearAllData() {
    try {
      Object.values(this.STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing data from localStorage:', error);
      return false;
    }
  }

  // Export all data as JSON
  exportData() {
    const exportData = {};
    Object.entries(this.STORAGE_KEYS).forEach(([name, key]) => {
      const data = this.loadData(key);
      if (data !== null) {
        exportData[name] = data;
      }
    });
    return exportData;
  }

  // Import data from JSON
  importData(importData) {
    try {
      Object.entries(importData).forEach(([name, data]) => {
        const key = this.STORAGE_KEYS[name];
        if (key) {
          this.saveData(key, data);
        }
      });
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Get storage usage
  getStorageUsage() {
    let totalSize = 0;
    let usedSize = 0;
    
    Object.values(this.STORAGE_KEYS).forEach(key => {
      const data = localStorage.getItem(key);
      if (data) {
        usedSize += data.length;
      }
    });
    
    // Rough estimate of localStorage limit (5MB)
    totalSize = 5 * 1024 * 1024;
    
    return {
      used: usedSize,
      total: totalSize,
      percentage: (usedSize / totalSize) * 100
    };
  }
}

// Specific data management functions
class CaseDataManager {
  constructor() {
    this.persistence = new DataPersistenceService();
  }

  // Save FIR case
  saveFIRCase(firData) {
    const existingCases = this.persistence.loadData(this.persistence.STORAGE_KEYS.FIR_CASES) || [];
    const newCase = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...firData
    };
    existingCases.push(newCase);
    return this.persistence.saveData(this.persistence.STORAGE_KEYS.FIR_CASES, existingCases);
  }

  // Get all FIR cases
  getFIRCases() {
    return this.persistence.loadData(this.persistence.STORAGE_KEYS.FIR_CASES) || [];
  }

  // Get FIR case by ID
  getFIRCaseById(id) {
    const cases = this.getFIRCases();
    return cases.find(case_ => case_.id === id);
  }

  // Update FIR case
  updateFIRCase(id, updates) {
    const cases = this.getFIRCases();
    const index = cases.findIndex(case_ => case_.id === id);
    if (index !== -1) {
      cases[index] = { ...cases[index], ...updates, updatedAt: new Date().toISOString() };
      return this.persistence.saveData(this.persistence.STORAGE_KEYS.FIR_CASES, cases);
    }
    return false;
  }

  // Delete FIR case
  deleteFIRCase(id) {
    const cases = this.getFIRCases();
    const filteredCases = cases.filter(case_ => case_.id !== id);
    return this.persistence.saveData(this.persistence.STORAGE_KEYS.FIR_CASES, filteredCases);
  }

  // Save summarization
  saveSummarization(summaryData) {
    const existingSummaries = this.persistence.loadData(this.persistence.STORAGE_KEYS.SUMMARIZATIONS) || [];
    const newSummary = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...summaryData
    };
    existingSummaries.push(newSummary);
    return this.persistence.saveData(this.persistence.STORAGE_KEYS.SUMMARIZATIONS, existingSummaries);
  }

  // Get all summarizations
  getSummarizations() {
    return this.persistence.loadData(this.persistence.STORAGE_KEYS.SUMMARIZATIONS) || [];
  }

  // Save evidence
  saveEvidence(evidenceData) {
    const existingEvidence = this.persistence.loadData(this.persistence.STORAGE_KEYS.EVIDENCE) || [];
    const newEvidence = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...evidenceData
    };
    existingEvidence.push(newEvidence);
    return this.persistence.saveData(this.persistence.STORAGE_KEYS.EVIDENCE, existingEvidence);
  }

  // Get all evidence
  getEvidence() {
    return this.persistence.loadData(this.persistence.STORAGE_KEYS.EVIDENCE) || [];
  }
}

export { DataPersistenceService, CaseDataManager };
