function Tile(Header, Content)
{
    this.header = Header;
    this.content = Content;

    this.toString = function() {
        return `<div class = \"tile\">
                    <div class = \"tileHeader\">
                        <label>` + this.header + `</label>
                    </div>
                    <div class = \"tileContent\">
                        ` + this.content + `
                    </div>
                </div>`;
    };
    this.newTile = function(Header, Content) {
        return new Tile(Header, Content);
    };

    return this;
}

module.exports = Tile;