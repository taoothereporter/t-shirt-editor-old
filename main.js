var canvas = this.__canvas = new fabric.Canvas('c1', {
    // isDrawingMode: true
});

var clipPoly = new fabric.Polygon([
    { x: 180, y: 10 },
    { x: 300, y: 50 },
    { x: 300, y: 180 },
    { x: 180, y: 220 }
 ], {
    originX: 'left',
    originY: 'top',
    left: 180,
    top: 10,
    width: 200,
    height: 200,
    fill: '#ddd', /* use transparent for no fill */
    strokeWidth: 0
});

fabric.Image.fromURL('t-shirt.png', function (oImg) {
    oImg.id = 'fixed';
    oImg.scaleToWidth(570);
    oImg.scaleToHeight(680);
    oImg.selectable = false;

    canvas.add(oImg);
    
    // canvas.add(clipPoly);
});

$('#addImageModalDialog').on('click',function (){
    $('.modal').addClass('is-active');
});

$('#closeImageModalDialog').on('click',function (){
    $('#customImageURL').val('');
    $('.modal').removeClass('is-active');
});

$('#cancelImageModalDialog').on('click',function (){
    $('#customImageURL').val('');
    $('.modal').removeClass('is-active');
});

$('#addImageFromURL').on('click',function (){

    fabric.Image.fromURL($('#customImageURL').val(), function (oImg) {
        oImg.set({
            clipTo: function (ctx) {
                if (clipPoly) {
                    this.setCoords();
                    var scaleXTo1 = (1 / this.scaleX);
                    var scaleYTo1 = (1 / this.scaleY);
                    ctx.save();

                    var ctxLeft = -( this.width / 2 ) + clipPoly.strokeWidth;
                    var ctxTop = -( this.height / 2 ) + clipPoly.strokeWidth;
                    var ctxWidth = clipPoly.width - clipPoly.strokeWidth;
                    var ctxHeight = clipPoly.height - clipPoly.strokeWidth;

                    ctx.translate( ctxLeft, ctxTop );
                    ctx.scale(scaleXTo1, scaleYTo1);
                    ctx.rotate(0);

                    ctx.beginPath();

                    var points = [];

                    for(i in clipPoly.points) {
                        // points.push({
                        //     x: (clipPoly.left + clipPoly.width / 2) + clipPoly.points[i].x - this.oCoords.tl.x,
                        //     y: (clipPoly.top + clipPoly.height / 2) + clipPoly.points[i].y - this.oCoords.tl.y
                        // });
                        points.push({
                            x: clipPoly.points[i].x - this.oCoords.tl.x,
                            y: clipPoly.points[i].y - this.oCoords.tl.y
                        });
                    }

                    ctx.moveTo(points[0].x, points[0].y);
                    for(i=1; i<points.length; ++i) {
                        ctx.lineTo(points[i].x, points[i].y);
                    }
                    ctx.lineTo(points[0].x, points[0].y);
                    ctx.closePath();
                    ctx.restore();
                }                
            }
        });
        canvas.add(oImg);
    });

    $('#customImageURL').val('');
    $('.modal').removeClass('is-active');
});

var startDrawingPolygon = false;
var polygonCount = 1;
var ArrayLength;
var circleCount = 1;
// var fillColor = "rgba(46, 240, 56, 0.5)";
var fillColor = "transparent";

$('#drawPolygon').on('click', function () {
    startDrawingPolygon = !startDrawingPolygon;

    if (!startDrawingPolygon)
    {
        $('#drawPolygon').removeClass('is-danger');
        canvas.remove(clipPoly);
        ArrayLength = circleCount;
        circleCount = 1;
        var tempCount = 0;
        var objects = canvas.getObjects();
        var points = [];

        for (var i = 0; objects.length > i; i++) {
            if (objects[i].polygonNo === polygonCount) {
                points.push({
                    x: objects[i].left,
                    y: objects[i].top
                });
                canvas.renderAll();
            }
        }

        clipPoly = new fabric.Polygon(points, {
            fill: fillColor,
            PolygonNumber: polygonCount,
            name: "Polygon",
            selectable: false,
            noofcircles: ArrayLength,
            objectCaching: false
        });

        canvas.add(clipPoly);
        // canvas.sendToBack(clipPoly)
        canvas.renderAll();
        polygonCount++;
    }
    else {
        $('#drawPolygon').addClass('is-danger');
    }
});

canvas.on('object:moving', function(option) {
    var object = option.target;
    canvas.forEachObject(function(obj) {
        if (obj.name == "Polygon") {

            if (obj.PolygonNumber == object.polygonNo) {
                var points = clipPoly.get("points");
                points[object.circleNo - 1].x = object.left;
                points[object.circleNo - 1].y = object.top;

                clipPoly.set({
                    points: points
                });
            }

        }
    });

    canvas.renderAll();
});

canvas.on('mouse:down', function(option) {
    if (option.target && option.target.name == "draggableCircle") {
        return;
    } else {
        if (startDrawingPolygon) {
            var pointer = canvas.getPointer(option.e);

            circle = new fabric.Circle({
                left: pointer.x,
                top: pointer.y,
                radius: 7,
                hasBorders: false,
                hasControls: false,
                polygonNo: polygonCount,
                name: "draggableCircle",
                circleNo: circleCount,
                fill: "rgba(0, 0, 0, 0.5)",
                hasRotatingPoint: false,
                originX: 'center',
                originY: 'center'
            });

            canvas.add(circle);
            circleCount++;
        }
    }
});

$('#removeSelectedObject').on('click', function () {
    canvas.remove(canvas.getActiveObject());
});

$('#clearViewport').on('click', function () {
    canvas.getObjects().map(function (o) {
        if (o.get('id') !== 'fixed') {
            canvas.remove(o);
        }
    });
});

$('#setColor').spectrum({
    // color: "#f00",
    change: function (tinycolor) {
        console.log(tinycolor);
        canvas.getObjects().map(function (o) {
            if (o.get('id') === 'fixed') {
                o.filters = [];
                o.filters.push(new fabric.Image.filters.BlendColor({
                    color: tinycolor.toHexString(),
                    mode: 'overlay',
                    alpha: 0.55
                }));
                o.applyFilters();
            }
        });
        
        canvas.renderAll();
    }
});

