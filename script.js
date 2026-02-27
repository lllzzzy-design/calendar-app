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
    if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
}
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
setInterval(checkReminders, 60000);

function checkReminders() {
    const now = new Date();

    tasks.forEach(task => {
        const taskTime = new Date(task.date);

        if (
            now.getFullYear() === taskTime.getFullYear() &&
            now.getMonth() === taskTime.getMonth() &&
            now.getDate() === taskTime.getDate() &&
            now.getHours() === taskTime.getHours() &&
            now.getMinutes() === taskTime.getMinutes()
        ) {
            new Notification("提醒", {
                body: task.text
            });
        }
    });
}
new Notification("测试通知", { body: "如果你看到这个，说明通知功能正常" });