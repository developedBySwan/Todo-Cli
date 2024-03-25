import todo from "../models/todo.js";
import Table from "cli-table";
import chalk from "chalk";
import inquirer from "inquirer";

const todoLists = async function (
  pageNumber = 1,
  pageSize = 5,
  is_done = null,
  search = null
) {
  try {
    const tasks = await todo.getAll(pageNumber, pageSize, is_done, search);

    if (tasks.length === 0) {
      console.log(chalk.red("No tasks found."));
      return null;
    }

    const totalCount = await todo.countTasks(is_done, search);
    console.log(
      chalk.blue(`Total Count: ${totalCount} | Current Page: ${pageNumber}`)
    );

    displayTasks(tasks);

    await viewDetailTask(tasks);
  } catch (error) {
    console.error("Error fetching todo lists:", error);
    return null;
  }
};

function displayTasks(tasks) {
  const table = generateTable(tasks);
  console.log(table.toString());
}

function generateTable(tasks) {
  try {
    const table = new Table({
      head: ["Task Name", "Priority", "is Done", "Finished Date Time"],
      colWidths: [20, 20, 20, 20],
      wordWrap: true,
      wrapOnWordBoundary: false,
    });

    tasks.forEach((task) => {
      const priorityColor = getPriorityColor(task.priority_level);
      const statusIcon = task.is_doned ? "✅" : "🛑";
      const finishedDateTime = task.done_at
        ? new Date(task.done_at).toDateString()
        : "N/A";

      table.push([task.name, priorityColor, statusIcon, finishedDateTime]);
    });

    return table;
  } catch (error) {
    console.error("Error generating table:", error);
    return null;
  }
}

function getPriorityColor(priorityLevel) {
  switch (priorityLevel) {
    case "Low":
      return chalk.white(priorityLevel);
    case "Medium":
      return chalk.yellow(priorityLevel);
    case "High":
      return chalk.red(priorityLevel);
    default:
      return chalk.white(priorityLevel);
  }
}

async function viewDetailTask(tasks) {
  const choices = tasks.map((task) => ({
    name: `${chalk.red(task.id)} ${chalk.blue(task.name)}`,
    value: task,
  }));

  const { selectedTask } = await inquirer.prompt({
    type: "list",
    name: "selectedTask",
    message: "Select a task to view details:",
    choices: choices,
  });

  displayTaskDetail(selectedTask);
}

async function displayTaskDetail(task) {
  console.log(chalk.green("Task Details:"));
  console.log(chalk.blue("ID: "), task.id);
  console.log(chalk.blue("Name: "), task.name);
  console.log(chalk.blue("Description: "), task.description || "N/A");
  console.log(
    chalk.blue("Status: "),
    task.is_doned ? "Completed" : "Incomplete"
  );
  console.log(
    chalk.blue("Priority Level: "),
    getPriorityColor(task.priority_level)
  );
  console.log(
    chalk.blue("Finished Date Time: "),
    task.done_at ? new Date(task.done_at) : "N/A"
  );

  const message = task.is_doned ? "Wanna undone?" : "Are you done?";

  await inquirer
    .prompt([
      {
        type: "confirm",
        name: "confirmed",
        message: message,
      },
    ])
    .then(async (answers) => {
      if (answers.confirmed) {
        await todo.doneTask(task.id);
        console.log("done...");
      } else {
        console.log("canceled...");
      }
    });
}

export default todoLists;
