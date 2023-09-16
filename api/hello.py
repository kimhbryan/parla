from flask import Flask, request
from dotenv import load_dotenv, find_dotenv
import os
import requests
import cohere
from google.cloud import speech
from google.cloud import translate_v2 as translate

load_dotenv(find_dotenv())
COHERE_API_KEY = os.environ.get("COHERE_API_KEY")
cohere = cohere.Client(COHERE_API_KEY)

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/chat/<topic>", methods=['POST'])
def chat(topic):
    if request.method == 'POST':
        message = request.form.get('message')
        message = f"The follwing input is from a chat about {topic}. Pretend that you are a human agreeing with the user about {topic}. Respond with an appropriate response based on the chat history and context." + message + "In short, the out put should be no longer 2 sentence long answer."
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


def transcribe_audio(file_path):
    client = speech.SpeechClient()

    with open(file_path, "rb") as f:
        content = f.read()

    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=44100,
        language_code=lang_code
    )

    response = client.recognize(config=config, audio=audio)

    transcript = "".join([result.alternatives[0].transcript for result in response.results]))

    return transcript


def translate_text(target_lang, text):
    client = translate.Client()

    text = text.decode("utf-8")

    result = client.translate(text, target_language=target_lang)

    return result["translatedText"]


if __name__ == '__main__':
    app.run()
