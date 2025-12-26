const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

// spine settings
const SEGMENTS = 40;
const LENGTH = 12;
let spine = [];

// create spine points
for (let i = 0; i < SEGMENTS; i++) {
    spine.push({ x: mouse.x, y: mouse.y });
}

// mouse follow
window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function update() {
    // head follows mouse
    spine[0].x += (mouse.x - spine[0].x) * 0.2;
    spine[0].y += (mouse.y - spine[0].y) * 0.2;

    // tail follows head
    for (let i = 1; i < SEGMENTS; i++) {
        let dx = spine[i - 1].x - spine[i].x;
        let dy = spine[i - 1].y - spine[i].y;
        let angle = Math.atan2(dy, dx);

        spine[i].x = spine[i - 1].x - Math.cos(angle) * LENGTH;
        spine[i].y = spine[i - 1].y - Math.sin(angle) * LENGTH;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;

    // spine
    ctx.beginPath();
    for (let i = 0; i < SEGMENTS; i++) {
        ctx.lineTo(spine[i].x, spine[i].y);
    }
    ctx.stroke();

    // ribs (reptile bones)
    for (let i = 5; i < SEGMENTS - 5; i++) {
        let dx = spine[i + 1].x - spine[i - 1].x;
        let dy = spine[i + 1].y - spine[i - 1].y;
        let angle = Math.atan2(dy, dx);

        let size = 18;
        ctx.beginPath();
        ctx.moveTo(
            spine[i].x + Math.cos(angle + Math.PI / 2) * size,
            spine[i].y + Math.sin(angle + Math.PI / 2) * size
        );
        ctx.lineTo(
            spine[i].x + Math.cos(angle - Math.PI / 2) * size,
            spine[i].y + Math.sin(angle - Math.PI / 2) * size
        );
        ctx.stroke();
    }
}

function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

animate();
