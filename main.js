
var canvas = new fabric.Canvas('c1');


var canvas1 = new fabric.Canvas('c2');

var composite = [];

function addCircle() {
    var circle = new fabric.Circle({
        radius: 100,
        fill: 'green'
    });

    composite.push(circle);

    canvas1.add(circle);
}

function addRectangle() {
    var rect = new fabric.Rect({
        width: 40,
        height: 40,
        fill: 'red'
    });

    composite.push(rect);    

    canvas1.add(rect);
}


var text = new fabric.Text('hello world', { left: 100, top: 100 });

// canvas.setHeight("768");
// canvas.setWidth("1024");

var imgSource = 'title.png';

var headline;

fabric.Image.fromURL(imgSource, function(oImg) {
    oImg.scaleToWidth(370);
    oImg.scaleToHeight(480);
    headline = oImg;
    canvas1.add(oImg);
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

// canvas.add(text);

var group = new fabric.Group();

group.add(new fabric.Rect({ 
    width: 20, 
    height: 20, 
    fill: 'yellow'
}));

group.addWithUpdate(new fabric.Rect({
    width: 40,
    height: 40,
    fill: 'red',
    left: group.get('left')+20,
    top: group.get('top')+20
}));

// canvas.add(group);

canvas.selectionColor = 'rgba(0,255,0,0.3)';
canvas.selectionBorderColor = 'red';
canvas.selectionLineWidth = 5;
// this._canvases.push(canvas);

function getSrc(img){
    console.log(img.src);
    // canvas.remove(headline);

    fabric.Image.fromURL(img.src, function(oImg) {
        oImg.top = headline.top;
        oImg.left = headline.left;
        oImg.scaleToWidth(headline.width*headline.scaleX);
        oImg.scaleToHeight(headline.height*headline.scaleY);
        // oImg.width = headline.get('width');
        // oImg.height = headline.get('height');
        // oImg.scaleX = headline.get('scaleX');
        // oImg.scaleY = headline.get('scaleY');
        // headline = oImg;
        canvas1.add(oImg);
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

function groupObjs() {
    if (!canvas1.getActiveObject()) {
        return;
    }

    if (canvas1.getActiveObject().type !== 'activeSelection') {
        return;
    }

    canvas1.getActiveObject().toGroup();
    canvas1.requestRenderAll();
}

function addToMain() {
    // if (!canvas1.getActiveObject()) {
    //     return;
    // }

    // if (canvas1.getActiveObject().type !== 'activeSelection') {
    //     return;
    // }

    var item = canvas1.getActiveObject();
    
    canvas.add(item);
}

function deleteSelected(){
    var selectedItem = canvas1.getActiveObject();

    canvas1.remove(selectedItem);
}

function bringUp(){
    var selectedItem1 = canvas1.getActiveObject();

    canvas1.bringForward(selectedItem1);
}

function bringDown(){
    var selectedItem2 = canvas1.getActiveObject();

    canvas1.sendBackwards(selectedItem2);    
}

function clearCanvas() {
    canvas1.clear();
    canvas1.requestRenderAll();
}
