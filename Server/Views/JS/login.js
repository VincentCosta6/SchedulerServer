$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});
$(document).ready(function() {
  $("#error1").toggle(false);
  $("#error2").toggle(false);
  $("#status").toggle(false);
  $("#userStatus").toggle(false);
  $("#userCheck").click( () => {
    $("#status").toggle(false);
    $("#status").attr("src", "/images/loading.gif");
    $.get("/usernameTaken", {username: $("#signupUsername").val()}, (data) => {
      if(data.taken) {
        $("#status").toggle(true);
        $("#status").attr("src", "/images/redX.png");
        $("#userStatus").toggle(true);
        $("#userStatus").html("Username taken");
      }
      else if (!data.taken) {
        $("#status").toggle(true);
        $("#status").attr("src", "/images/checked.png");
        $("#userStatus").toggle(true);
        $("#userStatus").html("Username okay");
      }
    });
  });
  $("#signup").click( () => {

    var checkParams = function(Username, Password1, Password2, Email)
    {
      var problem = false;
      if(Password1 != Password2)
      {
        $("#error1").toggle(true);
        problem = true;
      }
      else
        $("#error1").toggle(false);

      if(!Email.includes("@") || !Email.includes("."))
      {
        $("#error2").toggle(true);
        problem = true;
      }
      else
        $("#error2").toggle(false);
      return problem;
    }



    if(checkParams($("#signupUsername").val(), $("#p1").val(), $("#p2").val(), $("#signupEmail").val()))
      return;


    $.post("/signup", {username: $("#signupUsername").val(), email: $("#signupEmail").val(), password: $("#p1").val()}, (data) => {
      $("body").replaceWith(data);
    });
  });

  $("#login").click( () => {
    $.post("/login", {username: $("#signinUser").val(), password: $("#signinPass").val()}, (data) => {
      if(data.passed === false)
        alert(data.reason);
      else
        $("body").replaceWith(data);
    })
  });


});
