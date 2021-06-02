const CANVAS = document.getElementById("flashlight-cnvs")
const CANVAS_CONTAINER = document.getElementById("cnvs-container");
const LOGIN_FORM_CONTAINER = document.getElementById("login-form-container");
const OPEN_LOGIN_BTN = document.getElementById("open-login-btn");
const LOGIN_BTN = document.getElementById("login-btn");
const CANCEL_BTN = document.getElementById("cancel-btn");

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


    let flashlight_menu = new flashlight.Flashlight({
        canvas: document.getElementById("menu-cnvs"),
        container: document.getElementsByClassName("top-bar")[0],
        radious:450,
        inner_light_color: "white",
        outer_light_color: "black",
        css_container: {
            position: "relative",
            pointerEvents: "all"
        },
        css_canvas: {
            pointerEvents: "none",
            left: 0,
            top: 0,
        }
    });

    let flashlight_main = new flashlight.Flashlight({
        canvas: CANVAS,
        container: CANVAS_CONTAINER,
        radious: 300,
        inner_light_color: "white",
        outer_light_color: "black",
        css_container: {
            position: "fixed",
            top: "0", left: "0", right: "0", bottom: "0"
        }
    });
    
    window.onmousemove = event => {
        flashlight_menu.DrawFlashlight(event);
        flashlight_main.DrawFlashlight(event);
    };

    OPEN_LOGIN_BTN.onclick = () => toggleLoginForm(true);
    CANCEL_BTN.onclick = () => toggleLoginForm(false);
    LOGIN_BTN.onclick = () => toggleLoginForm(false);
}());