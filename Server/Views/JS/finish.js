$(document).ready(function() {
  $("#error1").toggle(false);

  $("#submit").click( (e) => {
    e.preventDefault();


    $("#error1").toggle(false);
    $.post("/finishAccount", {first: $("#First").val(), last: $("#Last").val(), phone: $("#Phone").val()},(data) => {
      if(data.passed === false)
      {
        $("#error1").toggle(true);
        $("#error1").html(data.reason);
      }
      else
        window.location = data.redirect;
    });
  });
});
var number;
function phoneMask() {
    number = $(this).val().replace(/\D/g,'');
    $(this).val(num.substring(0,1) + '(' + num.substring(1,4) + ')' + num.substring(4,7) + '-' + num.substring(7,11));
}
$('[type="tel"]').keyup(phoneMask);
