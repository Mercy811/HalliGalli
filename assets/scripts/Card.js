// type:
// fruit, monkey, pig, elephant
// s, b, p, l：
// straberry, banana, plum, lemon


// String type
// Int s,b,p,l 
function Card(type, s, b, p, l){
    this.type = type;
    if(type === "fruit"){
        this.straberry = s;
        this.banana = b;
        this.plum = p;
        this.lemon = l;
        this.loadName = s.toString()+ b.toString()+ p.toString() + l.toString();
    }else{
        this.loadName = type;
    }
}


// 把函数 Card 作为模块的输出暴露出去，这样其他模块就可以使用 Card 函数了
module.exports = Card;


