class Flashlight
{
    /**
     * 
     * @param {Object} config configuration for the flashlight
     * @param {HTMLCanvasElement} config.canvas the canvas on which the effect is applied
     * @param {Number} config.radious radious of the flashlight
     * @param {Number} config.opacity opacity of the effect. ranges from 0 to 255
     * @param {String} config.inner_light_color color of inner circle of the flashlight
     * @param {String} config.outer_light_color color of outer circle of the flashlight 
     */
    constructor({
        canvas,
        container,
        radious = 250,
        opacity = 100,
        inner_light_color = "white",
        outer_light_color = "black",
        css_container = {},
        css_canvas = {},
    } = config)
    {
        let css_styles_container = {
            position: "fixed",
            top: "0",
            right: "0",
            left: "0",
            bottom: "0",
            pointerEvents: "none",
            ...css_container
        };

        let css_styles_canvas = {
            pointerEvents: "none",
            ...css_canvas
        };


        this.canvas = canvas;
        this.container = container;
        this.radious = radious;
        this.opacity = opacity;
        this.inner_light_color = inner_light_color;
        this.outer_light_color = outer_light_color;
        this._apply_css(this.container, css_styles_container);
        this._apply_css(this.canvas, css_styles_canvas);
    }

    /**
     * applies css to the element
     * @param {HTMLElement} element
     * @param {Object} css 
    */
    _apply_css(element, css)
    {
        for (const [key, value] of Object.entries(css))
            element.style[key] = value;
    }

    /**
     * Draws the flashlight on canvas
     * 
     * this event handler should be bound to `window.onmousemove` event 
     * or you can pass an event object to this function by yourself.
     * anyway, it should contain `clientX` and `clientY`
     * @param {MouseEvent} event a mouse event
     * @example <caption>binding it to window.onmousemove</caption>
     * window.onmousemove = flashlight_obj.DrawFlashlight;
     */
    DrawFlashlight(event)
    {
        let {x, y} = this.GetMousePosition(event);
        const ctx = this.canvas.getContext('2d');

        this._resizeCanvas(
            this.container.offsetWidth,
            this.container.offsetHeight,
        );
        this._DrawFlashlightCircle(ctx, x, y);
        this._MakeFlashlightCircleTransparent(ctx);
    }

    /**
     * resizes the canvas
     * @param {Number} x width of canvas
     * @param {Number} y height of canvas
     * @private 
    */
    _resizeCanvas(x, y)
    {
        this.canvas.width = x;
        this.canvas.height = y;
    }

    /**
     * @typedef {Object} MousePositionStruct
     * @property {Number} x
     * @property {Number} y
     */

    /**
     * gets the current position of mouse on the screen.
     * 
     * this event handler should be bound to onmousemove event or
     * you can pass an event by your self.
     * @param {MouseEvent} mouse_event a mouse event
     * @return {MousePositionStruct}
     */
    GetMousePosition(mouse_event)
    {
        console.log(mouse_event);
        let {clientX: x, clientY: y} = mouse_event;
        let bounds = this.container.getBoundingClientRect();
        x = x - bounds.left;
        y = y - bounds.top;
        return {x, y};
    }

    /**
     * draws the flashlight circle on the top of the cover
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} x x coordinate of center of the cirlce
     * @param {Number} y y coordinate of center of the cirlce
     * @private
     */
    _DrawFlashlightCircle(ctx, x, y)
    {
        let gradient = ctx.createRadialGradient(x, y, this.radious * 0.4, x, y, this.radious);
        gradient.addColorStop(0, this.inner_light_color);
        gradient.addColorStop(1, this.outer_light_color);
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fill();
    }

    /**
     * makes the circle pixels transparent by manipulating each pixel directly
     * @param {CanvasRenderingContext2D} ctx
     * @private
     */
    _MakeFlashlightCircleTransparent(ctx)
    {
        const image_data = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        let data = image_data.data;
        for (let i =0; i<data.length; i+=4)
        {
            data[i+3] = this.opacity;
        }
        ctx.putImageData(image_data, 0, 0);
    }
}