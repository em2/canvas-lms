// Copyright 2010 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.



/**
* Creates a canvas element, loads images, adds events, and draws the canvas for the first time.
*/
function prepareCanvasLF(canvas_element, question_id, assessing, editing, drawing_image) {
  if (editing === true) { return; }

  var canvas;
  var canvasX;
  var canvasY;
  var mouseIsDragging = false;
  var context;
  var canvasWidth = 713;
  var canvasHeight = 332;
  var padding = 25;
  var lineWidth = 8;
  var colorPurple = "#cb3594";
  var colorGreen = "#659b41";
  var colorBlue = "#0033ff";
  var colorBlack = "#000000";
  var colorWhite = "#FFFFFF";
  var sources = {};
  var images = {};
  var clickX = new Array();
  var clickY = new Array();
  var clickColor = new Array();
  var clickTool = new Array();
  var clickSize = new Array();
  var clickDrag = new Array();
  var paint = false;
  var curColor = colorBlue;
  var curTool = "marker2";
  var curSize = "normal";
  var drawingAreaX = 1;
  var drawingAreaY = 1;
  var drawingAreaWidth = 600;
  var drawingAreaHeight = 330;
  var toolHotspotStartY = 30;
  var toolHeight = 38;
  var curLoadResNum = 0;
  var lastIndexDrawn = 0;
  var markerTipX = 644;
  var marker1TipY = 44;
  var marker2TipY = 83;
  var outlineImageHeight = 150;



  // Load the previous canvas data
  if ($('#explain_canvas_'+question_id+'_click_x_data').val().length > 0) {

    clickX = $('#explain_canvas_'+question_id+'_click_x_data').val();
    clickX = clickX.split(',');

    clickY = $('#explain_canvas_'+question_id+'_click_y_data').val();
    clickY = clickY.split(',');

    clickColor = $('#explain_canvas_'+question_id+'_click_color_data').val();
    clickColor = clickColor.split(',');

    clickTool = $('#explain_canvas_'+question_id+'_click_tool_data').val();
    clickTool = clickTool.split(',');

    clickSize = $('#explain_canvas_'+question_id+'_click_size_data').val();
    clickSize = clickSize.split(',');

    clickDrag = $('#explain_canvas_'+question_id+'_click_drag_data').val();
    clickDrag = clickDrag.split(',');

    for (var i=0; i<clickX.length; i++) {
      clickX[i] = parseInt(clickX[i])
      clickY[i] = parseInt(clickY[i])
    }

    for (var i=0; i<clickDrag.length; i++) {
      if (clickDrag[i] === "true") {
        clickDrag[i] = true;
      } else{
        clickDrag[i] = false;
      }
    }
  }

  // Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
  var canvasDiv = document.getElementById(canvas_element);
  var canvas = document.createElement('canvas');
  canvas.setAttribute('width', canvasWidth);
  canvas.setAttribute('height', canvasHeight);
  canvas.setAttribute('id', 'canvas_'+canvas_element);
  canvas.setAttribute('name', 'canvas_'+canvas_element);
  canvasDiv.appendChild(canvas);
  if (typeof G_vmlCanvasManager !== 'undefined') {
    canvas = G_vmlCanvasManager.initElement(canvas);
  }
  var context = canvas.getContext("2d"); // Grab the 2d canvas context
  // Note: The above code is a workaround for IE 8 and lower. Otherwise we could have used:
  //     context = document.getElementById('canvas').getContext("2d");


  // Load images
  // -----------

  sources = {
    marker1BackgroundImage: '../../../../images/canvas_drawing/marker1-background_LF.png',
    marker2BackgroundImage: '../../../../images/canvas_drawing/marker2-background_LF.png',
    eraserBackgroundImage: '../../../../images/canvas_drawing/eraser-background_LF.png',
    plainBackgroungImage: '../../../../images/canvas_drawing/plain-background_LF.png',
    whiteBackgroundImage: '../../../../images/canvas_drawing/background-white_LF.png',
    outlineImage: drawing_image
  };

  function loadImages(sources, callback) {
    var loadedImages, numberImages, src;
    loadedImages = 0;
    numberImages = 0;
    for (src in sources) {
      numberImages++;
    }
    for (src in sources) {
      images[src] = new Image();
      images[src].onload = function() {
        if (++loadedImages >= numberImages) {
          return callback();
        }
      };
      images[src].crossOrigin = "";
      images[src].src = sources[src];
    }
  };

  // Add mouse events
  // ----------------

  $('#canvas_'+canvas_element).bind("mousedown", function(e) {
    mouseDown(e.originalEvent);
  });

  $('#canvas_'+canvas_element).bind("mousemove", function(e) {
    mouseXY(e.originalEvent);
  });

  $(document.body).bind("mouseup", function(e) {
    mouseUp();
  });

  $('#canvas_'+canvas_element).bind("touchstart", function(e) {
    touchDown(e.originalEvent);
  });

  $('#canvas_'+canvas_element).bind("touchmove", function(e) {
    touchXY(e.originalEvent);
  });

  $('#canvas_'+canvas_element).bind("touchend", function(e) {
    touchUp();
  });

  $(document.body).bind("touchcancel", function(e) {
    touchUp();
  });


  //
  // events to hide the canvas border for taking a picture snapshot of the drawing
  $('#canvas_'+canvas_element).bind("hideYerStuff", function(e) {
    hideIt();
  });

  $('#canvas_'+canvas_element).bind("showYerStuff", function(e) {
    showIt();
  });

  function hideIt() {
    assessing = false;
    redraw();
  }

  function showIt() {
    assessing = true;
    redraw();
  }

  function mouseDown(e) {
    if (assessing){
        mouseIsDragging = true;
        mouseXY(e);
    }
  }

  function touchDown(e) {
    if (assessing){
        mouseIsDragging = false;
        touchXY(e);
    }
  }

  function mouseXY(e) {
    if (assessing){
      var xy = getMousePos(e);
      canvasX = xy.x;
      canvasY = xy.y;
      checkPos();
      draw();
    }
  }

  function touchXY(e) {
    if (assessing){
      e.preventDefault();
      var xy = getTouchPos(e);
      canvasX = xy.x;
      canvasY = xy.y;
      checkPos();
      draw();
      if (!mouseIsDragging){
        mouseIsDragging = true;
      }
    }
  }

  function getMousePos(e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  function getTouchPos(e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.targetTouches[0].clientX - rect.left,
      y: e.targetTouches[0].clientY - rect.top
    };
  }

  function mouseUp() {
    if (assessing){
        mouseIsDragging = false;
        paint = false;
    }
  }

  function touchUp() {
    if (assessing){
        mouseIsDragging = false;
        paint = false;
    }
  }

  function checkPos() {
    if (canvasX > drawingAreaX + drawingAreaWidth) { // Right of the drawing area
      if (canvasY > toolHotspotStartY && !mouseIsDragging) {
        if (canvasY < toolHotspotStartY + toolHeight) {
          curTool = "marker1";
          curSize = "normal";
          curColor = colorBlack;
        } else if (canvasY < toolHotspotStartY + toolHeight*2) {
          curTool = "marker2";
          curSize = "normal";
          curColor = colorBlue;
        } else if (canvasY < toolHotspotStartY + toolHeight*3) {
          curTool = "eraser";
          curSize = "huge";
          curColor = colorWhite;
        }
      }
    }

    paint = true;
    addClick();

  }

  /**
  * Adds a point to the drawing array.
  */
  function addClick() {
    if (assessing && paint) {
      clickX.push(canvasX);
      clickY.push(canvasY);
      clickTool.push(curTool);
      clickColor.push(curColor);
      clickSize.push(curSize);
      clickDrag.push(mouseIsDragging);

      $('#explain_canvas_'+question_id+'_click_x_data').val(clickX.toString());
      $('#explain_canvas_'+question_id+'_click_y_data').val(clickY.toString());
      $('#explain_canvas_'+question_id+'_click_color_data').val(clickColor.toString());
      $('#explain_canvas_'+question_id+'_click_tool_data').val(clickTool.toString());
      $('#explain_canvas_'+question_id+'_click_size_data').val(clickSize.toString());
      $('#explain_canvas_'+question_id+'_click_drag_data').val(clickDrag.toString());

      //
      // Fire a change event so the data can be reliably saved to the database
      $('#explain_canvas_'+question_id+'_click_x_data').change();
    }
  }

  /**
  * Clears the canvas.
  */
  function clearCanvas() {
    context.clearRect(0, 0, canvasWidth, canvasHeight); // clear the canvas
  }

  /**
  * Redraws the canvas.
  */
  function redraw() {
    clearCanvas();

    // Draw the white square behind the drawing pad
    context.drawImage(images.whiteBackgroundImage, 0, 0, canvasWidth, canvasHeight);

    if (curTool === "marker1" && assessing === true) {
      // Draw the marker tool background
      context.drawImage(images.marker1BackgroundImage, 0, 0, canvasWidth, canvasHeight);
    } else if ((curTool === "marker2" || curTool === "marker") && assessing === true) { // backwards compatability - marker2 is the same as marker
      // Draw the marker tool background
      context.drawImage(images.marker2BackgroundImage, 0, 0, canvasWidth, canvasHeight);
    } else if (curTool === "eraser" && assessing === true) {
      // Draw the eraser tool background
      context.drawImage(images.eraserBackgroundImage, 0, 0, canvasWidth, canvasHeight);
    } else if (!assessing) {
      // Draw the plain background
      context.drawImage(images.plainBackgroungImage, 0, 0, canvasWidth-104, canvasHeight);
    } else {
      alert("Error: Current Tool is undefined");
    }

    if (assessing === true) {
      //
      // Draw the marker1 tip black
      context.beginPath();
      context.moveTo(markerTipX, marker1TipY);
      context.lineTo(markerTipX + 10, marker1TipY + 6);
      context.lineTo(markerTipX, marker1TipY + 11);
      context.lineTo(markerTipX, marker1TipY);
      context.closePath();
      context.fillStyle = colorBlack;
      context.fill();
      //
      // Draw the marker2 tip blue
      context.beginPath();
      context.moveTo(markerTipX, marker2TipY);
      context.lineTo(markerTipX + 10, marker2TipY + 6);
      context.lineTo(markerTipX, marker2TipY + 11);
      context.lineTo(markerTipX, marker2TipY);
      context.closePath();
      context.fillStyle = colorBlue;
      context.fill();
    }

    // Keep the drawing in the drawing area
    context.save();
    context.beginPath();
    context.rect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
    context.clip();

    var radius;
    var i = 0;
    for(; i < clickX.length; i++) {
      if (clickSize[i] === "small") {
        radius = 2;
      } else if (clickSize[i] === "normal") {
        radius = 3;
      } else if (clickSize[i] === "large") {
        radius = 10;
      } else if (clickSize[i] === "huge") {
        radius = 20;
      } else {
        alert("Error: Radius is zero for click " + i);
        radius = 0;
      }

      context.beginPath();
      if (clickDrag[i]) {
        context.moveTo(clickX[i-1], clickY[i-1]);
      } else {
        context.moveTo(clickX[i], clickY[i]);
      }
      context.lineTo(clickX[i], clickY[i]);
      context.closePath();

      if (clickTool[i] === "eraser") {
        //context.globalCompositeOperation = "destination-out"; // To erase instead of draw over with white
        context.strokeStyle = colorWhite;
      } else {
        //context.globalCompositeOperation = "source-over"; // To erase instead of draw over with white
        context.strokeStyle = clickColor[i];
      }
      context.lineJoin = "round";
      context.lineWidth = radius;
      context.stroke();

      lastIndexDrawn = i;
    }
    //context.globalCompositeOperation = "source-over";// To erase instead of draw over with white
    context.restore();

    context.globalAlpha = 1; // No IE support

    //
    // Draw the outline if there is one
    context.drawImage(images.outlineImage, drawingAreaX, drawingAreaY+(drawingAreaHeight/2) - (outlineImageHeight / 2), drawingAreaWidth, outlineImageHeight);

  }
  function draw () {
    var radius, i;
    i = lastIndexDrawn;
    for(; i < clickX.length; i++) {
      if (clickSize[i] === "small") {
        radius = 2;
      } else if (clickSize[i] === "normal") {
        radius = 3;
      } else if (clickSize[i] === "large") {
        radius = 10;
      } else if (clickSize[i] === "huge") {
        radius = 20;
      } else {
        alert("Error: Radius is zero for click " + i);
        radius = 0;
      }

      context.beginPath();
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i-1], clickY[i-1]);
      } else {
        context.moveTo(clickX[i], clickY[i]);
      }
      context.lineTo(clickX[i], clickY[i]);
      context.closePath();

      if (clickTool[i] === "eraser") {
        //context.globalCompositeOperation = "destination-out"; // To erase instead of draw over with white
        context.strokeStyle = colorWhite;
      } else {
        //context.globalCompositeOperation = "source-over"; // To erase instead of draw over with white
        context.strokeStyle = clickColor[i];
      }
      context.lineJoin = "round";
      context.lineWidth = radius;
      context.stroke();

      lastIndexDrawn = i;
    }

    if (curTool === "marker1" && assessing === true) {
      // Draw the marker tool background
      context.drawImage(images.marker1BackgroundImage, 0, 0, canvasWidth, canvasHeight);
    } else if ((curTool === "marker2" || curTool === "marker") && assessing === true) { // backwards compatability - marker2 is the same as marker
      // Draw the marker tool background
      context.drawImage(images.marker2BackgroundImage, 0, 0, canvasWidth, canvasHeight);
    } else if (curTool === "eraser" && assessing === true) {
      // Draw the eraser tool background
      context.drawImage(images.eraserBackgroundImage, 0, 0, canvasWidth, canvasHeight);
    } else if (!assessing) {
      // Draw the plain background
      context.drawImage(images.plainBackgroungImage, 0, 0, canvasWidth-104, canvasHeight);
    } else {
      alert("Error: Current Tool is undefined");
    }

    if (assessing === true) {
      //
      // Draw the marker1 tip black
      context.beginPath();
      context.moveTo(markerTipX, marker1TipY);
      context.lineTo(markerTipX + 10, marker1TipY + 6);
      context.lineTo(markerTipX, marker1TipY + 11);
      context.lineTo(markerTipX, marker1TipY);
      context.closePath();
      context.fillStyle = colorBlack;
      context.fill();
      //
      // Draw the marker2 tip blue
      context.beginPath();
      context.moveTo(markerTipX, marker2TipY);
      context.lineTo(markerTipX + 10, marker2TipY + 6);
      context.lineTo(markerTipX, marker2TipY + 11);
      context.lineTo(markerTipX, marker2TipY);
      context.closePath();
      context.fillStyle = colorBlue;
      context.fill();
    }

    //
    // Draw the outline if there is one
    context.drawImage(images.outlineImage, drawingAreaX, drawingAreaY+(drawingAreaHeight/2) - (outlineImageHeight / 2), drawingAreaWidth, outlineImageHeight);
  }
  return loadImages(sources, redraw);
}

/**/