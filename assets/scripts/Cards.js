var Card = require("./Card");

const TYPE = ["", "Straberry", "Banana", "Plum", "Lemon"];

// 一副牌
function Cards(){
    this.cardNum = 56;
    this.content = [];
    for(var i=1;i<=4;i++){
        for(var m=0;m<3;m++){
            this.content.push(new Card(TYPE[i],1));
        }
        for(var m=0;m<3;m++){
            this.content.push(new Card(TYPE[i],2));
        }
        for(var m=0;m<3;m++){
            this.content.push(new Card(TYPE[i],3));
        }
        for(var m=0;m<3;m++){
            this.content.push(new Card(TYPE[i],4));
        }
        for(var m=0;m<2;m++){
            this.content.push(new Card(TYPE[i],5));
        }
    }
    //console.log(this.content);
}

Cards.prototype.shuffle = function(){

    var input = this.content;

    for (var i = input.length-1; i >=0; i--) {

        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
}

module.exports = Cards;
