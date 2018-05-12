(function () {
  // model
  var Rectangle = Backbone.Model.extend({});
  // view
  var RectangleView = Backbone.View.extend({
    tagName: "div",
    className: "rectangle",
    events: {
      "click": "move"
    },

    render: function() {
      this.setDimensions();
      this.setPosition();
      this.setColor();
      return this;
    },

    setDimensions: function() {
      this.$el.css({
        width: this.model.get("width") + "px",
        height: this.model.get("height") + "px"
      });
    },

    setPosition: function() {
      var position = this.model.get("position");
      this.$el.css({
        left: position.x,
        top: position.y
      });
    },

    setColor: function() {
      this.$el.css("background-color", this.model.get("color"));
    },

    move: function() {
      this.$el.css("left", this.$el.position().left + 10);
    }
  });

  /*
  // instantiate a single instance of the model;
  var myRectangle = new Rectangle({
    width: 100,
    height: 60,
    position: {
      x: 300,
      y: 240
    },
    color: "#ff0000"
  });

  // instantiate the view;
  var myView = new RectangleView({ model: myRectangle });

  // display the view in the html element
  $("div#canvas").append(myView.render().el);
  */

  // instantiate a model array
  var models = [
    new Rectangle({
      width: 100,
      height: 60,
      position: {
        x: 100,
        y: 240
      },
      color: "#ff0000"
    }),
    new Rectangle({
      width: 26,
      height: 200,
      position: {
        x: 660,
        y: 210
      },
      color: "#00ff00"
    }),
    new Rectangle({
      width: 300,
      height: 70,
      position: {
        x: 300,
        y: 330
      },
      color: "#0000ff"
    })
  ];

  // instantiate the view and display in the html element
  _(models).each(function(model) {
    $("div#canvas").append(new RectangleView({model: model}).render().el);
  });


})();
