// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var num = 0;


cc.Class({
    extends: cc.Component,

    properties: {
        
        portrait: cc.Sprite,
        choice1: cc.Button,
        choice2: cc.Button,
        choice3: cc.Button,
        choice4: cc.Button,
        // role2: cc.Sprite,
        // choice21: cc.Button,
        // choice22: cc.Button,
        // choice23: cc.Button,
        // choice24: cc.Button,

        sprite:{
            default: null,
            type: cc.SpriteFrame,
        }
    
    },

    // LIFE-CYCLE CALLBACKS:

   
    // 组件实例在加载的时候运行
    // 组件实例.onLoad(),组件实例.start()
    onLoad: function(){
        // console.log(this);
        // console.log("this.onLoad");
        // //代码里怎么找到节点
        // //指向这个组件实例所挂在的节点
        console.log(this.node);
        console.log(this.node.name);
        console.log("----");
        // console.log(this.node.parent.name);
        // console.log("***");
        // console.log(this.node.children.name);

        // // var node1 = new cc.Node();
        // // this.node.addChild(node1);
        // console.log("***");
        // var role1 = this.node.getChildByName("role1");
        // console.log(role1.name);
     

        var children = this.node.children;  //[cc.Node, cc.Node, cc.Node   ...]
        for( var i = 0; i < children.length; i++){
            console.log(children[i].name);
        }

        /*
        （1）监听对应的触摸事件：像引擎层注册一个回调函数，当有触摸事件发生的时候调这个回调函数
        cc.Node.EventType.TOUCH_START // 按下时事件      触摸开始
        cc.Node.EventType.TOUCH_Move // 按住移动后事件    触摸移动
        cc.Node.EventType.TOUCH_END // 按下后松开后事件   触摸结束，物体内部结束
        cc.Node.EventType.TOUCH_CANCEL // 按下取消事件    触摸结束，物体外部结束
       
        
        （2）回调函数的格式 function(t)  t-->cc.Touch对象触,摸事件对象{触摸信息，对象信息}
        call -->this,this指向谁，谁就是target; 你要绑定那个对象作为你的回调函数的this，可以为空
        function(){}.bind(this);  （显式绑定
        */
        // this.node.on(cc.Node.EventType.TOUCH_START,function(t){
        //     console.log("cc.Node.EventType.TOUCH_START");
        //     //this 函数里面的this就是target指代的
        // },this);

        // this.node.on(cc.Node.EventType.TOUCH_Move,function(t){
        //     console.log("cc.Node.EventType.TOUCH_Move");
        //     //this 函数里面的this就是target指代的
        // },this);
            
        // this.node.on(cc.Node.EventType.TOUCH_END,function(t){
        //     console.log("cc.Node.EventType.TOUCH_END");
        //     //this 函数里面的this就是target指代的
        // },this);
            
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL,function(t){
        //     console.log("cc.Node.EventType.TOUCH_CANCEL");
        //     //this 函数里面的this就是target指代的
        // },this);
        //移除target上所有的注册事件事件
        //this.node.targetOff(this);
        
        
    },
    
    //选择头像按钮，头像1-4
    //e 本次触摸事件
    //level CustomEventData 字符串对象
    on_button_click: function(e,level){
        level = parseInt(level);        //转成int
        console.log("on_button_click called:",level);
        this.sp = this.getComponent(cc.Sprite);
        num = level;
    },
    //
    // start () {

    // },

    update: function (dt) {
  
        if(num === 1){
            console.log("num === 1");
            console.log(this.node.name);
            cc.loader.loadRes("1",cc.SpriteFrame,function(err,ret){
                if(err){
                    console.log(err);
                    return;
                }
                // this.sprite.spriteFrame = ret;
                this.node.children[0].getComponent(cc.Sprite).spriteFrame = ret;
            }.bind(this));
            num = 0;
        }

        if(num === 2){
            console.log("num === 2");
            console.log(this.node.name);
            cc.loader.loadRes("2",cc.SpriteFrame,function(err,ret){
                if(err){
                    console.log(err);
                    return;
                }
                // this.sprite.spriteFrame = ret;
                this.node.children[0].getComponent(cc.Sprite).spriteFrame = ret;
            }.bind(this));
            num = 0;
        }

        if(num === 3){
            console.log("num === 3");
            console.log(this.node.name);
            cc.loader.loadRes("3",cc.SpriteFrame,function(err,ret){
                if(err){
                    console.log(err);
                    return;
                }
                // this.sprite.spriteFrame = ret;
                this.node.children[0].getComponent(cc.Sprite).spriteFrame = ret;
            }.bind(this));
            num = 0;
        }


        if(num === 4){
            console.log("num === 4");
            console.log(this.node.name);
            cc.loader.loadRes("4",cc.SpriteFrame,function(err,ret){
                if(err){
                    console.log(err);
                    return;
                }
                // this.sprite.spriteFrame = ret;
                this.node.children[0].getComponent(cc.Sprite).spriteFrame = ret;
            }.bind(this));
            num = 0;
        }
    

    },
});
