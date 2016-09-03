/**
 * Created by garima05 on 07-08-2016.
 */

var images = {
    rectangle: "./images/rect.png",
    circle: "./images/circle.png",
    triangle: "./images/triangle.png"
};
var preLoadedImages = {};

for (var imgKey in images) {
    var img = new Image();
    img.src = images[imgKey];
    preLoadedImages[imgKey] = img;
    img.setAttribute("id", imgKey);
    img.setAttribute("draggable", true);
    img.setAttribute('ondragstart', "drag(event)", false);
    document.getElementById("tools").appendChild(img);
}

var canvas = document.getElementById("canImageResize");
var ctx = canvas.getContext("2d");

var offsetLeftX = canvas.offsetLeft;
var offsetTopY = canvas.offsetTop;
var selectedShapeIdx = null;
var selectedShape = null;
var selectedShapeCoordinateVariance;

var draggingResizer;
var shapes = [];

/**
 * Renders the shapes
 *
 */
function render() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /*for (var idx = 0; idx < shapes.length; idx++) {
        var shape = shapes[idx]


    }*/
    shapes.forEach(function (shape) {
        shape.draw();
    });
    updateInStorage();
    // call the drawShape function again!
    requestAnimationFrame(render);
}


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
    var type = ev.dataTransfer.getData("text");
    if (images[type]) {
        var shape = new Shape({
            x: 100 * Math.random(),
            y: 100 * Math.random(),
            w: 100,
            h: 100,
            type: type
        });
        shapes.push(shape);
    }
}

/**
 * used to remove the selected shape
 *
 */
function removeSelectedImage() {
    if (selectedShapeIdx != null) {
        if(confirm("Are you sure you want to remove it?")){
            shapes.splice(selectedShapeIdx, 1);
        }
    }
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

    shapes.forEach(function (shape) {
        shape.unselectShape();
    });

    //used to check mouse click coordinates lies within selected shape
    var clickedShape = shapes.find(function (shape, idx) {
        selectedShapeIdx = idx;
        return shape.amIClicked(cordPosition.x, cordPosition.y);
    });
    if (clickedShape) {
        console.log("clickedShape", clickedShape);
        clickedShape.selectShape();
        selectedShape = clickedShape;
        selectedShapeCoordinateVariance = {x: cordPosition.x - clickedShape.x, y: cordPosition.y - clickedShape.y}
    } else {
        selectedShapeCoordinateVariance = null;
        selectedShape = null;
        selectedShapeIdx = null;
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
    //updateAllShapes();
    if (selectedShape != null) {
        if (draggingResizer === -1) {
            draggingResizer = selectedShape.anchorHitTest(cordPosition.x, cordPosition.y);
        }

        if (draggingResizer > -1) {
            //used to redraw the shape with resizing anchors
            selectedShape.resizeShapeFunc(cordPosition.x, cordPosition.y, draggingResizer);
        } else {
            // used to move the shape by the amount of the latest drag
            selectedShape.x = cordPosition.x - selectedShapeCoordinateVariance.x;
            selectedShape.y = cordPosition.y - selectedShapeCoordinateVariance.y;
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
    var cordPosition = getPosition(evnt);
    if (selectedShape != null && !selectedShape.amIClicked(cordPosition.x, cordPosition.y)) {
        selectedShapeIdx = null;
    }
    selectedShape = null;
    selectedShapeCoordinateVariance = null;

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


//sore data in local storage
function updateInStorage() {
    var data = JSON.stringify(shapes);
    localStorage.setItem('data', data);
}
function restoreFromStorage() {
    var savedData = localStorage.getItem('data');
    var savedShapes = JSON.parse(savedData);
    if (savedShapes) {
        savedShapes.forEach(function (shape, idx) {
            if (shape.isSelected) {
                selectedShapeIdx = idx;
            }
            shapes.push(new Shape(shape));
        })
    }
    requestAnimationFrame(render);

}
setTimeout(restoreFromStorage, 100)

// Save canvas' Data as a data URL
function downloadAsImage() {
    var canData = canvas.toDataURL();
    window.open(canData);
}





