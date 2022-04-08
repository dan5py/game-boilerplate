const fpsDisplay = document.getElementById('fps');
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const mousePosition = {
    x: canvas.width / 2,
    y: canvas.height / 2,
};

// ============================================================
// Listeners
// ============================================================
addEventListener('mousemove', (event) => {
    mousePosition.x = event.x;
    mousePosition.y = event.y;
});

addEventListener('mousedown', () => {
    stopped = true;
});

addEventListener('mouseup', () => {
    stopped = false;
});

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

// ============================================================
// Objects
// ============================================================
class Object {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        c.beginPath();
        c.arc(this.moveX, this.moveY, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
    update() {
        this.draw();
    }
}

// ============================================================
// Variables
// ============================================================
let objects;

// fps stuff
let secondsPassed;
let oldTimeStamp;
let fps = 0;

function init() {
    objects = [];
    for (let i = 0; i < 100; i++) {
        const radius = Math.random() * 5 + 1;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        objects.push(new Object(x, y, radius, color));
    }
}

function animate(timeStamp) {
    updateFPS(timeStamp);
    requestAnimationFrame(animate);

    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Objects render loop
    objects.forEach((object) => {
        object.update();
    });

    /**
     * Detects if the mouse is near the object.
     * @param {Object} object
     * @param {number} triggerDistance
     * @returns
     */
    function mouseNear(object, triggerDistance) {
        const distance = Math.sqrt(
            Math.pow(mousePosition.x - object.x, 2) + Math.pow(mousePosition.y - object.y, 2)
        );

        return {
            near: distance < triggerDistance,
            distance: distance,
            trigger: triggerDistance,
        };
    }
}

/**
 * Updates the FPS counter.
 * @param {number} timeStamp
 */
function updateFPS(timeStamp) {
    if (oldTimeStamp) {
        secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        fps = Math.round(1 / secondsPassed);
    }
    oldTimeStamp = timeStamp;

    fpsDisplay.textContent = fps;
}

// ============================================================
// Start
// ============================================================
init();
animate();
