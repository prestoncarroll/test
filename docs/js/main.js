const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const gravity = .5;

canvas.width = 1800;
canvas.height = 110;

const images = {};
images.player = new Image();
images.player.src = './img/charactersCutCopy.png';
const characterActions = ['standLeft', 'standRight', 'left', 'right', 'jumpRight', 'jumpLeft'];
const characters = [];

const backGround = {};
backGround.bricks = new Image();
backGround.bricks.src = './img/mariofloor.png'

class Character{
    constructor(){
        this.width = 20.89;
        this.height = 44;
        // this.width = 18.3214286;
        // this.height = 36;
        this.frameX = 14
        this.frameY = 0;
        this.x = 200;
        this.y = 20;
        // this.x = 100;
        // this.y = 180;
        this.speed = (5)
        this.action = 'standRight';
        this.velocity = {
            x: 0,
            y: 0
        }
    }

    draw(){
        drawSprite(images.player, this.width * this.frameX, this.height * this.frameY, this.width,
        this.height, this.x, this.y, this.width, this.height);

        this.x += this.velocity.x
        this.y += this.velocity.y
    }

   update(){

    this.y += this.velocity.y

    if(this.y + this.height + 
    this.velocity.y <= canvas.height)
    this.velocity.y += gravity
    else this.velocity.y = 0;

    if (this.action === 'right'){
        if (this.x < canvas.width + this.width)
            this.x +=  this.speed;
        else this.x = 0 - this.width;
    }
    }
}


class Platform{
    constructor(){
    this.x = 0;
    this.y = 100;
    this.width = 1700;
    this.height = 20;
    this.image = backGround.bricks;

    }

    draw(){
        context.drawImage(this.image, this.x, this.y)
    }
}

const character = new Character();
const platform = new Platform();
characters.push(character);

function drawSprite(img, sX, Sy, sW, sH, dX, dY, dW, dH){
    context.drawImage(img, sX, Sy, sW, sH, dX, dY, dW, dH)
}

function animate(){
    
    context.clearRect(0,0,canvas.width, canvas.height );
    characters[0].draw();
    characters[0].update();
    platform.draw();

    if (keys.right.pressed) {
        character.velocity.x = 5;
    } else if (keys.left.pressed){
        character.velocity.x = -5
    } 
    else {
        character.velocity.x = 0
    };

    if (character.x < canvas.width + character.width) {
        // character.x += character.speed;
    } else {
        character.x = 0 - character.width;
    }

    //makes it to where mario jumps and lands on
    // if (character.y + character.height <= 
    //     platform.y && character.y + character.height + character.velocity.y >= platform.y)
    //     {
    //         character.velocity.y = 0 -1;
    //     }
}

window.onload = setInterval(animate, 1000/30);

// window.addEventListener('resize', function() {
//     document.getElementById("resume").
//     canvas.height = 90;
//     canvas.width = 100;
// })

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    },
    down: {
        pressed: false
    }
}

let characterFacingLeft = true

document.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch(event.key){
    case 'ArrowLeft' :
        character.velocity.x = -5
        if (character.frameX > 1 && character.frameX <= 13){ 
            character.frameX--;
        }
        else character.frameX = 13;
        keys.left.pressed = true
        break
    case 'ArrowDown':
        console.log("down")
        character.frameX = 15;
        break
    case 'ArrowRight':
        character.velocity.x = 5;
        if (character.frameX < 23 && character.frameX >= 14){ 
             character.frameX++ ; 
        }
        else character.frameX = 14;
        keys.right.pressed = true;
        break
    case 'ArrowUp':
        document.getElementById('marioJump').play();
        if (characterFacingLeft = true){
            character.frameX = 20;
        } else {
        character.frameX = 7;
        }
        if (event.repeat){
            return
        } character.velocity.y -= 6
        break
    }
})

document.addEventListener('keyup', (event) => {
    switch(event.key){
    case 'ArrowLeft' :
        keys.left.pressed = false
        character.frameX = 13;
        break
    case 'ArrowDown':
        keys.down.pressed = false
        character.frameX = 14;
        break
    case 'ArrowRight':
        keys.right.pressed = false
        character.frameX = 14;
        break
    case 'ArrowUp':
        keys.up.pressed = false;
        character.frameX = 14;
        break
    }
});
