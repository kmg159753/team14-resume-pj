from flask import Flask, render_template, request, redirect, jsonify
# from flask_pymongo import PyMongo
from pymongo import MongoClient
# from flask_jwt_extended import JWTManager, jwt_required, create_access_token
# from werkzeug.security import generate_password_hash, check_password_hash
# from datetime import timedelta
# from flask_jwt_extended import get_jwt_identity,verify_jwt_in_request
# import datetime

import hashlib
import datetime
import jwt

app = Flask(__name__)
# app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
# app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

SECRET_KEY = "XJDKLSDJSKLDJASDNJSLK3123DJNKLDJAA1231"


client = MongoClient('mongodb+srv://sparta:test@cluster0.clljnvr.mongodb.net/?retryWrites=true&w=majority') #각자의 DBURL
db = client.dbsparta

# jwt = JWTManager(app)

# 메인 페이지
@app.route('/')
def index():
    return render_template('login.html')

# 회원가입
@app.route('/signup', methods=['POST'])
def signup():

    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']

    existing_user = db.users.find_one({'user_id': id_receive})

    if existing_user is not None :
        return jsonify({'message': '이미 존재하는 아이디입니다.'})

    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    user = {
        'user_id': id_receive,
        'user_password': pw_hash
    }
    db.users.insert_one(user)

    return jsonify({'message': '회원가입에 성공했습니다.'})

# 로그인
@app.route('/login', methods=['POST'])
def login():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']    

    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    user = db.users.find_one({'user_id': id_receive,'user_password':pw_hash})

    if user is not None:
        payload = {
            'id': id_receive,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=300)    #언제까지 유효한지
        }

        access_token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        print("token:" + access_token)

        return jsonify({'message': '로그인에 성공했습니다.','result': 'success' ,'token': access_token})
         
    
    
    else: 
        return jsonify({'message': '존재하지 않는 아이디이거나 비밀번호가 틀립니다.','result': 'fail'})
        

@app.route('/call_resume')
def after_login():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        print(payload)
        return render_template('resume.html')
    
    except jwt.ExpiredSignatureError:
        return redirect("login.html")
    except jwt.exceptions.DecodeError:
        return redirect("login.html")   
    
   
if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)