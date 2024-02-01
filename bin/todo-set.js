import { program } from "commander";
import todo from "../models/todo.js";
import { isRequired } from "../utils/validation.js";
import inquirer from "inquirer";

program
    .version('0.0.1')
    .command('task', 'set Todo data')
    .action(() => {
        console.log("Set Todo Tasks")
        setTask();
    })

program.parse(process.argv);

function setTask() {
  inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Enter Type Name:',
        validate: isRequired,
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter your task description:'
    },
    {
      type: 'list',
      name: 'priority_level',
      message: 'Choose your Priority Level',
      choices: ['Low', 'Medium', 'High']
    }
  ]).then(answers => {
        console.log('Project name:', answers.name);
        console.log('Project description:', answers.description);
        console.log('Project version:', answers.priority_level);
  }).catch(error => {
    console.error('Error:', error);
  });
}