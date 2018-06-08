$(document).ready(function() {
  $("#logout").click( () => {
    $.post("/logout", (data) => {
      window.location = data.redirect;
    });
  });

  $("#profile").click( () => {
    window.location = "/account";
  });
  $.get("/tileSpace", (data) => {
    for(let i in data.tiles)
      $("#contenter").append(data.tiles[i]);
    $(".tileHeader").click( function() {
      $.get("/redir", { which: $(this).children()[0].innerHTML }, (data) => {
        console.log(data);
      });
    });
  })
  

});
