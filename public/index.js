class GameEngine {
    constructor() {
        this.canvas = null
        this.ctx = null
        this.dpr = window.devicePixelRatio || 1


        // Initialize the game world
        this.initCanvas()
        this.bindEvents()

        // Start the loop
        this.lastTime = 0
        requestAnimationFrame( this.gameLoop.bind(this) )


        // Renders from other classes (e.g., Controls) can be called here
        // or from the update/draw methods as needed.
        this.controls = new Controls( this.canvas )
    }

    initCanvas() {
        // Create and inject the canvas
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

                // Set an ID for CSS styling
        this.canvas.id = 'game_canvas'

        //Apply styling for mobile "App feel"
        this.canvas.style.position = 'fixed'
        this.canvas.style.top = '0'
        this.canvas.style.left = '0'
        this.canvas.style.touchAction = 'none' // Critical for mobile games

        this.resize()
        document.body.appendChild( this.canvas )
    }

    resize() {
        console.log( 'resized' )
        // Set display size (logical pixels)
        const width = window.innerWidth
        const height = window.innerHeight

        //Set actual rendering size (physical pixels for sharpness)
        this.canvas.width = width * this.dpr
        this.canvas.height = height * this.dpr

        // Scale CSS to match the screen
        this.canvas.style.width = `${width}px`
        this.canvas.style.height = `${height}px`

        // Normalize coordinate system (setTransform is more performatic than scale)
        this.ctx.setTransform( this.dpr, 0, 0, this.dpr, 0, 0 )
    }

    bindEvents() {
        // Handle screen rotation/resize
        window.addEventListener( 'resize', () => this.resize() )
    }





    update(deltaTime) {
        // Physics and logic go here
        // deltaTime is useful for consistent speed regardless of frame rate
    }



    
    draw() {
        // Clear screen
        this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height )

        // Color for background on canvas
        this.ctx.fillStyle = '#ddd'
        this.ctx.fillRect( 0, 0, this.canvas.width, this.canvas.height )

        // Example: Draw a placeholder player
        this.ctx.fillStyle = '#4CAF50'
        this.ctx.fillRect( 
            50,
            50,
            100,
            100
         )

         this.controls.render() // Render controls on top of the game world
    }

    gameLoop( timeStamp ) {
        const deltaTime = timeStamp - this.lastTime
        this.lastTime = timeStamp

        this.update( deltaTime )
        this.draw()

        requestAnimationFrame( this.gameLoop.bind(this) )
    }
}




const myGame = new GameEngine()

