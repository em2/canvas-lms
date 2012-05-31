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
function prepareCanvasLF(canvas_element, question_id, assessing, editing, drawing_image)
{
	if (editing == true){
		return;
	}
	
	var outlineImage = new Image();
	outlineImage.src = drawing_image;
	var canvas;
	var context;
	var canvasWidth = 924;
	var canvasHeight = 170;
	var padding = 25;
	var lineWidth = 8;
	var colorPurple = "#cb3594";
	var colorGreen = "#659b41";
	var colorBlue = "#0033ff";
	var colorBlack = "#000000";
	var markerBackgroundImage = new Image();
	var eraserBackgroundImage = new Image();
	var plainBackgroungImage = new Image();
	var clickX = new Array();
	var clickY = new Array();
	var clickColor = new Array();
	var clickTool = new Array();
	var clickSize = new Array();
	var clickDrag = new Array();
	var paint = false;
	var curColor = colorBlue;
	var curTool = "marker";
	var curSize = "normal";
	var drawingAreaX = 11;
	var drawingAreaY = 10;
	var drawingAreaWidth = 801;
	var drawingAreaHeight = 150;
	var toolHotspotStartY = 55;
	var toolHotspotHeight = 38;
	var totalLoadResources = 3;
	var curLoadResNum = 0;
	
	// Load the previous canvas data
	if ($('#explain_canvas_'+question_id+'_click_x_data').val().length > 0){

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

		for (var i=0; i<clickX.length; i++){
			clickX[i] = parseInt(clickX[i])
			clickY[i] = parseInt(clickY[i])
		}

		for (var i=0; i<clickDrag.length; i++){
			if (clickDrag[i] == "true"){
				clickDrag[i] = true;
			}
			else{
				clickDrag[i] = false;
			}
		}
	}
	
	
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
	canvas.setAttribute('name', 'canvas_'+canvas_element);
	canvasDiv.appendChild(canvas);
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	var context = canvas.getContext("2d"); // Grab the 2d canvas context
	// Note: The above code is a workaround for IE 8 and lower. Otherwise we could have used:
	//     context = document.getElementById('canvas').getContext("2d");

	// Load images
	// -----------

	markerBackgroundImage.onload = function() { resourceLoaded(); 
	}
	markerBackgroundImage.src = "../../../../images/canvas_drawing/marker-background_LF.png";

	eraserBackgroundImage.onload = function() { resourceLoaded(); 
	}
	eraserBackgroundImage.src = "../../../../images/canvas_drawing/eraser-background_LF.png";
	
	plainBackgroungImage.onload = function() { resourceLoaded(); 
	}
	plainBackgroungImage.src = "../../../../images/canvas_drawing/plain-background_LF.png";

	// Add mouse events
	// ----------------
	$('#canvas_'+canvas_element).mousedown(function(e)
	{
		if (assessing == true){
			// Mouse down location
			var mouseX = e.pageX - this.offsetLeft;
			var mouseY = e.pageY - this.parentNode.parentNode.parentNode.parentNode.parentNode.offsetTop - this.offsetTop + 60;

			if(mouseX > drawingAreaX + drawingAreaWidth + 16) // Right of the drawing area
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
		}
	});

	$('#canvas_'+canvas_element).mousemove(function(e){
		if(paint==true && assessing == true){
			addClick(e.pageX - this.offsetLeft, e.pageY - this.parentNode.parentNode.parentNode.parentNode.parentNode.offsetTop - this.offsetTop + 60, true);
			redraw();
		}
	});

	$('#canvas_'+canvas_element).mouseup(function(e){
		if (assessing == true){
			paint = false;
			redraw();
		}
	});

	$('#canvas_'+canvas_element).mouseleave(function(e){
		if (assessing == true){
			paint = false;
		}
	});
	
	
	/**
	* Adds a point to the drawing array.
	* @param x
	* @param y
	* @param dragging
	*/
	function addClick(x, y, dragging)
	{
		if (assessing == true){
			clickX.push(x);
			clickY.push(y);
			clickTool.push(curTool);
			clickColor.push(curColor);
			clickSize.push(curSize);
			clickDrag.push(dragging);

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
		

		if(curTool == "marker" && assessing == true)
		{
			// Draw the marker tool background
			context.drawImage(markerBackgroundImage, 0, 0, canvasWidth, canvasHeight);
		}
		else if(curTool == "eraser" && assessing == true)
		{
			// Draw the eraser tool background
			context.drawImage(eraserBackgroundImage, 0, 0, canvasWidth, canvasHeight);
		}
		else if(!assessing)
		{
			// Draw the plain background
			context.drawImage(plainBackgroungImage, 0, 0, canvasWidth-104, canvasHeight);
		}
		else
		{
			alert("Error: Current Tool is undefined");
		}
		
		var locX = 851;
		var locY = 37;
		
		if (assessing == true){
			//
			// Draw the marker tip blue
			context.beginPath();
			context.moveTo(locX, locY);
			context.lineTo(locX + 10, locY + 6);
			context.lineTo(locX, locY + 11);
			context.lineTo(locX, locY);
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
		for(; i < clickX.length; i++)
		{
			if(clickSize[i] == "small"){
				radius = 2;
			}else if(clickSize[i] == "normal"){
				radius = 3;
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

		//
		// Draw the outline if there is one
		context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);

	}
}

/**/