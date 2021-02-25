# Flashlight2DJS
view your website with 2D lighting

## installation
you just need to include dist/js/flashlight.js file into your html file.
```html
<script src="./dist/js/flashlight.js"></script>
```

## quick start
This library applies the effect on an html canvas. It is your responsibility to set
the canvas in the right position.

First, let's add a simple canvas with the id of `cnvs`:
```html
<div class="cnvs-container">
    <canvas id="cnvs"></canvas>
</div>
```

Now let's make it fixed on screen by adding `position: fixed` proprty to `cnvs-container` element.
```css
#cnvs-container
{
    /* to make it fixed on screen */
    position: fixed;
    /* to make it full screen */
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    pointer-events: none; /* it is really important if you want to access the elements under the canvas */
}
```

Now we have the full setup.

### Adding JS code

After setting up the canvas and ensuring that is in the right position, it is the time to apply the
lighting effect on the canvas.

```javascript
(function(){
  // get a refrence to the canvas
  const cnvs = document.getElementById("cnvs");
  
  // instantiate flashlight instance
  let flashlight = new Flashlight({
    canvas: cnvs,
    radious: 250,
    inner_light_color: "#FFFFFF",
    outer_light_color: "black"
  });
  
  // use `bind` method otherwise when the function is called
  // `this` keyword will refrence `window` object instead of
  // `flashlight` object
  window.onmousemove = flashlight.DrawFlashlight.bind(flashlight);
}());
```

## Docs

you can find further documentation in `docs` folder of the repository. you don't need to 
setup a local server to view the documentaitons. Just open `index.html` inside your browser.
