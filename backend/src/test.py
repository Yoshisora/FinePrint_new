
from llm_connect import LLM_Connect
from mongo import Mongo_connect

llm = LLM_Connect()
mongo = Mongo_connect()

with open("test.txt", 'r', encoding='utf-8') as f:
    text = f.read()
out = llm.processText(text)
for item in out.items():
    print (item)

# reviews = mongo.getReviews("testsite")
# print(list(reviews))
# for review in reviews:
#     print (review)


# doc = mongo.getTerms("testsite")
# if doc is None:
#     mongo.putTerms("testsite", out)
#     doc = mongo.getTerms("testsite")
# print(doc)

