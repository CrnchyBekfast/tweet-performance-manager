import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY environment variable is required")
genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel('gemini-2.0-flash')

def generate(company, tweet_type="general", message="Something awesome!", topic="innovation"):
    
    prompt = f"Return just a tweet in positively less than 280 characters, for the company {company}, of type {tweet_type}, with the message properly getting across: {message} on broadly the topic of: {topic}. The tweet should be engaging and suitable for social media. Be creative in inserting what the company may be doing or announcing or working on, make up products if needed. Just respond with a single tweet, no Okay here's the tweet, no multiple version, just the tweet text"

    response = model.generate_content(prompt)
    return response.text.strip()