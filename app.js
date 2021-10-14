var canvas = document.querySelector("canvas")
var ctx = canvas.getContext('2d')



canvas.width = window.innerWidth
canvas.height = window.innerHeight



var colors = [
    "#FFEBEE",
    "#FFCDD2",
    "#EF9A9A",
    "#E57373",
    "#EF5350",
    "#F44336",
    "#E53935",
    "#D32F2F",
    "#C62828",
    "#B71C1C",
    "#FF8A80",
    "#FF5252",
    "#FF1744",
    "#D50000",
    "#FCE4EC",
    "#F8BBD0",
    "#F48FB1",
    "#F06292",
    "#EC407A",
    "#E91E63",
    "#D81B60",
    "#C2185B",
    "#AD1457",
    "#FF80AB",
    "#FF4081",
    "#F50057",
    "#C51162",
    "#F3E5F5",
    "#E1BEE7",
    "#CE93D8",
    "#BA68C8",
    "#AB47BC",
    "#9C27B0",
    "#8E24AA",
    "#7B1FA2",
    "#6A1B9A",
    "#4A148C",
    "#EA80FC",
    "#E040FB",
    "#D500F9",
    "#AA00FF",
    "#EDE7F6",
    "#D1C4E9",
]





var mousePosition = {
    x: undefined,
    y: undefined
}



window.addEventListener("mousemove", (e) => {
    mousePosition.x = e.x
    mousePosition.y = e.y
})

window.addEventListener("touchend", () => {
    mousePosition.x = e.x
    mousePosition.y = e.y
}, false)


window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
})




function Shape(x, y, dx, dy, raidus) {
    this.process = {
        x: x,
        y: y,
        dx: dx,
        dy: dy,
        raidus: raidus,
        maxRaiduse: 50,
        minRaiduse: raidus,
        color: colors[Math.floor(Math.random() * colors.length)],
        draw: () => {
            ctx.beginPath()
            ctx.arc(this.process.x, this.process.y, this.process.raidus, 0, Math.PI * 2, false)
            ctx.fillStyle = this.process.color
            ctx.fill()
        },
        interact: () => {
            if (mousePosition.x - this.process.x < 50 && mousePosition.x - this.process.x > -50) {
                if (mousePosition.y - this.process.y < 50 && mousePosition.y - this.process.y > -50) {
                    if (this.process.raidus < this.process.maxRaiduse) {
                        this.process.raidus += 1
                    }
                }
            } else if (this.process.raidus > this.process.minRaiduse) {
                this.process.raidus -= 1
            }
        },

        update: () => {

            if (this.process.x + this.process.raidus > window.innerWidth || this.process.x - this.process.raidus < 0) {
                this.process.dx = -this.process.dx
            }
            if (this.process.y + this.process.raidus > window.innerHeight || this.process.y - this.process.raidus < 0) {
                this.process.dy = -this.process.dy
            }

            this.process.x += this.process.dx
            this.process.y += this.process.dy
            this.process.interact()
            this.process.draw()
        }
    }
}







var circleArray = []



var init = () => {
    circleArray = []
    for (var i = 0; i <= 200; i++) {
        var x = Math.random() * (innerWidth - raidus * 2) + raidus
        var y = Math.random() * (innerHeight - raidus * 2) + raidus
        var dx = Math.floor(Math.random() * 10 - 5) / 5
        var dy = Math.floor(Math.random() * 10 - 5) / 5
        var raidus = Math.random() * 5 + 2

        circleArray.push(new Shape(x, y, dx, dy, raidus))
    }
}






function animate() {

    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    for (i of circleArray) {
        i.process.update()
    }
}

init()
animate()