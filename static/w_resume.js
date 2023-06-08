

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
    