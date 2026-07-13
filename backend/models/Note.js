const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  color: { type: String, default: '#FFFFFF' },
  tags: { type: [String], default: [] },
  pinned: { type: Boolean, default: false },
  archived: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
}, { timestamps: true });

// Add a text index for efficient searching
noteSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Note', noteSchema);
