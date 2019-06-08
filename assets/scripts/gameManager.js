var Cards = require("./Cards");

const CARD_NUM = 28;
const TURN_ENUM = {
    player1OffPanel:1,
    player2OffPanel:2,
    player1:1,
    player2:2
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

        cards = new Cards();
        cards.shuffle();
        offCards[1] = cards.content.slice(0,cards.cardNum/2-1);
        offCards[2] = cards.content.slice(cards.cardNum/2,cards.cardNum-1);
        //console.log(offCards);
        onCards[1].push(offCards[1].shift());
        onCards[2].push(offCards[2].shift());
        //console.log(onCards);

        // 输出，验证是否正确
        //console.log(onCards);
        //console.log(offCards);

    },

    update: function(){
        var self = this;    //即gameManger节点

        //显示第一个，即index为0的图片
        cc.loader.loadRes(onCards[1][0].loadName, cc.SpriteFrame, function(err,s){
            var sprite = self.node.parent.children[1].children[0].getComponent(cc.Sprite);
            sprite.spriteFrame = s;
        });
        cc.loader.loadRes(onCards[2][0].loadName, cc.SpriteFrame, function(err,s){
            var sprite = self.node.parent.children[2].children[0].getComponent(cc.Sprite);
            sprite.spriteFrame = s;
        });

        if(offCards[1].length === 0){
            console.log("player1 offCards === 0");
            self.node.parent.children[1].children[1].getComponent(cc.Sprite).spriteFrame = null;
        }
        if(offCards[2].length === 0){
            self.node.parent.children[2].children[1].getComponent(cc.Sprite).spriteFrame = null;
        }

        //设置文本框内容
        self.node.parent.children[1].children[3].getComponent(cc.Label).string = onCards[1].length;
        self.node.parent.children[1].children[4].getComponent(cc.Label).string = offCards[1].length;
        self.node.parent.children[2].children[3].getComponent(cc.Label).string = onCards[2].length;
        self.node.parent.children[2].children[4].getComponent(cc.Label).string = offCards[2].length;

        //胜负判断
        if(onCards[1].length === 0 && offCards[1].length === 0){
            console.log("player2 win!!!");
        }
        if(onCards[2].length === 0 && offCards[2].length === 0){
            console.log("player1 win!!!");
        }

    },

    turnOverCard: function(event){

        var turn = TURN_ENUM[event.target.name];
        if(turn === turn_flag){
            onCards[turn].unshift(offCards[turn].shift());
            turn_flag = (turn_flag===1?2:1);
            //console.log(turn_flag);
        }else{
            //console.log(this)   //gameManager
            //console.log(event.target);    //被点击按钮
            event.target.parent.children[5].getComponent(cc.Label).string = "NOT YOUT NURN!";
            //console.log("not your turn!");
        }
        //console.log(onCards);
        //console.log(offCards);
    },

    ringOn: function(event){
        //console.log(event.target.parent);
        //player1 or player2   -> event.target = player1Ring or player2Ring
        //console.log(this.node);
        //gameManager
        var pushPlayer = event.target.parent;
        var notPushPlayer = (event.target.parent===event.target.parent.parent.children[1]?event.target.parent.parent.children[2]:event.target.parent.parent.children[1]);
        var pushNum = TURN_ENUM[pushPlayer.name];
        var notPushNum = TURN_ENUM[notPushPlayer.name];
        //判断当前牌面的是否相加为5

        var player1OnCard = parseInt(pushPlayer.parent.children[1].children[0].getComponent(cc.Sprite).spriteFrame.name);
        var player2OnCard = parseInt(pushPlayer.parent.children[2].children[0].getComponent(cc.Sprite).spriteFrame.name);
        //console.log(player1OnCard+player2OnCard);
        //console.log(onCards[TURN_ENUM[notPushPlayer.name]]);  
        if(player1OnCard+player2OnCard===0 || player1OnCard+player2OnCard===13){ //按正确

            console.log(pushPlayer.name+" right!");
            //如果没按的玩家的onCards不为0，则把这些牌放到按的玩家的offCards中
            offCards[pushNum].push(onCards[notPushNum].shift());

        }else{ //按错
            console.log(pushPlayer.name+" wrong!");
            if(offCards[pushNum].length !== 0){
                // 如果按错玩家的offCards中还有牌，则把第一张给没有按铃的玩家的offCards中
                offCards[notPushNum].push(offCards[pushNum].shift());
            }else{
                offCards[notPushNum].push(onCards[pushNum].shift());
            }

            console.log(onCards);
            console.log(offCards);
        }

    }
}

);