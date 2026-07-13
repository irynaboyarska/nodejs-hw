import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';
import { celebrate } from 'celebrate';
import {
  createNoteSchema,
  getAllNotesSchema,
  noteIdSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const router = Router();

// маршрут, який буде повертати всі нотатки
router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);

// маршрут, який буде повертати одну нотатку за її ідентифікатором
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);

// маршрут, який буде створювати нову нотатку
router.post('/notes', celebrate(createNoteSchema), createNote);

// маршрут, який буде видаляти нотатку за її ідентифікатором
router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);

// маршрут, який буде оновлювати нотатку за її ідентифікатором
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
