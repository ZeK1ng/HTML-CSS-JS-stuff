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
        this.direction = "right";

        this.snake=JSON.parse(JSON.stringify(startBody));
        this.snakeBodyElems=[];
        // console.log(this.snake);
        this.fruit=[
            {
                row: 0,
                col :0 ,
            }
        ]
        this.screen=document.getElementById("screen-id");
        this.scoreBoard= document.getElementById("score-id");
        this.maxScoreBoard = document.getElementById("max-score-id");
        this.score =0;
        localStorage.setItem("maxScore",0);
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
       document.body.addEventListener("keydown",this.changeDirection.bind(this));
       this.scoreBoard.innerHTML="SCORE:"+this.score;
       this.maxScoreBoard.innerHTML="HighScore:"+localStorage.getItem("maxScore");

       this.addButtons();
       this.addSnake();
       this.addFruit();
    }
    /**
     * setting board up 
     */
    changeDirection(e){
        
       if(e.keyCode ==key_left &&  this.direction != "right" ){
           this.direction = "left";
       }
       if(e.keyCode==key_right && this.direction != "left"){
           this.direction = "right";
       }
       if(e.keyCode==key_up && this.direction != "down"){
           this.direction = "up";
       }

       if(e.keyCode==key_down && this.direction != "up"){
           this.direction = "down";
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
        // console.log(this.snakeBodyElems);
    }
    addFruit(){
        const fruit = document.createElement("div");
        fruit.classList.add("box");
        fruit.classList.add("box-fruit");  
        fruit.id="fruit-id"
        this.assignRandomCords();
        fruit.style.top=this.fruit[0].row*this.boxSize+"px";
        fruit.style.left=this.fruit[0].col*this.boxSize+"px";
        this.screen.append(fruit);
        console.log(this.fruit[0].row+" "+this.fruit[0].col);
    }
    assignRandomCords(){
        let newRow,newCol;
        while(true){
            newRow=Math.floor(Math.random()*(this.maxRows-1));
            newCol = Math.floor(Math.random()*(this.maxCols-1));
            if(this.snake.filter(cords=> cords.col==newCol && cords.row==newRow).length ==0) break;
        }
        this.fruit[0].row=newRow;
        this.fruit[0].col=newCol;
        
    }
    
    resetGame(){
        this.stopGame();
        this.snake = JSON.parse(JSON.stringify(startBody));
        this.snakeBodyElems=[];
        let child=this.screen.firstChild;
        while(child){
            this.screen.removeChild(child);
            child=this.screen.firstChild;
        }
        this.addFruit();
        this.addSnake();
        this.direction="right";
        this.score =0;
        this.scoreBoard.innerHTML="SCORE:"+this.score;
        
       }

    stopGame(){
        this.gameon=false;
        clearInterval(this.interval);
    }

    startNewGame(){
        if(this.gameon){
            return;
        }
        this.gameon=true;
        this.interval = setInterval(this.playGame.bind(this),100);
    }
    playGame(){
        this.moveSnakeOneStep();
    // console.log("SNAKE " + this.snake[0].row+" "+this.snake[0].col);
    }
    
    moveSnakeOneStep(){
        
        let newCol,newRow;
        newRow=this.snake[0].row;
        newCol=this.snake[0].col;
        
        if(this.direction == "left"){
            newCol-=1;
        }
        if(this.direction=="right"){
            newCol+=1;
        }
        if(this.direction == "up"){
            newRow-=1;
        }
        if(this.direction=="down"){
            newRow+=1;
        }
        
        if(this.checkCollision(newRow,newCol) ==-1)return;
        this.snake.unshift({
            row:newRow,
            col:newCol
        });
        let isFruit = false;
        if(newRow==this.fruit[0].row && newCol == this.fruit[0].col){
            const fruit = document.getElementById("fruit-id");
            this.screen.removeChild(fruit);
            this.addFruit();
            this.score++;
            this.scoreBoard.innerHTML="SCORE:"+this.score;
            isFruit=true;
        }
        if(!isFruit){
            this.snake.pop();
            const toDelet=this.snakeBodyElems.pop();
            toDelet.parentNode.removeChild(toDelet);
        }
        const newHead = document.createElement("div");
        newHead.className="box";
        newHead.id = "box-id";
        newHead.style.top=this.snake[0].row*this.boxSize+"px";
        newHead.style.left=this.snake[0].col*this.boxSize+"px";
        this.screen.append(newHead);
        this.snakeBodyElems.unshift(newHead);
      
    }
    checkCollision(nextRow,nextCol){
       if(nextRow< 0 || nextRow>=this.maxRows || nextCol< 0 || nextCol>=this.maxCols
          || this.snake.filter(cords=> cords.row==nextRow && cords.col== nextCol).length != 0)
       {
           let currMaxScore = localStorage.getItem("maxScore");
           currMaxScore=Math.max(currMaxScore,this.score);
           localStorage.setItem("maxScore",currMaxScore);
           this.maxScoreBoard.innerHTML="HighScore:"+localStorage.getItem("maxScore");
           
           //alert("Game Over.Current Score is:"+this.score +". Max Score is:"+localStorage.getItem("maxScore"));
           this.resetGame();
            return-1;
       }
    }
 }
    
    

 const snk = new Snake();
 // console.log(snk.getSnakeCol());
 // console.log(snk.getSnakeRow());
 // console.log(snk.getMaxRows());
 // console.log(snk.getMaxCols());
 snk.startGame();