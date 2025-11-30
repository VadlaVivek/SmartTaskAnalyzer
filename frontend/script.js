async function analyzeTasks() {
    let tasksRaw = document.getElementById("taskInput").value;
    let strategy = document.getElementById("strategy").value;

    try {
        let tasks = JSON.parse(tasksRaw.trim());   // <-- IMPORTANT: trim()
        let backendURL = "https://smarttaskanalyzer-ka53.onrender.com";
        let response = await fetch(`${backendURL}/api/tasks/analyze/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tasks, strategy })
        });

        let data = await response.json();
        displayResults(data);

    } catch (error) {
    console.error("Actual Error:", error);
    alert("Network error: Could not reach API");
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
