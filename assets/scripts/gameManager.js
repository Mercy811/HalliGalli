var Cards = require("./Cards");
var Alert = require("./Alert");
//const CARD_NUM = 28;
const TURN_ENUM = {
    player1OffPanel: 1,
    player2OffPanel: 2,
    player1: 1,
    player2: 2
};

var onCards = [[], [], []];
var offCards = [[], [], []];
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

    onLoad: function () {
        console.log("onLoad");

        cards = new Cards();
        cards.shuffle();
        offCards[1] = cards.content.slice(0, cards.cardNum / 2 - 1);
        offCards[2] = cards.content.slice(cards.cardNum / 2, cards.cardNum - 1);
        //console.log(offCards);
        onCards[1].push(offCards[1].shift());
        onCards[2].push(offCards[2].shift());
        //console.log(onCards);

        // 输出，验证是否正确
        //console.log(onCards);
        //console.log(offCards);

    },

    update: function () {
        var self = this;    //即gameManger节点

        //显示第一个，即index为0的图片
        cc.loader.loadRes(onCards[1][0].loadName, cc.SpriteFrame, function (err, s) {
            var sprite = self.node.parent.children[1].children[0].getComponent(cc.Sprite);
            sprite.spriteFrame = s;
        });
        cc.loader.loadRes(onCards[2][0].loadName, cc.SpriteFrame, function (err, s) {
            var sprite = self.node.parent.children[2].children[0].getComponent(cc.Sprite);
            sprite.spriteFrame = s;
        });

        if (offCards[1].length === 0) {
            cc.loader.loadRes("noCard",cc.SpriteFrame,function(err,s){
                var sprite = self.node.parent.children[1].children[1].getComponent(cc.Sprite);
                sprite.spriteFrame = s;
            })
        }
        if (offCards[2].length === 0) {
            cc.loader.loadRes("noCard",cc.SpriteFrame,function(err,s){
                var sprite = self.node.parent.children[2].children[1].getComponent(cc.Sprite);
                sprite.spriteFrame = s;
            })
        }

        //设置文本框内容
        self.node.parent.children[1].children[3].getComponent(cc.Label).string = onCards[1].length;
        self.node.parent.children[1].children[4].getComponent(cc.Label).string = offCards[1].length;
        self.node.parent.children[2].children[3].getComponent(cc.Label).string = onCards[2].length;
        self.node.parent.children[2].children[4].getComponent(cc.Label).string = offCards[2].length;

        //胜负判断
        if (offCards[1].length === 0) {
            Alert.show("Player2 胜利！");
        }
        if (offCards[2].length === 0) {
            Alert.show("Player1 胜利！");
        }

    },

    turnOverCard: function (event) {

        var turn = TURN_ENUM[event.target.name];
        if (turn === turn_flag) {
            onCards[turn].unshift(offCards[turn].shift());
            turn_flag = (turn_flag === 1 ? 2 : 1);
        } else {
            console.log("not your turn!");
        }

    },

    ringOn: function (event) {
        var pushPlayer = event.target.parent;
        var notPushPlayer = (event.target.parent === event.target.parent.parent.children[1] ? event.target.parent.parent.children[2] : event.target.parent.parent.children[1]);
        var pushNum = TURN_ENUM[pushPlayer.name];
        var notPushNum = TURN_ENUM[notPushPlayer.name];


        //**基础玩法**按铃时机：
        //1. 当出现5个相同的水果时

        //判断当前牌面的是否相加为5
        // if(onCards[1][0].point + onCards[2][0].point === 5 && onCards[1][0].type === onCards[2][0].type ){
        //     console.log(pushPlayer.name+" right!");
        //     //如果没按的玩家的onCards不为0，则把这些牌放到按的玩家的offCards中
        //     for(;onCards[notPushNum].length!==0;){
        //         offCards[pushNum].push(onCards[notPushNum].shift());
        //     }
        //     onCards[notPushNum].push(offCards[notPushNum].shift());
        // }else{ //按错
        //     console.log(pushPlayer.name+" wrong!");
        //     if(offCards[pushNum].length !== 0){
        //         // 如果按错玩家的offCards中还有牌，则把第一张给没有按铃的玩家的offCards中
        //         offCards[notPushNum].push(offCards[pushNum].shift());
        //     }else{
        //         offCards[notPushNum].push(onCards[pushNum].shift());
        //     }
        // }

        //**扩展玩法**按铃时机：
        //1. 当出现两张相同的水果牌
        //2. 出现大象，且没有草莓
        //3. 出现猴子，且没有柠檬
        //4. 出现猪

        //两张相同的水果牌
        if (onCards[1][0].type === "fruit" && onCards[1][0].loadName === onCards[2][0].loadName) {
            console.log("两张相同的水果牌！");
            Alert.show("【按铃正确】两张相同的水果牌！");
            //将onCards中的所有牌全部放到按铃玩家的offCards队尾
            for (var i = 1; i <= 2; i++) {
                for (; onCards[i].length !== 0;) {
                    offCards[pushNum].push(onCards[i].shift());
                }
                onCards[i].push(offCards[i].shift());
            }
        }
        //豬
        else if (onCards[1][0].type === "pig" || onCards[2][0].type === "pig") {
            console.log("猪！");
            Alert.show("【按铃正确】出现猪！");
            //将onCards中的所有牌全部放到按铃玩家的offCards队尾
            for (var i = 1; i <= 2; i++) {
                for (; onCards[i].length !== 0;) {
                    offCards[pushNum].push(onCards[i].shift());
                }
                onCards[i].push(offCards[i].shift());
            }
        }
        //猴子，无柠檬
        else if ((onCards[1][0].type === "monkey" && parseInt(onCards[2][0].loadName) % 10 === 0) || (onCards[2][0].type === "monkey" && parseInt(onCards[1][0].loadName) % 10 === 0)) {
            console.log("猴子无柠檬！");
            Alert.show("【按铃正确】出现猴子无柠檬！");
            //将onCards中的所有牌全部放到按铃玩家的offCards队尾
            for (var i = 1; i <= 2; i++) {
                for (; onCards[i].length !== 0;) {
                    offCards[pushNum].push(onCards[i].shift());
                }
                onCards[i].push(offCards[i].shift());
            }
        }
        //大象，无草莓
        else if ((onCards[1][0].type === "elephant" && parseInt(onCards[2][0].loadName) / 1000 < 1) || (onCards[2][0].type === "elephant" && parseInt(onCards[1][0].loadName) / 1000 < 1)) {
            console.log("大象无草莓！");
            Alert.show("【按铃正确】出现大象无草莓！");
            //将onCards中的所有牌全部放到按铃玩家的offCards队尾
            for (var i = 1; i <= 2; i++) {
                for (; onCards[i].length !== 0;) {
                    offCards[pushNum].push(onCards[i].shift());
                }
                onCards[i].push(offCards[i].shift());
            }
        } else {
            console.log("按铃错误！");
            Alert.show("【按铃错误】");
            //将按铃玩家的onCards中所有放到未按铃玩家的offCards队尾
            for (; onCards[pushNum].length !== 0;) {
                offCards[notPushNum].push(onCards[pushNum].shift());
            }
            onCards[pushNum].push(offCards[pushNum].shift());
        }

    }

}

);