import express from 'express';
import { createNote, deleteNote, getAllNotes, searchNote, updateNote } from '../controllers/notes.js';
const router = express.Router();

/* GET Notes. */
router.post('/create-note', async (req, res) => {
  try {
    await createNote(req.body);
    res.status(201).send("Note created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});


/* POST new note. */
router.get('/get-all-notes', async (req, res) => {
  const payload = {
    page: req.query.page?.toString() || '1',
    pageSize: req.query.pageSize?.toString() || '10'
  };
  try {
    const notes = await getAllNotes(payload);
    res.status(200).send({
      page: payload.page,
      pageSize: payload.pageSize,
      total: notes.length,
      notes: notes,
    });
  } catch (error) {
    console.error(error);
    res.send("Notes not found");
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    if (!noteId) {
      return res.status(404).send("Note not found");
    }
    await deleteNote(noteId);
    res.status(200).send("Note deleted successfully");
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).send("Internal server error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    if (!noteId) {
      return res.status(404).send("Note not found");
    }
    await updateNote(noteId, req.body);
    res.status(200).send("Note updated successfully");
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).send("Internal server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const term = String(req.query.q)
    const notes = await searchNote(term)
    res.status(200).send(notes)
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).send("Internal server error");
  }
})


export default router;
