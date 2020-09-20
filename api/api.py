import time
from flask import Flask, jsonify, request
from firebase_admin import credentials, initialize_app, db
import json

app = Flask(__name__)

# Initialize Firestore DB
cred = credentials.Certificate(('key.json'))
initialize_app(cred, {'databaseURL' : "https://airborne-hackmit.firebaseio.com/"})
ref = db.reference('forms')

@app.route('/')
def get_home():
    return jsonify({'hello': "hello sophia and yecheng"})

@app.route('/time')
def get_current_time():
    return jsonify({'time': time.time()})

@app.route('/add', methods=['POST'])
def create():
    """
        create() : Add a form in request argument "json" to Realtime DB
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    try:
        print(f'request received with arguments {request.args}')
        form = json.loads(request.args.get('json'))
        ref.push(form)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/list', methods=['GET'])
def read():
    """
        read() : Fetches forms from Realtime DB in JSON
    """
    try:
        print(f'request received with arguments {request.args}')
        firebase_result = ref.get()
        query = json.loads(request.args.get('query'))
        forms = firebase_result.values()
        print(f'forms received from firebase {forms}')
        queried_forms = {"queried_forms": list(query_forms(forms, query))}
        print(f'queried forms {queried_forms}')
        return jsonify(queried_forms), 200
    except Exception as e:
        print(f"An Error Occurred: {e}")
        return f"An Error Occurred: {e}"


def query_forms(forms, query):
    """
        query_forms(forms, query) : queries form based on the query parameters
        forms : list of form objects, where a form is a dictionary mapping string to string
        query : a dictionary mapping string to string or "any" if it the query parameter is over all values
    """
    queried_forms = forms
    for query_param in query:
        query_value = query[query_param].lower()
        if query_value == "any": continue
        queried_forms = [form for form in queried_forms if form[query_param].lower() == query_value]
    return queried_forms




            

