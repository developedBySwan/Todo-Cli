import { program } from "commander";
import list from "../commands/list.js";

program
    .version('0.0.1')
    .command('list', 'Get List Of Todos')
    .action(async () => {
        try {
            console.log(await list());
        } catch (error) {
            console.error('Error:', error);
        }
    });

program.parse(process.argv)