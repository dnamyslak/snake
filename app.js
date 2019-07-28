/**
 * Gra w węża ...
 */


const $gameScore = document.getElementById('js-game-score');
const $gameLevel = document.getElementById('js-game-level');

function printScore(score) {
    $gameScore.innerHTML = score;
}
function printLevel(level) {
    $gameLevel.innerHTML = level;
}


function Game(canvas, options) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    this.score = 0;
    this.level = 1;
    this.key = 'right';
    this.entities = [];

    this.options = {
        fps: 15
    };

    if (options) {
        for (var i in options) this.options[i] = options[i];
    }

    this.scale();
}

Game.prototype.start = function () {
    this.keyBindings();
    this.gameLoop();
};
Game.prototype.stop = function() {
    this.pause = true;
};

Game.prototype.scale = function () {
    this.ratio = innerWidth < innerHeight ? innerWidth : innerHeight;
    this.tile = (this.ratio / 20) | 0;
    this.grid = this.ratio / this.tile;

    this.canvas.width = this.canvas.height = this.ratio;
};


Game.prototype.addEntity = function (entity) {
    this.entities.push(entity);
};
/* kolizje - bedzie do modyfikacji jak sciany zrobię w innym ksztalcie niz xy */
Game.prototype.collide = function(snake, target){
    return snake.x === target.x && snake.y === target.y;
};

Game.prototype.keyBindings = function () {
    var that = this;

    // define some keys
    var keys = {
        left: 37,
        right: 39,
        up: 38,
        down: 40
    };


    /**
     * Attach keyboard arrows to snake direction
     */
    document.onkeydown = function (e) {
        switch ((e.which || e.keyCode) | 0) {
            case keys.left:
                if (that.key !== 'right') that.key = 'left';
                break;

            case keys.right:
                if (that.key !== 'left') that.key = 'right';
                break;

            case keys.up:
                if (that.key !== 'down') that.key = 'up';
                break;

            case keys.down:
                if (that.key !== 'up') that.key = 'down';
                break;
        }
    };

};

Game.prototype.gameLoop = function () {
    if(this.pause) return;

    var self = this,
        ctx = this.context;

    ctx.fillStyle = "#123";

    ctx.globalAlpha = 0.5;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.globalAlpha = 1;

    var i = this.entities.length;

    while(i--) {
        var entity = this.entities[i];
        if(entity.update) entity.update();
        if(entity.draw) entity.draw(ctx);
    }


    setTimeout(function(){
        self.gameLoop()
    }, 1500 / this.options.fps);
};


function checkGameScore(score) {
    // console.log('score', score);

    if(!(score % 3)) {
        bonusPoint.x = bonusPoint.y = Math.abs(Math.random() * game.tile | 0);
    }

    if(!(score % 7)) {
        shortenSnake.x = shortenSnake.y = Math.abs(Math.random() * game.tile | 0);
    }

    if(score >= 0) {
        game.level = 1;
        checkGameLevel(game.level);


        if ((score === 3)) {
            game.addEntity(bonusPoint);
        }
        if ((score === 4)) {
            game.addEntity(shortenSnake);
        }
        if ((score === 5)) {
            game.addEntity(fasterSnake);
        }
    }

    if(score >= 5) {

        if(!(score % 2)) {
            game.addEntity(bonusPoint);
        }
    }

    if(score >= 10) {

        game.level = 2;
        checkGameLevel(game.level);


        if(!(score % 4)) {
            game.addEntity(bonusPoint);
        }

        if(!(score % 3)) {
            game.addEntity(fasterSnake);
        }
    }

    if(score >= 20) {
        game.level = 3;
        checkGameLevel(game.level);

        if(!(score % 3)) {
            game.addEntity(slowerSnake);
        }
        if(!(score % 4)) {
            game.addEntity(shortenSnake);
        }

        if(!(score % 6)) {
            game.addEntity(bonusPoint);
        }
    }

    if(score >= 40) {


        game.level = 4;
        checkGameLevel(game.level);




        if(!(score % 4)) {
            game.addEntity(bonusPoint);
        }

        if(!(score % 6)) {
            game.addEntity(fasterSnake);
        }

        if(!(score % 3)) {
            game.addEntity(slowerSnake);
        }

        if(!(score % 7)) {
            game.addEntity(shortenSnake);
        }
    }

    if(score >= 60) {



        game.level = 5;
        checkGameLevel(game.level);



        if(!(score % 3)) {
            game.addEntity(slowerSnake);
        }

        if(!(score % 4)) {
            game.addEntity(bonusPoint);
        }

        if(!(score % 6)) {
            game.addEntity(fasterSnake);
        }

        if(!(score % 7)) {
            game.addEntity(shortenSnake);
        }

    }



}

function checkGameLevel(level) {
    switch(level) {
        case 1 :
            game.options.fps = 15;
            // console.log('Level:', level);
            // console.log('FPS:', game.options.fps);
            printLevel(game.level);
            return game.options.fps;
            break;
        case 2 :
            game.options.fps = 20;
            // console.log('Level:', level);
            // console.log('FPS:', game.options.fps);
            printLevel(game.level);
            return game.options.fps;
            break;
        case 3 :
            game.options.fps = 25;
            // console.log('Level:', level);
            // console.log('FPS:', game.options.fps);
            printLevel(game.level);
            return game.options.fps;
            break;
        case 4 :
            game.options.fps = 30;
            // console.log('Level:', level);
            // console.log('FPS:', game.options.fps);
            printLevel(game.level);
            return game.options.fps;
            break;
        case 5 :
            game.options.fps = 35;
            // console.log('Level:', level);
            // console.log('FPS:', game.options.fps);
            printLevel(game.level);
            return game.options.fps;
            break;
    }
}


/**
 * wlaczenie / wylaczenie turbo
 */

function turbo(fps) {
    endTurbo(fps).then(startTurbo(fps));
}

function endTurbo(fps) {
    return new Promise(function() {
        setTimeout((function() {
            console.log('Wyłączone turbo');
            checkGameLevel(game.level);
        }), 5000);
    });
}

function startTurbo(fps) {
    var speed = fps + 30;
    console.log('Właczone turbo');
    game.options.fps = speed;
    return game.options.fps;
}


/**
 * wlaczenie / wylaczenie spowolnienia
 */

function slow(fps) {
    endSlow(fps).then(startSlow(fps));
}

function endSlow(fps) {
    return new Promise(function() {
        setTimeout((function() {
            console.log('Wyłączone spowolnienie');
            checkGameLevel(game.level);
        }), 5000);
    });
}

function startSlow(fps) {
    var slow = fps - 14;
    console.log('Właczone spowolnienie');
    game.options.fps = slow;
    return game.options.fps;
}



/**
 * serce
 */
function Snake(game, food, bonusPoint, shortenSnake, fasterSnake, slowerSnake){
    var tile = game.tile;
    var grid = game.grid;
    var collide = game.collide;


    this.x = 4;
    this.y = 4;
    this.segments = [];

    this.update = function() {

        var snake = this.segments;
        // console.log('snake.length', snake.length );

        printScore(game.score);

        // zmiana kierunków
        if(game.key === 'left') this.x--;
        if(game.key === 'right') this.x++;
        if(game.key === 'up') this.y--;
        if(game.key === 'down') this.y++;

        // granice
        this.x = (this.x + tile) % tile;
        this.y = (this.y + tile) % tile;


        /**
         * kolizje
         */
        if (collide(this, food, snake)) {
            game.score += 1;

            // wrzucamy randomowo jabłuszko
            food.x = food.y = Math.random() * tile | 0;

            checkGameScore(game.score, game.level, tile);

        } else if (collide(this, bonusPoint)) {
            game.score += 5;
            bonusPoint.x = bonusPoint.y = -1;
            checkGameScore(game.score, game.level);

        } else if (collide(this, shortenSnake, snake)) {
            shortenSnake.x = shortenSnake.y = -1;
            var snakeTail = {x: snake[snake.length-1].x, y: snake[snake.length-1].y};
            this.segments.pop(snakeTail);
            this.segments.pop(snakeTail);

        } else if (collide(this, fasterSnake)) {
            fasterSnake.x = fasterSnake.y = -1;
            turbo(game.options.fps);

        } else if (collide(this, slowerSnake)) {
            slowerSnake.x = slowerSnake.y = -1;
            slow(game.options.fps);

        } else {
            if (this.segments.length) this.segments.pop();
        }

        this.segments.unshift({x:this.x, y:this.y});

        /**
         * sprawdzamy czy nie najeżdża sam na siebie
         */
        var i = this.segments.length;
        while (--i) {
            if(game.collide(this, this.segments[i])) {
                game.stop();
                alert("Koniec Gry");
            }
        }

    };

    this.draw = function(ctx) {
        var i = this.segments.length;
        while (i--) {
            var segment = this.segments[i];
            ctx.fillStyle = !i ? '#13c81a' : '#055500';
            ctx.fillRect(
                segment.x * grid,
                segment.y * grid,
                grid, grid);
        }
    };
}


/**
 * Rzeczy do pojawiania się
 */
function Food(game){
    var grid = game.grid;

    this.x = 4;
    this.y = 4;

    this.draw = function(ctx){
        ctx.fillStyle = "#c06411";
        ctx.fillRect(this.x * grid, this.y * grid, grid, grid);
    };
}

function BonusPoint(game){
    var grid = game.grid;

    this.x = 30;
    this.y = 20;

    this.draw = function(ctx){
        ctx.fillStyle = "#c00700";
        ctx.fillRect(this.x * grid, this.y * grid, grid, grid);
    };
}

function shortenSnake(game){
    var grid = game.grid;

    this.x = 15;
    this.y = 10;

    this.draw = function(ctx){
        ctx.fillStyle = "#542f0a";
        ctx.fillRect(this.x * grid, this.y * grid, grid, grid);
    };
}

function fasterSnake(game){
    var grid = game.grid;

    this.x = 3;
    this.y = 2;

    this.draw = function(ctx){
        ctx.fillStyle = "#227cc0";
        ctx.fillRect(this.x * grid, this.y * grid, grid, grid);
    };
}

function slowerSnake(game){
    var grid = game.grid;

    this.x = 11;
    this.y = 23;

    this.draw = function(ctx){
        ctx.fillStyle = "#bfc000";
        ctx.fillRect(this.x * grid, this.y * grid, grid, grid);
    };
}




var canvas = document.createElement("canvas");
document.body.appendChild(canvas);


var game = new Game(canvas);
var food = new Food(game);
var bonusPoint = new BonusPoint(game);
var shortenSnake = new shortenSnake(game);
var fasterSnake = new fasterSnake(game);
var slowerSnake = new slowerSnake(game);
var snake = new Snake(game, food, bonusPoint, shortenSnake, fasterSnake, slowerSnake);

game.addEntity(food);
game.addEntity(snake);
// game.start();

var starter = document.getElementById("start");
var startingLevel = 1;

function checkLevel(startingLevel) {
    startingLevel = document.getElementById("f-level").value;
    console.log('startingLevel', startingLevel);
}

starter.addEventListener("click", function() {
    game.start();
    game.level = startingLevel;
    checkGameLevel(game.level);
}, {once : true});



/**
 * KOMENTARZ DO ZADANIA
 */
/*
brakuje jeszcze tych labiryntow - nie bardzo wiedzialem jak to ma wygladac, ale pewnie dopisalbym pojawienie sie dodatkowych obiektow losowych po zderzeniu z ktorymi koncyl by grę .

poniewaz na poczatku uzalezniłem zmiane leveli od ilosci punktow, a potem doczytalem ze to jeszcze ma byc wybieranie na poczatku, bo
w kolejnych krokach trzeba by przerobic zmiane leveli + startowanie z wybranego levelu no i dodanie scian w roznych konfiguracjach w zaleznosci od levelu
zdarzylem dorobic przycisk start i select ale przerobienie teraz tego jw to znow z 1-2h

trzeba by jeszcze pomodifikowac warunki i porobic IFY ze zmiana punkotw bonusowych/szybkosci/ucinania itp w zaleznosci od levelu ...

no i dorobic cookies z zapisywanie wyniku

uciekam juz na imieniny do babci, wiec dzis juz nie usiąde do tego - także zostawiam jak jest.
 */