// 이력서 작성
//
// method : POST /
// URL : /api/resume
// request : {
// ”user_id”:testid,
// ”resume_id”:1,
// ”name”:홍길동,
// ”age”:27,
// ”career”: 2017~2021 : 삼성전자 근무
// ”}

// 1. 기본정보
// 이름
// 연락처
// 이메일

// 값 넘기기

// 2. 희망직무
// 직군 -선택 값
// 직무 - 선택 값
// 직무 경력 - 선택 값
// 주요 스킬 - 선택 값

// 3. 최종 경력
// 경력 구분
// 신입
// 경력 -  선택 값
// 회사명
// 직무
// 재직 기간

// 4. 최종 학력
// 학교명
// 이수 상태 - 선택 값
// 학과명

// 5. 이력서
// 업로드


$(document).ready(function () {
  show_info();
});

function show_info() {
  fetch('/api/resume').then((res) => res.json()).then((data) => {
      
    let row = data['result']
    
    $('#con').empty()    
    
    let name = row['name']
    let contacts = row['contacts']
    let email = row['email']
    let jikgun = row['jikgun']
    let jikmu = row['jikmu']
    let career = row['career']
    let skill = row['skill']
    let school = row['school']
    let state = row['state']
    let major = row['major']

    console.log(name,contacts,email,jikgun)

    $('#name').val(name);
    $('#contacts').val(contacts);
    $('#email').val(email);
    $('#desired_position').val(jikgun);
    $('#desired_role').val(jikmu);
    $('#desired_work_exp').val(career);
    $("#desired_maj_skill").val(skill);
    $("#last_school_name").val(school);
    $("#last_comp_stat").val(state);
    $("#last_major").val(major);
  
    //최종경력
    // let last_career = $("#last_career").val();
    // 신입 or // 경력
  
    // //경력일 경우
    // let last_company_name = $("#last_company_name").val();
    // let last_role = $("#last_role").val();
    // let last_employment = $("#last_employment").val();
  
    //최종 
      
  })
}

function save_info() {
    //기본정보
    let name = $("#name").val();
    let contacts = $("#contacts").val();
    let email = $("#email").val();
    //값 넘기기
    // let info_value = $("#info_value").val();
  
    //희망직무 // 너무 긴 것 같으면 수정 부탁드림당 밑에 최종경력이랑 단어가 겹쳐서..
    let desired_position = $("#desired_position").val();
    let desired_role = $("#desired_role").val();
    let desired_work_exp = $("#desired_work_exp").val();
    let desired_maj_skill = $("#desired_maj_skill").val();
  
    //최종경력
    // let last_career = $("#last_career").val();
    // 신입 or // 경력
  
    // //경력일 경우
    // let last_company_name = $("#last_company_name").val();
    // let last_role = $("#last_role").val();
    // let last_employment = $("#last_employment").val();
  
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
  