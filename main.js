var canvas = this.__canvas = new fabric.Canvas('c1', {
    // isDrawingMode: true
});

var layers = [ 'baseLayer' ];

var clipPoly = new fabric.Polygon([
    { x: 180, y: 10 },
    { x: 300, y: 50 },
    { x: 300, y: 180 },
    { x: 180, y: 220 }
 ], {
    id: 'fixedLayer',
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
    oImg.id = 'baseLayer';
    oImg.scaleToWidth(570);
    oImg.scaleToHeight(680);
    oImg.selectable = false;

    canvas.add(oImg);
    
    // canvas.add(clipPoly);
});

$('#newLayerButton').on('click', function(){
    $('.layerModalDialog').addClass('is-active');
});

$('#closeLayerModalDialog').on('click', function() {
    $('#customLayerTitle').val('');
    $('.layerModalDialog').removeClass('is-active');
});

$('#cancelLayerModalDialog').on('click', function() {
    $('#customLayerTitle').val('');
    $('.layerModalDialog').removeClass('is-active');
});

$('#addImageModalDialog').on('click',function (){
    $('.imageLoadURLDialog').addClass('is-active');
});

$('#closeImageModalDialog').on('click',function (){
    $('#customImageURL').val('');
    $('.imageLoadURLDialog').removeClass('is-active');
});

$('#cancelImageModalDialog').on('click',function (){
    $('#customImageURL').val('');
    $('.imageLoadURLDialog').removeClass('is-active');
});

var layerCount = 1;

var layerNames = ['Базовый'];

$('#addLayer').on('click', function () {
    $('<a class="panel-block custom-layer" ' + 'id=' + '"new-layer-id' + layerCount + '"> '+$('#customLayerTitle').val()+'</a>').insertBefore('#newLayerButton');
    layers.push('new-layer-id'+layerCount);
    layerNames.push($('#customLayerTitle').val());
    $('#customLayerTitle').val('');
    $('.layerModalDialog').removeClass('is-active');

    $('.layer-option').remove();
    for (var i = 0; i < layerNames.length; i++) {
        console.log(layerNames[i]);
        $('.layer-list').append('<option class="layer-option"' + 'id="' + layers[i] + '">' + layerNames[i] + '</option>');
    }
    layerCount++;
    
});

$('nav').on('click', 'a.custom-layer', function () {
    console.log($(this).attr('id'));
    var currentObject = $(this).attr('id');
    var objectarray = [];
    canvas.getObjects().map(function (o) {
        if (o.get('id') === currentObject) {
            console.log(o);
            objectarray.push(o);
            canvas.setActiveObject(o);
        }
    });

    canvas.renderAll();

    $('.layer-object').remove();
    for (var i = 0; i < objectarray.length; i++) {
        $('.layer-objects').append('<a class="panel-block layer-object" id='+'"'+objectarray[i].cacheKey+'"'+'>'+objectarray[i].__proto__.type+'</a>');
    }
    // $('a.panel-block').toArray();
});

$('nav').on('click', 'a.layer-object', function () {
    var currentcacheObject = $(this).attr('id');
    canvas.getObjects().map(function (o) {
        if (o.get('cacheKey') === currentcacheObject) {
            console.log(o);
            canvas.setActiveObject(o);
        }
    });
    canvas.renderAll();
});

var selectedOption;

$(".layer-list").change(function() {
    selectedOption = $(this).children(":selected").attr("id");
});

$('#addImageFromURL').on('click',function (){
    fabric.Image.fromURL($('#customImageURL').val(), function (oImg) {
        console.log(selectedOption);
        oImg.id = selectedOption;
        // oImg.set({
        //     clipTo: function (ctx) {
        //         if (clipPoly) {
        //             this.setCoords();
        //             var scaleXTo1 = (1 / this.scaleX);
        //             var scaleYTo1 = (1 / this.scaleY);
        //             ctx.save();

        //             var ctxLeft = -( this.width / 2 ) + clipPoly.strokeWidth;
        //             var ctxTop = -( this.height / 2 ) + clipPoly.strokeWidth;
        //             var ctxWidth = clipPoly.width - clipPoly.strokeWidth;
        //             var ctxHeight = clipPoly.height - clipPoly.strokeWidth;

        //             ctx.translate( ctxLeft, ctxTop );
        //             ctx.scale(scaleXTo1, scaleYTo1);
        //             ctx.rotate((Math.PI / 180) * this.angle * -1);

        //             ctx.beginPath();

        //             var points = [];

        //             for(i in clipPoly.points) {
        //                 // points.push({
        //                 //     x: (clipPoly.left + clipPoly.width / 2) + clipPoly.points[i].x - this.oCoords.tl.x,
        //                 //     y: (clipPoly.top + clipPoly.height / 2) + clipPoly.points[i].y - this.oCoords.tl.y
        //                 // });
        //                 points.push({
        //                     x: clipPoly.points[i].x - this.oCoords.tl.x,
        //                     y: clipPoly.points[i].y - this.oCoords.tl.y
        //                 });
        //             }

        //             ctx.moveTo(points[0].x, points[0].y);
        //             for(i=1; i<points.length; ++i) {
        //                 ctx.lineTo(points[i].x, points[i].y);
        //             }
        //             ctx.lineTo(points[0].x, points[0].y);
        //             ctx.closePath();
        //             ctx.restore();
        //         }                
        //     }
        // });
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
var circlesArray = [];

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

        canvas.getObjects().map(function (o) {
            if (o.get('id') === 'line') {
                canvas.remove(o);
            }
        });
        canvas.renderAll();
    
        for (var i = 0; objects.length > i; i++) {
            if (objects[i].polygonNo === polygonCount) {
                points.push({
                    x: objects[i].left,
                    y: objects[i].top
                });
                canvas.renderAll();
            }
        }

        for (var i = 2; i < points.length + 1; i++) {
                var line = new fabric.Line([points[i-2].x, 
                                            points[i-2].y, 
                                            points[i-1].x, 
                                            points[i-1].y], {
                    id: 'line',
                    fill: '#aaa',
                    stroke: '#aaa',
                    strokeWidth: 5,
                    selectable: false,
                    evented: false,
                });

                canvas.add(line);
        }

        var endline = new fabric.Line([points[points.length-1].x, 
                                            points[points.length-1].y, 
                                            points[0].x, 
                                            points[0].y], {
                    id: 'line',
                    fill: '#aaa',
                    stroke: '#aaa',
                    strokeWidth: 5,
                    selectable: false,
                    evented: false,
                });

                canvas.add(endline);
                canvas.renderAll();

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

        canvas.getObjects().map(function (o) {
            if (o instanceof fabric.Image) {
                if (o.get('id') !== 'baseLayer') {
                    o.set({
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
                                ctx.rotate((Math.PI / 180) * this.angle * -1);
            
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
                    
                }
            }
        });

        canvas.renderAll();
    }
    else {
        $('#drawPolygon').addClass('is-danger');

        canvas.getObjects().map(function (o) {
            if (o.get('id') === 'line') {
                canvas.remove(o);
            }
        });
        canvas.getObjects().map(function (o) {
            if (o.get('id') === 'circle') {
                canvas.remove(o);
            }
        });
        canvas.getObjects().map(function (o) {
            if (o.get('name') === 'Polygon') {
                canvas.remove(o);
            }
        });

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
            

            canvas.getObjects().map(function (o) {
                if (o.get('id') === 'line') {
                    canvas.remove(o);
                }
            });
            canvas.renderAll();
            for (var i = 2; i < points.length + 1; i++) {
                var line = new fabric.Line([points[i-2].x, 
                                            points[i-2].y, 
                                            points[i-1].x, 
                                            points[i-1].y], {
                    id: 'line',
                    fill: '#aaa',
                    stroke: '#aaa',
                    strokeWidth: 5,
                    selectable: false,
                    evented: false,
                });

                canvas.add(line);
            }

            var endline = new fabric.Line([points[points.length-1].x, 
                                                points[points.length-1].y, 
                                                points[0].x, 
                                                points[0].y], {
                id: 'line',
                fill: '#aaa',
                stroke: '#aaa',
                strokeWidth: 5,
                selectable: false,
                evented: false,
            });

            canvas.add(endline);
            canvas.renderAll();
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
                id: 'circle',
                left: pointer.x,
                top: pointer.y,
                radius: 10,
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
            circlesArray.push(circle);

            if (circleCount !== 1) {
                var line = new fabric.Line([circlesArray[circlesArray.length-2].left, 
                                            circlesArray[circlesArray.length-2].top, 
                                            circlesArray[circlesArray.length-1].left, 
                                            circlesArray[circlesArray.length-1].top], {
                    id: 'line',
                    fill: '#aaa',
                    stroke: '#aaa',
                    strokeWidth: 5,
                    selectable: false,
                    evented: false,
                });

                canvas.add(line);
            }


            circleCount++;
        }
    }
});

$('#removeSelectedObject').on('click', function () {
    canvas.remove(canvas.getActiveObject());
});

$('#clearViewport').on('click', function () {
    canvas.getObjects().map(function (o) {
        if (o.get('id') !== 'baseLayer') {
            canvas.remove(o);
        }
    });
});

$('#setColor').spectrum({
    // color: "#f00",
    change: function (tinycolor) {
        console.log(tinycolor);
        canvas.getObjects().map(function (o) {
            if (o.get('id') === 'baseLayer') {
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


$('#addText').on('click', function (){
    var itext = new fabric.IText('This is a IText object', {
        left: 100,
        top: 150,
        fill: '#D81B60',
        strokeWidth: 2,
        stroke: "#880E4F",
    });

    canvas.add(itext);
});

$('#saveResult').on('click', function (){
    console.log(JSON.stringify(canvas));
});

$('#galleryDialog').on('click', function (){
    $('.galleryModalDialog').addClass('is-active');
});

$('#closeGalleryDialog').on('click', function (){
    $('.galleryModalDialog').removeClass('is-active');
});

$('#cancelGalleryDialog').on('click', function (){
    $('.galleryModalDialog').removeClass('is-active');
});

$('#addClipart').on('click', function () {
    $("input[name='clipart']:checked").each(function () {

        fabric.Image.fromURL($(this).val(), function (oImg) {
            oImg.scaleToWidth(570);
            oImg.scaleToHeight(680);

            canvas.add(oImg);
        });

        $('.galleryModalDialog').removeClass('is-active');
    });

});
