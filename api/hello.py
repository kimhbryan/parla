from flask import Flask, request
from dotenv import load_dotenv, find_dotenv
import os
import requests
import cohere

load_dotenv(find_dotenv())
COHERE_API_KEY = os.environ.get("COHERE_API_KEY")
cohere = cohere.Client(COHERE_API_KEY)

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/chat", methods=['POST'])
def chat():
    if request.method == 'POST':
        message = request.form.get('message')
        chat_history = request.form.get('chat_history', [])
        response = cohere.chat(
            message=message,
            chat_history=chat_history,
            model="command-nightly"

        )

        answer = response.text
        return answer

@app.route("/analyzetext")
def analyzetext():
    url = "https://api.languagetoolplus.com/v2/check"
    params = {
        "text": "J'aime les baguettes mais je n'aime pas las filles",
        "language": "fr",
        }
    res = requests.post(url=url, params=params)

    return res.json()

if __name__ == '__main__':
    app.run()


