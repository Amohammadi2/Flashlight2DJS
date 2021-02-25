/**
 * Generate and assign random text to html elements
 */
class RandomContentGenerator
{

    /**
     * initialize a `RandomContentGenerator` object
     * @param {str} target_selector css selector to select targets
     * @param {number} repeat number of times the passage repeats
     */
    constructor(target_selector, repeat=3)
    {
        this.target_selector = target_selector;
        this.repeat = repeat;
        this.GetTargets(); // initialize
    }

    /**
     * find all the targets with the `this.target_selector`
     * and save it to `this.targets`.
     * this function can be overridden in order to provide
     * further functionality and filters to the targets.
     */
    GetTargets(){this.targets = document.querySelectorAll(this.target_selector)};

    /**
     * add some sort of text to the specified targets
     */
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