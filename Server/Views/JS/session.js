$(document).ready(function() {
  $("#logout").click( () => {
    $.post("/logout", (data) => {
      
    });
  });
});
