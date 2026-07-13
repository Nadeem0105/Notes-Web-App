const express = require('express');
const {
  getNotes,
  getArchivedNotes,
  getTrashNotes,
  getNote,
  createNote,
  updateNote,
  togglePin,
  archiveNote,
  restoreNote,
  deleteNote,
  recoverNote,
  permanentDeleteNote
} = require('../controllers/noteController');

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const userId = req.headers['x-user-id'];
  if (!userId) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Missing User ID' });
  }
  req.user = { id: userId };
  next();
};

router.use(authMiddleware);

router.route('/')
  .get(getNotes)
  .post(createNote);

router.route('/archived')
  .get(getArchivedNotes);
  
router.route('/trash')
  .get(getTrashNotes);

router.route('/:id')
  .get(getNote)
  .put(updateNote)
  .delete(deleteNote);

router.patch('/:id/pin', togglePin);
router.patch('/:id/archive', archiveNote);
router.patch('/:id/restore', restoreNote);
router.patch('/:id/recover', recoverNote);
router.delete('/:id/permanent', permanentDeleteNote);

module.exports = router;
