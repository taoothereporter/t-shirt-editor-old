
var canvas = new fabric.Canvas('c1');

var text = new fabric.Text('hello world', { left: 100, top: 100 });



// canvas.setHeight("768");
// canvas.setWidth("1024");

var imgSource = 'title.png';

var headline;

fabric.Image.fromURL(imgSource, function(oImg) {
    oImg.scaleToWidth(370);
    oImg.scaleToHeight(480);
    headline = oImg;
    canvas.add(oImg);
});

var imgTshirt = 't-shirt.png';

var origTshirt;

fabric.Image.fromURL(imgTshirt, function(oImg) {
    oImg.lockMovementX = true;
    oImg.lockMovementY = true;
    oImg.selectable = false;
    oImg.hasControls = false;
    oImg.scaleToWidth(540);
    oImg.scaleToHeight(760);
    origTshirt = oImg;
    canvas.add(oImg);
    canvas.sendBackwards(oImg);
    oImg.center();
});

canvas.add(text);

canvas.selectionColor = 'rgba(0,255,0,0.3)';
canvas.selectionBorderColor = 'red';
canvas.selectionLineWidth = 5;
// this._canvases.push(canvas);

function getSrc(img){
    console.log(img.src);
    canvas.remove(headline);

    fabric.Image.fromURL(img.src, function(oImg) {
        oImg.top = headline.top;
        oImg.left = headline.left;
        oImg.scaleToWidth(headline.width*headline.scaleX);
        oImg.scaleToHeight(headline.height*headline.scaleY);
        // oImg.width = headline.get('width');
        // oImg.height = headline.get('height');
        // oImg.scaleX = headline.get('scaleX');
        // oImg.scaleY = headline.get('scaleY');
        headline = oImg;
        canvas.add(oImg);
    });
}

function getTshirt(img){
    canvas.remove(origTshirt);

    fabric.Image.fromURL(img.src, function(oImg) {
        oImg.lockMovementX = true;
        oImg.lockMovementY = true;
        oImg.selectable = false;
        oImg.hasControls = false;
        oImg.scaleToWidth(540);
        oImg.scaleToHeight(760);
        origTshirt = oImg;
        canvas.add(oImg);
        canvas.sendBackwards(oImg);
        oImg.center();
    });
    
}
