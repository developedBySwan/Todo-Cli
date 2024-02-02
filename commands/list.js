import todo from "../models/todo.js";
import Table from "cli-table";
import chalk from "chalk";

const todoLists = async function () {    
    try {
        const data = await todo.getAll();
        return generateTable(data).toString();
    } catch (error) {
        console.error('Error fetching todo lists:', error);
        return null;
    }
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

export default todoLists;