import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

// Роут GET /notes
export const getAllNotes = async (req, res) => {
  const { tag, search } = req.query;
  const notes = Note.find();
  if (tag) {
    notes.where('tag').equals(tag);
  }
  if (search) {
    notes.where({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ],
    });
  }

  const result = await notes;

  res.status(200).json({
    notes: result,
  });
};

// Роут GET /notes/:noteId
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};

// Роут POST /notes
export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

//Роут DELETE /notes/:noteId
export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({ _id: noteId });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};

//Роут PATCH /notes/:noteId
export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndUpdate({ _id: noteId }, req.body, {
    returnDocument: 'after',
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};
