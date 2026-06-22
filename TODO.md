# LSFCP Enhancement TODO

## Phase 1: Remove Dashboard & Update Navigation ✅
- [x] Remove Dashboard route from App.js
- [x] Remove Dashboard nav link from Navbar.js
- [x] Update Home.js CTA buttons
- [x] Update Login.js redirect to /profile
- [x] Update Register.js redirect to /profile

## Phase 2: Beautify Login & Profile Pages ✅
- [x] Redesign Login.js with split-screen, glassmorphism, floating labels
- [x] Redesign Profile.js with hero header, stats, tabs, activity feed
- [x] Add corresponding CSS styles to App.css

## Phase 3: FIR Case Registration with Evidence
- [x] Update AppContext.js with registerFIR and addEvidenceToFIR methods
- [x] Create FIRRegister.js page
- [x] Add /fir-register route to App.js
- [x] Add "Register FIR" to Navbar.js
- [ ] Update Evidence.js for FIR-linked uploads
- [ ] Update History.js for fir-register type

## Phase 4: Python AI/ML Backend
- [ ] Create python_backend/requirements.txt
- [ ] Create python_backend/data/sample_fir_data.py
- [ ] Create python_backend/models/naive_bayes.py
- [ ] Create python_backend/models/cnn_classifier.py
- [ ] Create python_backend/models/nlp_summarizer.py
- [ ] Create python_backend/train_models.py
- [ ] Create python_backend/app.py (Flask API)

## Phase 5: Frontend API Integration & Redesign
- [ ] Update api.js with real axios calls + fallback
- [ ] Redesign FIRClassification.js with dual-model results
- [ ] Redesign Summarization.js with backend connection
- [ ] Final CSS polish and responsive fixes

## Phase 6: Testing
- [ ] Install Python dependencies
- [ ] Train models
- [ ] Start backend
- [ ] Test full user flow
