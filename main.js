var canvas = new fabric.Canvas('c1');

canvas.setHeight("768");
canvas.setWidth("1024");

var headline = fabric.Image.fromURL('https://png2.kisspng.com/sh/2aeccc4ecab5cac8957954ba67b2bd39/L0KzQYi4UsA4N2I4e5GAYUK8RYrrhvFiO2Y7SZC8OUa0SImAUcE2OWM7Tas9MkO5SYi5TwBvbz==/5a2959dfaa3561.3961887115126594236972.png', function(oImg) {
    oImg.scaleToWidth(370);
    oImg.scaleToHeight(480);
    canvas.add(oImg);
});

fabric.Image.fromURL('https://png2.kisspng.com/sh/a92b7711027ebd9285f8ec9ccd584547/L0KzQYi4UsE3N5Q7e5GAYUO3dYa4WMk4amg1UZCDMEK7Qoq8VcE2OWQ5SacENkC5QoK7TwBvbz==/5a34e51897b709.8028295515134159606214.png', function(oImg) {
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

