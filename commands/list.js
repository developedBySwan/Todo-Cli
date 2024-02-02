import todo from "../models/todo.js";
import Table from "cli-table";
import chalk from "chalk";
import inquirer from "inquirer";

const todoLists = async function () {
    try {
        const tasks = await todo.getAll();

        if (tasks.length === 0) {
            return chalk.red("No tasks found.");
        }

        displayTasks(tasks);

        await viewDetailTask(tasks);
    } catch (error) {
        console.error('Error fetching todo lists:', error);
        return null;
    }
}

function displayTasks(tasks) {
    const table = generateTable(tasks);
    console.log(table.toString());
}


function generateTable(tasks) {
    try {
        const table = new Table({
            head: ['Task Name', 'Priority','is Done','Finished Date Time'],
            colWidths: [20, 20, 10, 20],
            wordWrap: true,
            wrapOnWordBoundary: false,
        })

        tasks.forEach(task => {
            const priorityColor = getPriorityColor(task.priority_level);
            const statusIcon = task.is_doned ? "✅" : "🛑";
            const finishedDateTime = task.done_at ? task.done_at.toString() : "-";
            
            table.push([
                task.name,
                priorityColor,
                statusIcon,
                finishedDateTime,
            ])
        });
        
        return table;
    } catch (error) {
        console.error('Error generating table:', error);
        return null;
    }
}

function getPriorityColor(priorityLevel) {
    switch (priorityLevel) {
        case 'Low':
            return chalk.white(priorityLevel);
        case 'Medium':
            return chalk.yellow(priorityLevel);
        case 'High':
            return chalk.red(priorityLevel);
        default:
            return chalk.white(priorityLevel);
    }
}

async function viewDetailTask(tasks) {
    const choices = tasks.map(task => ({
        name: `${chalk.red(task.id)} ${chalk.blue(task.name)}`,
        value: task
    }));

    const { selectedTask } = await inquirer.prompt({
        type: 'list',
        name: 'selectedTask',
        message: 'Select a task to view details:',
        choices: choices
    });

    displayTaskDetail(selectedTask);
}

function displayTaskDetail(task) {
    console.log(chalk.green("Task Details:"));
    console.log(chalk.blue("ID: "), task.id);
    console.log(chalk.blue("Name: "), task.name);
    console.log(chalk.blue("Description: "), task.description || "N/A");
    console.log(chalk.blue("Status: "), task.is_doned ? "Completed" : "Incomplete");
    console.log(chalk.blue("Priority Level: "), getPriorityColor(task.priority_level));
    console.log(chalk.blue("Finished Date Time: "), task.done_at ? task.done_at.toString() : "N/A");
}

export default todoLists;