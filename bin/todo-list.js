import { program } from "commander";
import list from "../commands/list.js";

program
  .version("0.0.1")
  .command("list", "Get List Of Todos")
  .option("-p, --page <pageNumber>", "Page number")
  .option("-s, --size <pageSize>", "Page size")
  .option("-is, --is_done <isDone>", "Filter For Done")
  .option("-f, --search <search>", "Filter Task Name")
  .action(async (options) => {
    try {
      const { page, size, is_done, search } = options;
      await list(page, size, is_done, search);
    } catch (error) {
      console.error("Error:", error);
    }
  });

program.parse(process.argv);
