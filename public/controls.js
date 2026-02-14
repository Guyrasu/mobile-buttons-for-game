class Control {
    constructor( canvas ){
        this.canvas = canvas
        this.bindEvents()
    }
    bindEvents() {
        this.canvas.addEventListener( "touchstart", e => {
            // Invoke the approriate handler depending on the
            // number of touch points.
            switch (e.touches.length) {
                case 1:
                handle_one_touch(e);
                break;
                case 2:
                handle_two_touches(e);
                break;
                case 3:
                handle_three_touches(e);
                break;
                default:
                console.log("Not supported");
                break;
            }
        } )
        this.canvas.addEventListener("touchmove", e => console.log('touch move'))
        this.canvas.addEventListener("touchend", e => console.log('touch end'))
        this.canvas.addEventListener("touchcancel", e =>  console.log('touch cancel') )
    }
}

const control = new Control( myGame.canvas )