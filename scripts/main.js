let taskArray = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();
    if (taskValue !== "") {
        taskArray.push(taskValue);
        taskInput.value = "";
        updateTaskPad();
    }
}

function updateTaskPad() {
    const taskPad = document.getElementById('task-pad');
    taskPad.innerHTML = ""; // Clear the task-pad content before updating

    // Loop through each task in the taskArray and add it to the task-pad
    taskArray.forEach((task, index) => {
        // Create a paragraph element for the task
        const taskElement = document.createElement("p");

        // Add the serial number (index + 1) and the task text to the paragraph
        taskElement.textContent = `${index + 1}. ${task}`;

        // Append the task paragraph to the task-pad
        taskPad.appendChild(taskElement);
    });

    // Save the taskArray to Local Storage
    localStorage.setItem('tasks', JSON.stringify(taskArray));
}

function deleteTask() {
    const number = parseInt(document.getElementById('deleteTask').value, 10);
    if (taskArray[number - 1] != null) {
        taskArray.splice(number - 1, 1);
        updateTaskPad();
    } else {
        alert("Invalid task number. Please enter a valid task number to delete.");
    }
}

function deleteAll() {
    taskArray.length = 0; // Clear the taskArray
    updateTaskPad(); // Update the task-pad with the cleared taskArray
}

document.getElementById("button").addEventListener('click', addTask);
document.getElementById('deleteButton').addEventListener('click', deleteTask);
document.getElementById('deleteall').addEventListener('click', deleteAll);

window.addEventListener('load', () => {
    // Get the tasks from Local Storage
    const savedTasks = localStorage.getItem('tasks');

    // If there are saved tasks, parse and update the taskArray
    if (savedTasks) {
        taskArray = JSON.parse(savedTasks);
        updateTaskPad(); // Update the task-pad with the saved tasks
    }
});
