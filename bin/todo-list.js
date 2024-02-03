import { program } from "commander";
import list from "../commands/list.js";

program
    .version('0.0.1')
    .command('list', 'Get List Of Todos')
    .option('-p, --page <pageNumber>', 'Page number')
    .option('-s, --size <pageSize>', 'Page size')
    .action(async (options) => {
        try {
            const { page, size } = options;
            return await list(page,size)
        } catch (error) {
            console.error('Error:', error);
        }
    });

program.parse(process.argv)