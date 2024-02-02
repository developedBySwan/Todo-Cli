import db from "../database/db.js";

export default class Todo {
    static async getAll() {
        try {
            return await db('tasks').select('*');
        } catch (error) {
            // Handle the error
            console.error('Error fetching tasks:', error);
            throw error; // Rethrow the error to propagate it to the caller
        }
    }

    static async setTask(tasks) {
        return await db('tasks').insert(tasks);
    }
}