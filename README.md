# Parla

An adaptable conversational companion for learning languages. Created for Hack the North 2023.

## Description

Parla is the AI chat bot that has a real, natural conversation with you in your language of choice. Choose a language and a topic, and let the conversation flow naturally. As language learners ourselves, we made it a priority for Parla to be of use to learners of varying skill levels. Thus, Parla will adapt to your skill level throughout the conversation, giving more thought provoking prompts the higher your proficiency. When the conversation is over, Parla will analyze your speech, notifying you of grammatical errors, and giving recommendations on how to improve individual responses as well as your overall conversational ability. Parla will also provide useful metrics including speech timing, and will gauge your confidence level. 

## Technologies

- React/Next.js for the frontend
- Flask/Python for the backend
- Cohere chat API for providing conversational responses
- Cohere generate API for providing recommendations
- Google cloud API for voice to text and text to speech, as well as translation
- LanguageTool API for detecting grammatical errors in speech

## Quickstart

1. Clone the project
2. `cd` into the api folder and execute `pip install -r requirements.txt`
3. Host the flask backend by calling `flask --app app run` in the same directory as `app.py`
4. `cd` into the ui folder and call `npm start`

## Authors

Bryan Kim, Jueun Kang, Dylan Cheng, Jeffrey Luo
