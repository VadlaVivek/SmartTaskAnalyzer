from datetime import date

def calculate_task_score(task, strategy="smart"):

    title = task.get("title", "Untitled")
    importance = int(task.get("importance", 5))
    estimated_hours = int(task.get("estimated_hours", 1))
    dependencies = task.get("dependencies", [])

    # Convert due date safely
    due_raw = task.get("due_date")
    if isinstance(due_raw, str):
        try:
            year, month, day = map(int, due_raw.split("-"))
            due_date = date(year, month, day)
        except:
            due_date = date.today()
    else:
        due_date = due_raw

    today = date.today()
    days_until_due = (due_date - today).days

    score = 0

    
    # STRATEGY 1: FASTEST WINS
    if strategy == "fastest":
        return max(1, 50 - estimated_hours * 5)

    # STRATEGY 2: HIGH IMPACT
    if strategy == "impact":
        return importance * 10

    # STRATEGY 3: DEADLINE DRIVEN
    if strategy == "deadline":
        if days_until_due < 0:
            return 200
        return max(1, 100 - days_until_due)

    # STRATEGY 4: SMART BALANCE (Default)
    # Urgency
    if days_until_due < 0:
        score += 120     # overdue
    elif days_until_due <= 2:
        score += 60
    elif days_until_due <= 7:
        score += 30

    # Importance
    score += importance * 7

    # Effort (quick wins)
    if estimated_hours <= 2:
        score += 15

    # Dependencies
    score += len(dependencies) * 5   # blocking tasks get priority

    return score
