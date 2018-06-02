$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});
$(document).ready(function() {
  $("#error1").toggle(false);
  $("#error2").toggle(false);

  $("#signup").click( () => {
    
  }
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


    $.post("/signup", {}, (data) => {

    });
  });


});
