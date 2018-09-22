var canvas = new fabric.Canvas('c1');

canvas.setHeight("768");
canvas.setWidth("1024");

var headline = fabric.Image.fromURL('title.png', function(oImg) {
    oImg.scaleToWidth(370);
    oImg.scaleToHeight(480);
    canvas.add(oImg);
});

fabric.Image.fromURL('t-shirt.png', function(oImg) {
    oImg.lockMovementX = true;
    oImg.lockMovementY = true;
    oImg.selectable = false;
    oImg.hasControls = false;
    oImg.scaleToWidth(570);
    oImg.scaleToHeight(780);
    canvas.add(oImg);
    canvas.sendBackwards(oImg);
    oImg.center();
});

canvas.selectionColor = 'rgba(0,255,0,0.3)';
canvas.selectionBorderColor = 'red';
canvas.selectionLineWidth = 5;
this.__canvases.push(canvas);

