import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';

const router = Router();

// маршрут, який буде повертати всі нотатки
router.get('/notes', getAllNotes);

router.get('/hello', (req, res) => {
  res.json({ message: 'hello' });
});

// маршрут, який буде повертати одну нотатку за її ідентифікатором
router.get('/notes/:noteId', getNoteById);

// маршрут, який буде створювати нову нотатку
router.post('/notes', createNote);

// маршрут, який буде видаляти нотатку за її ідентифікатором
router.delete('/notes/:noteId', deleteNote);

// маршрут, який буде оновлювати нотатку за її ідентифікатором
router.patch('/notes/:noteId', updateNote);

export default router;
