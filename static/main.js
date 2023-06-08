
$(document).ready(function () {
  show_info();
});

function show_info() {
  
  fetch('/api/resume').then((res) => res.json()).then((data) => {
       
      
      let row = data['result']

      var selectedjikgunText;
      switch (row['jikgun']) {
        case '1':
          selectedjikgunText = '개발';
          break;
        case '2':
          selectedjikgunText = '기획';
          break;
        case '3':
          selectedjikgunText = '마케팅';
          break;
        case '4':
          selectedjikgunText = '디자인';
          break;
        case '5':
          selectedjikgunText = '경영,인사,운영';
          break;
        case '6':
          selectedjikgunText = '기타';
          break;        
        default:
          selectedjikgunText = '-- 선택하기 --';
      }

      var selectedjikmuText;
      switch (row['jikmu']) {
        case '1':
          selectedjikmuText = '프론트엔드 개발자';
          break;
        case '2':
          selectedjikmuText = '서버/백앤드 개발자';
          break;
        case '3':
          selectedjikmuText = '웹 풀스택 개발자';
          break;
        case '4':
          selectedjikmuText = '앱 개발자';
          break;
        case '5':
          selectedjikmuText = '머신러닝/인공지능 개발자';
          break;
        case '6':
          selectedjikmuText = '게임 개발자';
          break;
        case '7':
          selectedjikmuText = '기타';
          break;
        default:
          selectedjikmuText = '-- 선택하기 --';
      }
      
      var selectedcareerText;
      switch (row['career']) {
        case '1':
          selectedcareerText = '졸업';
          break;
        case '2':
          selectedcareerText = '1년차';
          break;
        case '3':
          selectedcareerText = '2년차';
          break;
        case '4':
          selectedcareerText = '3년차';
          break;
        case '5':
          selectedcareerText = '4년차';
          break;
        case '6':
          selectedcareerText = '5년차';
          break;
        case '7':
          selectedcareerText = '6년차';
          break;
        case '8':
          selectedcareerText = '7년차 이상';
          break;  
        default:
          selectedcareerText = '-- 선택하기 --';
      }

      var selectedstateText;
      switch (row['state']) {
        case '1':
          selectedstateText = '졸업';
          break;
        case '2':
          selectedstateText = '재학중';
          break;
        case '3':
          selectedstateText = '휴학중';
          break;
        case '4':
          selectedstateText = '수료';
          break;
        case '5':
          selectedstateText = '중퇴';
          break;
        case '6':
          selectedstateText = '자퇴';
          break;
        case '7':
          selectedstateText = '졸업예정';
          break;
        default:
          selectedstateText = '-- 선택하기 --';
      }

      var selectedmorsText;
      switch (row['jors']) {
        case '1':
          selectedmorsText = '신입';
          break;
        case '2':
          selectedmorsText = '경력';  
        default:
          selectedmorsText = '-- 선택하기 --';   
      }

      
      $('#con').empty()   
      
      let temp_html=`<div class="container-wrap">
                        <div class="information-wrap">
                            <div class="information">기본정보</div>
                        </div>
                        <div class="name-contact-email">
                            <div class="information-wrap-namebox">
                                <div class="name">이름</div>
                                <input class="namebox" type="text" placeholder="이름" id="name" value="${row['name']}"/>
                            </div>
                            <div class="information-wrap-contactbox">
                                <div class="contact">연락처</div>
                                <input class="contactbox" type="text" placeholder="연락처" id="contacts" value="${row['contacts']}"/>
                            </div>
                            <div class="information-wrap-emailbox">
                                <div class="email">이메일</div>
                                <input class="emailbox" type="text" placeholder="메일" id="email" value="${row['email']}"/>                              
                            </div>
                        </div>
                    </div>
                    <!-- 선 -->
                    <div class="line-divde"></div>
                    <!-- 희망 직무 & 직무 경력 -->
                        <div class="container-wrap1">
                          <div class="type-of-job">
                            <div class="job-select">희망 직무</div>
                            <div class="job-select1">
                                <div class="information-wrap-namebox">
                                    <div>
                                        <label class="small-job-select-title" for="inputGroupSelect01">직군</label>
                                      </div>
                        
                                    <select class="small-job-select-option" id="desired_position" value="${selectedjikgunText}">
                                    
                                        <option selected>-- 선택하기 --</option>
                                        <option value="1">개발</option>
                                        <option value="2">기획</option>
                                        <option value="3">마케팅</option>
                                        <option value="4">디자인</option>
                                        <option value="5">경영,인사,운영</option>
                                        <option value="6">기타</option>
                                        
                                      </select>
                                </div>
                                <div class="information-wrap-namebox">
                                    <div>
                                        <label class="small-job-select-title" for="inputGroupSelect01">직무</label>
                                    </div>
                        
                                    <select class="small-job-select-option" id="desired_role" value="${selectedjikmuText}">
                                        <option selected>-- 선택하기 --</option>
                                        <option value="1">프론트엔드 개발자</option>
                                        <option value="2">서버/백앤드 개발자</option>
                                        <option value="3">웹 풀스택 개발자</option>
                                        <option value="4">앱 개발자</option>
                                        <option value="5">머신러닝/인공지능 개발자</option>
                                        <option value="6">게임 개발자</option>
                                        <option value="7">기타</option>
                                        
                                      </select>
                                </div>
                                <div class="information-wrap-namebox">
                                    <div>
                                        <label class="small-job-select-title" for="inputGroupSelect01">경력</label>
                                    </div>
                        
                                    <select class="small-job-select-option" id="desired_work_exp" value="${selectedcareerText}">
                                        <option selected>-- 선택하기 --</option>
                                        <option value="1">직무 관련 경력 없음</option>
                                        <option value="2">1년 차</option>
                                        <option value="3">2년 차</option>
                                        <option value="4">3년 차</option>
                                        <option value="5">4년 차</option>
                                        <option value="6">5년 차</option>
                                        <option value="7">6년 차</option>
                                        <option value="8">7년 차 이상</option>
                                      </select>
                                </div>  

                                <div class="information-wrap-emailbox">
                                  <div class="email">직무 스킬</div>
                                  <input class="emailbox" type="text" placeholder="스킬" id="desired_maj_skill"  value="${row['skill']}"/>
                              </div>
                              
                            </div>
                          </div>
                                  
                        </div>
                    <div class="line-divde"></div>

                    <!-- 최종 경력 -->
                    <div class="container-wrap">
                        <div class="career">
                            <div class="final-career">최종 경력</div>
                            <div class="final-career-under"></div>
                          </div>
                          <div class="choose-career">
                            <div class="choose-career">              
                            <div class="information-wrap-namebox">
                            <div>
                                <label class="small-job-select-title" for="inputGroupSelect01">경력 구분</label>
                            </div>        
                            <select class="small-job-select-option" id="desired_work_exp" value="${selectedmorsText}">
                                <option selected>-- 선택하기 --</option>
                                <option value="1">신입</option>
                                <option value="2">경력</option>
                                
                                
                              </select>
                        </div>  
                            </div>
                          </div>
                    </div>

                    <div class="line-divde"></div>
                      <div class="education">
                        
                        <div class="education-title-wrap">
                          <div class="education-title">최종 학력</div>
                          <div class="education-under"></div>
                        </div>
                        <div class="school-name-wrap">
                            <div class="name-contact-email">
                                <div class="information-wrap-namebox">
                                    <div class="name">학교명</div>
                                    <input class="namebox" type="text" placeholder="학교명 입력" id="last_school_name" value="${row['school']}"/>
                                </div>
                                <div class="information-wrap-namebox">
                                    <label class="complete-title" for="inputGroupSelect01">이수 상태</label>
                        
                                    <select class="small-job-select-option" id="last_comp_stat"  value="${selectedstateText}" >
                                        <option selected>-- 선택하기 --</option>
                                        <option value="1">졸업</option>
                                        <option value="2">재학중</option>
                                        <option value="3">휴학중</option>
                                        <option value="4">수료</option>
                                        <option value="5">중퇴</option>
                                        <option value="6">자퇴</option>
                                        <option value="7">졸업예정</option>
                                      </select>
                                </div>
                                <div class="complete">
                                    
                                  </div>   
                                <div class="information-wrap-emailbox">
                                    <div class="email">학과명</div>
                                    <input class="emailbox" type="text" placeholder="학과명 입력" id="last_major" value="${row['major']}"/>
                                </div>
                            </div>         
                                  
                        </div>
                      </div> `
      
    $('#con').append(temp_html)     

                                
  })
}



function select_senior(){
  junior_senior='경력'
}

// 경력 버튼 클릭 시
function select_junior(){
  junior_senior='신입'
}



function save_info() {
    //기본정보
    let name = $("#name").val();
    let contacts = $("#contacts").val();
    let email = $("#email").val();
    
    let desired_position = $("#desired_position").val();
    let desired_role = $("#desired_role").val();
    let desired_work_exp = $("#desired_work_exp").val();
    let desired_maj_skill = $("#desired_maj_skill").val();
    let junior_or_senior = $("#junior_or_senior").val();     
  
    //최종 학력
    let last_school_name = $("#last_school_name").val();
    let last_comp_stat = $("#last_comp_stat").val();
    let last_major = $("#last_major").val();

    let formData = new FormData();
    formData.append("name_give", name);
    formData.append("contacts_give", contacts);
    formData.append("email_give", email);
    formData.append("desired_position_give", desired_position);
    formData.append("desired_role_give", desired_role);
    formData.append("desired_work_exp_give", desired_work_exp);
    formData.append("desired_maj_skill_give", desired_maj_skill);
    formData.append("junior_senior_give", junior_or_senior);
    formData.append("last_school_name_give", last_school_name);
    formData.append("last_comp_stat_give", last_comp_stat);
    formData.append("last_major_give", last_major);
    
  
    fetch("/api/resume", { method: "POST", body: formData })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        alert(data["message"]);
        window.location.reload();
      });
  }
  
  // 회원가입
  // method : GET
  // URL : /api/register
  // request : {’email’:test_email,
  // ’userID’:testid,
  // ’password’:testpassword}
  
  // 로그인
  // method : POST
  // URL : /api/login
  // request : {’email’:test_email,
  // ’userID’:testid,
  // ’password’:testpassword}
  
  // 이력서 조회
  // method : GET
  // URL : /api/resume/
  // request : {’user_id’:@@@, ”resume_id”:1”}
  
  // function show_resume() {
  //   fetch("/api/resume/")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       let resume = data["result"].forEach((a) => {
  //         let = a[""];
  //         let = a[""];
  
  //         let temp_html = ``;
  //         $("#").append(temp_html);
  //       });
  //     });
  // }
  
  // 이력서 삭제
  // method : DELETE
  // URL : /api/resume/delete
  // request : {’user_id’:@@@,”resume_id”:1”}
  