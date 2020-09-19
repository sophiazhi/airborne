import time
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def get_home():
    return jsonify({'hello': "hello sophia and yecheng"})

@app.route('/time')
def get_current_time():
    return jsonify({'time': time.time()})

