let fpsDisplay = document.getElementById('fps-display');
let frameCount = 0;
let startTime;

function updateFPS() {
    frameCount++;

    if (!startTime) {
        startTime = performance.now();
    }

    const currentTime = performance.now();
    const elapsedTime = currentTime - startTime;

    if (elapsedTime >= 1000) {
        const fps = Math.round((frameCount / elapsedTime) * 1000);
        fpsDisplay.textContent = `FPS: ${fps.toFixed(0)}`;
        frameCount = 0;
        startTime = currentTime;
    }

    requestAnimationFrame(updateFPS);
}

updateFPS();





