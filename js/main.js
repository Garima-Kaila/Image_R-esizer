/**
 * Created by garima05 on 19-08-2016.
 */

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var offsetLeftX = canvas.offsetLeft;
var offsetTopY = canvas.offsetTop;
/*var imgrct = new Image();
 var rectimg = "./images/rect.png";
 imgrct.src = rectimg;
 var imgtrang = new Image();
 var trangimg = "./images/triangle.png";
 imgtrang.src = trangimg;
 var imgcir = new Image();
 var cirimg = "./images/circle.png";
 imgcir.src = cirimg;*/
var shapes = [];
var shapeIndex = null;
var shapeImgObj = null;
var isSelected = false;
var draggingImage = false;
var draggingResizer;

var images = {
    "rectangle": "./images/rect.png",
    "circle": "./images/circle.png",
    "triangle": "./images/triangle.png"
};

var preLoadedImages = {};
for (var imgkey in images) {
    var img = new Image();
    img.src = images[imgkey];
    preLoadedImages[imgkey] = img;
    img.setAttribute("id", imgkey);
    img.setAttribute("draggable", "true");
    img.setAttribute("ondragstart", "drag(event)", false);
    document.getElementById("divLeftPanel").appendChild(img);

}

/**
 * used to prevent default drop
 * @param evnt
 */
function allowDrop(evnt) {
    evnt.preventDefault();
}

/**
 * used to drag image
 * @param evnt
 */
function drag(evnt) {
    evnt.dataTransfer.setData("text", evnt.target.id);
}


/**
 * used to drop image on canvas
 * @param evnt
 */
function drop(evnt) {
    evnt.preventDefault();
    var data = evnt.dataTransfer.getData("text");
    if (data != null && preLoadedImages[data] != undefined) {
        var shape = new Shape({
            x: 100 * Math.random(),
            y: 100 * Math.random(),
            w: 100,
            h: 100,
            type: data
        });
        shape.img = preLoadedImages[data];

        shapes.push(shape);
        shape.draw();

    evnt.target.appendChild(document.getElementById(data).cloneNode(true));
}
}

function drawShape() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(function (item) {
        var shape = item;
        shape.draw();
    });
    updateLocalStorage();
//call drawshape again
    requestAnimationFrame(drawShape);


}


/**
 * used to draw draggable anchor around corner of image
 * @param x
 * @param y
 */
function drawDragAnchor(x, y) {
    ctx.fillRect(x, y, 10, 10);


}

canvas.addEventListener("mousedown", onMouseDownHandler, false);
canvas.addEventListener("mousemove", onMouseMoveHandler, false);
canvas.addEventListener("mouseout", onMouseOutHandler, false);
canvas.addEventListener("mouseup", onMouseUpHandler, false);


/**
 * used to handle mousedown event
 * @param evnt
 */
function onMouseDownHandler(evnt) {

    var position = getposition(evnt);

    shapes.forEach(function (item, index) {
        var shape = item;
        shape.shapeUnselect();
        shape.isSelected = false;
    });
    var clicked = shapes.find(function (shape, index) {
        shapeIndex = index;
        return shape.amIClicked(position.x, position.y);

    });
    console.log(shapeIndex);

    if (clicked) {
        clicked.shapeSelect();
        shapeImgObj = clicked;
        shapeImgObj.isSelected = true;
        draggingImage = true;
        draggingResizer = shapeImgObj.anchorHit(position.x, position.y);
        console.log(draggingResizer);
    }


    else {
        shapeImgObj = null;
        shapeIndex = null;
        draggingImage = false;
        draggingResizer = -1

    }


}
/**.
 *
 *
 *
 * used to remove selected shape within canvas
 *
 *
 */

function removeShape() {
    if (shapeImgObj != null) {
        shapeImgObj.isSelected = false;

        var del = confirm("Do u want to deleteshape");
        if (del === true) {
            shapes.splice(shapeIndex, 1);
        }

    }

}
/**
 * used to get mouse click position
 * @param evnt
 * @returns {CordPosition object}: horizontal x and vertical y coordinate
 */
function getposition(evnt) {

    var cordPosition = {};
    cordPosition.x = evnt.pageX - offsetLeftX;
    cordPosition.y = evnt.pageY - offsetTopY;

    return cordPosition;


}

/**
 * used to handle mouse event
 * @param evnt
 */
function onMouseMoveHandler(evnt) {

    var position = getposition(evnt);
    if (draggingResizer > -1 && shapeImgObj != null) {

        shapeImgObj.resizeShapeFunc(position.x, position.y, draggingResizer)


    }


    else if (draggingImage) {

        if (shapeImgObj != null) {
            shapeImgObj.x = position.x;
            shapeImgObj.y = position.y;


        }
    }
}

function onMouseOutHandler(evnt) {
    onMouseUpHandler(evnt);

}


function onMouseUpHandler(evnt) {
    draggingResizer = -1;
    draggingImage = false;
    // shapeImgObj = null;

}

/**
 * used to save canvas' state in local storage
 */
function updateLocalStorage() {
//    1)  set shape type , so that image can be reffered on restore.

    localStorage.setItem("data", JSON.stringify(shapes));
}
(function () {

    var savedData = localStorage.getItem("data");
    var data = JSON.parse(savedData);

    if(data!= null ) {
        data.forEach(function (shapeData) {
            var shp = new Shape({
                x: shapeData.x,
                y: shapeData.y,
                w: shapeData.w,
                h: shapeData.h,
                type: shapeData.type,
            });

            shp.img = preLoadedImages[shapeData.type];

            shapes.push(shp);

        })
    }
    //alert("Hello, I am restore");
    requestAnimationFrame(drawShape);


})();

/**
 * used to save canvas' state in png image form
 */
function saveData() {
    var savedData = canvas.toDataURL();
    window.open(savedData);
}