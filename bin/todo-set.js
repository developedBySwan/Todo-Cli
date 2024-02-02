import { program } from "commander";
import setTask from "../commands/store.js";

program
    .version('0.0.1')
    .command('task', 'set Todo data')
    .action(async () => setTask())

program.parse(process.argv);