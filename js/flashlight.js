class RandomContentGenerator
{
    constructor(target_selector, repeat=3)
    {
        this.target_selector = target_selector;
        this.repeat = repeat;
        this.GetTargets(); // initialize
    }

    GetTargets(){this.targets = document.querySelectorAll(this.target_selector)};

    AssignRandomContent()
    {
        let content = `Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Nemo reprehenderit laudantium esse est quibusdam expedita ratione eum et dolores hic,
        in unde eius fugiat cumque nostrum magni, porro veritatis quia.`;

        let payload = "";
        for(let i = 0; i < this.repeat; i++) payload += content; 

        this.targets.forEach(element => {
            element.innerText = payload
        });
    }
}

class CanvasProcessor
{
    // Todo: implement drawing part here
}

function trackMousePosition(event)
{
    const
        X = event.clientX,
        Y = event.clientY;

    console.log(X, Y);
}

(function(){
    let post_random_generator = new RandomContentGenerator('[data-random-content="true"]', 10);
    post_random_generator.AssignRandomContent();

    let cnvs_container_el = document.getElementById("cnvs-container");
    cnvs_container_el.onmousemove = trackMousePosition;
}());