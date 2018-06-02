$(document).ready(function() {
  $("#logout").click( () => {
    $.post("/logout", (data) => {
      window.location = data.redirect;
    });
  });

  $("#profile").click( () => {
    window.location = "/account";
  });
});
