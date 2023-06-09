$(document).ready(function () {
    resume_get();
  });

function resume_get() {

  console.log("실행!!!!!!!!!!!!!!!!!!!!!!!!")
  // 현재 URL 가져오기
  var currentURL = window.location.href;

  // URL에서 마지막 슬래시('/') 뒤의 문자열 가져오기
  var lastPart = currentURL.substr(currentURL.lastIndexOf('/') + 1);

  // 숫자 추출하기
  var number = parseInt(lastPart);


  fetch(`/resume_show/${number}`)
    .then((res) => res.json())
    .then((data) => {

      // let resume = data["result"]
      
      
      // let name = resume["name"];
      // let contacts = resume["contacts"];
      // let email = resume["email"];
      // let desired_position = resume["desired_position"];
      // let desired_role = resume["desired_role"];
      // let desired_work_exp = resume["desired_work_exp"];
      // let desired_maj_skill = resume["desired_maj_skill"];
      // let last_school_name = resume["last_school_name"];
      // let last_comp_stat = resume["last_comp_stat"];
      // let last_major = resume["last_major"];
      // let resumbox = resume["resumbox"];
      
      // console.log(data['result'])

      

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



          // let temp_html = `
          //   <div class="container">
          //     <div class="container-wrap">
          //       <div class="information-wrap">
          //         <div class="information">기본정보</div>
          //       </div>
          //       <div class="name-contact-email">
          //         <div class="information-wrap-namebox">
          //           <div class="name">이름</div>
          //           <input class="namebox" type="text" value = "${name}" id="name"/>
          //         </div>
          //         <div class="information-wrap-contactbox">
          //           <div class="contact">연락처</div>
          //           <p class="contactbox" type="text" value = "${contacts}" id="contacts"></p>
          //         </div>
          //         <div class="information-wrap-emailbox">
          //             <div class="email">이메일</div>
          //             <input class="emailbox" type="text" value = "${email}" id="email"/>
          //         </div>
          //           </div>
          //         </div>
          //         <!-- 선 -->
          //         <div class="line-divde"></div>
          //         <!-- 희망 직무 & 직무 경력 -->
          //         <div class="container-wrap1">
          //         <div class="type-of-job">
          //             <div class="job-select">희망 직무</div>
          //             <div class="job-select1">
          //               <div class="information-wrap-namebox">
          //                 <div>
          //                   <label class="small-job-select-title" for="inputGroupSelect01">직군</label>
          //                 </div>
                    
          //                 <select class="small-job-select-option" id="desired_position" value = "${desired_position}">
          //                   <option selected>-- 선택하기 --</option>
          //                   <option value="개발">개발</option>
          //                   <option value="기획">기획</option>
          //                   <option value="마케팅">마케팅</option>
          //                   <option value="디자인">디자인</option>
          //                   <option value="경영,인사,운영">경영,인사,운영</option>
          //                   <option value="기타">기타</option>
                            
          //                 </select>
          //                 </div>
          //                   <div class="information-wrap-namebox">
          //                     <div>
          //                       <label class="small-job-select-title" for="inputGroupSelect01">직무</label>
          //                     </div>
                      
          //                     <select class="small-job-select-option" id="desired_role" value = "${desired_role}">
          //                       <option selected>-- 선택하기 --</option>
          //                       <option value="프론트엔드 개발자">프론트엔드 개발자</option>
          //                       <option value="서버/백앤드 개발자">서버/백앤드 개발자</option>
          //                       <option value="웹 풀스택 개발자">웹 풀스택 개발자</option>
          //                       <option value="앱 개발자">앱 개발자</option>
          //                       <option value="머신러닝/인공지능 개발자">머신러닝/인공지능 개발자</option>
          //                       <option value="게임 개발자">게임 개발자</option>
          //                       <option value="기타">기타</option>
          //                     </select>
          //                   </div>
          //                   <div class="information-wrap-namebox">
          //                     <div>
          //                       <label class="small-job-select-title" for="inputGroupSelect01">경력</label>
          //                     </div>
                      
          //                     <select class="small-job-select-option" id="desired_work_exp" value = "${desired_work_exp}">
          //                       <option selected>-- 선택하기 --</option>
          //                       <option value="직무 관련 경력 없음">직무 관련 경력 없음</option>
          //                       <option value="1년 차">1년 차</option>
          //                       <option value="2년 차">2년 차</option>
          //                       <option value="3년 차">3년 차</option>
          //                       <option value="4년 차">4년 차</option>
          //                       <option value="5년 차">5년 차</option>
          //                       <option value="6년 차">6년 차</option>
          //                       <option value="7년 차 이상">7년 차 이상</option>
          //                     </select>
          //                   </div>  
          //                   <div class="information-wrap-emailbox">
          //                     <div class="email">직무 스킬</div>
          //                     <input class="emailbox" type="text" placeholder="스킬" id="desired_maj_skill" value = "${desired_maj_skill}"/>
          //                   </div>
          //                 </div>
          //               </div>
                                
          //             </div>
          //         <div class="line-divde"></div>
            
          //         <!-- 최종 경력 -->
          //         <div class="container-wrap">
          //           <div class="career">
          //             <div class="final-career">최종 경력</div>
          //             <div class="final-career-under"></div>
          //           </div>
          //           <div class="choose-career">
          //             <div class="choose-career">              
          //               <div class="information-wrap-namebox">
          //                 <div class="name" style="font-size: 15px;">경력 구분</div>
          //                 <div class="career-division-select">
          //                   <!-- 버튼 누른값 가져오기 검색하면 가져올수 있습니당. -->
          //                   <button type="button" class="btn btn-outline-primary" style="width: 200px;">경력</button>
          //                   <button type="button" class="btn btn-outline-primary" style="width: 200px;">신입</button>
          //                 </div>
          //               </div>
          //             </div>
          //           </div>
          //         </div>
            
          //         <div class="line-divde"></div>
          //           <div class="education">
          //             <div class="education-title-wrap">
          //               <div class="education-title">최종 학력</div>
          //               <div class="education-under"></div>
          //             </div>
          //             <div class="school-name-wrap">
          //               <div class="name-contact-email">
          //                 <div class="information-wrap-namebox">
          //                   <div class="name">학교명</div>
          //                   <input class="namebox" type="text" placeholder="학교명 입력"  id="last_school_name" value = "${last_school_name}"/>
          //                 </div>
          //                 <div class="information-wrap-namebox">
          //                   <label class="complete-title" for="inputGroupSelect01">이수 상태</label>
          //                     <select class="small-job-select-option" id="last_comp_stat" value = "${last_comp_stat}">
          //                       <option selected>-- 선택하기 --</option>
          //                       <option value="졸업">졸업</option>
          //                       <option value="재학중">재학중</option>
          //                       <option value="휴학중">휴학중</option>
          //                       <option value="수료">수료</option>
          //                       <option value="중퇴">중퇴</option>
          //                       <option value="자퇴">자퇴</option>
          //                       <option value="졸업예정">졸업예정</option>
          //                     </select>
          //                   </div>
          //                 <div class="complete">
          //               </div>   
          //               <div class="information-wrap-emailbox">
          //                   <div class="email">학과명</div>
          //                   <input class="emailbox" type="text" placeholder="학과명 입력" id="last_major" value = "${last_major}"/>
          //               </div>
          //             </div>      
            
          //             <div class="line-divde"></div>
          //             <div class = "blank"></div>
          //             <!-- 이력서 -->
          //             <div class="container-wrap">
          //               <div class="information-wrap1">
          //                 <div class="final-career">이력서</div>
          //                 <div class="final-career-under"></div>
          //               </div>
          //               <div class="choose-career">
          //                 <div class="choose-career">              
          //                   <div class="resume-wrap-box">
          //                     <input class="resumbox" type="text" value = "${resumbox}" />
          //                       <div class="career-division-select">
          //                         <button type="button" class="btn btn-dark" style="width: 130px;">업로드</button>
          //                       </div>
          //                   </div>
          //                 </div>     
          //               </div>
          //             </div>
          //           </div>>
          //           <div class = "blank"></div>
          //           <button class="save_resume" type="button"  onclick="resume_post()">저장</button> 
          //         </div>
          //       </div>
          //     `;

            $("#con").append(temp_html);

        

        })
      // .catch((error) => {console.log(error)});
      
  }


  //삭제 버튼
  function delete_btn() {
    let url = window.location.href;
    let num = url.substr(currentURL.lastIndexOf('/') + 1);
    let pnum = parseInt(num);

    // var currentURL = window.location.href;
  
    // // URL에서 마지막 슬래시('/') 뒤의 문자열 가져오기
    // var lastPart = currentURL.substr(currentURL.lastIndexOf('/') + 1);
  
    // // 숫자 추출하기
    // var number = parseInt(lastPart);

    console.log('실행됐나요1'); //콘솔 찍힘 ??// 뭔데 갑자기 이제 뜨지도않음

    fetch(`/api/resume/delete/${pnum}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        alert(data["msg"]);
        console.log('실행됐나요22') //안찍힘
        window.location.reload()
      });
  }