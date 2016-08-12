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

function Shape() {
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.img = 0;
    this.isSelected = false;

}

/**
 * use to draw image on canvas
 */
Shape.prototype.draw = function () {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

    if(this.isSelected)
    {
        this.selectShape();
        drawDragAnchor(this.x, this.y);
        drawDragAnchor((this.x + this.w), this.y);
        drawDragAnchor((this.x + this.w), (this.y + this.h));
        drawDragAnchor(this.x, (this.y + this.h));

    }

};

/**
 * used to create border around selected image
 */
Shape.prototype.selectShape = function () {
    ctx.strokeRect(this.x, this.y, this.w, this.h);
};

/**
 * used to get mouse click position on canvas
 * @return boolean value (either true or false)
 */
Shape.prototype.amIClicked = function (xPost, yPost) {
    return (xPost > this.x && xPost < (this.x + this.w) && yPost > this.y && yPost < (this.y + this.h));
};

/**
 * used to clear border around selected image
 */
Shape.prototype.unselectShape = function () {
    ctx.clearRect(this.x-1, this.y-1, this.w+2, this.h+2);
};


/**
 * used to resize the image
 * @param {Number} startX:horizontal x coordinate
 * @param {Number} startY:horizontal x coordinate
 * @param {Number} draggingResizer
 */
Shape.prototype.resizeShapeFunc = function (startX, startY,draggingResizer){

    // resize the image
    switch (draggingResizer) {
        case 0:
            //top-left
            this.x = startX;
            this.w = (this.x + this.w) - startX;
            this.y = startY;
            this.h = (this.y + this.h) - startY;
            break;
        case 1:
            //top-right
            this.y = startY;
            this.w = startX - this.x;
            this.h = (this.y + this.h) - startY;
            break;
        case 2:
            //bottom-right
            this.w = startX - this.x;
            this.h = startY - this.y;
            break;
        case 3:
            //bottom-left
            this.x = startX;
            this.w = (this.x + this.w) - startX;
            this.h = startY - this.y;
            break;
    }

    if (this.w < 25) {
        this.w = 25;
    }
    if (this.h < 25) {
        this.h = 25;
    }

};
/**
 * used to resize the image
 * @param {Number} startX:horizontal x coordinate
 * @param {Number} startY:horizontal x coordinate
 * @param {Number}  resizerRadius:resize anchor radius
 */

Shape.prototype.anchorHitTest = function (startX, startY,resizerRadius) {
    var newXCordAfterResizing, newYCordAfterResizing;

    // top-left
    newXCordAfterResizing = startX - this.x;
    newYCordAfterResizing = startY - this.y;
    if (newXCordAfterResizing * newXCordAfterResizing + newYCordAfterResizing * newYCordAfterResizing <= resizerRadius) {
        return (0);
    }
    // top-right
    newXCordAfterResizing = startX - (this.x + this.w);
    newYCordAfterResizing = startY - this.y;
    if (newXCordAfterResizing * newXCordAfterResizing + newYCordAfterResizing * newYCordAfterResizing <= resizerRadius) {
        return (1);
    }
    // bottom-right
    newXCordAfterResizing = startX - (this.x + this.w);
    newYCordAfterResizing = startY - (this.y + this.h);
    if (newXCordAfterResizing * newXCordAfterResizing + newYCordAfterResizing * newYCordAfterResizing <= resizerRadius) {
        return (2);
    }
    // bottom-left
    newXCordAfterResizing = startX - this.x;
    newYCordAfterResizing = startY - (this.y + this.h);
    if (newXCordAfterResizing * newXCordAfterResizing + newYCordAfterResizing * newYCordAfterResizing <= resizerRadius) {
        return (3);
    }
    return (-1);
};


