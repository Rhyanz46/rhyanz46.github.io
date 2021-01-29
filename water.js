const canvas = document.getElementById('bottom-animation');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
// Set canvas to the size of the viewable window.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Build three waves with slightly different settings.
let waves = [];
waves.push(new Wave({
    frequency: .02,
    current: .04,
    verticalOffset: 100
}));
waves.push(new Wave({
    frequency: .02,
    current: .032,
    amplitude: 25,
    verticalOffset: 120
}));
waves.push(new Wave({
    frequency: .025,
    current: .03,
    amplitude: 15,
    verticalOffset: 135
}));

// Draw loop.
drawing();

function drawing() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    waves.forEach(wave => wave.draw());
    setTimeout(() => {
        window.requestAnimationFrame(drawing);
    }, 1);
}


function Wave(options) {
    this.options = {
        amplitude: 20,
        frequency: .05,
        current: .01,
        verticalOffset: 0,
        fillStyle: "#3a99b8",
        strokeStyle: "#3a99b8",
        ...options
    };
    this.tick = 0;

    this.draw = function () {
        ctx.shadowColor = "#4aA9C8";
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;
        ctx.strokeStyle = this.options.strokeStyle;
        ctx.fillStyle = this.options.fillStyle;
        ctx.beginPath();

        // Move to first coordinate.
        ctx.moveTo(0, getY(0));

        // Draw the wave across the x axis.
        for (let x = 1; x < canvas.width; x++) {
            ctx.lineTo(x, getY(x));
        }
        ctx.stroke();

        // Close the shape around the bottom of the canvas.
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();

        this.tick += this.options.current;
    }

    const getY = x => {
        // Offset by half the canvas to start, and add the extra offset at the end.
        return (canvas.height / 2 - (Math.cos(x * this.options.frequency - this.tick) * this.options.amplitude * Math.cos(this.tick))) + Math.sin(this.tick) * (this.options.amplitude / 2) + this.options.verticalOffset;
    }
}