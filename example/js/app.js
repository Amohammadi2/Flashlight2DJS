const CANVAS = document.getElementById("flashlight-cnvs")
const LOGIN_FORM_CONTAINER = document.getElementById("login-form-container");
const OPEN_LOGIN_BTN = document.getElementById("open-login-btn");
const LOGIN_BTN = document.getElementById("login-btn");
const CANCEL_BTN = document.getElementById("cancel-btn");

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

function toggleLoginForm(on)
{
    let ptrevnt = on? "all" : "none";
    let opcty = on? "1" : "0";

    LOGIN_FORM_CONTAINER.style.opacity = opcty;
    LOGIN_FORM_CONTAINER.style.pointerEvents = ptrevnt;
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
        cover_color: "#494949",
        inner_light_color: "#FFFFFF",
        outer_light_color: "#494949"
    });
    
    window.onmousemove = flashlight.DrawFlashlight.bind(flashlight);
    
    // resize the canvas dynamically
    resizeCanvas();
    window.onresize = resizeCanvas;

    OPEN_LOGIN_BTN.onclick = () => toggleLoginForm(true);
    CANCEL_BTN.onclick = () => toggleLoginForm(false);
    LOGIN_BTN.onclick = () => toggleLoginForm(false);
}());