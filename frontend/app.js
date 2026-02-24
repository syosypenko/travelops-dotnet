const API_URL = "http://localhost:5107/api/tasks";

document.addEventListener("DOMContentLoaded", fetchTasks);

async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

function renderTasks(tasks) {
    const list = document.getElementById("taskList");
    list.innerHTML = "";
    tasks.forEach(task => {
        const div = document.createElement("div");
        div.className = `task-item ${task.isCompleted ? "completed" : ""}`;
        div.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
            </div>
            <div class="actions">
                <button onclick="toggleComplete(${task.id}, ${!task.isCompleted})">
                    ${task.isCompleted ? "Undo" : "Done"}
                </button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        list.appendChild(div);
    });
}

async function addTask() {
    const title = document.getElementById("taskTitle").value;
    const desc = document.getElementById("taskDesc").value;
    
    if (!title) return alert("Title is required");

    const newTask = {
        title: title,
        description: desc,
        date: new Date().toISOString(),
        isCompleted: false
    };

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask)
    });

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDesc").value = "";
    fetchTasks();
}

async function deleteTask(id) {
    if(!confirm("Are you sure?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
}

async function toggleComplete(id, status) {
    // First get the task to preserve other fields
    const response = await fetch(`${API_URL}/${id}`);
    const task = await response.json();
    
    task.isCompleted = status;

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    });
    fetchTasks();
}
