const key_left = "37";
const key_right = "39";
const key_down = "40";
const key_up="38";
const startBody = [
    {
        row:0,
        col:3
    },
    {
        row :0,
        col:2
    },
    {
        row:0,
        col:1
    },
    {
        row :0,
        col :0
    },
]
class Snake{
    constructor(){
        this.boxSize=10;
        this.maxHeight = document.getElementById("screen-id").clientHeight;
        this.maxWidth = document.getElementById("screen-id").clientWidth;
        this.maxRows= this.maxHeight/this.boxSize;
        this.maxCols = this.maxWidth/this.boxSize;
        this.gameon=false;
        this.direction = 
        // this.startPointX= (document.getElementById("screen-id").offsetWidth - this.maxWidth)/2;
        // this.startPointY= (document.getElementById("screen-id").offsetHeight - this.maxHeight)/2;
        this.snake=JSON.parse(JSON.stringify(startBody));
        this.snakeBodyElems=[];
        console.log(this.snake);
        this.fruit=[
            {
                row: 0,
                col :0 ,
            }
        ]
        this.screen=document.getElementById("screen-id");
    }

    getMaxHeight(){
        return this.maxHeight;
    }
    getMaxWidth(){
        return this.maxWidth;
    }
    getMaxCols(){
        return this.maxCols;
    }
    getMaxRows(){
        return this.maxRows;
    }
    getSnakeRow(){
        return this.snake[0].row;
    }
    getSnakeCol(){
        return this.snake[0].col;
    }

    startGame(){
        this.setupBoard();
    }
    setupBoard(){
        document.body.addEventListener("keydown",this.changeDirection);
        this.addButtons();
        this.addSnake();
        this.addFruit();
    }
    /**
     * setting board up 
     */
    changeDirection(e){
        
        if(e.keyCode ==key_left  ){
        
        }
        if(e.keyCode==key_right){
            console.log("right");
        }
        if(e.keyCode==key_up){
            console.log("up");
        }
     
        if(e.keyCode==key_down){
            console.log("down");
        }

    }
    addButtons(){
        const startbtn = document.createElement("input");
        startbtn.type = "button";
        startbtn.className="button";
        startbtn.value = "START";
        startbtn.addEventListener("click",this.startNewGame.bind(this))

        document.getElementById("btns-id").append(startbtn);

        const stopbtn = document.createElement("input");
        stopbtn.type = "button";
        stopbtn.className="button stop-btn";
        stopbtn.value = "STOP";
        stopbtn.addEventListener("click",this.stopGame.bind(this))
        document.getElementById("btns-id").append(stopbtn);

        const resetBtn = document.createElement("input");
        resetBtn.type = "button";
        resetBtn.className="button reset-btn";
        resetBtn.value = "RESET";
        resetBtn.addEventListener("click",this.resetGame.bind(this))
        document.getElementById("btns-id").append(resetBtn);
    }
    addSnake(){
        for(let i =0; i<this.snake.length; i++){
            
            const elem = document.createElement("div");
            elem.className="box";
            elem.id = "box-id";
            elem.style.top=this.snake[i].row*this.boxSize+"px";
            elem.style.left=this.snake[i].col*this.boxSize+"px";
            this.screen.append(elem);
            this.snakeBodyElems.push(elem);
        }
        console.log(this.snakeBodyElems);
    }


    addFruit(){
        const fruit = document.createElement("div");
        fruit.classList.add("box");
        fruit.classList.add("box-fruit");  
        fruit.id="fruit-id"
        this.assignRandomCords();
        fruit.style.right=this.fruit.row*this.boxSize+"px";
        fruit.style.top=this.fruit.col*this.boxSize+"px";
        document.getElementById("screen-id").append(fruit);
    }

    assignRandomCords(){
        let newRow,newCol;
        while(true){
            newRow=Math.floor(Math.random()*(this.maxRows-1));
            newCol = Math.floor(Math.random()*(this.maxCols-1));
            if(this.snake.filter(cords=> cords.col==newCol && cords.row==newRow).length ==0) break;
        }
        this.fruit.row=newRow;
        this.fruit.col=newCol;
    }



    


    resetGame(){
        this.stopGame();
        this.snake = startBody;
        const oldFruit=document.getElementById("fruit-id");
        oldFruit.parentNode.removeChild(oldFruit);
        this.addFruit();
    }


    stopGame(){
        this.gameon=false;
        clearInterval(this.interval);
    }

    
    
    
    startNewGame(){
        if(this.gameon){
            //clearInterval(this.interval);
            alert("please end the current game");
           // this.interval = setInterval(this.playGame.bind(this),1000);

            return;
        }
        this.gameon=true;
        this.interval = setInterval(this.playGame.bind(this),1000);
    }
    playGame(){
        this.moveSnakeOneStep();
    }
    
    moveSnakeOneStep(){

        console.log(this.snake);
        let newCol,newRow;
        newRow=this.getSnakeRow();
        newCol = this.getSnakeCol()+1;
        this.snake.unshift({
            row:newRow,
            col:newCol
        });
        this.snake.pop();
        const toDelet=this.snakeBodyElems.pop();
        toDelet.parentNode.removeChild(toDelet);
        console.log(this.snake);

       
    }





}
const snk = new Snake();
// console.log(snk.getSnakeCol());
// console.log(snk.getSnakeRow());
// console.log(snk.getMaxRows());
// console.log(snk.getMaxCols());
snk.startGame();