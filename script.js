let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
           ${task.text} - ${task.date.replace("T", " ")}
            <button onclick="deleteTask(${index})">删除</button>
        `;
        list.appendChild(li);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const text = document.getElementById("taskInput").value;
    const date = document.getElementById("dateInput").value;

    if (text === "" || date === "") {
        alert("请填写完整信息");
        return;
    }

    tasks.push({ text, date });

    document.getElementById("taskInput").value = "";
    document.getElementById("dateInput").value = "";

    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

renderTasks();