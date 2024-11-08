let m1 = 1.0, m2 = 1.0, v1 = 1.0, v2 = -1.0;
let x1 = 100, x2 = 300;
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let ballRadius = 20;
let animationFrame;

function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x1, canvas.height / 2, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x2, canvas.height / 2, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
}

function simulateCollision() {
    let data = {
        m1: m1,
        m2: m2,
        v1: v1,
        v2: v2
    };
    
    fetch('/simulate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        v1 = data.v1_final;
        v2 = data.v2_final;
    });
}

function moveBalls() {
    x1 += v1;
    x2 += v2;

    if (x1 + ballRadius >= x2 - ballRadius) {
        simulateCollision();
    }

    if (x1 > canvas.width - ballRadius || x1 < ballRadius) {
        v1 = -v1;
    }

    if (x2 > canvas.width - ballRadius || x2 < ballRadius) {
        v2 = -v2;
    }

    updateCanvas();
    animationFrame = requestAnimationFrame(moveBalls);
}

function stopAnimation() {
    cancelAnimationFrame(animationFrame);
}

function updateValues() {
    m1 = parseFloat(document.getElementById('m1').value);
    m2 = parseFloat(document.getElementById('m2').value);
    v1 = parseFloat(document.getElementById('v1').value);
    v2 = parseFloat(document.getElementById('v2').value);
}

document.getElementById('start').addEventListener('click', function() {
    updateValues();
    moveBalls();
});

document.getElementById('stop').addEventListener('click', function() {
    stopAnimation();
});

document.getElementById('reset').addEventListener('click', function() {
    stopAnimation();
    x1 = 100;
    x2 = 300;
    updateCanvas();
});
