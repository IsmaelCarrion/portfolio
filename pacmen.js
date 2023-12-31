var pos = 0;
var direction = 0;
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
    // returns an object with random values scaled {x: 33, y: 21}
    let velocity = setToRandom(10); // {x:?, y:?}
    let position = setToRandom(200);
    position.y = position.y+220;
    let imgIndx = 0;
    // Add image to div id = game
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = './assets/PacMan1.png';
    imgIndx = 1;
    newimg.width = 100;
    //
    // set position here 
    //
    newimg.style.top = position.y;
    newimg.style.left = position.x;

    // add new Child image to game to the div element which id = game.
    game.appendChild(newimg);
    
    // return details in an object
    return {
        position,
        velocity,
        newimg,
        imgIndx
    }
}

//open and closes the packmen mouth
const switch_pacMouth = (item) => {
    switch (item.imgIndx) {
        case 1:
            item.newimg.src = './assets/PacMan2.png';
            item.imgIndx = 2;
            break;
        case 2:
            item.newimg.src = './assets/PacMan1.png';
            item.imgIndx = 1;
            break
        case 3:
            item.newimg.src = './assets/PacMan4.png';
            item.imgIndx = 4;
            break;
        case 4:
            item.newimg.src = './assets/PacMan3.png';
            item.imgIndx = 3;
            break;
    }
}


//changes the packmen image when they change direction
const switch_pacDir = (item) => {
    switch (item.imgIndx) {
        case 1: 
            item.newimg.src = './assets/PacMan4.png';
            item.imgIndx = 4;
            break;
        case 2:
            item.newimg.src = './assets/PacMan3.png';
            item.imgIndx = 3;
            break;
        case 3:
            item.newimg.src = './assets/PacMan2.png';
            item.imgIndx = 2;
            break;
        case 4: 
            item.newimg.src = './assets/PacMan1.png';
            item.imgIndx = 1;
            break;
    }

}


function update() {
    //loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
        checkCollisions(item)
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;

        item.newimg.style.left = item.position.x;
        item.newimg.style.top = item.position.y;
      
        switch_pacMouth(item);
        
    })
    setTimeout(update, 100);
}

function checkCollisions(item) {
    //
    // detect collision with all walls and make pacman bounce
    //
    if (
            item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
            item.position.x + item.velocity.x < 0
        ) {
            item.velocity.x = -item.velocity.x; 
            switch_pacDir(item);
        }

    if (
            item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
            item.position.y + item.velocity.y < 220
        ) item.velocity.y = -item.velocity.y;
}

function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
}