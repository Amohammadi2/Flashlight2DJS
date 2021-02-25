class Flashlight
{
    /**
     * 
     * @param {Object} config configuration for the flashlight
     * @param {HTMLCanvasElement} config.canvas the canvas on which the effect is applied
     * @param {String} config.cover_color the color of the cover around flashlight
     * @param {Number} config.radious radious of the flashlight
     * @param {String} config.inner_light_color color of inner circle of the flashlight
     * @param {String} config.outer_light_color color of outer circle of the flashlight 
     */
    constructor(
        {canvas,
        radious,
        cover_color,
        inner_light_color,
        outer_light_color} = config)
    {
        this.canvas = canvas;
        this.radious = radious;
        this.cover_color = cover_color;
        this.inner_light_color = inner_light_color;
        this.outer_light_color = outer_light_color;
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

        this._DrawCover(ctx);
        this._DrawFlashlightCircle(ctx, x, y);
        this._MakeFlashlightCircleTransparent(ctx);
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
        let {clientX: x, clientY: y} = mouse_event;
        return {x, y};
    }

    /**
     * draws a cover all over the canvas
     * @param {CanvasRenderingContext2D} ctx
     * @private
     */
    _DrawCover(ctx)
    {
        ctx.beginPath();
        ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = this.cover_color;
        ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fill();
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
            data[i+3] = 100;
        }
        ctx.putImageData(image_data, 0, 0);
    }
}