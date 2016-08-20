/**
 * Created by garima05 on 19-08-2016.
 */


/**
 * @class Shape
 * @param obj
 * @access public:draw();
 * @constructor
 */
function Shape(obj) {
    this.x = obj.x;
    this.y = obj.y;
    this.w = obj.w;
    this.h = obj.h;
    this.img = 0;
    this.type = obj.type;
    this.draggerSize = 10;
    this.isSelected = false;
}

/**
 * used to draw image
 */
Shape.prototype.draw = function () {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    if (this.isSelected) {
        this.shapeSelect();
        drawDragAnchor(this.x, this.y);
        drawDragAnchor((this.x + this.w - this.draggerSize), this.y);
        drawDragAnchor((this.x + this.w - this.draggerSize), (this.y + this.h - this.draggerSize));
        drawDragAnchor(this.x, (this.y + this.h - this.draggerSize));

    }

}

/**
 * used to create border around the selected image
 */
Shape.prototype.shapeSelect = function () {
    ctx.strokeRect(this.x, this.y, this.w, this.h);

}

/**
 * used to clear border around the image
 */
Shape.prototype.shapeUnselect = function () {
    ctx.clearRect(this.x - 1, this.y - 1, this.w + 2, this.h + 2);
}

/**
 * used to return mouse click position lies within selected image
 * @param xCord
 * @param yCord
 * @returns {boolean}
 */
Shape.prototype.amIClicked = function (xCord, yCord) {
    return (xCord > this.x && xCord < (this.x + this.w) && yCord > this.y && yCord < (this.y + this.h));
}

/**
 * used to resize shape
 * @param xCord
 * @param yCord
 * @param draggingResizer
 */
Shape.prototype.resizeShapeFunc = function (xCord, yCord, draggingResizer) {

    switch (draggingResizer) {
        case 0:
            //top-left
            this.x = xCord;
           this.w = (this.x + this.w) - xCord;
            this.y = yCord;
            this.h = (this.y + this.h) - yCord;
            break;
        case 1:
            //top-right
            imageY = yCord;
            this.w = xCord - this.x;
            this.h = (this.y + this.h) - yCord;
            break;
        case 2:
            //bottom-right
            this.w = xCord - this.x;
            this.h = yCord - this.y;
            break;
        case 3:
            //bottom-left
            this.x = xCord;
            this.w = (this.x + this.w) - xCord;
            this.h = yCord - this.y;
            break;
    }

    if (this.w < 35) {
        this.w = 35;
    }
    if (this.h < 35) {
        this.h = 35;
    }

}

Shape.prototype.anchorHit = function (xCord, yCord) {


    var newXCord = xCord, newYCord = yCord;

    // top-left
    if (newXCord > this.x && newXCord < (this.x + this.draggerSize) && newYCord > this.y && newYCord < (this.y + this.draggerSize)) {
        return (0);
    }
    // top-right

    if (newXCord > (this.x + this.w - this.draggerSize) && newXCord < (this.x + this.w) && newYCord > this.y && newYCord < this.y + this.draggerSize) {
        return (1);
    }
    // bottom-right
    if (newXCord > (this.x + this.w - this.draggerSize) && newXCord < (this.x + this.w) && newYCord > (this.y + this.h - this.draggerSize) && newYCord < (this.y + this.h)) {
        return (2);
    }
    // bottom-left

    if (newXCord > this.x && newXCord < (this.x + this.draggerSize) && newYCord > (this.y + this.h - this.draggerSize) && newYCord < (this.y + this.h)) {
        return (3);
    }
    return (-1);

}
