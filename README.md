--- # Smart Task Analyzer # ---

An intelligent task-prioritization system built with Django (Backend) and HTML/CSS/JavaScript (Frontend).
Users can input tasks in JSON format, and the system scores & ranks them based on urgency, importance, effort, and dependencies.

# Features

🔹 Smart Task Prioritization
Uses a custom scoring algorithm that analyzes:
Urgency (due date)
Importance (1–10 scale)
Effort (estimated hours)
Dependencies (task blockers)

🔹 Multiple Scoring Strategies
Users can switch between:
Smart Balance (default intelligent scoring)
Fastest Wins (low-effort first)
High Impact (importance first)
Deadline Driven (due date first)

🔹 API Endpoints

Method : `POST`                                                
URL : `/api/tasks/analyze/`
Description: Analyzes tasks, assigns priority score, returns sorted list

Method : `GET`                                                
URL : `/api/tasks/suggest/`
Description: Returns top 3 recommended tasks  

🔹 Frontend UI
JSON input box
Strategy selection dropdown
Compute button
Results displayed with color-coded priority cards
Responsive & clean layout

# Project Structure

SmartTaskAnalyzer/
│── backend/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│── tasks/
│   ├── models.py
│   ├── views.py
│   ├── scoring.py
│   ├── urls.py
│── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│── requirements.txt
│── render.yaml
│── manage.py
│── README.md

# Scoring Algorithm (Summary)

The core scoring logic lives in:
tasks/scoring.py

The Smart Balance strategy evaluates:

🔹 Urgency
- Overdue tasks get large bonus
- Tasks due soon get more weight

🔹 Importance
- Weight: 7× for stronger impact

🔹 Effort / Quick Wins
- Small tasks get extra bonus

🔹 Dependencies
- Tasks that block others get additional priority