/**
 * Created by garima05 on 07-08-2016.
 */


/**
 @summary  This class contain image resizer functionality.
 * Different images can be drawn on the canvas from left control panel.Selected image can be
 * resized and repostioned with in canvas  we can remove Image from canvas
 *  and  save all images and canvas state in local storage
 *
 *
 *
 * @access public : draw()
 * @access public : createBorder()
 * @access public : amIClicked()
 * @access public : clearBorder()
 * @access public : anchorHitTest()
 * @access public :resizeShapeFunc
 *
 *
 * @class : Shape
 *
 */
/*
 var imgCircle = new Image();
 imgCircle.src = "./images/circle.png";

 var imgRect = new Image();
 imgRect.src = "./images/rect.png";

 var imgTrang = new Image();
 imgTrang.src = "./images/triangle.png";*/

function Shape(obj) {
    this.x = obj.x;
    this.y = obj.y;
    this.w = obj.w;
    this.h = obj.h;


    this.dragerSize = 20;
    this.type = obj.type;
    if (obj.type) {
        this.img = preLoadedImages[obj.type]
    } else {
        console.log("No image is selected");
    }
    this.isSelected = obj.isSelected;
    this.update();

}
Shape.prototype.update = function(){
    this.b = this.y + this.h;
    this.r = this.x + this.w;
};

/**
 * use to draw image on canvas
 */
Shape.prototype.draw = function () {
    if (this.img) {


        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

        if (this.isSelected) {
            this.update();
            ctx.strokeRect(this.x, this.y, this.w, this.h);

            this.drawDragger(this.x, this.y);// top-left
            this.drawDragger((this.x + this.w - this.dragerSize), this.y);// top-right
            this.drawDragger((this.x + this.w - this.dragerSize), (this.y + this.h - this.dragerSize));// bottom-right
            this.drawDragger(this.x, (this.y + this.h - this.dragerSize));// bottom-left

        }
    }

};
/**
 * used to draw drag anchor at four corners of the shape
 * @param {Number} x-coordinate of the center of the circle
 * @param {Number} y-coordinate of the center of the circle
 */
Shape.prototype.drawDragger = function (x, y) {
    ctx.fillRect(x, y, this.dragerSize, this.dragerSize);
}

/**
 * used to create border around selected image
 */
Shape.prototype.selectShape = function () {
    this.isSelected = true;
};

/**
 * used to get mouse click position on canvas
 * @return boolean value (either true or false)
 */
Shape.prototype.amIClicked = function (xPost, yPost) {
    return (xPost > this.x && xPost < this.r && yPost > this.y && yPost < this.b);
};

/**
 * used to clear border around selected image
 */
Shape.prototype.unselectShape = function () {
    this.isSelected = false;
};


/**
 * used to resize the image
 * @param {Number} startX:horizontal x coordinate
 * @param {Number} startY:horizontal x coordinate
 * @param {Number} draggingResizer
 */
Shape.prototype.resizeShapeFunc = function (startX, startY, draggingResizer) {
console.log("resizeShapeFunc : "+ draggingResizer);
    // resize the image
    switch (draggingResizer) {
        case 0:
            //top-left
            this.x = startX;
            this.w = this.r - startX;
            this.y = startY;
            this.h = this.b - startY;
            break;
        case 1:
            //top-right
            this.y = startY;
            this.w = startX - this.x;
            this.h = this.b - startY;
            break;
        case 2:
            //bottom-right
            this.w = startX - this.x;
            this.h = startY - this.y;
            break;
        case 3:
            //bottom-left
            this.x = startX;
            this.w = this.r - startX;
            this.h = startY - this.y;
            break;
    }

    /*Set the min size*/
    if (this.w < 45) {
        this.w = 45;
    }
    if (this.h < 45) {
        this.h = 45;
    }

};
/**
 * used to resize the image
 * @param {Number} startX:horizontal x coordinate
 * @param {Number} startY:horizontal x coordinate
 * @param {Number}  resizerRadius:resize anchor radius
 */

Shape.prototype.anchorHitTest = function (startX, startY, resizerRadius) {
    var newXCordAfterResizing, newYCordAfterResizing;

    // top-left
    if (startX > this.x
        && startY > this.y
        && startX < (this.x + this.dragerSize)
        && (startY < this.y + this.dragerSize)) {
        console.log("0");
        return (0);
    }
    // top-right
    if (startX < this.r
        && startY > this.y

        && startX > (this.r - this.dragerSize)
        && startY < (this.y + this.dragerSize)) {
        console.log("1");
        return (1);
    }
    // bottom-right
    if (startX < this.r
        && startY < this.b
        && startX > (this.r - this.dragerSize)
        && startY > (this.b - this.dragerSize)) {
        console.log("2");
        return (2);
    }
    // bottom-left
    if (startX > this.x
        && startY < this.b
        && startX < this.x + this.dragerSize
        && startY > this.b - this.dragerSize
    ) {
        console.log("3");
        return (3);
    }
    return (-1);
};


