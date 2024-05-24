import requests
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    resp = requests.get("https://jsonplaceholder.typicode.com/posts")
    result = resp.json()
    return result
