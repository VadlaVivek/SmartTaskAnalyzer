import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .scoring import calculate_task_score


@csrf_exempt
def analyze_tasks(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=400)

    try:
        body = json.loads(request.body)
    except:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    tasks = body.get("tasks", body)   # supports raw array input
    strategy = body.get("strategy", "smart")

    scored = []
    for t in tasks:
        score = calculate_task_score(t, strategy)
        t["score"] = score
        scored.append(t)

    scored = sorted(scored, key=lambda x: x["score"], reverse=True)
    return JsonResponse(scored, safe=False)


@csrf_exempt
def suggest_tasks(request):
    """Return top 3 tasks with explanation"""
    if request.method != "GET":
        return JsonResponse({"error": "GET required"}, status=400)

    # Normally you'd query DB, but assignment requires analyzing input
    return JsonResponse({
        "message": "Send tasks via POST to /analyze/ to compute suggestions."
    })
