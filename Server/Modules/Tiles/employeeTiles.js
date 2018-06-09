let proto = new (require("../Tile.js")) ("", "");
function redir(){
    window.location = `/messages`;
}
module.exports = [(proto.newTile("Messages", `<button onclick = \"` + redir + `\">View Messages</button>`)).toString(),
                  (proto.newTile("Tasks", "You have new tasks")).toString()  ];