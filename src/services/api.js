import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';
const TIMEOUT = 8000;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: { 'Content-Type': 'application/json' }
});

// Check if backend is available
let backendAvailable = false;

export async function checkBackendHealth() {
  try {
    const res = await apiClient.get('/health');
    backendAvailable = res.data.status === 'ok';
    return res.data;
  } catch (e) {
    backendAvailable = false;
    return { status: 'offline', models: {} };
  }
}

// ============================================
// FIR CLASSIFICATION
// ============================================

// Mock fallback classification
function mockClassifyFIR(text) {
  const lower = text.toLowerCase();
  if (lower.includes('theft') || lower.includes('stolen') || lower.includes('bike') || lower.includes('burglary')) return { category: 'Theft', confidence: 92 };
  if (lower.includes('murder') || lower.includes('killed') || lower.includes('dead') || lower.includes('body')) return { category: 'Murder', confidence: 95 };
  if (lower.includes('assault') || lower.includes('attack') || lower.includes('beat') || lower.includes('hit')) return { category: 'Assault', confidence: 88 };
  if (lower.includes('fraud') || lower.includes('cheat') || lower.includes('scam') || lower.includes('fake')) return { category: 'Fraud', confidence: 85 };
  if (lower.includes('rape') || lower.includes('sexual assault')) return { category: 'Rape', confidence: 90 };
  if (lower.includes('cyber') || lower.includes('hacking') || lower.includes('online') || lower.includes('phishing')) return { category: 'Cybercrime', confidence: 87 };
  return { category: 'Other', confidence: 75 };
}

export async function classifyFIR(text) {
  if (!backendAvailable) {
    await new Promise(r => setTimeout(r, 1500));
    return mockClassifyFIR(text);
  }
  try {
    const res = await apiClient.post('/classify/both', { text });
    // Return ensemble if available, otherwise first available
    if (res.data.ensemble) {
      return {
        category: res.data.ensemble.category,
        confidence: res.data.ensemble.confidence,
        model: 'ensemble',
        all_results: res.data
      };
    }
    const first = res.data.naive_bayes || res.data.cnn;
    return { category: first.category, confidence: first.confidence, model: first.model };
  } catch (e) {
    console.warn('Backend classify failed, using mock:', e.message);
    return mockClassifyFIR(text);
  }
}

export async function classifyFIR_NB(text) {
  if (!backendAvailable) {
    await new Promise(r => setTimeout(r, 1000));
    return { ...mockClassifyFIR(text), model: 'naive_bayes (mock)' };
  }
  try {
    const res = await apiClient.post('/classify/nb', { text });
    return res.data;
  } catch (e) {
    return { ...mockClassifyFIR(text), model: 'naive_bayes (fallback)' };
  }
}

export async function classifyFIR_CNN(text) {
  if (!backendAvailable) {
    await new Promise(r => setTimeout(r, 1200));
    return { ...mockClassifyFIR(text), model: 'cnn (mock)' };
  }
  try {
    const res = await apiClient.post('/classify/cnn', { text });
    return res.data;
  } catch (e) {
    return { ...mockClassifyFIR(text), model: 'cnn (fallback)' };
  }
}

// ============================================
// SUMMARIZATION
// ============================================

function mockSummarize(text) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).slice(0, 4);
  const summary = sentences.join('. ') + '. ';
  const keywords = ['victim', 'accused', 'ipc', 'court', 'judge', 'police', 'fir'].filter(k => text.toLowerCase().includes(k)).slice(0, 3);
  return (summary + `Key aspects: ${keywords.join(', ') || 'General case'}.`).slice(0, 300) + (summary.length > 300 ? '...' : '');
}

export async function summarizeCase(text, maxLength = 150, minLength = 30) {
  if (!backendAvailable) {
    await new Promise(r => setTimeout(r, 2000));
    return mockSummarize(text);
  }
  try {
    const res = await apiClient.post('/summarize', { text, max_length: maxLength, min_length: minLength });
    return res.data.summary;
  } catch (e) {
    console.warn('Backend summarize failed, using mock:', e.message);
    return mockSummarize(text);
  }
}

// ============================================
// FILE UPLOAD
// ============================================

export async function uploadFiles(filesData) {
  await new Promise(r => setTimeout(r, Math.min(filesData.length * 800, 4000)));
  return filesData.map(f => ({
    name: f.name,
    size: f.size || Math.floor(Math.random() * 10e6),
    status: 'uploaded',
    url: `/mock/${f.name}`
  }));
}

// ============================================
// FIR REGISTRATION
// ============================================

export async function registerFIRBackend(firData) {
  // In a real backend, this would save to a database
  // For now, we just simulate a delay
  await new Promise(r => setTimeout(r, 1000));
  return { success: true, id: Date.now(), message: 'FIR registered successfully' };
}

// Initialize health check on load
checkBackendHealth();
