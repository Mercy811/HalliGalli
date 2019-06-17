var Card = require("./Card");

//const TYPE = ["", "Straberry", "Banana", "Plum", "Lemon"];

// 一副牌
function Cards() {
    this.cardNum = 98;
    this.content = [];

    //基础牌 56
    for (var n = 1; n <= 4; n++) {
        for (var i = 1; i <= 3; i++) {
            this.content.push(new Card("fruit", n, 0, 0, 0));
            this.content.push(new Card("fruit", 0, n, 0, 0));
            this.content.push(new Card("fruit", 0, 0, n, 0));
            this.content.push(new Card("fruit", 0, 0, 0, n));
        }
    }
    for (var i = 1; i <= 2; i++) {
        this.content.push(new Card("fruit", 5, 0, 0, 0));
        this.content.push(new Card("fruit", 0, 5, 0, 0));
        this.content.push(new Card("fruit", 0, 0, 5, 0));
        this.content.push(new Card("fruit", 0, 0, 0, 5));
    }

    //扩展牌 42
    for (var i = 1; i <= 3; i++) { //30
        for (var j = 1; j <= 3; j++) {
            if(i!==1&&j!==1){
                continue;
            }
            this.content.push(new Card("fruit", i, j, 0, 0));
            this.content.push(new Card("fruit", i, 0, j, 0));
            this.content.push(new Card("fruit", i, 0, 0, j));
            this.content.push(new Card("fruit", 0, i, j, 0));
            this.content.push(new Card("fruit", 0, i, 0, j));
            this.content.push(new Card("fruit", 0, 0, i, j));
        }
    }
    for(var i = 1; i <=3; i++){ //6
        this.content.push(new Card("elephant",0,0,0,0));
        this.content.push(new Card("monkey",0,0,0,0));
    }
    for(var i = 1; i <=2; i++){ //2
        this.content.push(new Card("pig",0,0,0,0));
    }

    // 4
    this.content.push(new Card("fruit", 1, 4, 0, 0));
    this.content.push(new Card("fruit", 1, 1, 1, 1));
    this.content.push(new Card("fruit", 1, 1, 1, 0));
    this.content.push(new Card("fruit", 1, 1, 0, 1));
}

Cards.prototype.shuffle = function () {

    var input = this.content;

    for (var i = input.length - 1; i >= 0; i--) {

        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
}

module.exports = Cards;
