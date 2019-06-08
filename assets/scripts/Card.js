// 种类：
// Straberry, Banana, Plum, Lemon
// 点数：
// 1, 2, 3, 4, 5
// 对应点数的牌的张数
// 3, 3, 3, 3, 2


// String type
// Int point 
function Card(type, point){
    this.type = type;   //种类
    this.point = point; //水果个数(点数)
    this.loadName = type + point.toString();
}

Card.prototype.add = function (card2){
    if(this.type === card2.type){
        return this.point + card2.point;
    }else{
        return -1;
    }
};

// 把函数 Card 作为模块的输出暴露出去，这样其他模块就可以使用 Card 函数了
module.exports = Card;


