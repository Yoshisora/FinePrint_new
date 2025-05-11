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
    print("/text called")
    data = request.get_json()
    print(data)
    if not data or 'text' not in data or 'site' not in data:
        return jsonify({'error': 'Invalid data'}), 400
    
    site_key = data['site']
    tos_text = data['text']

    if not site_key or not tos_text:
        return jsonify({'error': 'Empty site or text'}), 400

    term_doc_obj = _mongo.getTerms(site_key)
    if term_doc_obj is None:
        term_doc = _llm.processText(tos_text)
        _mongo.putTerms(site_key, term_doc)
    else:
        term_doc = term_doc_obj['data']

    print(f"Received data for site: {site_key}")

    return jsonify({'message': 'success', 'site': site_key, 'data': term_doc}), 200


@app.route('/putreview', methods=['POST'])
def putreview():
    data = request.get_json()
    if not data or 'review' not in data or 'site' not in data:
        return jsonify({'error': 'Invalid data'}), 400
    
    site_key = data['site']
    review_text = data['review']
    
    if not site_key or not review_text:
        return jsonify({'error': 'Empty site or text'}), 400
    
    _mongo.putReviews(site_key, review_text)

    print(f"Received review for site: {site_key}")

    return jsonify({'message': 'success', 'site': site_key}), 200

@app.route('/getreviews', methods=['POST'])
def getreviews():
    data = request.get_json()
    if not data or 'site' not in data:
        return jsonify({'error': 'No site provided'}), 400
    
    site_key = data['site']

    if not site_key:
        return jsonify({'error': 'Empty site'}), 400
    
    reviews = _mongo.getReviews(site_key)

    reviews_list = [item['data'] for item in reviews]

    print(f"getting reviews for site: {site_key}")

    return jsonify({'message': 'success', 'site': site_key, 'data': reviews_list}), 200

if __name__ == '__main__':
    app.run(debug=True)