import requests

def getToken():
    companyName = "710720104006"
    clientID = "25b0d3c4-a0ec-436c-a06f-c732b1cac2e9"
    ownerName = "owner"
    rollNo = "710720104006"
    ownerEmail = "arvind7447@gmail.com"
    clientSecret = "aNvhHLITWJcJKzJs"
    url = "http://104.211.219.98/train/auth"

    headers = {"Content-Type": "application/json"}

    response = requests.post(url, json={"companyName": companyName, "clientID": clientID, "ownerName": ownerName, "rollNo": rollNo, "ownerEmail": ownerEmail, "clientSecret": clientSecret}, headers=headers)

    if response.status_code == 200:
        return response.json()['access_token']
        