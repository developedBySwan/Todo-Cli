import { program } from "commander";
import todo from "../models/todo.js";

program
    .version('0.0.1')
    .command('list', 'Get List Of Todos')
    .action(async () => {
        try {
            // Perform asynchronous operations here
            const result = await todo.getAll();
            console.log('Async operation result:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    });

program.parse(process.argv)