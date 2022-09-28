from flask import Flask,request, render_template, redirect, make_response, jsonify, send_file
import json
from shuffleprocess import *
from automateprocess import *
import re
import os
import time
from flask_wtf import FlaskForm, RecaptchaField
from wtforms import SubmitField, StringField
from wtforms.validators import InputRequired, Length, Email
from wtforms.fields.html5 import EmailField

app =Flask(__name__)
app.config['SECRET_KEY'] = '001'


base_path = '{}/data/'.format(os.getcwd())

def remove_files(dir_path, n):
    all_files = os.listdir(dir_path)
    now = time.time()
    n_days = n * 60
    for f in all_files:
        file_path = os.path.join(dir_path, f)
        if not os.path.isfile(file_path):
            continue
        if os.stat(file_path).st_mtime < now - n_days:
            os.remove(file_path)
            # print("Deleted ", f)


class LoginForm(FlaskForm):
	username = StringField('Enter Your Email', validators=[InputRequired('Input Required!'),Email(),Length(min=5,max=50, message='Length should be between 5 to 50 characters.')])
	recaptcha = RecaptchaField()



@app.route('/', methods=['GET','POST'])
def application():
	return render_template('index.html')




@app.route('/shuffle',methods=['POST'])
def shuffleNew():
	data1=request.get_json()		
	responseData = shufflers(data1)
	res = make_response(responseData,200)
	return res


@app.route('/automate',methods=['POST'])
def automatenew():
	
	data1=request.get_json()		
	
	responseData = automater(data1)#this returns a file djajfhkldfh.dxf
	responseData2 = '{}/{}'.format(base_path,responseData)
	remove_files(base_path, 3)# 3 is minutes
	return send_file(responseData2, mimetype='text/csv', cache_timeout=0)

@app.route('/gallery')
def gallery():
	return render_template('gallery.html')




if __name__ == '__main__':
	app.run(debug=True)
