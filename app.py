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
    return render_template('index.html')

# 회원가입
@app.route('/signup', methods=['POST'])
def signup():
    #user_data = request.json
    #existing_user = db.users.find_one({'user_id': user_data['user_id']})
    # 회원 가입 로직 구현

    return jsonify({'message': 'User created successfully'}), 201

# 로그인
@app.route('/login', methods=['POST'])
def login():
    #user_data = request.json
    #user = db.users.find_one({'user_id': user_data['user_id']})

    # 로그인 로직 구현

    return jsonify({'access_token': None})

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