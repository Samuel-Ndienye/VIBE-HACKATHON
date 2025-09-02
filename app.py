from flask import Flask, request, jsonify
import requests
import mysql.connector
from datetime import datetime

app = Flask(__name__)

# Hugging Face API configuration
HF_API_KEY = 'your_hugging_face_api_key_here'  # Replace with actual key
HF_MODEL = 'cardiffnlp/twitter-roberta-base-sentiment'

# MySQL configuration
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'your_password_here',  # Replace with actual password
    'database': 'mood_journal'
}

def get_db_connection():
    return mysql.connector.connect(**DB_CONFIG)

def analyze_sentiment(text):
    url = f"https://api-inference.huggingface.co/models/{HF_MODEL}"
    headers = {"Authorization": f"Bearer {HF_API_KEY}"}
    payload = {"inputs": text}
    
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        result = response.json()
        # Assuming the model returns sentiment labels and scores
        # This is a simplified example; adjust based on actual model output
        sentiment = result[0][0]['label']  # e.g., 'LABEL_0' for negative, etc.
        score = result[0][0]['score']
        return sentiment, score
    else:
        return 'neutral', 0.5  # Default if API fails

@app.route('/submit_entry', methods=['POST'])
def submit_entry():
    data = request.json
    text = data.get('text')
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    sentiment, score = analyze_sentiment(text)
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO entries (text, sentiment, score, timestamp) VALUES (%s, %s, %s, %s)",
        (text, sentiment, score, datetime.now())
    )
    conn.commit()
    cursor.close()
    conn.close()
    
    return jsonify({'message': 'Entry saved', 'sentiment': sentiment, 'score': score})

@app.route('/entries', methods=['GET'])
def get_entries():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM entries ORDER BY timestamp DESC")
    entries = cursor.fetchall()
    cursor.close()
    conn.close()
    
    return jsonify(entries)

if __name__ == '__main__':
    app.run(debug=True)
