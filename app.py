from flask import Flask, render_template, request, redirect, jsonify
# from flask_pymongo import PyMongo
from pymongo import MongoClient
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
client = MongoClient('mongodb+srv://sparta:test@cluster0.clljnvr.mongodb.net/?retryWrites=true&w=majority') #각자의 DBURL
db = client.dbsparta

jwt = JWTManager(app)

# 메인 페이지
@app.route('/')
def index():
    return render_template('register.html')

# 회원가입
@app.route('/signup', methods=['POST'])
def signup():

    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']

    existing_user = db.users.find_one({'user_id': id_receive})

    if existing_user is not None :
        return jsonify({'message': '이미 존재하는 아이디입니다.'})

    hashed_password = generate_password_hash(pw_receive)

    user = {
        'user_id': id_receive,
        'user_password': hashed_password
    }
    db.users.insert_one(user)

    return jsonify({'message': '회원가입에 성공했습니다.'})

# 로그인
@app.route('/login', methods=['POST'])
def login():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']

    user = db.users.find_one({'user_id': id_receive})

    if not user or not check_password_hash(user['user_password'], pw_receive):
        print(user['user_password'] + "    " + pw_receive)
        return jsonify({'message': '존재하지 않는 아이디이거나 비밀번호가 틀립니다.'})

    access_token = create_access_token(identity=user['user_id'])

    return jsonify({'access_token': access_token})

# 이력서 작성
@app.route('/resume', methods=['POST'])
@jwt_required()
def create_resume():
    #이력서 작성기능 구현 

    return jsonify({'message': 'Resume created successfully'})

# 이력서 조회
@app.route('/resume/<resume_id>', methods=['GET'])
@jwt_required()
def view_resume(resume_id):
    #이력서 조회 기능 구현 

    return jsonify(None), 200

# 이력서 수정
@app.route('/resume/<resume_id>', methods=['PUT'])
@jwt_required()
def update_resume(resume_id):
    # user_id = get_jwt_identity()
    # resume_data = request.json


    return jsonify({'message': 'Resume updated successfully'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)