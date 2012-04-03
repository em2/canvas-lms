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
function prepareCanvas(canvas_element)
{
	var canvas;
	var context;
	var canvasWidth = 490;
	var canvasHeight = 220;
	var padding = 25;
	var lineWidth = 8;
	var colorPurple = "#cb3594";
	var colorGreen = "#659b41";
	var markerImage = new Image();
	var eraserImage = new Image();
	var markerBackgroundImage = new Image();
	var eraserBackgroundImage = new Image();
	var clickX = new Array();
	var clickY = new Array();
	var clickColor = new Array();
	var clickTool = new Array();
	var clickSize = new Array();
	var clickDrag = new Array();
	var paint = false;
	var curColor = colorPurple;
	var curTool = "marker";
	var curSize = "normal";
	var mediumStartX = 75;
	var mediumStartY = 85;
	var mediumImageWidth = 93;
	var mediumImageHeight = 46;
	var drawingAreaX = 111;
	var drawingAreaY = 11;
	var drawingAreaWidth = 267;
	var drawingAreaHeight = 200;
	var toolHotspotStartY = 95;
	var toolHotspotHeight = 38;
	var sizeHotspotStartY = 230;
	var sizeHotspotHeight = 36;
	var sizeHotspotWidthObject = new Object();
	sizeHotspotWidthObject.huge = 39;
	sizeHotspotWidthObject.large = 25;
	sizeHotspotWidthObject.normal = 18;
	sizeHotspotWidthObject.small = 16;
	var totalLoadResources = 4;
	var curLoadResNum = 0;
	/**
	* Calls the redraw function after all neccessary resources are loaded.
	*/
	function resourceLoaded()
	{
		if(++curLoadResNum >= totalLoadResources){
			redraw();
		}
	}
	
	
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	var canvasDiv = document.getElementById(canvas_element);
	var canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'canvas_'+canvas_element);
	canvasDiv.appendChild(canvas);
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	var context = canvas.getContext("2d"); // Grab the 2d canvas context
	// Note: The above code is a workaround for IE 8 and lower. Otherwise we could have used:
	//     context = document.getElementById('canvas').getContext("2d");

	// Load images
	// -----------

	markerImage.onload = function() { resourceLoaded(); 
	}
	markerImage.src = "../../../../images/canvas_drawing/marker-outline.png";

	eraserImage.onload = function() { resourceLoaded(); 
	}
	eraserImage.src = "../../../../images/canvas_drawing/eraser-outline.png";	

	markerBackgroundImage.onload = function() { resourceLoaded(); 
	}
	markerBackgroundImage.src = "../../../../images/canvas_drawing/marker-background.png";

	eraserBackgroundImage.onload = function() { resourceLoaded(); 
	}
	eraserBackgroundImage.src = "../../../../images/canvas_drawing/eraser-background.png";

	// Add mouse events
	// ----------------
	$('#canvas_'+canvas_element).mousedown(function(e)
	{
		// Mouse down location
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.parentNode.parentNode.parentNode.parentNode.parentNode.offsetTop + this.offsetTop + 10;

		if(mouseX < drawingAreaX + 16) // Left of the drawing area
		{
			if(mouseX > mediumStartX)
			{
				if(mouseY > mediumStartY && mouseY < mediumStartY + mediumImageHeight){
					curColor = colorPurple;
				}else if(mouseY > mediumStartY + mediumImageHeight && mouseY < mediumStartY + mediumImageHeight * 2){
					curColor = colorGreen;
				}
			}
		}
		else if(mouseX > drawingAreaX + drawingAreaWidth + 16) // Right of the drawing area
		{
			if(mouseY > toolHotspotStartY)
			{
				if(mouseY < toolHotspotStartY + toolHotspotHeight * 2){
					curTool = "marker";
					curSize = "normal";
				}else if(mouseY < toolHotspotStartY + toolHotspotHeight * 3){
					curTool = "eraser";
					curSize = "huge";
				}
			}
		}
		else if(mouseY > drawingAreaY && mouseY < drawingAreaY + drawingAreaHeight)
		{
			// Mouse click location on drawing area
		}
		paint = true;
		addClick(mouseX, mouseY, false);
		redraw();
	});

	$('#canvas_'+canvas_element).mousemove(function(e){
		if(paint==true){
			addClick(e.pageX - this.offsetLeft, e.pageY - this.parentNode.parentNode.parentNode.parentNode.parentNode.offsetTop + this.offsetTop + 10, true);
			redraw();
		}
	});

	$('#canvas_'+canvas_element).mouseup(function(e){
		paint = false;
	  	redraw();
	});

	$('#canvas_'+canvas_element).mouseleave(function(e){
		paint = false;
	});
	
	
	/**
	* Adds a point to the drawing array.
	* @param x
	* @param y
	* @param dragging
	*/
	function addClick(x, y, dragging)
	{
		clickX.push(x);
		clickY.push(y);
		clickTool.push(curTool);
		clickColor.push(curColor);
		clickSize.push(curSize);
		clickDrag.push(dragging);
	}

	/**
	* Clears the canvas.
	*/
	function clearCanvas()
	{
		context.clearRect(0, 0, canvasWidth, canvasHeight); // clear the canvas
	}

	/**
	* Redraws the canvas.
	*/
	function redraw()
	{
		// Make sure required resources are loaded before redrawing
		if(curLoadResNum < totalLoadResources){ return; }

		clearCanvas();

		var locX;
		var locY;
		if(curTool == "marker")
		{
			// Draw the marker tool background
			context.drawImage(markerBackgroundImage, 0, 0, canvasWidth, canvasHeight);

			// Purple
			locX = (curColor == colorPurple) ? 18 : 52;
			locY = 19;

			context.beginPath();
			context.moveTo(locX + 10, locY + 24);
			context.lineTo(locX + 10, locY + 24);
			context.lineTo(locX + 22, locY + 16);
			context.lineTo(locX + 22, locY + 31);
			context.closePath();
			context.fillStyle = colorPurple;
			context.fill();	

			if(curColor == colorPurple){
				context.drawImage(markerImage, locX, locY, mediumImageWidth, mediumImageHeight);
			}else{
				context.drawImage(markerImage, 0, 0, 59, mediumImageHeight, locX, locY, 59, mediumImageHeight);
			}

			// Green
			locX = (curColor == colorGreen) ? 18 : 52;
			locY += 46;

			context.beginPath();
			context.moveTo(locX + 10, locY + 24);
			context.lineTo(locX + 10, locY + 24);
			context.lineTo(locX + 22, locY + 16);
			context.lineTo(locX + 22, locY + 31);
			context.closePath();
			context.fillStyle = colorGreen;
			context.fill();	

			if(curColor == colorGreen){
				context.drawImage(markerImage, locX, locY, mediumImageWidth, mediumImageHeight);
			}else{
				context.drawImage(markerImage, 0, 0, 59, mediumImageHeight, locX, locY, 59, mediumImageHeight);
			}
		}
		else if(curTool == "eraser")
		{
			context.drawImage(eraserBackgroundImage, 0, 0, canvasWidth, canvasHeight);
			context.drawImage(eraserImage, 18, 19, mediumImageWidth, mediumImageHeight);	
		}else{
			alert("Error: Current Tool is undefined");
		}

		// Keep the drawing in the drawing area
		context.save();
		context.beginPath();
		context.rect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
		context.clip();

		var radius;
		var i = 0;
		for(; i < clickX.length; i++)
		{
			if(clickSize[i] == "small"){
				radius = 2;
			}else if(clickSize[i] == "normal"){
				radius = 5;
			}else if(clickSize[i] == "large"){
				radius = 10;
			}else if(clickSize[i] == "huge"){
				radius = 20;
			}else{
				alert("Error: Radius is zero for click " + i);
				radius = 0;	
			}

			context.beginPath();
			if(clickDrag[i] && i){
				context.moveTo(clickX[i-1]-15, clickY[i-1]-70);
			}else{
				context.moveTo(clickX[i]-15, clickY[i]-70);
			}
			context.lineTo(clickX[i]-15, clickY[i]-70);
			context.closePath();

			if(clickTool[i] == "eraser"){
				//context.globalCompositeOperation = "destination-out"; // To erase instead of draw over with white
				context.strokeStyle = 'white';
			}else{
				//context.globalCompositeOperation = "source-over";	// To erase instead of draw over with white
				context.strokeStyle = clickColor[i];
			}
			context.lineJoin = "round";
			context.lineWidth = radius;
			context.stroke();

		}
		//context.globalCompositeOperation = "source-over";// To erase instead of draw over with white
		context.restore();

		context.globalAlpha = 1; // No IE support

	}
}

/**/