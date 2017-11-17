import MapSetting from "./mapSetting";

let downOffsetVector = cc.v2(20, -14);
let leftOffsetVector = cc.v2(-20, -14);

let nextPosition = cc.v2(0, 0);

cc.Class({
    extends: cc.Component,

    properties: {
        basicTile: cc.Node
    },

    onLoad: function () {
        this.tiles = [];

        //起点
        var firstTile = cc.instantiate(this.basicTile);
        firstTile.parent = this.basicTile.parent;
        firstTile.active = true;
        firstTile.script = firstTile.getComponent("tile");
        firstTile.script.x = 0;
        firstTile.script.y = 0;
        firstTile.script.type = MapSetting.TileType.Down;
        this.tiles.push(firstTile);

        for (var i = 0; i < 100; ++i)
            this.createOneTile();
    },

    createOneTile: function () {
        var lastTile = this.tiles[this.tiles.length - 1];
        var newType = MapSetting.TileType.Empty;
        nextPosition.x = lastTile.x;
        nextPosition.y = lastTile.y;
        var x = lastTile.script.x;
        var y = lastTile.script.y;
        switch (lastTile.script.type) {
            case MapSetting.TileType.Down:
                newType = this.randomTileType([MapSetting.TileType.Down, MapSetting.TileType.DownToLeft]);
                ++y;
                nextPosition.x += downOffsetVector.x;
                nextPosition.y += downOffsetVector.y;
                break;
            case MapSetting.TileType.DownToLeft:
                newType = MapSetting.TileType.Left;
                ++y;
                nextPosition.x += downOffsetVector.x;
                nextPosition.y += downOffsetVector.y;
                break;
            case MapSetting.TileType.Left:
                newType = this.randomTileType([MapSetting.TileType.Left, MapSetting.TileType.LeftToDown]);
                ++x;
                nextPosition.x += leftOffsetVector.x;
                nextPosition.y += leftOffsetVector.y;
                break;
            case MapSetting.TileType.LeftToDown:
                newType = MapSetting.TileType.Down;
                ++x;
                nextPosition.x += leftOffsetVector.x;
                nextPosition.y += leftOffsetVector.y;
                break;
            default:
                break;
        }
        var newTile = cc.instantiate(this.basicTile);
        newTile.parent = this.basicTile.parent;
        newTile.active = true;
        newTile.script = newTile.getComponent("tile");
        newTile.script.type = newType;
        newTile.script.x = x;
        newTile.script.y = y;
        newTile.x = nextPosition.x;
        newTile.y = nextPosition.y;
        this.tiles.push(newTile);
    },

    randomTileType: function (types) {
        var rd = Math.random();
        var rate = 0;
        for (var i = 0; i < types.length; ++i) {
            rate += 1.0 / types.length;
            if (rd <= rate) {
                return types[i];
            }
        }
        return types[types.length - 1];
    },
});