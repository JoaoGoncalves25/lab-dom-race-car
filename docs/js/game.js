class Game {
    constructor(){
        this.startScreen=document.getElementById("game-intro"); 
        this.gameScreen= document.getElementById("game-screen");
        this.gameEndScreen=document.getElementById("game-end");

        // I am going to create a player in the future. For this amount of the code-along, I'll
        // leave it null.
        this.player=new Player(this.gameScreen,200,500,100,150,"images/road.png");
        
        //gameboard
        this.height=350;
        this.width=650;
        
        // Obstacles
        this.obstacles=[];

        // Score
        this.score=0;

        // Lives
        this.lives=3;

        // Variable to check if i'm in the process of creating an obsctale
        this.isPushingObstacle=false;

        // Variable to check if the Game is Over
        this.gameIsOver= false;

        this.soundtrack=null;
    }

    start(){
     
        //Sets the height and width of the game screen.
     this.gameScreen.style.height=`${this.height}px`;
     this.gameScreen.style.width=`${this.width}px`;
    
     //Hides the start screen.
    this.startScreen.style.display= "none";
    
    //Shows the game screen.
    this.gameScreen.style.display="block";

    this.soundtrack=document.getElementById('soundtrack');

    this.soundtrack.play();

    //Starts the game loop 
    this.gameLoop();
    }
    
    gameLoop(){
        if(this.gameIsOver){
            return;
        }
        this.update();

        window.requestAnimationFrame(()=>this.gameLoop());
    }
    update(){
        /* Score, Lives ScoreBoard */
        let score= document.getElementById("score");
        let lives= document.getElementById("lives");

        /* Every Frame of the Game, I want to check if the is moving */
        this.player.move();

        for(let i= 0;i<this.obstacles.length;i++){
            const obstacle= this.obstacles[i];
            obstacle.move();

            if(this.player.didCollide(obstacle)){
                obstacle.element.remove();

                this.obstacles.splice(i,1);

                this.lives--;
            }

            else if (obstacle.left<0){
                this.score++;

                // Remove the obstacle HTML Element from the HTML.
                obstacle.element.remove();

                // Remove the obstacle from the game class obstacles array.
                this.obstacles.splice(i,1);
            }
        }
        if(this.lives===0) {
            this.endGame();
        }

        // If there are no obstacles, push a new one after 1second and half.
        else if(!this.obstacles.length && !this.isPushingObstacle){
            this.isPushingObstacle=true;
            setTimeout(()=>{
                this.obstacles.push(new Obstacle(this.gameScreen));
                this.isPushingObstacle=false;
            }, 1500);
        }

        score.innerHTML = this.score;
        lives.innerHTML= this.lives;

    }

    endGame(){
        // Change the gameIsOver status. If it's true, remember that this is going to break the animation loop.
        this.gameIsOver=true;
        
        // Remove Player
        this.player.element.remove();

        // Remove all Obstacles 
        this.obstacles.forEach((obstacle,index)=>{
        // Remove the obstacle form JS
        
        // Remove the obsctacle from HTML 
        obstacle.element.remove();
        });

        // Hide the Current Game Screen... 
        this.gameScreen.style.display="none";
        // 
        this.gameEndScreen.style.display="block";

        const highestScore = localStorage.getItem("highestScore");
        console.log("Current highestScore:", highestScore);
        
        if (highestScore && this.score > highestScore) {
            console.log("Updating highestScore:", this.score);
            localStorage.setItem("highestScore", this.score);
        
        }
    } 
}
