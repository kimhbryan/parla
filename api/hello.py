from flask import Flask
from dotenv import load_dotenv, find_dotenv
import os
import cohere

load_dotenv(find_dotenv())
COHERE_API_KEY = os.environ.get("COHERE_API_KEY")
cohere = cohere.Client(COHERE_API_KEY)

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/chat")
def chat():
    message = "hi"
    response = cohere.chat(
        message,
        model="command",
        temperature=0.9
    )

    answer = response.text



