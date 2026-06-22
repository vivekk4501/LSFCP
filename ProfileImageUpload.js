import React, { useRef, useState } from 'react';
import { useAppContext } from '../context/AppContext';

function ProfileImageUpload() {
  const { profilePhoto, uploadProfilePhoto, removeProfilePhoto } = useAppContext();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      
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
    }
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ 
          color: '#1e40af',
          fontSize: '1.5rem',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          margin: 0
        }}>
          📸 Profile Photo
        </h3>
        
        {/* Add Profile Image Button - Prominent for new users */}
        {!profilePhoto && (
          <button 
            onClick={() => fileInputRef.current?.click()}
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
            }}
          >
            ➕ Add Profile Image
          </button>
        )}

        {/* Change Photo Button - For existing photos */}
        {profilePhoto && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => fileInputRef.current?.click()}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              {isUploading ? '⏳ Uploading...' : '� Change Photo'}
            </button>
            
            <button
              onClick={handleRemovePhoto}
              style={{
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              🗑️ Remove
            </button>
          </div>
        )}
      </div>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '1rem',
        marginTop: '2rem'
      }}>
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
                border: '4px solid white',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            />
            <div style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(34, 197, 94, 0.9)',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '12px',
              fontSize: '0.8rem',
              fontWeight: '500',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
            }}>
              ✓ Profile Photo Set
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            {/* No Profile Image State */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                border: isDragging 
                  ? '3px dashed rgba(34, 197, 94, 0.8)' 
                  : '3px dashed rgba(59, 130, 246, 0.3)',
                background: isDragging 
                  ? 'rgba(34, 197, 94, 0.1)' 
                  : 'rgba(249, 250, 251, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                margin: '0 auto 1rem'
              }}
              onMouseOver={(e) => {
                if (!isDragging) {
                  e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                  e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                  e.target.style.transform = 'scale(1.05)';
                }
              }}
              onMouseOut={(e) => {
                if (!isDragging) {
                  e.target.style.background = 'rgba(249, 250, 251, 0.1)';
                  e.target.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                  e.target.style.transform = 'scale(1)';
                }
              }}
            >
              <div style={{ color: '#64748b', fontSize: '3rem', marginBottom: '0.5rem' }}>
                �
              </div>
              <div style={{ color: '#64748b', fontSize: '0.9rem', textAlign: 'center' }}>
                {isDragging ? 'Drop image here' : 'No Profile Photo'}
              </div>
            </div>
            
            {/* Select Image Button */}
            <button 
              onClick={() => fileInputRef.current?.click()}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0 auto'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
              }}
            >
              📷 Select Image
            </button>
            
            <div style={{ 
              color: '#64748b', 
              fontSize: '0.8rem', 
              textAlign: 'center', 
              marginTop: '0.5rem',
              opacity: 0.7
            }}>
              or drag & drop your photo above
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

      {/* Upload Instructions */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '1rem',
        borderRadius: '8px',
        marginTop: '1.5rem'
      }}>
        <h4 style={{ color: '#1e40af', fontSize: '1rem', marginBottom: '0.5rem' }}>
          📋 Upload Instructions:
        </h4>
        <ul style={{ color: '#64748b', fontSize: '0.9rem', margin: 0, paddingLeft: '1.5rem' }}>
          <li>Supported formats: JPEG, PNG, GIF, WebP</li>
          <li>Maximum file size: 5MB</li>
          <li>Recommended dimensions: 300x300 pixels or higher</li>
          <li>Click the upload area or drag & drop an image</li>
        </ul>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ color: '#1e40af', fontSize: '1rem', marginBottom: '0.5rem' }}>
            ⏳ Uploading image...
          </div>
          <div style={{
            width: '100%',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, #3b82f6, #1e40af)',
              borderRadius: '2px',
              animation: 'pulse 1s ease-in-out infinite'
            }} />
          </div>
        </div>
      )}

      {/* Success Message */}
      {profilePhoto && !isUploading && (
        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ color: '#16a34a', fontSize: '1rem', marginBottom: '0.5rem' }}>
            ✅ Profile photo uploaded successfully!
          </div>
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Your profile photo is now visible on your profile and in the navigation bar.
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileImageUpload;
