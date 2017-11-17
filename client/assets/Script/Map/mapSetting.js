let tileTypeIndex = 0;
const TileType = {
    Down: ++tileTypeIndex,
    Left: ++tileTypeIndex,
    DownToLeft: ++tileTypeIndex,
    LeftToDown: ++tileTypeIndex,
    Empty: ++tileTypeIndex,
};

let directionIndex = 0;
const Direction = {
    Down: ++directionIndex,
    Left: ++directionIndex
};

export default {
    TileType,
    Direction
}