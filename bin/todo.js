#!/usr/bin/env node
import { program } from "commander";
// import list from "../commands/list.js"
// import set from "../commands/set.js"

program.version("0.0.1");

// program.addCommand(list);
// program.addCommand(set);

program
  .command("list", "get list of tasks")
  .command("set", "set tasks")
  .command("figlet", "test figlet")
  .parse(process.argv);

// If no args, output help
if (!process.argv[2]) {
  program.outputHelp();
}
