import db from "../database/db.js";

export default class Todo {
    static async getAll(pageNumber,pageSize) {
        try {
            const offset = (pageNumber - 1) * pageSize;
            return await db('tasks')
                .select('*')
                .orderBy('created_at', 'desc')
                .limit(pageSize)
                .offset(offset);
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