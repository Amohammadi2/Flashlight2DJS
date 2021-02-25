const CANVAS = document.getElementById("flashlight-cnvs")

/**
 * resizes the canvas to fill whole the screen every time
 * the browser window resizes. 
 * @returns {void}
 */
function resizeCanvas()
{
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;
}

(function(){
    // assigns random text to all the elements that have the data attribute
    // data-random-content="true". don't even care about this ...
    let post_random_generator = new RandomContentGenerator('[data-random-content="true"]', 10 /*repeat*/);
    post_random_generator.AssignRandomContent();

    // create a new flashlight and give it a refrence to canvas and
    // the radious of the flashlight circle
    let flashlight = new Flashlight({
        canvas: CANVAS,
        radious: 300,
        cover_color: "black",
        inner_light_color: "#FFFFFF",
        outer_light_color: "#494949"
    });
    
    window.onmousemove = flashlight.DrawFlashlight.bind(flashlight);
    
    // resize the canvas dynamically
    resizeCanvas();
    window.onresize = resizeCanvas;
}());