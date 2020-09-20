import random
import requests
from datetime import date, timedelta
import json

cities = ["Boston", "New York", "Seattle"]
date_delta = [i for i in range(-30, 0)]
times = ["Early morning", "Morning", "Midday", "Early afternoon", "Late afternoon", "Evening", "Late night"]
airlines = ["Delta", "Southwest", "JetBlue", "Alaska", "American", "United", "Spirit"]


def make_random_submission(departure, arrival):
    submission = {}
    submission["airline"] = airlines[random.randrange(len(airlines))]
    submission["time"] = times[random.randrange(len(times))]
    submission["safety"] = str(random.randrange(40, 80))
    submission["crowded"] = str(random.randrange(20, 60))
    submission["departure"] = departure
    submission["arrival"] = arrival
    submission["comments"] = ""
    submission["date"] = (date.today() + timedelta(days=date_delta[random.randrange(len(date_delta))])).isoformat()

    json_submission = json.dumps(submission)
    print(json_submission)
    url = "http://localhost:5000/add?json=" + json_submission
    response = requests.post(url)
    print(url)
    print(response)

for i in range(2):
    make_random_submission("Seattle", "Boston")
    make_random_submission("Seattle", "New York")
    make_random_submission("New York", "Boston")
    make_random_submission("New York", "Seattle")
    make_random_submission("Boston", "Seattle")
    make_random_submission("Boston", "New York")
for i in range(1):
    make_random_submission("El Paso", "New York")