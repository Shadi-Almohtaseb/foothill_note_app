import { NS_Note } from "../@types/note.js"
import { Note } from "../db/entities/Note.js"
import { Like } from 'typeorm';

const createNote = (payload: NS_Note.Item) => {
    const newNote = Note.create({
        title: payload.title,
        content: payload.content
    });
    return newNote.save();
}

const getAllNotes = async (payload: GetAll) => {
    const page = parseInt(payload.page);
    const pageSize = parseInt(payload.pageSize);
    const q = payload.q

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
    })
    return notes;
}

const deleteNote = async (id: string) => {
    const note = await Note.findOneBy({ id })
    note?.remove();
}

const updateNote = async (id: string, payload: NS_Note.Item) => {
    const note = await Note.update({
        id
    },
        {
            title: payload?.title,
            content: payload?.content
        })
    return note
}

const searchNote = async (term: string) => {
    const notes = await Note.find({
        where: [
            { title: Like(`%${term}%`) },
            { content: Like(`%${term}%`) }
        ]
    })
    return notes
}

export { createNote, getAllNotes, deleteNote, updateNote, searchNote }