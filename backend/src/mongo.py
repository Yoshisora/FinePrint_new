from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

class Mongo_connect:
    
    def __init__(self):
        load_dotenv()
        self.uri = os.environ.get('MONGO_URI')
        self.client = MongoClient(self.uri, server_api=ServerApi('1'))
        try:
            self.client.admin.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")
            self.db = self.client["FinePrint"]
            self.terms = self.db["terms"]
            self.reviews = self.db["reviews"]
        except Exception as e:
            print(e)

    def getTerms(self, key):
        doc = self.terms.find_one({"site_key": key})
        return doc

    def putTerms(self, key, data):
        doc = {
            "site_key": key,
            "data": data
        }
        result = self.terms.insert_one(doc)

    def getReviews(self, key):
        doc = self.reviews.find({"site_key": key})
        return doc

    def putReviews(self, key, data):
        doc = {
            "site_key": key,
            "data": data
        }
        result = self.reviews.insert_one(doc)
