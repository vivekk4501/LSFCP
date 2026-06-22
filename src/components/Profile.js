import React, { useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';

function Profile() {
  try {
    const { user, profilePhoto, uploadProfilePhoto, removeProfilePhoto, history } = useAppContext();
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, etc.)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const imageData = e.target.result;
      uploadProfilePhoto(imageData);
      setIsUploading(false);
    };

    reader.onerror = () => {
      alert('Failed to read image file');
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    if (window.confirm('Are you sure you want to remove your profile photo?')) {
      removeProfilePhoto();
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  try {
    return (
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h2>👤 Profile Settings</h2>
        
        <div style={{ 
          background: '#f8fafc', 
          padding: '2rem', 
          borderRadius: '12px', 
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          {/* Profile Photo Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h3>Profile Photo</h3>
            <div style={{ marginTop: '1rem' }}>
              {profilePhoto ? (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img 
                    src={profilePhoto} 
                    alt="Profile" 
                    style={{ 
                      width: '150px', 
                      height: '150px', 
                      borderRadius: '50%', 
                      objectFit: 'cover',
                      border: '4px solid #e2e8f0'
                    }}
                  />
                  <button
                    onClick={handleRemovePhoto}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div 
                  onClick={triggerFileSelect}
                  style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    border: '3px dashed #cbd5e1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    margin: '0 auto',
                    background: '#f1f5f9',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#e2e8f0';
                    e.target.style.borderColor = '#94a3b8';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = '#f1f5f9';
                    e.target.style.borderColor = '#cbd5e1';
                  }}
                >
                  <div style={{ textAlign: 'center', color: '#64748b' }}>
                    <div style={{ fontSize: '48px', marginBottom: '8px' }}>📷</div>
                    <div style={{ fontSize: '14px' }}>Click to select photo</div>
                    <div style={{ fontSize: '12px', marginTop: '4px', opacity: '0.7' }}>or drag & drop</div>
                  </div>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            
            <div style={{ marginTop: '1rem' }}>
              {profilePhoto ? (
                <button
                  onClick={triggerFileSelect}
                  disabled={isUploading}
                  style={{
                    background: '#2563eb',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    marginRight: '0.5rem'
                  }}
                >
                  {isUploading ? 'Uploading...' : 'Change Photo'}
                </button>
              ) : (
                <button
                  onClick={triggerFileSelect}
                  disabled={isUploading}
                  style={{
                    background: '#2563eb',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  {isUploading ? 'Uploading...' : 'Upload Photo'}
                </button>
              )}
            </div>
          </div>

          {/* User Information */}
          <div>
            <h3>Account Information</h3>
            <div style={{ textAlign: 'left', marginTop: '1rem' }}>
              <p><strong>Name:</strong> {user?.name || 'Not set'}</p>
              <p><strong>Email:</strong> {user?.email || 'Not set'}</p>
              <p><strong>Role:</strong> {user?.role || 'Not set'}</p>
              <p><strong>Member Since:</strong> {user?.loginTime ? (() => {
                try {
                  return new Date(user.loginTime).toLocaleDateString();
                } catch (error) {
                  console.error('Date formatting error in profile:', error);
                  return 'Invalid date';
                }
              })() : 'Not available'}</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3>Recent Activity</h3>
          <div style={{ textAlign: 'left', marginTop: '1rem' }}>
            {(() => {
              try {
                if (!history || history.length === 0) {
                  return <p style={{ color: '#666', fontStyle: 'italic' }}>No recent activity</p>;
                }

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {history.slice(0, 5).map((item, index) => {
                      try {
                        return (
                          <div 
                            key={item.id || index} 
                            style={{ 
                              padding: '0.5rem', 
                              background: '#f8fafc', 
                              borderRadius: '4px',
                              fontSize: '0.9rem',
                              cursor: 'pointer',
                              transition: 'background 0.2s ease'
                            }}
                            onClick={() => {
                              try {
                                console.log('Activity item clicked:', item);
                                // You can add navigation or detail view here
                              } catch (clickError) {
                                console.error('Error clicking activity item:', clickError);
                              }
                            }}
                            onMouseOver={(e) => {
                              e.target.style.background = '#e2e8f0';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.background = '#f8fafc';
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ fontWeight: 'bold' }}>
                                {item.type?.toUpperCase() || 'UNKNOWN'}
                              </span>
                              <small>
                                {item.timestamp ? (() => {
                                  try {
                                    return new Date(item.timestamp).toLocaleDateString();
                                  } catch (error) {
                                    return 'Invalid date';
                                  }
                                })() : 'No date'}
                              </small>
                            </div>
                            <div style={{ color: '#666', fontSize: '0.8rem' }}>
                              {(() => {
                                try {
                                  if (item.type === 'fir') {
                                    return `Category: ${item.category || 'N/A'}`;
                                  }
                                  if (item.type === 'summary') {
                                    return `Summary: ${item.summary?.slice(0, 50) || 'N/A'}...`;
                                  }
                                  if (item.type === 'upload') {
                                    return `Files uploaded`;
                                  }
                                  if (item.type === 'fir-register') {
                                    return `FIR Registered: ${item.title || 'Untitled'}`;
                                  }
                                  return 'Activity recorded';
                                } catch (displayError) {
                                  console.error('Error displaying activity item:', displayError);
                                  return 'Error displaying activity';
                                }
                              })()}
                            </div>
                          </div>
                        );
                      } catch (itemError) {
                        console.error('Error rendering activity item:', itemError);
                        return (
                          <div key={index} style={{ 
                            padding: '0.5rem', 
                            background: '#fee', 
                            borderRadius: '4px',
                            fontSize: '0.9rem',
                            color: '#dc2626'
                          }}>
                            Error loading activity item
                          </div>
                        );
                      }
                    })}
                  </div>
                );
              } catch (activityError) {
                console.error('Error in recent activity section:', activityError);
                return (
                  <div style={{ 
                    padding: '1rem', 
                    background: '#fee', 
                    borderRadius: '4px',
                    color: '#dc2626',
                    textAlign: 'center'
                  }}>
                    <p>Error loading recent activity</p>
                    <small>Please refresh the page to try again</small>
                  </div>
                );
              }
            })()}
          </div>
        </div>

        {/* Instructions */}
        <div style={{ 
          background: '#fffbeb', 
          padding: '1rem', 
          borderRadius: '8px', 
          border: '1px solid #fbbf24',
          fontSize: '14px',
          color: '#92400e'
        }}>
          <strong>Photo Guidelines:</strong>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
            <li>Supported formats: JPEG, PNG, GIF</li>
            <li>Maximum file size: 5MB</li>
            <li>Recommended size: 150x150 pixels</li>
            <li>Photos are stored locally in your browser</li>
          </ul>
        </div>
      </div>
    );
  } catch (profileError) {
    console.error('Profile component error:', profileError);
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Profile Error</h2>
        <p>There was an error loading the profile page. Please try refreshing the page.</p>
        <details style={{ marginTop: '1rem', textAlign: 'left' }}>
          <summary>Error Details</summary>
          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', fontSize: '0.875rem' }}>
            {profileError.message}
          </pre>
        </details>
      </div>
    );
  }
}

export default Profile;
