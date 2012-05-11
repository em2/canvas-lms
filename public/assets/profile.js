(function(){var l=function(b,g){return function(){return b.apply(g,arguments)}};define("compiled/util/BackoffPoller",function(){return function(){function b(g,h,c){var f,m,n;this.url=g;this.handler=h;if(c==null)c={};this.baseInterval=(f=c.baseInterval)!=null?f:1E3;this.backoffFactor=(m=c.backoffFactor)!=null?m:1.5;this.maxAttempts=(n=c.maxAttempts)!=null?n:8}b.prototype.start=function(){this.running?this.reset():this.nextPoll(true);return this};b.prototype.then=function(g){if(this.callbacks==null)this.callbacks=
[];return this.callbacks.push(g)};b.prototype.reset=function(){this.nextInterval=this.baseInterval;return this.attempts=0};b.prototype.stop=function(g){var h,c,f;if(g==null)g=false;this.running&&clearTimeout(this.running);delete this.running;if(g&&this.callbacks){f=this.callbacks;h=0;for(c=f.length;h<c;h++){g=f[h];g()}}return delete this.callbacks};b.prototype.poll=function(){this.running=true;this.attempts++;return jQuery.ajaxJSON(this.url,"GET",{},l(function(g){switch(this.handler(g)){case "continue":return this.nextPoll();
case "reset":return this.nextPoll(true);case "stop":return this.stop(true);default:return this.stop()}},this),l(function(){return this.stop()},this))};b.prototype.nextPoll=function(g){if(g==null)g=false;if(g)this.reset();else this.nextInterval=parseInt(this.nextInterval*this.backoffFactor);if(this.attempts>this.maxAttempts)return this.stop();return this.running=setTimeout(jQuery.proxy(this.poll,this),this.nextInterval)};return b}()})}).call(this);
require(["compiled/util/BackoffPoller","i18n"],function(l,b){b=b.scoped("profile");var g=$(".profile_table"),h=$("#update_profile_form"),c=$("#default_email_id"),f=$(".profile_pics_url").attr("href"),m=new l(f,function(a){for(var d={},e=$("img.pending"),j,k,i=0,o=0,p=a.length;o<p;o++){j=a[o];j.pending||(d[j.url]=true)}e.each(function(){k=$(this);if(d[k.data("eventual_src")]){k.removeClass("pending");k.attr("src",k.data("eventual_src"));i++}});if(i===e.length)return"stop";if(i>0)return"reset";return"continue"});
$(".edit_profile_link").click(function(){g.addClass("editing").find(".edit_data_row").show().end().find(":text:first").focus().select();return false});g.find(".cancel_button").click(function(){g.removeClass("editing").find(".change_password_row,.edit_data_row,.more_options_row").hide().end().find("#change_password_checkbox").attr("checked",false);return false});g.find("#change_password_checkbox").click(function(){INST.browser.ie&&$(this).triggerHandler("change")}).change(function(a){a.preventDefault();
if($(this).attr("checked")){$(this).addClass("showing");g.find(".change_password_row").show().find(":password:first").focus().select()}else g.find(".change_password_row").hide().find(":password").val("")}).attr("checked",false).change();h.attr("method","PUT").formSubmit({required:["name"],object_name:"user",property_validations:{"=default_email_id":function(a){if($("#default_email_id").length&&(!a||a=="new"))return b.t("please_select_an_option","Please select an option")}},beforeSubmit:function(){h.loadingImage()},
success:function(a){a=a.user;var d={short_name:a.short_name,full_name:a.name,sortable_name:a.sortable_name,time_zone:a.time_zone,locale:$("#user_locale option[value='"+a.locale+"']").text()};if(d.locale!=h.find(".locale").text())location.reload();else{h.loadingImage("remove");if(c.length>0){var e=c.find("option:selected").text();$(".default_email.display_data").text(e)}$(".channel").removeClass("default");$("#channel_"+a.communication_channel.id).addClass("default");h.fillTemplateData({data:d}).find(".cancel_button").click()}},
error:function(a){h.loadingImage("remove").formErrors(a.errors||a);$(".edit_profile_link").click()}}).find(".more_options_link").click(function(){h.find(".more_options_link_row").hide();h.find(".more_options_row").show();return false});$("#default_email_id").change(function(){$(this).val()=="new"&&$(".add_email_link:first").click()});$("#unregistered_services li.service").click(function(a){a.preventDefault();$("#"+$(this).attr("id")+"_dialog").dialog("close").dialog({width:350,autoOpen:false}).dialog("open")});
$(".create_user_service_form").formSubmit({object_name:"user_service",beforeSubmit:function(){$(this).loadingImage()},success:function(){$(this).loadingImage("remove").parents(".content").dialog("close");document.location.reload()},error:function(){$(this).loadingImage("remove").errorBox(b.t("errors.registration_failed","Registration failed. Check the user name and password, and try again."))}});$("#unregistered_services li.service .content form .cancel_button").click(function(){$(this).parents(".content").dialog("close")});
$("#registered_services li.service .delete_service_link").click(function(a){a.preventDefault();$(this).parents("li.service").confirmDelete({message:b.t("confirms.unregister_service","Are you sure you want to unregister this service?"),url:$(this).attr("href"),success:function(){$(this).slideUp(function(){$("#unregistered_services").find("#unregistered_"+$(this).attr("id")).slideDown()})}})});$(".service").hover(function(){$(this).addClass("service-hover")},function(){$(this).removeClass("service-hover")});
$("#show_user_services").change(function(){$.ajaxJSON($("#update_profile_form").attr("action"),"PUT",{"user[show_user_services]":$(this).attr("checked")},function(){},function(){})});$(".delete_pseudonym_link").click(function(a){a.preventDefault();$(this).parents(".pseudonym").confirmDelete({url:$(this).attr("href"),message:b.t("confirms.delete_login","Are you sure you want to delete this login?")})});$(".datetime_field").datetime_field();$(".expires_field").bind("change keyup",function(){$(this).closest("td").find(".hint").showIf(!$(this).val())});
$(".delete_key_link").click(function(a){a.preventDefault();$(this).closest(".access_token").confirmDelete({url:$(this).attr("rel"),message:b.t("confirms.delete_access_key","Are you sure you want to delete this access key?"),success:function(){$(this).remove();$(".access_token:visible").length||$("#no_approved_integrations,#access_tokens_holder").toggle()}})});$("#add_access_token_dialog .cancel_button").click(function(){$("#add_access_token_dialog").dialog("close")});$("#access_token_form").formSubmit({object_name:"access_token",
required:["purpose"],beforeSubmit:function(){$(this).find("button").attr("disabled",true).filter(".submit_button").text(b.t("buttons.generating_token","Generating Token..."))},success:function(a){$(this).find("button").attr("disabled",false).filter(".submit_button").text(b.t("buttons.generate_token","Generate Token"));$("#add_access_token_dialog").dialog("close");$("#no_approved_integrations").hide();$("#access_tokens_holder").show();var d=$(".access_token.blank:first").clone(true).removeClass("blank");
a.created=$.parseFromISO(a.created_at).datetime_formatted||"--";a.expires=$.parseFromISO(a.expires_at).datetime_formatted||b.t("token_never_expires","never");a.used="--";d.fillTemplateData({data:a,hrefValues:["id"]});d.data("token",a);$("#access_tokens > tbody").append(d.show());d.find(".show_token_link").click()},error:function(){$(this).find("button").attr("disabled",false).filter(".submit_button").text(b.t("errors.generating_token_failed","Generating Token Failed"))}});$("#token_details_dialog .regenerate_token").click(function(){if(confirm(b.t("confirms.regenerate_token",
"Are you sure you want to regenerate this token?  Anything using this token will have to be updated."))){var a=$("#token_details_dialog"),d=a.data("token"),e=a.data("token_url"),j=$(this);j.text(b.t("buttons.regenerating_token","Regenerating token...")).attr("disabled",true);$.ajaxJSON(e,"PUT",{"access_token[regenerate]":"1"},function(k){k.created=$.parseFromISO(k.created_at).datetime_formatted||"--";k.expires=$.parseFromISO(k.expires_at).datetime_formatted||b.t("token_never_expires","never");k.used=
$.parseFromISO(k.last_used_at).datetime_formatted||"--";k.visible_token=k.visible_token||"protected";a.fillTemplateData({data:k}).find(".full_token_warning").showIf(k.visible_token.length>10);d.data("token",k);j.text(b.t("buttons.regenerate_token","Regenerate Token")).attr("disabled",false)},function(){j.text(b.t("errors.regenerating_token_failed","Regenerating Token Failed")).attr("disabled",false)})}});$(".show_token_link").click(function(a){function d(i){e.fillTemplateData({data:i});e.data("token_url",
j);e.find(".refresh_token").showIf(i.visible_token&&i.visible_token!=="protected").find(".regenerate_token").text(b.t("buttons.regenerate_token","Regenerate Token")).attr("disabled",false);e.find(".loading_message,.error_loading_message").hide().end().find(".results").show().end().find(".full_token_warning").showIf(i.visible_token.length>10)}a.preventDefault();var e=$("#token_details_dialog"),j=$(this).attr("rel");e.dialog("close").dialog({autoOpen:false,width:600}).dialog("open");var k=$(this).parents(".access_token");
e.data("token",k);e.find(".loading_message").show().end().find(".results,.error_loading_message").hide();(a=k.data("token"))?d(a):$.ajaxJSON(j,"GET",{},function(i){i.created=$.parseFromISO(i.created_at).datetime_formatted||"--";i.expires=$.parseFromISO(i.expires_at).datetime_formatted||b.t("token_never_expires","never");i.used=$.parseFromISO(i.last_used_at).datetime_formatted||"--";i.visible_token=i.visible_token||"protected";k.data("token",i);d(i)},function(){e.find(".error_loading_message").show().end().find(".results,.loading_message").hide()})});
$(".add_access_token_link").click(function(a){a.preventDefault();$("#access_token_form").find("button").attr("disabled",false).filter(".submit_button").text(b.t("buttons.generate_token","Generate Token"));$("#add_access_token_dialog").find(":input").val("").end().dialog({width:500})});$(document).fragmentChange(function(a,d){var e=d.substring(1);if(e.match(/^register/))e=e.substring(9);$("#unregistered_service_"+e+":visible").length>0&&$("#unregistered_service_"+e+":visible").click()}).fragmentChange();
$("#profile_pic_dialog .add_pic_link").click(function(a){a.preventDefault();$("#add_pic_form").slideToggle()});$("#profile_pic_dialog").delegate("img","click",function(){if(!$(this).hasClass("pending")){$("#profile_pic_dialog .img.selected").removeClass("selected");$(this).parent().addClass("selected");$("#profile_pic_dialog .select_button").attr("disabled",false)}});$("#add_pic_form").formSubmit({fileUpload:true,beforeSubmit:function(){$(this).find("button").attr("disabled",true).text(b.t("buttons.adding_file",
"Adding File..."));var a=$("<span class='img'><img/></span>"),d=a.find("img");d.attr("src","/images/ajax-loader.gif");d.addClass("pending");$("#profile_pic_dialog .profile_pic_list div").before(a);return a},success:function(a,d){$(this).find("button").attr("disabled",false).text(b.t("buttons.add_file","Add File"));$("#add_pic_form").slideToggle();var e=a.attachment;if(d){var j=d.find("img");j.data("eventual_src","/images/thumbnails/"+e.id+"/"+e.uuid);j.attr("data-type","attachment");j.attr("alt",
e.display_name);j[0].onerror=function(){j.attr("src","/images/dotted_pic.png")};m.start().then(function(){j.click()})}},error:function(a,d){$(this).find("button").attr("disabled",false).text(b.t("errors.adding_file_failed","Adding File Failed"));d&&d.remove()}});$("#profile_pic_dialog .cancel_button").click(function(){$("#profile_pic_dialog").dialog("close")});$("#profile_pic_dialog .select_button").click(function(){var a=$("#update_profile_form").attr("action"),d=$("#profile_pic_dialog");d.find("button").attr("disabled",
true).filter(".select_button").text(b.t("buttons.selecting_image","Selecting Image..."));var e=$("#profile_pic_dialog .profile_pic_list .img.selected img");if(e.length!=0){e={"user[avatar_image][url]":e.attr("src"),"user[avatar_image][type]":e.attr("data-type")};$.ajaxJSON(a,"PUT",e,function(j){d.find("button").attr("disabled",false).filter(".select_button").text(b.t("buttons.select_image","Select Image"));j=j.user;if(j.avatar_url=="/images/no_pic.gif")j.avatar_url="/images/dotted_pic.png";$(".profile_pic_link img").attr("src",
j.avatar_url);d.dialog("close")},function(){d.find("button").attr("disabled",false).filter(".select_button").text(b.t("errors.selecting_image_failed","Selecting Image Failed, please try again"))})}});$(".profile_pic_link").click(function(a){a.preventDefault();var d=$("#profile_pic_dialog");d.find(".img.selected").removeClass("selected");d.find(".select_button").attr("disabled",true);if($(this).hasClass("locked"))alert(b.t("alerts.profile_picture_locked","Your profile picture has been locked by an administrator, and cannot be changed."));
else{if(!d.hasClass("loaded")){d.find(".profile_pic_list h3").text(b.t("headers.loading_images","Loading Images..."));$.ajaxJSON(f,"GET",{},function(e){if(e&&e.length>0){d.addClass("loaded");d.find(".profile_pic_list h3").remove();var j=false,k;for(k in e){var i=e[k],o=$("<span class='img'><img/></span>");$img=o.find("img");if(i.pending){$img.addClass("pending");$img.attr("src","/images/ajax-loader.gif");$img.data("eventual_src",i.url);j=true}else $img.attr("src",i.url);$img.attr("alt",i.alt||i.type);
$img.attr("title",i.alt||i.type);$img.attr("data-type",i.type);$img[0].onerror=function(){o.remove()};d.find(".profile_pic_list div").before(o)}j&&m.start()}else d.find(".profile_pic_list h3").text(b.t("errors.loading_images_failed","Loading Images Failed, please try again"))},function(){d.find(".profile_pic_list h3").text(b.t("errors.loading_images_failed","Loading Images Failed, please try again"))})}$("#profile_pic_dialog").dialog("close").dialog({autoOpen:false,title:b.t("titles.select_profile_pic",
"Select Profile Pic"),width:500,height:300}).dialog("open")}});var n=function(){var a=$(".profile_pic_link img")[0];if(a)if(a.complete){if(a.width<5)a.src="/images/dotted_pic.png"}else setTimeout(n,500)};setTimeout(n,500)});
$(function(){var l=$('input[name="user[short_name]"]'),b=l.parents("form").find('input[name="user[name]"]'),g=$('input[name="user[sortable_name]"]'),h=b.attr("value");b.keyup(function(){var c=b.attr("value"),f=g.attr("value"),m=userUtils.nameParts(f);if(jQuery.trim(f)===""||userUtils.firstNameFirst(m)===jQuery.trim(h)){f=userUtils.nameParts(c,m[1]);g.attr("value",userUtils.lastNameFirst(f))}f=l.attr("value");if(jQuery.trim(f)===""||f===h)l.attr("value",c);h=$(this).attr("value")})});
var userUtils={nameParts:function(l,b){var g=/^(Sn?r\.?|Senior|Jn?r\.?|Junior|II|III|IV|V|VI|Esq\.?|Esquire)$/i,h,c,f,m;if(!l||jQuery.trim(l)==="")return[null,null,null];f=jQuery.map(l.split(","),function(n){return jQuery.trim(n)});h=f[0];c=f[1];f=f.slice(2).join(", ");if(f==="")f=null;if(f&&!g.test(f)){c=c+" "+f;f=null}if(typeof c==="string"){if(!f&&g.test(c)){f=c;c=h;h=null}}else{c=jQuery.trim(l);h=null}c=c.split(/\s+/);if(c.length===1&&c[0]==="")c=[];if(!f&&c.length>1&&g.test(c[c.length-1]))f=
c.pop();if(!h&&b&&!/^\s*$/.test(b)&&(m=b.split(/\s+/))&&c.length>=m.length&&c.slice(c.length-m.length).join(" ")===m.join(" "))h=c.splice(c.length-m.length,m.length).join(" ");if(!h&&c.length>1)h=c.pop();return[c.length===0?null:c.join(" "),h,f]},lastNameFirst:function(l){var b=jQuery.trim([l[0],l[2]].join(" "));return jQuery.trim(l[1]?l[1]+", "+b:b)},firstNameFirst:function(l){return jQuery.trim(l.join(" ").replace(/\s+/," "))}};
$.extend(true,I18n=I18n||{},{translations:{es:{profile:{please_select_an_option:"Por favor seleccione una opci\u00f3n",confirms:{delete_login:"\u00bfSeguro que quiere borrar este inicio de sesi\u00f3n?",regenerate_token:"\u00bfSeguro que quiere regenerar este componente l\u00e9xico? Cualquier cosa usando este componente l\u00e9xico tendr\u00e1 que actualizarse.",delete_access_key:"\u00bfSeguro que quiere borrar esta clave de acceso?",unregister_service:"\u00bfSeguro que quiere cancelar el registro de este servicio?"},
buttons:{generating_token:"Generando Componente L\u00e9xico...",regenerating_token:"Regenerando Componenete L\u00e9xico...",add_file:"Agregar Archivo",select_image:"Seleccionar Imagen",regenerate_token:"Regenerar Componente L\u00e9xico",selecting_image:"Seleccionando Imagen...",generate_token:"Generar un Componente L\u00e9xico",adding_file:"Agregando Archivo..."},alerts:{profile_picture_locked:"Su foto de perfil ha sido bloqueada por un administrador, y no puede cambiarse."},errors:{regenerating_token_failed:"Fall\u00f3 la Regeneraci\u00f3n del Componente l\u00e9xico",
loading_images_failed:"Fall\u00f3 la carga de imagenes, intente de nuevo",adding_file_failed:"Fall\u00f3 la adici\u00f3n del archivo",registration_failed:"Fall\u00f3 la inscripci\u00f3n. Revise el nombre de usuario y la contrase\u00f1a, e intente de nuevo.",generating_token_failed:"Fall\u00f3 la generaci\u00f3n del Componente l\u00e9xico",selecting_image_failed:"Selecci\u00f3n de la Imagen Fall\u00f3, intente de nuevo"},token_never_expires:"nunca",titles:{select_profile_pic:"Seleccionar una Foto de Perfil"},
headers:{loading_images:"Cargando Imagenes..."}}}}});