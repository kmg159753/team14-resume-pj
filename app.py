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

        # print("token:" + access_token)

        return jsonify({'message': '로그인에 성공했습니다.','result': 'success' ,'token': access_token})
    
    
    else: 
        return jsonify({'message': '존재하지 않는 아이디이거나 비밀번호가 틀립니다.','result': 'fail'})
        

@app.route('/call_main')
def after_login():
    token_receive = request.cookies.get('mytoken')

    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        return render_template('main.html')     

    except jwt.ExpiredSignatureError:
        return redirect("/call_login")  
    except jwt.exceptions.DecodeError:
        return redirect("/call_login")    
    
@app.route('/call_login')
def call_login():  
    return render_template('login.html')

@app.route('/call_register')
def call_register():  
    return render_template('register.html')

@app.route('/call_write')
def call_write_resume():
    token_receive = request.cookies.get('mytoken')

    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        return render_template('write_resume.html')    

    except jwt.ExpiredSignatureError:
        return redirect("/call_login")  
    except jwt.exceptions.DecodeError:
        return redirect("/call_login")      
    

@app.route("/api/resume", methods=["POST"])
def resume_post():
    name_receive = request.form['name_give']
    contacts_receive = request.form['contacts_give']
    email_receive = request.form['email_give']
    desired_position_receive = request.form['desired_position_give']     
    desired_role_receive = request.form['desired_role_give']
    desired_work_exp_receive = request.form['desired_work_exp_give']
    desired_maj_skill_receive = request.form['desired_maj_skill_give']
    junior_senior_receive = request.form['junior_senior_give']
    last_school_name_receive = request.form['last_school_name_give']  
    last_comp_stat_receive = request.form['last_comp_stat_give']
    last_major_receive = request.form['last_major_give'] 
    

    token_receive = request.cookies.get('mytoken')

    # # 현재 최대 ID 값 확인
    # current_max_id = db.resumes.find_one(sort=[("resume_id", -1)])

    # # 현재 최대 ID 값이 없는 경우 초기값 1 설정
    # if current_max_id is None:
    #     next_id = 1
    # else:
    #     next_id = current_max_id['resume_id'] + 1

    if len(list(db.resumes.find({}, {'_id': False}))) == 0:
        idnum = 1
    else:
        idnum = db.resumes.find_one(sort=[("resume_id", -1)])["resume_id"] + 1   
        

    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        
        resume = {
            'user_id': payload['id'],
            'resume_id': idnum,
            'name': name_receive,
            'contacts': contacts_receive,
            'email': email_receive,
            'jikgun' : desired_position_receive,
            'jikmu' : desired_role_receive,
            'career' : desired_work_exp_receive,
            'skill' : desired_maj_skill_receive,
            'jors'  : junior_senior_receive,
            'school' : last_school_name_receive,
            'state' : last_comp_stat_receive,
            'major' :  last_major_receive,
        }
        db.resumes.insert_one(resume)
        return jsonify({'message':'저장완료'})      

    except jwt.ExpiredSignatureError:
        return redirect("/call_login")  
    except jwt.exceptions.DecodeError:
        return redirect("/call_login")  
    
@app.route("/api/resume", methods=["GET"])
def resume_get():
    token_receive = request.cookies.get('mytoken')   

    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])        
        resume = db.resumes.find_one({'user_id': payload['id'], 'resume_id': 5})
        
        resume['_id'] = str(resume['_id'])

        return jsonify({'result': resume })      

    except jwt.ExpiredSignatureError:
        return redirect("/call_login")  
    except jwt.exceptions.DecodeError:
        return redirect("/call_login")   
    
# 값 받아오기
@app.route("/main/resume", methods=["GET"])
def resume_list_get():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        resume = list(db.resumes.find({'user_id': payload['id']},{'_id':False}))
        return jsonify({'result': resume})              
    except jwt.ExpiredSignatureError:
       return redirect("/call_login")  
    except jwt.exceptions.DecodeError:
       return redirect("/call_login")  

#조회 페이지이동
@app.route('/resumes/<int:idnum>')
def search_page(idnum):
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        return render_template('view_resume.html')              
    except jwt.ExpiredSignatureError:
        return redirect("/call_login")  
    except jwt.exceptions.DecodeError:
        return redirect("/call_login")  
    
@app.route('/resume_show/<int:idnum>')
def sda(idnum):
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])

        print("idnum::::: " + str(idnum))
        resume = db.resumes.find_one({'user_id': payload['id'], 'resume_id': idnum})
        print("resume : " + resume['name'])
        resume['_id'] = str(resume['_id'])
        return jsonify({'result': resume })              
    except jwt.ExpiredSignatureError:
       return redirect("/call_login")  
    except jwt.exceptions.DecodeError:
        return redirect("/call_login")       
    
@app.route('/api/resume/delete/<int:pnum>', methods=['DELETE'])
def resume_delete(pnum):
    print('남바: ' + str(pnum))
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        db.resumes.delete_one({'user_id': payload['id'],'resume_id':pnum})
        return jsonify({'msg': '삭제 완료!'})                      
    except jwt.ExpiredSignatureError:
        return redirect("/call_login")  
    except jwt.exceptions.DecodeError:
        return redirect("/call_login")  
       
                 
    

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)