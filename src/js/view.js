var RefreshingView = Backbone.View.extend({
  initialize: function() {
    this.model.on("change",function() {
      this.render();
    },this)
  },
  render: function() {
    this.$el.html(this.model.get("text"));
    return this;
  }
});

var m = new Backbone.Model({text: new Date().toString()});
var v = new RefreshingView({model: m, el: "#dateView"});
v.render();
setInterval(function() {
  m.set({text: new Date().toString()});
}, 1000);
