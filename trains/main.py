from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import datetime
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

url = "http://104.211.219.98/train/trains"
bearer = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODcxNjEzNzYsImNvbXBhbnlOYW1lIjoiNzEwNzIwMTA0MDA2IiwiY2xpZW50SUQiOiIyNWIwZDNjNC1hMGVjLTQzNmMtYTA2Zi1jNzMyYjFjYWMyZTkiLCJvd25lck5hbWUiOiIiLCJvd25lckVtYWlsIjoiIiwicm9sbE5vIjoiNzEwNzIwMTA0MDA2In0.vYdOyAnp9696E22waPLNenm9jWYmUZliqPERyv6MxAQ"
headers = {"Authorization": "Bearer " + bearer}


def timeFilter(trains):
    time = datetime.datetime.now()
    
    l = []
    
    for train in trains:
        trainDepartureTime = train['departureTime']
        trainTime = [int(trainDepartureTime['Hours']), int(trainDepartureTime['Minutes']), int(trainDepartureTime['Seconds']), int(train['delayedBy'])]
        
        trainSeconds = trainTime[0] * 3600 + trainTime[1] * 60 + trainTime[3] * 60 + trainTime[2]
        nowSeconds = int(time.hour) * 3600 + int(time.minute) * 60 + int(time.second)
        diff = trainSeconds - nowSeconds
        
        if diff <= 12 * 3600 and diff >= 1800:
            l.append(train)
        
    return l
    
def sortTrains(trains):
    sorted_trains = sorted(trains, key=lambda train: (train['price']['sleeper'], train['seatsAvailable']['sleeper'], -(train['departureTime']['Hours'] * 3600 + train['departureTime']['Minutes'] * 60 + train['departureTime']['Seconds'] + train['delayedBy'] * 60)))
    return sorted_trains
    
    
@app.get("/")
def getTrains():
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        return {"error": "failed"}
    
    trains = response.json()
    trains = timeFilter(trains)
    trains = sortTrains(trains)
    
    return trains
    
    
@app.get("/{trainId}")
def getTrain(trainId: str):
    response = requests.get(url + "/" + trainId, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "failed"}
    