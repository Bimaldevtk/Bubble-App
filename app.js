const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const resetBtn = document.getElementById('resetBtn');

const circles = [
    { x: 100, y: 100, radius: 30, color: 'yellow', targetColor: 'lightyellow' },
    { x: 100, y: 200, radius: 30, color: 'blue', targetColor: 'lightblue' },
    { x: 100, y: 300, radius: 30, color: 'green', targetColor: 'lightgreen' },
    { x: 100, y: 400, radius: 30, color: 'red', targetColor: 'pink' },
];

const arrows = [
    { x: 700, y: 100, speed: 0 },
    { x: 700, y: 200, speed: 0 },
    { x: 700, y: 300, speed: 0 },
    { x: 700, y: 400, speed: 0 },
];

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach((circle, index) => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.fillStyle = circle.color;
        ctx.fill();
        ctx.closePath();

        const arrow = arrows[index];
        ctx.beginPath();
        ctx.moveTo(arrow.x, arrow.y);
        ctx.lineTo(arrow.x - 20, arrow.y - 10);
        ctx.lineTo(arrow.x - 20, arrow.y + 10);
        ctx.closePath();
        ctx.fillStyle = 'black';
        ctx.fill();
    });
}

function update() {
    arrows.forEach((arrow, index) => {
        if (arrow.speed > 0) {
            arrow.x -= arrow.speed;
            if (arrow.x <= circles[index].x + circles[index].radius) {
                arrow.speed = 0;
                circles[index].color = circles[index].targetColor;
            }
        }
    });
}

function isInsideCircle(circle, x, y) {
    const dx = x - circle.x;
    const dy = y - circle.y;
    return dx * dx + dy * dy <= circle.radius * circle.radius;
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    circles.forEach((circle, index) => {
        if (isInsideCircle(circle, x, y)) {
            arrows[index].speed = 5;
        }
    });
});

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let hovering = false;
    circles.forEach(circle => {
        if (isInsideCircle(circle, x, y)) {
            hovering = true;
        }
    });
    canvas.style.cursor = hovering ? 'pointer' : 'default';
});

resetBtn.addEventListener('click', () => {
    arrows.forEach(arrow => arrow.x = 700);
    arrows.forEach(arrow => arrow.speed = 0);
    circles.forEach(circle => circle.color = circle.targetColor.replace('light', ''));
    draw();
});

function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

draw();
animate();
