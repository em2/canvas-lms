define(["INST","jquery","ajax_errors","jquery.instructure_jquery_patches","jquery.instructure_misc_plugins","jquery.keycodes","jquery.scrollToVisible","vendor/jquery.scrollTo","jqueryui/position"],function(a,b){var c={columns:[],rows:[],dataRows:[],dataFragment:document.createDocumentFragment(),cells:{},divs:{},init:function(d,e){var f=e.onReady,g=e.tick,h=e.maxWidth||150;c.borderSize=e.borderSize||1,e.scroll&&b.isFunction(e.scroll)&&(c.scrollCallback=e.scroll),c.table=d,c.toggleCallback=e.toggle;var i=d.find("tr:first td"),j=d.find("tr"),k=0;i.each(function(a){var d=c.columns[a]=b(this);d.metrics={width:Math.min(d.width(),h),outerWidth:Math.min(d.outerWidth(),h+1)},k+=d.metrics.outerWidth});var l=0;j.each(function(a){var d=c.rows[a]=b(this);d.metrics={outerHeight:d.find("td:first").outerHeight(),height:d.find("td:first").height()},l+=d.metrics.height}),g&&b.isFunction(g)&&g(),c.divs.all=b(".datagrid"),c.divs.topleft=b("#datagrid_topleft"),c.divs.left=b("#datagrid_left"),c.divs.top=b("#datagrid_top"),c.divs.data=b("#datagrid_data"),c.divs.filler=b("#datagrid_filler"),c.divs.topleft.width(c.columns[0].metrics.width+c.borderSize),c.divs.left.width(c.columns[0].metrics.width+c.borderSize),c.divs.filler.width(k-c.columns[0].metrics.width),c.divs.top.height(c.rows[0].metrics.height+c.borderSize),c.divs.topleft.height(c.rows[0].metrics.height+c.borderSize),c.divs.filler.height(l-c.rows[0].metrics.height),c._initializeListeners(),c._templateCellHTML=e.templateCellHTML,c.sizeToWindow(),b(window).resize(c.sizeToWindow);var m=c._createRow(0,!0);m.append(c._createCell(0,0,d.find("tr:first td:first"))),c.divs.topleft.children(".content:first").append(m),m=c._createRow(0),m.width(k-c.columns[0].metrics.outerWidth),d.find("tr:first").children("td:not(:first)").each(function(a){m.append(c._createCell(0,a+1,b(this)))}),c.divs.top.children(".content:first").append(m),g&&b.isFunction(g)&&g();var n=!1,o=function(a){n||(m=c._createRow(a+1,!0),m.append(c._createCell(a+1,0,b(this).find("td:first"))),c.divs.left.children(".content:first").append(m)),m=c._createRow(a+1),b(this).children("td:not(:first)").each(function(d){c._createCell(a+1,d+1,b(this)),c._placeDataCell(a+1,d+1)}),c._placeDataRow(a+1)},p=[],q=0,r=0;d.find("tr:not(:first)").each(function(a){var d=0;m=c._createRow(a+1,!0),m.append(c._createCell(a+1,0,b(this).find("td:first"))),c.divs.left.children(".content:first").append(m),m=c._createRow(a+1),m.width(k-c.columns[0].metrics.outerWidth),b(this).children("td:not(:first)").each(function(a){d+=c.columns[a+1].metrics.width}),c._placeDataRow(a+1),q+=c.rows[a+1].metrics.height,p.push(b(this))}),n=!0,c._placeDataFragment(),e&&e.onViewable&&b.isFunction(e.onViewable)&&e.onViewable.call(this);var s=0,t=function(e){try{g&&b.isFunction(g)&&e&&g();if(s<p.length){var h=s;s++,o.call(p[h],h),setTimeout(function(){t(!0)},1)}else if(e&&!t.finished){t.finished=!0,c.initialized=!0,d.hide(),c.ready&&b.isFunction(c.ready)&&c.ready(),f&&b.isFunction(f)&&f();if(a.browser.ff){var i=b("#datagrid_top"),j=i.find(".row"),k=j.add("#datagrid_data .row");function l(){var a=i.width();i.width(99999999),j.css({position:"relative",width:""});var b=j.width()+1;i.width(a),j.css("position",""),k.width(b)}l();var m;b(window).resize(function(){clearTimeout(m),m=setTimeout(l,100)})}}}catch(n){a.log_error({message:n.toString()})}};setTimeout(function(){t(!0)},5),setTimeout(function(){t(!1)},5),setTimeout(function(){t(!1)},5),setTimeout(function(){t(!1)},5);var u=c.divs.top.children(".content:first"),v=c.divs.left.children(".content:first"),w=!1;setInterval(function(){if(!w)return;u.length===0&&(u=c.divs.top.children(".content:first")),v.length===0&&(v=c.divs.left.children(".content:first")),u.css("left",0-c.divs.data.scrollLeft()),v.css("top",0-c.divs.data.scrollTop()),c.scrollCallback&&c.scrollCallback(),w=!1},100),c.divs.data.bind("scroll",function(){w=!0}),c.mouseHasMoved=!0,b(document).mousemove(function(a){c.mouseHasMoved=!0}),b(document).keycodes("up down left right tab shift+tab",function(a){if(b(a.target).closest(".ui-dialog").length>0)return;a.preventDefault(),a.stopPropagation(),a.keyString=="right"||a.keyString=="tab"?c.moveRight():a.keyString=="down"?c.moveDown():a.keyString=="up"?c.moveUp():(a.keyString=="left"||a.keyString=="shift+tab")&&c.moveLeft()})},_initializeListeners:function(){c.divs.all.delegate(".cell","mousemove",c._cellMove).delegate(".cell","mouseover",c._cellOver).delegate(".cell","mouseout",c._cellOut).delegate(".cell","click",c._cellClick)},titles:function(a){var b=[];for(var d in a){var e=c.cells["0,"+a[d]];b.push(e.find(".assignment_title").text()||"--")}},reorderColumns:function(a){var b={},d=[],e=[];for(var f=0;f<a.length;f++)e[f]=f;for(var g=0;g<a.length;g++){var h=a[g];for(var i=0;i<c.rows.length;i++){var j=c.cells[i+","+h],k=c.cells[i+","+e[g]];e[g]!=h&&(e[g]<h?c.cells[i+","+e[g]].before(j):c.cells[i+","+e[g]].after(j)),b[i+","+g]=c.cells[i+","+h],b[i+","+g].column=g,b[i+","+g].data("datagrid_position",{row:i,column:g}),b[i+","+g].data("column",g),d[g]=c.columns[h]}var l=-1;for(var f=0;f<e.length;f++)e[f]==h&&(l=f);g!=l&&(g<l?(e.splice(g,0,h),e.splice(l+1,1)):(e.splice(g,0,h),e.splice(l,1)))}c.cells=b,c.columns=d},reorderRows:function(a){var b={},d=[],e=[];for(var f=0;f<a.length;f++)e[f]=f;var g=0;for(var h=0;h<a.length;h++){var i=a[h],j=c.cells[i+",0"].parents(".row"),k=c.cells[i+",1"].parents(".row");k.css("top",g),j.css("top",g),h>0&&(g=g+c.rows[i].metrics.height+1),e[h]!=i&&(e[h]<i?(c.cells[e[h]+",0"].parents(".row").before(j),c.cells[e[h]+",1"].parents(".row").before(k)):(c.cells[e[h]+",0"].parents(".row").after(j),c.cells[e[h]+",1"].parents(".row").after(k))),d[h]=c.rows[i];for(var l=0;l<c.columns.length;l++){var m=c.cells[i+","+l];b[h+","+l]=c.cells[i+","+l],b[h+","+l].row=h,b[h+","+l].data("datagrid_position",{row:h,column:l}),b[h+","+l].data("row",h),d[h]=c.rows[i]}var n=-1;for(var f=0;f<e.length;f++)e[f]==i&&(n=f);h!=n&&(h<n?(e.splice(h,0,i),e.splice(n+1,1)):(e.splice(h,0,i),e.splice(n,1)))}c.cells=b,c.rows=d},moveColumn:function(a,b){new_order=[];if(a==0||b==0||a==b)return;for(var d=0;d<c.columns.length;d++)d==b?new_order.push(a):d>=b&&d<=a||d<=b&&d>=a?b<a?new_order.push(d-1):new_order.push(d+1):new_order.push(d);c.reorderColumns(new_order)},_placeDataCell:function(a,b){if(a<1||b<1)return;var d=c.cells[a+","+b];if(d&&d.placed)return;var e=c.dataRows[a];e&&(e.append(d),d.placed=!0)},_initializeCell:function(a,d){if(!c.cells[a+","+d]){var e=["cell"];a===0&&e.push("column_header"),d===0&&e.push("row_header"),d!==0&&a!==0&&e.push("data_cell");var f=b(["<div class='",e.join(" "),"' style='visibility: hidden; height:",c.rows[a].metrics.height,"px; width:",c.columns[d].metrics.width,"px;' data-row='",a,"' data-column='",d,"'/>"].join("")).data({row:a,column:d});f.row=a,f.column=d,c.cells[a+","+d]=f}return c.cells[a+","+d]},_createCell:function(a,b,d){var e=c._initializeCell(a,b);return e.transferred?e:(a!=0&&b!=0&&c._templateCellHTML?e.append(c._templateCellHTML(a,b)):e.append(d.children()),e.attr("id",d.attr("id")),d.attr("id","original_"+e.attr("id")),e.originalTD=d,e.addClass(d.attr("class")),e.css("visibility",""),e.transferred=!0,e)},_trigger:function(a,d,e){var f=b.Event(a);f.originalEvent=d,f.originalTarget=e,c.table.trigger(f,{cell:e,trueEvent:d&&d.originalEvent})},_cellClick:function(a){var d=c.position(b(this)),e=c.cells[d.row+","+d.column];if(c.columns[e.column].hidden){c.toggleColumn(e.column);return}c._trigger("entry_click",a,e)},_cellMove:function(a){if(c.disableHighlights)return;var d=c.position(b(this)),e=c.cells[d.row+","+d.column];c.table.trigger("entry_move",e);if(b(this).index(c.currentHover)!=-1)return;e.trigger("mouseover")},_cellOver:function(a){if(c.disableHighlights)return;if(a.originalEvent&&!c.mouseHasMoved)return;c.mouseHasMoved=!1;var d=c.position(b(this)),e=c.cells[d.row+","+d.column];e.addClass("selected"),c.currentHover&&e.index(c.currentHover)==-1&&b(c.currentHover).trigger("mouseout"),c.currentHover=e;if(e.row==0)for(var f=1;f<c.rows.length;f++)c.cells[f+","+e.column].addClass("related");else if(e.column==0)for(var f=1;f<c.columns.length;f++)c.cells[e.row+","+f].addClass("related");else c.cells[e.row+","+0].addClass("related"),c.cells["0,"+e.column].addClass("related");c._trigger("entry_over",a,e)},_cellOut:function(a){if(c.disableHighlights)return;if(b(a.target).parents("div").index(this)!=-1)return;var d=c.position(b(this)),e=c.cells[d.row+","+d.column];e.removeClass("selected");if(e.row==0)for(var f=1;f<c.rows.length;f++)c.cells[f+","+e.column].removeClass("related");else if(e.column==0)for(var f=1;f<c.columns.length;f++)c.cells[e.row+","+f].removeClass("related");else c.cells[e.row+","+0].removeClass("related"),c.cells["0,"+e.column].removeClass("related");c._trigger("entry_out",a,e)},_placeDataFragment:function(){c.dataFragment&&(c.divs.data.find(".content:first")[0].appendChild(c.dataFragment),c.dataFragment=null)},_placeDataRow:function(a){if(a<1)return;var b=c.dataRows[a]||c._createRow(a);if(b.placed)return;c.dataFragment?c.dataFragment.appendChild(b[0]):c.divs.data.find(".content:first").append(b),b.placed=!0},_createRow:function(a,d){if(c.dataRows[a])return c.dataRows[a];var e=document.createDocumentFragment(),f=b(document.createElement("div")).addClass("row");e.appendChild(f[0]),f.height(c.rows[a].metrics.height);var g=0;for(var h=1;h<a;h++)g+=c.rows[h].metrics.height+1;var i=0;return f.css({top:g,left:i}),a>0&&!d&&(c.dataRows[a]=f),f},toggleColumn:function(a,d,e){var f=!c.columns[a].hidden,g=!!c.columns[a].hidden;d?g=!0:d===!1&&(g=!1),(!e||e.callback!==!1)&&b.isFunction(c.toggleCallback)&&c.toggleCallback(a,!!g);if(f==g)return;for(var h=0;h<c.rows.length;h++)c.cells[h+","+a].width(g?c.columns[a].metrics.width:10).children().showIf(g).toggleClass("hidden_column",!g);return c.columns[a].hidden=!g,(!e||!e.skipSizeGrid)&&c.sizeGrid(),g},sizeGrid:function(){var a=0;for(var b=1;b<c.columns.length;b++)a+=c.columns[b].hidden?10:c.columns[b].metrics.width;c.divs.filler.width(a-c.columns[0].metrics.width);for(var b=0;b<c.rows.length;b++)c.cells[b+","+1].parent(".row").width(a+c.columns.length+3)},focus:function(a,b){var d=c.cells[a+","+b];if(c.currentFocus&&d.index(c.currentFocus||[])!=-1)return;c.currentFocus&&c.blur(),d.addClass("focus"),c.currentFocus=d,c._trigger("entry_focus",null,d)},blur:function(){c.currentFocus&&(c.currentFocus.removeClass("focus"),c._trigger("entry_blur",null,c.currentFocus),c.currentFocus=null)},scrollTo:function(a,b){c.disableHighlights=!0,a==0&&(a=1),b==0&&(b=1);var d=c.cells[a+","+b];c.divs.data.scrollToVisible(d).triggerHandler("scroll"),c.disableHighlights=!1;if(d&&d.filter(":visible").length>0)return d.attr("tabindex",0),!0},sizeToWindow:function(){b("html,body").css("overflow","hidden");var d=b("#content,#wide_content");if(!d.length||d.width()<100)d=b(window);var e=a.browser.ff?1:0,f=b(window).height()-e-c.divs.top.offset().top,g=d.width()-e,h=Math.floor(g-c.columns[0].metrics.outerWidth),i=Math.floor(f-c.rows[0].metrics.height-c.borderSize);c.divs.top.width(h),c.divs.data.width(h),c.divs.left.height(i),c.divs.data.height(i),c.divs.data.metrics={width:h,height:i}},_selectFirstCell:function(){var a=c.cells["1,1"];a.trigger("mouseover"),c.currentHover=a,c.scrollTo(1,1)},position:function(a){a.hasClass("cell")||(a=a.closest(".cell"));if(a.data("datagrid_position"))return a.data("datagrid_position");if(a.length==0)return{};var b={row:parseInt(a.attr("data-row"),10),column:parseInt(a.attr("data-column"),10)};return a.data("datagrid_position",b),b},moveLeft:function(){var a=c.currentHover;if(!c.currentHover){c._selectFirstCell();return}var b=a.column-1,d=c.cells[a.row+","+b];while(d&&d.hidden)b--,d=c.cells[a.row+","+b];if(!d||d.length===0)d=a;d.trigger("mouseover").focus(),c.currentHover=d,c.scrollTo(d.row,d.column)},moveRight:function(){var a=c.currentHover;if(!c.currentHover){c._selectFirstCell();return}var b=a.column+1,d=c.cells[a.row+","+b];while(d&&d.hidden)b++,d=c.cells[a.row+","+b];if(!d||d.length===0)d=a;d.trigger("mouseover").focus(),c.currentHover=d,c.scrollTo(d.row,d.column)},moveUp:function(){var a=c.currentHover;if(!c.currentHover){c._selectFirstCell();return}var b=a.row-1,d=c.cells[b+","+a.column];while(d&&d.hidden)b--,d=c.cells[b+","+a.column];if(!d||d.length===0)d=a;d.trigger("mouseover").focus(),c.currentHover=d,c.scrollTo(d.row,d.column)},moveDown:function(){var a=c.currentHover;if(!c.currentHover){c._selectFirstCell();return}var b=a.row+1,d=c.cells[b+","+a.column];while(d&&d.hidden)b++,d=c.cells[b+","+a.column];if(!d||d.length===0)d=a;d.trigger("mouseover").focus(),c.currentHover=d,c.scrollTo(d.row,d.column)}};return c})