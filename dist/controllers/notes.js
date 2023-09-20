import { Note } from "../db/entities/Note.js";
import { Like } from 'typeorm';
const createNote = (payload) => {
    const newNote = Note.create({
        title: payload.title,
        content: payload.content
    });
    return newNote.save();
};
const getAllNotes = async (payload) => {
    const page = parseInt(payload.page);
    const pageSize = parseInt(payload.pageSize);
    const q = payload.q;
    const notes = await Note.find({
        skip: pageSize * (page - 1),
        take: pageSize,
        order: {
            createdAt: 'DESC'
        },
        where: [
            { title: Like(`%${q}%`) },
            { content: Like(`%${q}%`) }
        ]
    });
    return notes;
};
const deleteNote = async (id) => {
    const note = await Note.findOneBy({ id });
    note?.remove();
};
const updateNote = async (id, payload) => {
    const note = await Note.update({
        id
    }, {
        title: payload?.title,
        content: payload?.content
    });
    return note;
};
const searchNote = async (term) => {
    const notes = await Note.find({
        where: [
            { title: Like(`%${term}%`) },
            { content: Like(`%${term}%`) }
        ]
    });
    return notes;
};
export { createNote, getAllNotes, deleteNote, updateNote, searchNote };
