async function analyzeTasks() {
    let tasksRaw = document.getElementById("taskInput").value;
    let strategy = document.getElementById("strategy").value;

    try {
        let tasks = JSON.parse(tasksRaw.trim());   // <-- IMPORTANT: trim()

        let response = await fetch("http://127.0.0.1:8000/api/tasks/analyze/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tasks, strategy })
        });

        let data = await response.json();
        displayResults(data);

    } catch (err) {
        console.error("JSON Parse Error:", err);
        alert("Invalid JSON input! Check formatting.");
    }
}


function displayResults(tasks) {
    let container = document.getElementById("results");
    container.innerHTML = "";

    tasks.forEach(t => {
        let prClass = t.score > 100 ? "high" :
                      t.score > 50 ? "medium" : "low";

        container.innerHTML += `
            <div class="task-card ${prClass}">
                <h3>${t.title}</h3>
                <p><b>Due:</b> ${t.due_date}</p>
                <p><b>Hours:</b> ${t.estimated_hours}</p>
                <p><b>Importance:</b> ${t.importance}</p>
                <p><b>Dependencies:</b> ${t.dependencies}</p>
                <p><b>Score:</b> ${t.score}</p>
            </div>
        `;
    });
}
