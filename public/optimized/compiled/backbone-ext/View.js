(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};define(["use!backbone","use!underscore"],function(b,c){return c.extend(b.View.prototype,{render:function(a){a==null&&(a={});if(a.noFilter!==!0)return this._filter()},_filter:function(){return this.$("[data-bind]").each(a(function(){return this._createBinding.apply(this,arguments)},this)),this.$("[data-behavior]").each(a(function(){return this._createBehavior.apply(this,arguments)},this))},_createBinding:function(b,c){var d,e;return d=$(c),e=d.data("bind"),this.model.bind("change:"+e,a(function(a,b){return d.html(b)},this))},_createBehavior:function(a,b){}}),b.View})}).call(this)