class Snake{
    constructor(){
        this.maxHeight = document.getElementById("canvas-id").clientHeight;
        this.maxWidth = document.getElementById("canvas-id").clientWidth;
        // this.startPointX= (document.getElementById("canvas-id").offsetWidth - this.maxWidth)/2;
        // this.startPointY= (document.getElementById("canvas-id").offsetHeight - this.maxHeight)/2;
        this.boxSize=10;
        this.snake={x:0,y:0 ,snbody:0};
        this.fruit={x:0,y:0};
        this.canvas=document.getElementById("canvas-id");
    }

    getMaxHeight(){
        return this.maxHeight;
    }
    getMaxWidth(){
        return this.maxWidth;
    }
    getSnakeX(){
        return this.snake.x;
    }
    getSnakeY(){
        return this.snake.y;
    }
    startGame(){
        this.setupBoard();
        this.interval = setInterval(this.playGame,1000);
        
    }
    setupBoard(){
        document.body.addEventListener("keydown",this.changeDirection);
        this.addButtons();
        this.addSnake();
        this.addFruit();
    }
    playGame(){
        console.log(this.snake);
        // this.snake.snbody.style.left=this.snake.x+this.boxSize+"px";
    }

    addButtons(){
        const startbtn = document.createElement("input");
        startbtn.type = "button";
        startbtn.className="button";
        startbtn.value = "START";
        startbtn.addEventListener("click",this.startNewGame)

        document.getElementById("btns-id").append(startbtn);

        const stopbtn = document.createElement("input");
        stopbtn.type = "button";
        stopbtn.className="button stop-btn";
        stopbtn.value = "STOP";
        stopbtn.addEventListener("click",this.stopGame)
        document.getElementById("btns-id").append(stopbtn);

        const resetBtn = document.createElement("input");
        resetBtn.type = "button";
        resetBtn.className="button reset-btn";
        resetBtn.value = "RESET";
        resetBtn.addEventListener("click",this.resetGame)
        document.getElementById("btns-id").append(resetBtn);
    }

    resetGame(){
        window.location.reload(false);
    }
    // ar mushaobs
    stopGame(){
        console.log(this.interval);
        clearInterval(this.interval);
    }

    startNewGame(){
    // rato ver xedaavs???    this.resetGame();
        window.location.reload(false);
        this.startGame();
    }
    addSnake(){
        //for(let i =0; i< 3; i++){
            
            const elem = document.createElement("div");
            elem.className="box";
            elem.style.top=this.snake.y+"px";
            elem.style.left=this.snake.x+"px";
            this.canvas.append(elem);
            this.snake.snbody=elem;
    }
    /**
     * adds fruit on random point inside canvas. if the fruits random coordinates mathces snakes coordinates , the new random cords are aquired.
     */
    addFruit(){
        const fruit = document.createElement("div");
        fruit.classList.add("box");
        fruit.classList.add("box-fruit");
        let randX = this.getRandomInt();
        while(randX<=this.snake.x+this.boxSize) randX=this.getRandomInt();
        let randY = this.getRandomInt();
        while(randY<=this.snake.y+this.boxSize) randY=this.getRandomInt();
        console.log(randY);
        console.log(randX);
        fruit.style.right=randX+"px";
        fruit.style.top=randY+"px";
        document.getElementById("canvas-id").append(fruit);

    }
    /**
     * return random number form StartingPointx to Max val
     * @param {max value} max 
     */
    getRandomInt(max=this.maxHeight){
        return Math.floor(Math.random() * (max-this.boxSize));
    }

    changeDirection(e){
        
        if(e.keyCode =="37"  ){
            console.log("left");
        }
        if(e.keyCode=="38"){
            console.log("up");
        }
        if(e.keyCode=="39"){
            console.log("right");
        }
        if(e.keyCode=="40"){
            console.log("down");
        }

    }






}
const snk = new Snake();
console.log(snk.getSnakeX());
console.log(snk.getSnakeY());
snk.startGame();