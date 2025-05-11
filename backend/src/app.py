from flask import Flask, request, jsonify
from flask_cors import CORS

from llm_connect import LLM_Connect
from mongo import Mongo_connect

app = Flask(__name__)
CORS(app) 

_llm = LLM_Connect()
_mongo = Mongo_connect()

@app.route('/text', methods=['POST'])
def text():
    data = request.get_json()
    if not data or 'text' not in data or 'site' not in data:
        return jsonify({'error': 'Invalid data'}), 400
    
    site_key = data['site']
    tos_text = data['text']

    term_doc = _mongo.getTerms(site_key)
    if term_doc is None:
        term_doc = _llm.processText(tos_text)
        _mongo.putTerms(site_key, term_doc)

    print(f"Received data for site: {site_key}")

    return jsonify({'message': 'success', 'site': site_key, 'data': term_doc}), 200


@app.route('/putreview', methods=['POST'])
def putreview():
    data = request.get_json()
    if not data or 'review' not in data or 'site' not in data:
        return jsonify({'error': 'Invalid data'}), 400
    
    site_key = data['site']
    review_text = data['review']
    
    _mongo.putReviews(site_key, review_text)

    print(f"Received review for site: {site_key}")

    return jsonify({'message': 'success', 'site': site_key}), 200

@app.route('/getreviews', methods=['POST'])
def getreviews():
    data = request.get_json()
    if not data or 'site' not in data:
        return jsonify({'error': 'No site provided'}), 400
    
    site_key = data['site']
    
    reviews = _mongo.getReviews(site_key)

    reviews_list = list(reviews)

    print(f"getting reviews for site: {site_key}")

    return jsonify({'message': 'success', 'site': site_key, 'data': reviews_list}), 200

if __name__ == '__main__':
    app.run(debug=True)