import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

function FIRRegistration() {
  const { addToHistory } = useAppContext();
  const [formData, setFormData] = useState({
    title: '',
    complainantName: '',
    complainantPhone: '',
    complainantEmail: '',
    incidentDate: '',
    incidentTime: '',
    incidentLocation: '',
    incidentDescription: '',
    accusedName: '',
    accusedDetails: '',
    witnesses: '',
    evidence: '',
    urgency: 'Normal',
    category: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    'Theft', 'Robbery', 'Murder', 'Attempt to Murder', 'Kidnapping',
    'Rape', 'Assault', 'Domestic Violence', 'Fraud/Cheating',
    'Cyber Crime', 'Breach of Trust', 'Public Nuisance', 'Rioting',
    'Dowry Death', 'Defamation', 'Other'
  ];

  const urgencyLevels = ['Normal', 'High', 'Urgent'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.complainantName.trim()) newErrors.complainantName = 'Complainant name is required';
    if (!formData.incidentDate) newErrors.incidentDate = 'Incident date is required';
    if (!formData.incidentLocation.trim()) newErrors.incidentLocation = 'Location is required';
    if (!formData.incidentDescription.trim()) newErrors.incidentDescription = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    
    // Phone validation
    if (formData.complainantPhone && !/^\d{10}$/.test(formData.complainantPhone)) {
      newErrors.complainantPhone = 'Please enter a valid 10-digit phone number';
    }
    
    // Email validation
    if (formData.complainantEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.complainantEmail)) {
      newErrors.complainantEmail = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Generate FIR number
      const firNumber = `FIR-${Date.now().toString().slice(-6)}`;
      
      // Create FIR data
      const firData = {
        firNumber,
        ...formData,
        registrationDate: new Date().toISOString(),
        status: 'Registered'
      };
      
      // Add to history
      addToHistory('fir-register', firData);
      
      // Show success message
      alert(`FIR registered successfully!\nFIR Number: ${firNumber}\nWe will contact you soon.`);
      
      // Reset form
      setFormData({
        title: '',
        complainantName: '',
        complainantPhone: '',
        complainantEmail: '',
        incidentDate: '',
        incidentTime: '',
        incidentLocation: '',
        incidentDescription: '',
        accusedName: '',
        accusedDetails: '',
        witnesses: '',
        evidence: '',
        urgency: 'Normal',
        category: ''
      });
      
    } catch (error) {
      console.error('Error registering FIR:', error);
      alert('Failed to register FIR. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>📋 FIR Registration</h2>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Register a First Information Report (FIR) for any criminal incident. All fields marked with * are mandatory.
      </p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Basic Information */}
        <div style={{ 
          background: '#f8fafc', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#1e40af' }}>Basic Information</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                FIR Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Brief title of the incident"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: errors.title ? '1px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '4px'
                }}
              />
              {errors.title && <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.title}</div>}
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: errors.category ? '1px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '4px'
                }}
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.category}</div>}
            </div>
          </div>
        </div>

        {/* Complainant Information */}
        <div style={{ 
          background: '#f8fafc', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#1e40af' }}>Complainant Information</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Full Name *
              </label>
              <input
                type="text"
                name="complainantName"
                value={formData.complainantName}
                onChange={handleChange}
                placeholder="Your full name"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: errors.complainantName ? '1px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '4px'
                }}
              />
              {errors.complainantName && <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.complainantName}</div>}
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="complainantPhone"
                value={formData.complainantPhone}
                onChange={handleChange}
                placeholder="10-digit phone number"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: errors.complainantPhone ? '1px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '4px'
                }}
              />
              {errors.complainantPhone && <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.complainantPhone}</div>}
            </div>
          </div>
          
          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Email Address
            </label>
            <input
              type="email"
              name="complainantEmail"
              value={formData.complainantEmail}
              onChange={handleChange}
              placeholder="your.email@example.com"
              style={{
                width: '100%',
                padding: '0.5rem',
                border: errors.complainantEmail ? '1px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '4px'
              }}
            />
            {errors.complainantEmail && <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.complainantEmail}</div>}
          </div>
        </div>

        {/* Incident Details */}
        <div style={{ 
          background: '#f8fafc', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#1e40af' }}>Incident Details</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Incident Date *
              </label>
              <input
                type="date"
                name="incidentDate"
                value={formData.incidentDate}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: errors.incidentDate ? '1px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '4px'
                }}
              />
              {errors.incidentDate && <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.incidentDate}</div>}
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Incident Time
              </label>
              <input
                type="time"
                name="incidentTime"
                value={formData.incidentTime}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px'
                }}
              />
            </div>
          </div>
          
          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Location *
            </label>
            <input
              type="text"
              name="incidentLocation"
              value={formData.incidentLocation}
              onChange={handleChange}
              placeholder="Where did the incident occur?"
              style={{
                width: '100%',
                padding: '0.5rem',
                border: errors.incidentLocation ? '1px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '4px'
              }}
            />
            {errors.incidentLocation && <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.incidentLocation}</div>}
          </div>
          
          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Detailed Description *
            </label>
            <textarea
              name="incidentDescription"
              value={formData.incidentDescription}
              onChange={handleChange}
              placeholder="Provide a detailed description of what happened..."
              rows={5}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: errors.incidentDescription ? '1px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '4px',
                resize: 'vertical'
              }}
            />
            {errors.incidentDescription && <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.incidentDescription}</div>}
          </div>
        </div>

        {/* Additional Information */}
        <div style={{ 
          background: '#f8fafc', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#1e40af' }}>Additional Information</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Accused Name (if known)
              </label>
              <input
                type="text"
                name="accusedName"
                value={formData.accusedName}
                onChange={handleChange}
                placeholder="Name of the accused person"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Urgency Level
              </label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px'
                }}
              >
                {urgencyLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Accused Details
            </label>
            <textarea
              name="accusedDetails"
              value={formData.accusedDetails}
              onChange={handleChange}
              placeholder="Any additional details about the accused..."
              rows={3}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                resize: 'vertical'
              }}
            />
          </div>
          
          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Witnesses
            </label>
            <textarea
              name="witnesses"
              value={formData.witnesses}
              onChange={handleChange}
              placeholder="Names and contact information of any witnesses..."
              rows={3}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                resize: 'vertical'
              }}
            />
          </div>
          
          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Evidence Description
            </label>
            <textarea
              name="evidence"
              value={formData.evidence}
              onChange={handleChange}
              placeholder="Describe any evidence you have (documents, photos, videos, etc.)..."
              rows={3}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                resize: 'vertical'
              }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: isSubmitting ? '#9ca3af' : '#2563eb',
              color: 'white',
              padding: '0.75rem 2rem',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Registering...' : 'Register FIR'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FIRRegistration;
