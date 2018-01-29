 var apiUrl="http://api.hulai.com";
          // var apiUrl="http://192.168.150.117:8088"
          function sendSms () {
              var mobile=$("#mobile").val();
              var verifyCode= $("#imgTxt").val();
              var data = {};
              data.mobile = mobile;
              var url=apiUrl+"/v5/api/activity/1/sendMobileCode?";
              $.getJSON(url, data, function(result){
                  console.log(result);
                  if(result.ret!=1){
                    alert(result.msg);
                  }else{
                    alert("短信发送成功!");


                    // 60s内按钮不可点击
                    var btn = $(".get_code");

                      var timer = 60;
                      var msg = '';
                      function countdown() {
                          if (timer > 1) {
                              timer = timer - 1;
                              btn.removeClass("cursor_p");
                              btn.css("background-color","#91958d");
                              btn.css("color","#fff");
                              btn.attr({"disabled":"disabled"});
                              msg = "重新发送(" + timer + ")" ;
                              btn.attr("value",msg);
                              setTimeout(function() {
                                  countdown();
                              }, 1000);
                          }
                          else{
                            btn.addClass("cursor_p");
                            btn.css("background-color","#c7984e");
                            btn.css("color","#2e333c");
                            btn.removeAttr("disabled");    
                            btn.attr("value","获取验证码");
                            timer =60;
                          }
                        }

                       countdown();//调用 


                  }
              });
          }



          function saveRecord () {
              var mobile=$("#mobile").val();
              var verifyCode=$("#smscode").val();
              var data = {};
              data.mobile = mobile;
              data.verifyCode = verifyCode;
              var url=apiUrl+"/v5/api/activity/1/saveRecord?";
              $.getJSON(url, data, function(result) {
                  console.log(result);
                  if(result.ret!=1){
                    alert(result.msg);
                  }else{
                    alert("活动预约成功!");
                    // getTotal();
                  }
              });
          }

          function getTotal () {
            return;
            var url=apiUrl+"/v5/api/activity/1/total";
            $.getJSON(url, function(result) {
                console.log(result);
                if(result.ret!=1){
                  alert(result.msg);
                }else{
                  $(".yuyue_people").text(result.total+'人');
                }
            });

          }

          // getTotal();