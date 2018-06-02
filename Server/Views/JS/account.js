$(document).ready(function() {
  $.get("/accountInfo", (data) => {
    $("#username").html("Username: " + data.user.username);
    $("#Email").html("Email: " + data.user.email);
    $("#First").html("First Name: " + data.user.First);
    $("#Last").html("Last Name: " + data.user.Last);
    $("#Phone").html("Phone Number: " + data.user.Phone);
    $("#Permission").html("Permission: " + data.user.permission);
  });

  $("#redir").click( (e) => {
    e.preventDefault();
    window.location = "/session";
  });
});
