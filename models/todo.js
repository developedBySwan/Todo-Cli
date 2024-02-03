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
            console.error('Error fetching tasks:', error);
            throw error;
        }
    }

    static async countTasks() {
        try {
            return db('tasks')
                    .count()
                    .then((result) => {
                        return result[0]['count(*)'];
                    });
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    }

    static async setTask(tasks) {
        return await db('tasks').insert(tasks);
    }
}