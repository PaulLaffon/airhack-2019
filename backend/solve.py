"""
Code written for the AirHack 2019 

This code is to be deployed on AWS Lambda to be used as an API
Use the test.py script to test this code in local
"""


import json
from math import radians, cos, sin, asin, sqrt
from botocore.vendored import requests

def lambda_handler(event):
    #print(event["body"])
    body = json.loads(event["body"])

    # Times into secondes
    for index, task in enumerate(body["tasks"]):
        dueTime = task["dueTime"].split(":")

        hours   = int(dueTime[0])
        minutes = int(dueTime[1])

        secondes = (hours * 3600) + (minutes * 60)
        body["tasks"][index]["dueTimeSec"] = secondes

    result = solve(body)
    #print(result)

    with open('out1.json', 'w') as json_file:
        json.dump(result, json_file)

    submit(result)


def solve(body):
    found = 0
    TIME_FOR_TASK = 30 * 60

    # (lat, lon, time)
    welcomers = [None] * body["taskersCount"]
    tasks     = body["tasks"]

    sorted_tasks = sorted(tasks, key = lambda task: task["dueTimeSec"])
    assignees = []
    total_travel = 0

    for task in sorted_tasks:
        best_welcomer = None
        best_heuristic = 1e9
        time_delta = 1e9
        best_travel = 0

        # Get the best welcomer for the task
        for index, welcomer in enumerate(welcomers):
            if welcomer == None: 
                best_welcomer = index
                time_delta    = 0
                break

            travel = travel_time(welcomer[0], welcomer[1], task["lat"], task["lng"])
            curr_delta = welcomer[2] + travel

            heuristic = -curr_delta + 100 * travel
            if curr_delta < task["dueTimeSec"] and heuristic < best_heuristic: # and curr_delta > time_delta:
                time_delta     = curr_delta
                best_heuristic = heuristic
                best_welcomer = index
                best_travel += travel / 3600.0 * 10.0

        time_delta = int(time_delta+2)

        # No able to make it in time
        if time_delta > task["dueTimeSec"] or best_welcomer is None:
            assignees.append(None)
        else:
            found += 1
            assignees.append(best_welcomer)
            welcomers[best_welcomer] = (
                task["lat"],
                task["lng"],
                task["dueTimeSec"] + TIME_FOR_TASK
            )
            total_travel += best_travel

    for index, task in enumerate(sorted_tasks):
        sorted_tasks[index]["assignee_id"] = assignees[index]

    result = {
        "batchId": body["batchId"],
        "taskersCount": body["taskersCount"],
        "tasksCount": body["tasksCount"],
        "tasks": []
    }

    for task in sorted_tasks:
        curr = {
            "dueTime": task["dueTime"],
            "lat": task["lat"],
            "lng": task["lng"],
            "assignee_id": task["assignee_id"],
            "id": task["id"]
        }

        result["tasks"].append(curr)

    print(total_travel)
    print(found / float(len(tasks)) * 100.0)

    return result


def travel_time(lat1, lon1, lat2, lon2):
    welcomer_speed = 10.0
    dist = haversine(lat1, lon1, lat2, lon2)

    return dist / welcomer_speed * 3600.0

# Haversine distance between lat/lon
# https://stackoverflow.com/questions/4913349/haversine-formula-in-python-bearing-and-distance-between-two-gps-points
def haversine(lat1, lon1, lat2, lon2):

    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    # haversine formula 
    dlon = lon2 - lon1 
    dlat = lat2 - lat1 
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a)) 
    r = 6371 # Radius of earth in kilometers. Use 3956 for miles
    return c * r


def submit(body):
    URL_SUBMIT = "http://airhack-api.herokuapp.com/api/submitTasks"
    TOKEN = "e289KU8QR7sHHeRSXGANRonFaEaSGfSvMCPjtylSEXUOzXSZdnza1r69IsqK"
    header = {'Authorization': 'Bearer ' + TOKEN}

    response = requests.post(URL_SUBMIT, json=body, headers=header)
    print(response)
    print(response.text)