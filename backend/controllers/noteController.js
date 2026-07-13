const Note = require('../models/Note');

// Error wrapper to avoid try/catch everywhere
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

exports.getNotes = catchAsync(async (req, res) => {
  const { search, sort, tag } = req.query;
  const query = { userId: req.user.id, archived: false, deleted: false };

  if (search) {
    query.$text = { $search: search };
  }

  if (tag) {
    query.tags = tag;
  }

  let sortOptions = { pinned: -1 }; // Pinned always first

  if (sort === 'oldest') {
    sortOptions.createdAt = 1;
  } else if (sort === 'az') {
    sortOptions.title = 1;
  } else {
    // default to newest
    if (search) {
      sortOptions.score = { $meta: 'textScore' };
    } else {
      sortOptions.createdAt = -1;
    }
  }

  let notesQuery = Note.find(query);
  if (search) {
    notesQuery = notesQuery.select({ score: { $meta: 'textScore' } });
  }
  
  const notes = await notesQuery.sort(sortOptions);
  res.status(200).json({ success: true, data: notes });
});

exports.getArchivedNotes = catchAsync(async (req, res) => {
  const notes = await Note.find({ userId: req.user.id, archived: true, deleted: false }).sort({ updatedAt: -1 });
  res.status(200).json({ success: true, data: notes });
});

exports.getTrashNotes = catchAsync(async (req, res) => {
  const notes = await Note.find({ userId: req.user.id, deleted: true }).sort({ updatedAt: -1 });
  res.status(200).json({ success: true, data: notes });
});

exports.getNote = catchAsync(async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
  if (!note) {
    return res.status(404).json({ success: false, error: 'Note not found' });
  }
  res.status(200).json({ success: true, data: note });
});

exports.createNote = catchAsync(async (req, res) => {
  const { title, content, color, tags, pinned } = req.body;
  const note = await Note.create({ userId: req.user.id, title, content, color, tags, pinned });
  res.status(201).json({ success: true, data: note });
});

exports.updateNote = catchAsync(async (req, res) => {
  const { title, content, color, tags } = req.body;
  
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { title, content, color, tags },
    { new: true, runValidators: true }
  );

  if (!note) {
    return res.status(404).json({ success: false, error: 'Note not found' });
  }
  res.status(200).json({ success: true, data: note });
});

exports.togglePin = catchAsync(async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
  if (!note) {
    return res.status(404).json({ success: false, error: 'Note not found' });
  }
  
  note.pinned = !note.pinned;
  await note.save();
  res.status(200).json({ success: true, data: note });
});

exports.archiveNote = catchAsync(async (req, res) => {
  const note = await Note.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { archived: true }, { new: true });
  if (!note) {
    return res.status(404).json({ success: false, error: 'Note not found' });
  }
  res.status(200).json({ success: true, data: note });
});

exports.restoreNote = catchAsync(async (req, res) => {
  const note = await Note.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { archived: false }, { new: true });
  if (!note) {
    return res.status(404).json({ success: false, error: 'Note not found' });
  }
  res.status(200).json({ success: true, data: note });
});

exports.deleteNote = catchAsync(async (req, res) => {
  const note = await Note.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { deleted: true }, { new: true });
  if (!note) {
    return res.status(404).json({ success: false, error: 'Note not found' });
  }
  res.status(200).json({ success: true, data: note });
});

exports.recoverNote = catchAsync(async (req, res) => {
  const note = await Note.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { deleted: false }, { new: true });
  if (!note) {
    return res.status(404).json({ success: false, error: 'Note not found' });
  }
  res.status(200).json({ success: true, data: note });
});

exports.permanentDeleteNote = catchAsync(async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!note) {
    return res.status(404).json({ success: false, error: 'Note not found' });
  }
  res.status(200).json({ success: true, data: {} });
});
