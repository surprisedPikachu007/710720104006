from fastapi import FastAPI
import requests

app = FastAPI()

url = "http://104.211.219.98/train/trains"
bearer = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODcxNTQxMDMsImNvbXBhbnlOYW1lIjoiNzEwNzIwMTA0MDA2IiwiY2xpZW50SUQiOiIyNWIwZDNjNC1hMGVjLTQzNmMtYTA2Zi1jNzMyYjFjYWMyZTkiLCJvd25lck5hbWUiOiIiLCJvd25lckVtYWlsIjoiIiwicm9sbE5vIjoiNzEwNzIwMTA0MDA2In0.Xy8ipErt-zEEobc9sJluji0B-HNxZppxBypAjbuPMdY"
headers = {"Authorization": "Bearer " + bearer}

@app.get("/")
def getTrains():
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "failed"}
    
@app.get("/{trainId}")
def getTrain(trainId: str):
    response = requests.get(url + "/" + trainId, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "failed"}
    