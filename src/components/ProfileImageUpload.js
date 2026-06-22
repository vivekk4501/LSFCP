import React, { useRef, useState } from 'react';
import { useAppContext } from '../context/AppContext';

function ProfileImageUpload() {
  const { profilePhoto, uploadProfilePhoto, removeProfilePhoto } = useAppContext();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const validateAndUpload = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, etc.)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      uploadProfilePhoto(e.target.result);
      setIsUploading(false);
    };

    reader.onerror = () => {
      alert('Failed to read image file');
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileSelect = (event) => {
    validateAndUpload(event.target.files[0]);
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
    if (e.dataTransfer.files.length > 0) {
      validateAndUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="profile-upload-card">
      <div className="profile-upload-header">
        <h3>📸 Profile Photo</h3>
        {profilePhoto ? (
          <div className="profile-upload-actions">
            <button
              className="profile-upload-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? '⏳ Uploading...' : '🔄 Change Photo'}
            </button>
            <button className="profile-remove-btn" onClick={handleRemovePhoto}>
              🗑️ Remove
            </button>
          </div>
        ) : (
          <button
            className="profile-upload-btn primary"
            onClick={() => fileInputRef.current?.click()}
          >
            ➕ Add Photo
          </button>
        )}
      </div>

      <div className="profile-upload-body">
        {profilePhoto ? (
          <div className="profile-photo-preview-wrapper">
            <img
              src={profilePhoto}
              alt="Profile"
              className="profile-photo-preview"
            />
            <span className="profile-photo-badge">✓ Set</span>
          </div>
        ) : (
          <div
            className={`profile-photo-placeholder ${isDragging ? 'dragging' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <span className="placeholder-icon">📷</span>
            <span className="placeholder-text">
              {isDragging ? 'Drop image here' : 'No Profile Photo'}
            </span>
          </div>
        )}

        {!profilePhoto && (
          <button
            className="profile-upload-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            📷 Select Image
          </button>
        )}

        <p className="profile-upload-hint">
          {profilePhoto
            ? 'Your photo is visible on your profile and in the navigation bar.'
            : 'Supported: JPEG, PNG, GIF, WebP • Max 5MB'}
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default ProfileImageUpload;

