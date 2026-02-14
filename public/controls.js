class Controls {
    constructor( canvas ){
        this.canvas = canvas
        this.bindEvents()
    }
    bindEvents() {
        console.log( 'binding events' )
        this.canvas.addEventListener( "touchstart", e => {
            const touch = e.touches[0];
            const halfWidth = window.innerWidth / 2;
            // Invoke the approriate handler depending on the
            // number of touch points.
            console.log( 'touch start' )

            // For when we want to support multiple touch points in the future, we can use this switch statement to route to the appropriate handler.
            // switch (e.touches.length) {
            //     case 1:
            //     handle_one_touch(e);
            //     break;
            //     case 2:
            //     handle_two_touches(e);
            //     break;
            //     case 3:
            //     handle_three_touches(e);
            //     break;
            //     default:
            //     console.log("Not supported");
            //     break;
            // }
            const rect = this.canvas.getBoundingClientRect();

            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            console.log( `Touch at (${x}, ${y})` )
            if (touch.clientX < halfWidth) {
                // 1. Show Joystick UI at touch.clientX, touch.clientY
                // 2. Lock this touch ID to the joystick logic
                console.log("Joystick spawned at:", touch.clientX, touch.clientY);
            }
        }, { passive: false } )
        this.canvas.addEventListener("touchmove", e => console.log('touch move'))
        this.canvas.addEventListener("touchend", e => console.log('touch end'))
        this.canvas.addEventListener("touchcancel", e =>  console.log('touch cancel') )
    }

    // Render the joystick UI based on the current touch position and state
    renderJoystick( x, y ) {
        // For demonstration, we'll just draw a simple circle representing the joystick base
        const ctx = this.canvas.getContext('2d');
        ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(
            x, 
            y, 
            50, 
            0, 
            Math.PI * 2);
        ctx.fill();
    }



    render() {
        // Render the control UI (e.g., joystick, buttons) here
        this.renderJoystick()
    }
}