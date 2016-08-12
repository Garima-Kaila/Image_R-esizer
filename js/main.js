/**
 * Created by garima05 on 07-08-2016.
 */

// methods, conditions, loops, complex logics, mathematics computations
// no useless global variables
//remove unused / commented code

var canvas = document.getElementById("canImageResize");
var ctx = canvas.getContext("2d");
var imgCircle = new Image();
imgCircle.src = "./images/circle.png";

var imgRect = new Image();
imgRect.src = "./images/rect.png";

var imgTrang = new Image();
imgTrang.src = "./images/triangle.png";
var offsetLeftX = canvas.offsetLeft;
var offsetTopY = canvas.offsetTop;
var shapeMoveObj = null;
var radiusDragAnchor = 8;
var resizerRadius = radiusDragAnchor * radiusDragAnchor;
var draggingResizer;
var shapes = [];

/**
 * used to draw circle on canvas
 *
 */
function drawCircle() {
    var circle = new Shape();
    circle.x = 100 * Math.random();
    circle.y = 100 * Math.random();
    circle.w = 100 * Math.random();
    circle.h = 100 * Math.random();
    circle.img = imgCircle;
    shapes.push(circle);

}
/**
* used to draw rectangle on the canvas
*
*/
function drawRectangle() {
    var rect = new Shape();
    rect.x = 100 * Math.random();
    rect.y = 100 * Math.random();
    rect.w = 100 * Math.random();
    rect.h = 100 * Math.random();
    rect.img = imgRect;
    shapes.push(rect);
}

/**
 * used to draw triangle on the canvas
 *
 */
function drawTriangle() {
    var trang = new Shape();
    trang.x = 100 * Math.random();
    trang.y = 100 * Math.random();
    trang.w = 100 * Math.random();
    trang.h = 100 * Math.random();
    trang.img = imgTrang;
    shapes.push(trang);
}

/**
 * Draw shapes
 *
 */
function drawShape() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var idx = 0; idx < shapes.length; idx++) {
        var shape = shapes[idx]
        shape.draw();

    }
    // call the drawShape function again!
    requestAnimationFrame(drawShape);
}
drawShape();


function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Used to drag Image from left image tool panel
 *
 */

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);

}

/**
 * Used to drop Image on canvas
 *
 */
function drop(ev) {
    ev.preventDefault();
    data = ev.dataTransfer.getData("text");

    //for rectangle
    if (data === "rectangle") {
        drawRectangle();
    }
    //for circle
    else if (data === "circle") {
        drawCircle();
    }

    //for triangle
    else if (data === "triangle") {
        drawTriangle();
    }

    ev.target.appendChild(document.getElementById(data));
}

/**
 * used to draw drag anchor at four corners of the shape
 * @param {Number} x-coordinate of the center of the circle
 * @param {Number} y-coordinate of the center of the circle
 *
 */
function drawDragAnchor(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, radiusDragAnchor, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
}

canvas.addEventListener("mousedown", onMouseDownHandler, false);
canvas.addEventListener("mousemove", onMouseMoveHandler, false);
canvas.addEventListener("mouseup", onMouseUpHandler, false);
canvas.addEventListener("mouseout", onMouseOutHandler, false);


/**
 * used to handle mousedown event which is binded with canvas
 * @param {event} mouse event
 *
 *
 */
function onMouseDownHandler(evnt) {
    var cordPosition = getPosition(evnt);
    console.log("xcord:" + cordPosition.x);

    for (var idx = 0; idx < shapes.length; idx++) {
        var shape = shapes[idx];

        //used to check mouse click coordinates lies within selected shape
        if (shape.amIClicked(cordPosition.x, cordPosition.y)) {
            shapeMoveObj = shape;

            draggingResizer = shapeMoveObj.anchorHitTest(cordPosition.x, cordPosition.y, resizerRadius);
        }

        shape.unselectShape();
        shape.isSelected = false;

        }
    if (shapeMoveObj != null) {
        shapeMoveObj.selectShape();
        shapeMoveObj.isSelected = true;
    }
}

/**
 * used to get horizontal and vertical coordinates(x,y) on mouse click
 * @param {event} mouse event
 * @return {JSON object} x & y coordinate
 *
 */

function getPosition(evnt) {
    var position = {};
    position.x = evnt.clientX - offsetLeftX;
    position.y = evnt.clientY - offsetTopY;
    return position;
}



/**
 * used to handle mousemove event which is binded with canvas
 * @param {event} mouse event
 *
 *
 */
function onMouseMoveHandler(evnt) {

    var cordPosition = getPosition(evnt);

    //used to redraw the shape with resizing anchors
    if (draggingResizer > -1 && shapeMoveObj != null) {
        var startX = cordPosition.x;
        var startY = cordPosition.y;
        shapeMoveObj.resizeShapeFunc(startX, startY, draggingResizer);

    }

    // used to move the shape by the amount of the latest drag
    else {
        if (shapeMoveObj != null) {
            shapeMoveObj.x = cordPosition.x;
            shapeMoveObj.y = cordPosition.y;
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
    }

}

/**
 * used to handle mouseup event which is binded with canvas
 * @param {event} mouse event
 *
 *
 */
function onMouseUpHandler(evnt) {
    draggingResizer = -1;
    shapeMoveObj = null;
}

/**
 * used to handle mouseout event which is binded with canvas
 * @param {event} mouse event
 *
 *
 */
function onMouseOutHandler(evnt) {

    onMouseUpHandler(evnt);
}

// Save canvas' Data as a data URL
var canData = canvas.toDataURL();

//sore data in local storage
localStorage.setItem('data', canData);


var savedData = localStorage.getItem('data');
if(savedData != undefined && savedData!=null) {
    var img= new Image();
    img.src = savedData;
    ctx.drawImage(img,550,500);


}