let proto = new (require("../Tile.js")) ("", "");
module.exports = [(proto.newTile("Messages", "You have new messages")).toString(),
                  (proto.newTile("Tasks", "You have new tasks")).toString()  ];