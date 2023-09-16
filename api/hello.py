from flask import Flask, request
from dotenv import load_dotenv, find_dotenv
import os
import requests
import cohere
import json
from google.cloud import speech
from google.cloud import translate_v2 as translate

load_dotenv(find_dotenv())
COHERE_API_KEY = os.environ.get("COHERE_API_KEY")
cohere = cohere.Client(COHERE_API_KEY)

app = Flask(__name__)

UPLOAD_FOLDER = "./"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/chat/<topic>", methods=['POST'])
def chat(topic):
    if request.method == 'POST':
        message = request.form.get('message')
        message = f"The follwing input is from a chat about {topic}. Pretend that you are a human agreeing with the user about {topic}. Respond with an appropriate response based on the chat history and context." + \
            message + "In short, the out put should be no longer 2 sentence long answer."
        chat_history = request.form.get('chat_history', [])
        response = cohere.chat(
            message=message,
            chat_history=chat_history,
            model="command-nightly"

        )

        answer = response.text
        return answer


@app.route("/transcribe", methods=['POST'])
def transcribe_audio():
    if request.method == 'POST':
        f = request.form['audio']
        client = speech.SpeechClient()
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], "tmp.wav"))
        with open("tmp.wav", rb) as a:
            content = a.read()

        audio = speech.RecognitionAudio(content=content)
        config = speech.RecognitionConfig(
            # encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            # sample_rate_hertz=44100,
            language_code="en-CA"
        )

        response = client.recognize(config=config, audio=audio)

        transcript = "".join(
            [result.alternatives[0].transcript for result in response.results])

        return transcript


@app.route("/translate", methods=["POST"])
def translate_text():
    if request.method == "POST":
        text = request.args.get("text")
        target = request.args.get("target")

        client = translate.Client()
        result = client.translate(text, target_language=target)

        return result["translatedText"]


@app.route("/generate")
def generate(context: str, subject: str) -> str:
    """ Calls cohere's generation feature with a strict context-subject format

    Parameters
    context: The context in which the AI should generate a response
    subject: The actual subject that the AI is considering

    Returns:
    The generated response from cohere in string format
    """
    prompt = context + " " + subject
    response = cohere.generate(
        prompt,
        model="command",
        max_tokens=200
    )

    generated = ""

    for gen in response.generations:
        generated += gen.text

    return generated


@app.route("/analyze")
def analyzetext(text: str, lang: str) -> (bool, str):
    """ Calls languagetoolplus's API to detect grammar errors

    Parameters
    text: The text that should be analyzed
    lang: the language of the text

    Returns:
    A tuple (bool, err) where the first value represents the existence
    of an error, and the second describes it if it exists
    """
    url = "https://api.languagetoolplus.com/v2/check"
    params = {
        "text": text,
        "language": lang,
    }
    res = requests.post(url=url, params=params)

    grammar_err = False
    err_desc = ""
    if len(res.json()["matches"]) > 0:
        grammar_err = True
        for err in res.json()["matches"]:
            err_desc += err["message"]

    return (grammar_err, err_desc)


@app.route("/feedback")
def feedback(user_transcript=[], lang="en") -> json:
    """Generates feedback for the user based on the transcript of the conversation

    Parameters
    user_transcript: An array consisting of each paragraph the user has spoken
    lang: The language that the user has spoken

    Returns:
    A json dict with recommendations for each erroneous paragraph with the index as the key,
    as well as an overall recommendation corresponding to the key "overall"
    """
    context = "Give a correct version of the following grammatically incorrect paragraph:"
    recommendations = dict()
    comments = ""

    # add recommendations for specific sections
    for id, seq in enumerate(user_transcript):
        err = analyzetext(seq, lang)
        if err[0]:
            recommendations[id] = generate(context, seq)
            comments += err[1]

    # add overall recommendation
    context = "Give an short summarized overall recommendation only for a person in order to improve their speaking based on the following obervations about a person's speaking:"

    if len(recommendations) >= 1:
        overall_rec = generate(context, comments)
        recommendations["overall"] = overall_rec

    return json.dumps(recommendations)


if __name__ == '__main__':
    app.run()
