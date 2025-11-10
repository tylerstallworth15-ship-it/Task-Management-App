const STORAGE_KEY = "task_management_tasks";

let tasks = [];

const taskForm = document.getElementById("task-form");
const taskNameInput = document.getElementById("task-name");
const taskCategoryInput = document.getElementById("task-category");
const taskDeadlineInput = document.getElementById("task-deadline");
const taskStatusInput = document.getElementById("task-status");

const filterStatusSelect = document.getElementById("filter-status");
const filterCategorySelect = document.getElementById("filter-category");

const taskTableBody = document.getElementById("task-table-body");
const noTasksMessage = document.getElementById("no-tasks-message");

loadTasksFromStorage();
checkOverdueTasks();
updateCategoryFilterOptions();
RenderTasks();

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = taskNameInput.value.trim();
    const category = taskCategoryInput.value.trim();
    const deadline = taskDeadlineInput.value;
    const status = taskStatusInput.value;

    if (name === "" || category === "" || deadline === "") {
        alert("Please fill in all fields.");
        return;
    }

    const newTask = {
        id: Date.now(),
        name: name,
        category: category,
        deadline: deadline,
        status: status
    };

    tasks.push(newTask);
    saveTasksToStorage();
    checkOverdueTasks();
    updateCategoryFilterOptions();
    RenderTasks();

    taskForm.reset();
    taskStatusInput.value = "In Progress";
});

filterStatusSelect.addEventListener("change", function () {
    RenderTasks();
});

filterCategorySelect.addEventListener("change", function () {
    RenderTasks();
});


// adding functions //

function loadTasksFromStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            tasks = JSON.parse(saved);
        }   catch (error) {
            console.log("Error reading stored tasks", error);
            tasks = [];
        }
    }
}

function saveTasksToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function checkOverdueTasks() {
    const today = new Date();
    today.setHours(0,0,0,0);

    tasks.forEach(function (task) {
        const deadlineDate = new Date(task.deadline);
        deadlineDate.setHours(0,0,0,0);

        if(deadlineDate < today && task.status !== "Completed") {
            task.status = "Overdue";
        }
    });

    saveTasksToStorage();
}


function RenderTasks() {
    taskTableBody.innerHTML = "";

    checkOverdueTasks();

    const selectedStatus = filterStatusSelect.value;
    const selectedCategory = filterCategorySelect.value;

    const filteredTasks = tasks.filter(function (task) {
        const matchStatus =
            selectedStatus === "all" || task.status === selectedStatus;

        const matchCategory = 
        selectedCategory === "all" || task.category === selectedCategory;

        return matchStatus && matchCategory;
    });

    if (filteredTasks.length === 0) {
        noTasksMessage.style.display = "block";
        return;
    } else {
        noTasksMessage.style.display = "none";
    }

    filteredTasks.forEach(function (task) {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = task.name;
        row.appendChild(nameCell);

        const categoryCell = document.createElement("td");
        categoryCell.textContent = task.category;
        row.appendChild(categoryCell);

        const deadlineCell = document.createElement("td")
        deadlineCell.textContent = task.deadline;
        row.appendChild(deadlineCell);

        const statusCell = document.createElement("td");
        statusCell.textContent = task.status;
        row.appendChild(statusCell);

        const updateCell = document.createElement("td");
        const statusSelect = document.createElement("select");

        const statuses = ["Not Started", "In Progress", "Completed", "Overdue"];

        statuses.forEach(function (statusOption) {
            const option = document.createElement("option");
            option.value = statusOption;
            option.textContent = statusOption;
            if (task.status === statusOption) {
                option.selected = true;
            }
            statusSelect.appendChild(option);
        });

        statusSelect.addEventListener("change", function () {
            task.status = statusSelect.value;
            saveTasksToStorage();
            checkOverdueTasks();
            RenderTasks();
        });

        updateCell.appendChild(statusSelect);
        row.appendChild(updateCell);

        taskTableBody.appendChild(row);
    });
}

function updateCategoryFilterOptions() {

    filterCategorySelect.innerHTML = "";
    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "All";
    filterCategorySelect.appendChild(allOption);

    const categories = [];

    tasks.forEach(function (task) {
        if (!categories.includes(task.category)) {
            categories.push(task.category);
        }
      });

      categories.forEach(function (category) {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        filterCategorySelect.appendChild(option);
      });
}
