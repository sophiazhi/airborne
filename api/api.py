import time
from flask import Flask, jsonify, request
from firebase_admin import credentials, initialize_app, db
import json
from datetime import date

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
        print(f'request received with arguments {request.args}')
        firebase_result = ref.get()
        query = json.loads(request.args.get('query'))
        forms = firebase_result.values()
        print(f'forms received from firebase {forms}')
        if (query["date"].lower() == "" or query["date"].lower() == "any"): 
            queried_forms = {"queried_forms": list(query_forms(forms, query))}
        else:
            date_forms, dow_forms = query_forms_with_date(forms, query)
            queried_forms = {"close_date_forms": list(date_forms), "same_weekday_forms": list(dow_forms)}
        print(f'queried forms {queried_forms}')
        return jsonify(queried_forms), 200
    except Exception as e:
        print(f"An Error Occured: {e}")
        return f"An Error Occured: {e}"


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
        if query_param == "date": continue
        queried_forms = [form for form in queried_forms if form[query_param].lower() == query_value]
    return queried_forms

def query_forms_with_date(forms, query):
    """
        query_forms(forms, query) : queries form based on the query parameters
        forms : list of form objects, where a form is a dictionary mapping string to string
        query : a dictionary mapping string to string or "any" if it the query parameter is over all values
    """
    queried_forms = forms
    for query_param in query:
        query_value = query[query_param].lower()
        if query_value == "any": continue
        if query_param == "date": continue
        queried_forms = [form for form in queried_forms if form[query_param].lower() == query_value]

    date_forms = []
    dow_forms = []
    for form in queried_forms:
        query_date = date.fromisoformat(query["date"])
        query_day_of_week = query_date.weekday()
        form_date = date.fromisoformat(form["date"])
        form_day_of_week = form_date.weekday()

        if abs((query_date - form_date).days) < 7:
            date_forms.append(form)
        elif query_day_of_week == form_day_of_week:
            dow_forms.append(form)
    return (date_forms, dow_forms)



            

