import json
import os
import openai
from dotenv import load_dotenv

class LLM:
    MODEL = 'gpt-4.1-mini'
    SYSTEM = 'You are an expert reading and analyzing terms of service documents.'
    
    def __init__(self):
        load_dotenv()
        self.API_KEY = os.environ.get('API_KEY')
        self.oai = openai.OpenAI(api_key=self.API_KEY)
        

    def _format(self, text):
        return ' '.join(text.split())

    def query(self, text, response):
        response = self.oai.beta.chat.completions.parse(
            model=self.MODEL,
            messages=[
                {
                    'role': 'system',
                    'content': self._format(self.SYSTEM)
                }, {
                    'role': 'user',
                    'content': self._format(text)
                }
            ],
            response_format=response
        )
        content = response.choices[0].message.content
        content = json.loads(content)
        return content