const CARD_NUM = 28;
const TURN_ENUM = {
    player1OffPanel:1,
    player2OffPanel:2};

const CARD_TYPE = {
    
};


var onCards = [[],[],[]];
var offCards = [[],[],[]];
var cards = [];

var turn_flag = 2;  //可以进行翻牌操作的玩家

cc.Class({
    extends: cc.Component,
    properties: {
        player1OffPanel: cc.Button,
        player1OnPanel: cc.Sprite,
        player2OffPanel: cc.Button,
        player2OnPanel: cc.Sprite
    },

    onLoad: function(){
        console.log("onLoad");

        //发牌
        for(var i=1;i<=CARD_NUM;i++){
            cards.push(i);
        }

        cards.shuffle();
        offCards[1] = cards.slice(0,14);
        offCards[2] = cards.slice(14.28);
        //console.log(offCards);
        onCards[1].push(offCards[1].shift());
        onCards[2].push(offCards[2].shift());
        //console.log(onCards);

        // 输出，验证是否正确
        // console.log(onCards);
        // console.log(offCards);

    },

    update: function(){
        var self = this;    //即gameManger节点
        cc.loader.loadRes(onCards[1][0].toString(), cc.SpriteFrame, function(err,s){
            var sprite = self.node.parent.children[1].children[0].getComponent(cc.Sprite);
            sprite.spriteFrame = s;
        });
        cc.loader.loadRes(onCards[2][0].toString(), cc.SpriteFrame, function(err,s){
            var sprite = self.node.parent.children[2].children[0].getComponent(cc.Sprite);
            sprite.spriteFrame = s;
        });
    },

    turnOverCard: function(event){

        var turn = TURN_ENUM[event.target.name];
        if(turn === turn_flag){       
            var newCard = offCards[turn].shift();
            onCards[turn].unshift(offCards[turn].shift());
            turn_flag = (turn_flag===1?2:1);
            //console.log(turn_flag);
        }else{
            console.log("not your turn!");
        }
        
    },

    ringOn: function(event){
        //console.log(event.target.parent);
        //canvas
        var pushPlayer = event.target.parent;
        //判断当前牌面的是否相加为5

        var player1OnCard = parseInt(pushPlayer.parent.children[1].children[0].getComponent(cc.Sprite).spriteFrame.name);
        var player2OnCard = parseInt(pushPlayer.parent.children[2].children[0].getComponent(cc.Sprite).spriteFrame.name);
        //console.log(player1OnCard+player2OnCard);
        if(player1OnCard+player2OnCard===0 || player1OnCard+player2OnCard===13){
            console.log(pushPlayer.name+" right!");
        }else{
            console.log(pushPlayer.name+" wrong!");
        }

    }
},

    /**
     * Fisher–Yates shuffle
     */
    Array.prototype.shuffle = function() {
        var input = this;

        for (var i = input.length-1; i >=0; i--) {

            var randomIndex = Math.floor(Math.random()*(i+1));
            var itemAtIndex = input[randomIndex];

            input[randomIndex] = input[i];
            input[i] = itemAtIndex;
        }
        return input;
    }

);