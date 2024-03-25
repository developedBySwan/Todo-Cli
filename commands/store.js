import inquirer from "inquirer";
import chalk from "chalk";
import Table from "cli-table";
import { isRequired } from "../utils/validation.js";
import todo from "../models/todo.js";

const setTask = async function () {
  console.log(chalk.red("Set Todo Tasks"));
  try {
    const answers = await getPromptInputData();

    const data = {
      name: answers.name,
      description: answers.description,
      priority_level: answers.priority_level,
    };

    await todo.setTask(data);

    console.log(generateTable(data));

    process.exit();
  } catch (error) {
    console.error("Error:", error);
  }
};

function generateTable(data) {
  let table = new Table({
    head: ["Task Name", "Description", "Priority"],
    colWidths: [10, 20, 10],
    wordWrap: true,
    wrapOnWordBoundary: false,
  });

  table.push([data.name, data.description, data.priority_level]);

  return table.toString();
}

async function getPromptInputData() {
  return await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter Type Name:",
      validate: isRequired,
    },
    {
      type: "input",
      name: "description",
      message: "Enter your task description:",
    },
    {
      type: "list",
      name: "priority_level",
      message: "Choose your Priority Level",
      choices: ["Low", "Medium", "High"],
    },
  ]);
}

export default setTask;
