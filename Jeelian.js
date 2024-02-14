document.getElementById('noButton').addEventListener('click', function() {
    var noButton = document.getElementById('noButton');
    if (noButton.innerText === 'No') {
        noButton.innerText = 'Yes';
    } else {
        generateConfetti();
        celebrate();
    }
});

document.getElementById('yesButton').addEventListener('click', function() {
    generateConfetti();
    celebrate();
});

function celebrate() {
    var container = document.querySelector('.container');
    container.innerHTML = "<h1>YAYYYYYYY</h1>";
}
function generateConfetti() {
    var canvas = document.getElementById('confettiCanvas');
    var ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    var pieces = [];
    var numberOfPieces = 200;
    
    for (var i = 0; i < numberOfPieces; i++) {
        pieces.push({
            x: (canvas.width * Math.random()),
            y: (canvas.height * Math.random()),
            rotation: (360 * Math.random()),
            speed: (8 * Math.random() + 2),
            size: (5 * Math.random() + 5),
            color: '#' + (Math.random().toString(16) + '000000').substring(2, 8)
        });
    }
    
    function drawHeart(fromx, fromy, tox, toy,lw,hlen,color) {

        var x = fromx;
        var y = fromy;
        var width = lw ;
        var height = hlen;
      
        ctx.save();
        ctx.beginPath();
        var topCurveHeight = height * 0.3;
        ctx.moveTo(x, y + topCurveHeight);
        // top left curve
        ctx.bezierCurveTo(
          x, y, 
          x - width / 2, y, 
          x - width / 2, y + topCurveHeight
        );
      
        // bottom left curve
        ctx.bezierCurveTo(
          x - width / 2, y + (height + topCurveHeight) / 2, 
          x, y + (height + topCurveHeight) / 2, 
          x, y + height
        );
      
        // bottom right curve
        ctx.bezierCurveTo(
          x, y + (height + topCurveHeight) / 2, 
          x + width / 2, y + (height + topCurveHeight) / 2, 
          x + width / 2, y + topCurveHeight
        );
      
        // top right curve
        ctx.bezierCurveTo(
          x + width / 2, y, 
          x, y, 
          x, y + topCurveHeight
        );
      
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
      
      }
    
    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        pieces.forEach(function(piece) {
            piece.y += piece.speed;
            piece.rotation += (piece.speed / 2);
            
            drawHeart(piece.x, piece.y,piece.x+5,piece.y+5, 12,12, piece.color);
            
            if (piece.y > canvas.height) {
                piece.y = 0 - piece.size;
            }
        });
        
        requestAnimationFrame(update);
    }
    
    update();
}