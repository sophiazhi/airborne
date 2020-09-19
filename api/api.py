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
        return f"An Error Occured: {e}"


@app.route('/list', methods=['GET'])
def read():
    """
        read() : Fetches forms from Realtime DB in JSON
    """
    try:
        forms = ref.get()
        print(f'forms received from firebase {forms}')
        return jsonify(forms), 200
    except Exception as e:
        return f"An Error Occured: {e}"

