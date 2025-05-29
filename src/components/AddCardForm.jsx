import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AddCardForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    color: '#6366f1',
    description: '',
    image: null,
    flashcards: [{ question: '', answer: '' }]
  });
  
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const colors = [
    '#F42C38', '#6366f1', '#006CA5', '#48a860', 
    '#ffa500', '#808000', '#8b5cf6', '#ef4444',
    '#06b6d4', '#10b981', '#f59e0b', '#ec4899'
  ];

  const departments = [
    'Science', 'Movies', 'BTech', 'Business', 
    'General Knowledge', 'Law', 'History', 
    'Literature', 'Sports', 'Technology'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFlashcardChange = (index, field, value) => {
    const newFlashcards = [...formData.flashcards];
    newFlashcards[index][field] = value;
    setFormData(prev => ({
      ...prev,
      flashcards: newFlashcards
    }));
  };

  const addFlashcard = () => {
    setFormData(prev => ({
      ...prev,
      flashcards: [...prev.flashcards, { question: '', answer: '' }]
    }));
  };

  const removeFlashcard = (index) => {
    if (formData.flashcards.length > 1) {
      const newFlashcards = formData.flashcards.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        flashcards: newFlashcards
      }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type.startsWith('image/')) {
      setFormData(prev => ({ ...prev, image: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
      
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: '' }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.image) newErrors.image = 'Image is required';
    
    formData.flashcards.forEach((card, index) => {
      if (!card.question.trim()) newErrors[`question_${index}`] = 'Question is required';
      if (!card.answer.trim()) newErrors[`answer_${index}`] = 'Answer is required';
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create the new character object
    const newCharacter = {
      name: formData.name,
      Department: formData.department,
      color: formData.color,
      image: imagePreview, // In real app, this would be uploaded to server
      description: formData.description,
      clips: ['/api/placeholder/200/120', '/api/placeholder/200/120', '/api/placeholder/200/120'],
      flashcards: formData.flashcards
    };
    
    onSubmit(newCharacter);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      department: '',
      color: '#6366f1',
      description: '',
      image: null,
      flashcards: [{ question: '', answer: '' }]
    });
    setImagePreview(null);
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Create New Flashcard Set</h2>
                <p className="text-blue-100">Add a new category with custom flashcards</p>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                      errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                    } focus:outline-none`}
                    placeholder="e.g., Advanced Mathematics"
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                      errors.department ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                    } focus:outline-none`}
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  {errors.department && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.department}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Theme Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {colors.map(color => (
                    <motion.button
                      key={color}
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleInputChange('color', color)}
                      className={`w-10 h-10 rounded-full border-4 transition-all ${
                        formData.color === color ? 'border-gray-400 shadow-lg' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Category Image *
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 transition-all ${
                    dragActive ? 'border-blue-500 bg-blue-50' : 
                    errors.image ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {imagePreview ? (
                    <div className="text-center">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto h-32 w-32 object-cover rounded-lg mb-4"
                      />
                      <p className="text-sm text-gray-600">Image uploaded successfully!</p>
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData(prev => ({ ...prev, image: null }));
                        }}
                        className="text-red-500 text-sm hover:text-red-700 mt-2"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="mt-4">
                        <p className="text-lg font-medium text-gray-900">
                          Drag and drop your image here
                        </p>
                        <p className="text-sm text-gray-500">or</p>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Choose File
                        </button>
                      </div>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
                    className="hidden"
                  />
                </div>
                {errors.image && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.image}
                  </motion.p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows="3"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all resize-none ${
                    errors.description ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                  } focus:outline-none`}
                  placeholder="Describe what this flashcard set covers..."
                />
                {errors.description && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.description}
                  </motion.p>
                )}
              </div>

              {/* Flashcards Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Flashcards ({formData.flashcards.length})
                  </label>
                  <button
                    type="button"
                    onClick={addFlashcard}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Card
                  </button>
                </div>

                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {formData.flashcards.map((card, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border rounded-lg p-4 bg-gray-50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-700">Card #{index + 1}</h4>
                        {formData.flashcards.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFlashcard(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Question *
                          </label>
                          <textarea
                            value={card.question}
                            onChange={(e) => handleFlashcardChange(index, 'question', e.target.value)}
                            rows="2"
                            className={`w-full px-3 py-2 text-sm rounded border transition-all resize-none ${
                              errors[`question_${index}`] ? 'border-red-300' : 'border-gray-300'
                            } focus:outline-none focus:border-blue-500`}
                            placeholder="Enter your question..."
                          />
                          {errors[`question_${index}`] && (
                            <p className="text-red-500 text-xs mt-1">{errors[`question_${index}`]}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Answer *
                          </label>
                          <textarea
                            value={card.answer}
                            onChange={(e) => handleFlashcardChange(index, 'answer', e.target.value)}
                            rows="2"
                            className={`w-full px-3 py-2 text-sm rounded border transition-all resize-none ${
                              errors[`answer_${index}`] ? 'border-red-300' : 'border-gray-300'
                            } focus:outline-none focus:border-blue-500`}
                            placeholder="Enter the answer..."
                          />
                          {errors[`answer_${index}`] && (
                            <p className="text-red-500 text-xs mt-1">{errors[`answer_${index}`]}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`flex-1 px-6 py-3 rounded-lg text-white font-medium transition-all ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </div>
                  ) : (
                    'Create Flashcard Set'
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddCardForm;