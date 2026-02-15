class Joystick {
    constructor( canvas ) {
        this.ctx = canvas.getContext('2d')
        // Store the joystick position for rendering
        this.base = {
                pos: {
                    x: 98,
                    y: 251
                },
                radius: 50
        }
        this.knob = {
            pos: { x: this.base.pos.x, y: this.base.pos.y },
            radius: 23
        }
        this.duration = 0
        this.touchEndTime = Date.now()
        this.active = true
        this.touchId = null
        this.touchEnded = true
    }

    render() {
        // Render the joystick UI based on the current touch position and state
        // For demonstration, we'll just draw a simple circle representing the joystick base
        this.ctx.fillStyle = 'rgba(0, 0, 255, 0.5)'
        this.ctx.beginPath()
        this.ctx.arc(
            this.base.pos.x, 
            this.base.pos.y, 
            50, 
            0, 
            Math.PI * 2)
        this.ctx.fill();

        // Render the knob (the part that moves with the touch)
        this.ctx.fillStyle = 'rgba(0, 0, 255, 1)'
        this.ctx.beginPath()
        this.ctx.arc(
            this.knob.pos.x, 
            this.knob.pos.y, 
            this.knob.radius, 
            0, 
            Math.PI * 2)
        this.ctx.fill()
    }
}

class Controls {
    constructor( canvas ){
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')

        this.bindEvents()

        this.joystick = new Joystick( this.canvas )
    }

    /***************** Add the Events ********************/
    bindEvents() {
        

        /*******************************************************
         * ******* Touch events for mobile controls ************
         ******************************************************/

        /***************** Touch START ********************/
        this.canvas.addEventListener( "touchstart", e => {
            this.joystick.touchEnded = false
            const touch = e.touches[0]
            const halfWidth = window.innerWidth / 2
            this.joystick.touchId = touch.identifier // Store the touch ID for tracking

            // Invoke the approriate handler depending on the
            // number of touch points.
            // console.log( 'touch start' )

            // For when we want to support multiple touch points in the future, we can use this switch statement to route to the appropriate handler.
            switch (e.touches.length) {
                case 1:
                    //console.log(`one touch: ${e}`)
                    this.touchId = touch.identifier // Store the touch ID for tracking
                break;
                case 2:
                    //console.log(`two touch: ${e}`)
                break;
                case 3:
                    //console.log(`three touch: ${e}`)
                break;
                default:
                    // console.log("Not supported")
                break;
            }

            
            // This should work only if the touch is on the left half of the screen
            if (touch.clientX > halfWidth) return
            const rect = this.canvas.getBoundingClientRect()
            
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            console.log( `Touch at (${x}, ${y})` )

            // Joystick
            this.joystick.base.pos = { x: x, y: y } // Update joystick position for rendering
            this.joystick.knob.pos = { x: x, y: y } // Reset knob to center on touch start
            this.joystick.active = true // Activate the joystick

            // 1. Show Joystick UI at touch.clientX, touch.clientY
            // 2. Lock this touch ID to the joystick logic
            console.log("Joystick spawned at:", touch.clientX, touch.clientY)
            
        }, { passive: false } )

        /***************** Touch MOVE ********************/
        this.canvas.addEventListener("touchmove", e => 
        {
            if (!this.joystick.active) return // Detect if joystick is active before processing movement
            
            const halfWidth = window.innerWidth / 2
            const touch = e.touches[0] // Reassign variable
            if (touch.clientX > halfWidth) return
            

            const rect = this.canvas.getBoundingClientRect() // Get canvas position for accurate touch coordinates

             // console.log( `touch identifier: ${touch.identifier}, touch id: ${this.joystick.touchId}` )
            
            

            for (let touch of e.changedTouches) {
                if (touch.identifier === this.joystick.touchId) {
                    
                    const moveX = touch.clientX - rect.left
                    const moveY = touch.clientY - rect.top

                    // Calculate distance x, y from the base position
                    const distX = moveX - this.joystick.base.pos.x
                    const distY = moveY - this.joystick.base.pos.y

                    // Calculate distance (hypotenuse) from the base position
                    const distance = Math.hypot(distX, distY);

                    // 2. Calculate the angle of the touch relative to the center
                    const angle = Math.atan2(distY, distX);

                    // Constrain the stick to the radius
                    const limitedDist = Math.min(distance, this.joystick.base.radius)
                    
                    // Set the knob position based on the angle and constrained distance
                    this.joystick.knob.pos = {
                        x: this.joystick.base.pos.x + Math.cos(angle) * limitedDist,
                        y: this.joystick.base.pos.y + Math.sin(angle) * limitedDist
                    }

                } // if
            } // for loop

        }) // touch move


        /***************** Touch END ********************/
        this.canvas.addEventListener("touchend", e => {
            this.joystick.knob.pos = { ...this.joystick.base.pos } // Reset knob to center
            this.joystick.touchEnded = true
            this.joystick.touchEndTime = Date.now()
        })
        this.canvas.addEventListener("touchcancel", e =>  console.log('touch cancel') )
    }

    update() {
        // Physics and logic go here
        // deltaTime is useful for consistent speed regardless of frame rate
        if (this.joystick.active && this.joystick.touchEnded) {
            this.joystick.duration = Date.now() - this.joystick.touchEndTime
            if (this.joystick.duration > 2000) 
                this.joystick.active = false // Deactivate the joystick
        }
    }

    /***************** Render all controls ********************/
    render() {
        // Render the control UI (e.g., joystick, buttons) here
        if (this.joystick.active) this.joystick.render()
    }
}