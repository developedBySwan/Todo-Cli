import db from "../database/db.js";

export default class Todo {
    static async getAll(pageNumber, pageSize, isDone, search) {
        try {
            const offset = (pageNumber - 1) * pageSize;

            return await db('tasks')
                .select('*')
                .where((queryBuilder) => {
                    this.applyFilters(queryBuilder, isDone, search);
                })
                .orderBy('created_at', 'desc')
                .limit(pageSize)
                .offset(offset);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    }

    static async countTasks(isDone = null, search = null) {
        try {
            return db('tasks')
                    .where((queryBuilder) => {
                        this.applyFilters(queryBuilder, isDone, search);
                    })
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

    static applyFilters(queryBuilder, isDone, search) {
        if (isDone != null) {
            queryBuilder.where('is_doned', (isDone == 'true') ? true : false);
        }

        if (search) {
            queryBuilder.where('name', 'like', `%${search}%`);
        }
    }
}