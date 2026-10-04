
const nav = document.querySelector('#navbar');
const boxes = [...document.querySelectorAll('#floatingcups .box')]
    .filter(box => box.querySelector('img')?.getAttribute('src')?.trim());

const FPS = 60;

const movers = boxes.map(box => {
    const topBoundary = nav.getBoundingClientRect().bottom;
    const maxX = Math.max(0, window.innerWidth - box.offsetWidth);
    const maxY = Math.max(topBoundary, window.innerHeight - box.offsetHeight);

    return {
        box,
        xPosition: Math.random() * maxX,
        yPosition: topBoundary + Math.random() * Math.max(0, maxY - topBoundary),
        xSpeed: 3,
        ySpeed: 3
    };
});

function update(mover) {
    mover.box.style.left = mover.xPosition + 'px';
    mover.box.style.top = mover.yPosition + 'px';
}

setInterval(() => {
    const topBoundary = nav.getBoundingClientRect().bottom;

    for (const mover of movers) {
        const maxX = Math.max(0, window.innerWidth - mover.box.offsetWidth);
        const maxY = window.innerHeight - mover.box.offsetHeight;

        mover.xPosition += mover.xSpeed;
        mover.yPosition += mover.ySpeed;

        if (maxX > 0 && (mover.xPosition <= 0 || mover.xPosition >= maxX)) {
            mover.xPosition = Math.max(0, Math.min(mover.xPosition, maxX));
            mover.xSpeed *= -1;
        } else if (maxX === 0) {
            mover.xPosition = 0;
        }

        if (maxY > topBoundary && (mover.yPosition <= topBoundary || mover.yPosition >= maxY)) {
            mover.yPosition = Math.max(topBoundary, Math.min(mover.yPosition, maxY));
            mover.ySpeed *= -1;
        } else if (maxY <= topBoundary) {
            mover.yPosition = topBoundary;
        }

        update(mover);
    }
}, 1000 / FPS);