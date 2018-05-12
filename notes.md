# Learning Backbone.js
  * creates clean, efficient code
  * based on the Model-View-Controller pattern (MVC)
    - Models: contain application data
    - Views: display data on the screen
    - Controllers: transfer the model data to the view
  * backbone has 6 components, MVC has 3
    - Models: store data
    - Views: displays model data onto a web page
    - Collections: a group of models
    - Events: bind custom events to the code
    - Routers: create navigation in the web app
    - Sync: maps backbone data to the server-side
  * other facts
    - backbone components are JavaScript objects
    - simple key/value pairs of JS methods & properties
    - can create custom methods & properties
    - backbone is a library, not a framework
      + frameworks need configuration
      + libraries have prebuit functions ready to use
        (knockout is a library; angular and ember are frameworks)
    - modules
      + a JavaScript way of referring to single .js files
      + contain a particular piece of component code
  * watching for changes
    - initialize() - watches for changes
    - get() - find a specific model property
    - set() - change or add new properties to models
    - on() - triggers the changes
  * views
    - contain the rules for moving data into HTML
    - create templates, thanks to underscore
    - can use other templates in backbone
    - use render() to build the html structure
    - render() also sends model data to the web page
  * routes
    - built using key/value pairs
    - think of the 'key' as a browser-accessible url
    - 'value' is a method that runs when you get to 'url'
    - routes are accessible from a browser's back button
  
# Backbone.js Fundamentals
  * a JavaScript library that provides helpful types for building and organizing rich JavaScript interfaces
    - not a framework
    - not MVC
    - a library of tools that help build a richer web
  * anatomy of a backbone.js app
    - client-side backbone.js app
      + Router(s)
      + Views
      + Models
      + Collections
    - pros
      + fast
      + highly interactive
      + scalable
    - cons
      + cannot be indexed by search engines (without extra work)
      + difficult to test
      + security issues
  * models
    - the core of the app
    - contain the app's state as well as logic and behavior
    - single point of truth for data
    - provide a lifecycle
    - communicate changes to the rest of the app via events
    - defining new model types
      + create new model types by extending Backbone.Model
        ( 'var Vehicle = Backbone.Model.extend({})' )
        - convention: use uppercase for type names
        - extend() is a function shared by Model,Collection,Router, and View.
          It establishes an inheritance relationship between two objects.
      + model types can have 'class properties' as well
        (e.g.
          var Vehicle = Backbone.Model.extend({},
            {
              summary: function() {
                return "Vehicles are for travelling";
              }
            });
          Vehicle.summary();
        )
    - instantiating models
      + to create a new model object, call its constructor function with the 'new' operator
      + the simplest case is to create an instance of Backbone.Model
        ( var model = new Backbone.Model(); )
      + or use custom types
        (e.g.
          var Vehicle = Backbone.Model.extend({});
          var ford = new Vehicle();
        )
      + instantiate with property values
        (e.g.
          var model = new Backbone.Model({
            name: "Peter",
            age: 52
          });
        )
      + initialize
        - if a model type has an 'initialize' function defined it will be called when the model is instantiated
        (e.g.
          var Vehicle = Backbone.Model.extend({
            initialize: function() {
              console.log("vehicle created");
            }
          });
          var car = new Vehicle();
        )
    - model inheritance
      + models can inherit from other models
        (e.g.
          var Vehicle = Backbone.Model.extend({});
          var Car = Vehicle.extend({});
        )
    - model attributes
      + attributes can be set by passing an object to a model type's constructor, or by using the 'set' method
        (e.g.
          var ford = new Vehicle();
          ford.set("type","car");
        )
      + or set many properties at once
        (e.g.
          ford.set({
            "maximumSpeed": "99",
            "color": "blue"
          });
        )
      + read attributes with the 'get' method
        ( ford.get("type"); )
      + 'escape' is like 'get' except that the output is html escaped
        (e.g.
          ford.set("description",
            "<script>alert('script injection')</script>");
          ford.escape("description");          
        )
      + test for an attribute
        - use 'has' to test if an attribute has been defined
          (e.g.
            var ford = new Vehicle();
            ford.set("type","car");
            ford.has("type"); // true
            ford.has("year"); // false
          )
    - model events
      + models raise events when their state changes
      + to detect a change to a model, listen for the 'change' event
        ( ford.on("change",function() {}); )
      + or listen to a change to a property
        ( ford.on("change: color",function() {}); )
    - custom model events
      + it is possible to define, trigger and observe custom model events
      + events are identified by string identifiers
      + use the 'on' method to bind an event
        ( ford.on("retired",function() {}); )
      + use the 'trigger' method to trigger an event
        ( ford.trigger("retired"); )
      + use the 'off' method to remove the event
        ( ford.off("retired"); )
    - model identity
      + the 'id' property represents the model's persistent identity; it is undefined until the model has been saved
        (e.g.
          var ford = new Vehicle();
          ford.id; // undefined
        )
      + the 'cid' property is a temporary identifier used until a model is assigned its 'id'
        (e.g.
          var ford = new Vehicle();
          ford.cid; // c1
        )
    - defaults
      + the 'defaults' property specifies default values for attributes that are not set in the constructor
        (e.g.
          var Vehicle = Backbone.Model.extend({
            defaults: {
              "color": "white",
              "type": "car"
            }
          });

          var car = new Vehicle();
          car.get("color"); // white
          car.get()"type"; // car
        )
    - validation
      + backbone exposes model validity through two methods
        - validate
        - isValid
      + validate is called by backbone prior to performing 'set' or 'save' operations
        (e.g.
          var Vehicle = Backbone.Model.extend({
            validate: function(attrs) {
              var validColors = ["white","red","blue","yellow"];
              var colorIsValid = function(attrs) {
                if (!attrs.color) return true;
                return _(validColors).include(attrs.color);
              }
              if (!colorIsValid(attrs)) {
                return "color must be one of: " + validColors.join(",");
              }
            }
          });

          var car = new Vehicle();
          car.on("error",function(model,error) {
            console.log(error);
          });
          car.set("color","blue"); // no output
          car.set("color","mauve"); // color must be one of: white,red,blue,yellow
        )
    - toJSON
      + converts a model's attributes to a JavaScript object
        (e.g.
          var ford = new Vehicle();
          ford.set("type","car");
          ford.toJSON(); // { type: "car" }
        )
    - save, fetch, destroy
      + models have save, fetch and destroy methods for synchronizing with the server
      + save performs insert and update operations, depending upon the state of the model
      + fetch updates the model with the server-side state
      + destroy deletes the model from the server
  * views
    - provide the 'glue' between models and documents
    - handle model events
    - handle DOM events
    - defining new view types
      + define new view types by extending Backbone.View
        (e.g.
          var VehicleListView = Backbone.View.extend({
            // properties
          }); 
        )
      + all views have an associated DOM element at all times (.el)
      + views that create new elements
        - the new element is defined by the id, tagName, className and attributes
          (e.g.
            var V = Backbone.View.extend({
              tagName: "li",
              id: "thing",
              className: "active",
              attributes: {
                "data-value": 12345
              }
            });

            var v = new V();
            $("#body").prepend(v.el);
          )
      + views that attach to existing elements
        - pass a 'el' property to the view's constructor
          (e.g.
            var V = Backbone.View.extend({});
            var v = new V({el: "#test"});
            v.$el.css("background-color","CornflowerBlue");
          )
    - instantiating views
      + to create a new view object, call its constructor function with the 'new' operator
      + the simplest case is to create an instance of Backbone.View
        ( var view = new Backbone.View() )
      + or instantiate custom view types
        (e.g.
          var VehicleListView = Backbone.View.extend({});
          var myView = new VehicleListView();
        )
      + can pass a model to the view constructor
        (e.g.
          var myView = new VehicleListView({
            model: myModelObject
          });
        )
      + any of the following properties will be attached directly to the view object if passed to the constructor
        - model, collection, el, id, className, tagName, attributes
          (e.g.
            var myView = new VehicleListView ({
              model: myModelObject,
              className: "model-object"
            });
          )
    - the 'el' property
      + all views have an 'el' property that references the view's DOM element
        (e.g.
          var v = new Backbone.View({el: "body"});
          v.el // <body></body>
        )
    - the '$el' property
      + $el is a cached jQuery (or zepto) wrapper around el
        - avoids repeated $(this.el)
          (e.g.
            var v = new Backbone.View({el: "body"});
            v.$el // [<body></body>]
          )
    - the 'this.$' function
      + this.$ is the jQuery (or zepto) function scoped to the current view
        - this.$("selector") is equivalent to this.$el.find("selector")
    - render
      + render is the function that renders the view's element (.el)
      + the default implementation is a no-op; provide an implementation with your view definitions
      + should return 'this'
        (e.g.
          var V = Backbone.View.extend({
            render: function() {
              this.$el.html("some content");
              return this;
            }
          });
        )
    - combining views and models
      + pass the model to the view's constructor
        (e.g.
          var v = new View({
            model: myModel
          });
        )
      + bind the view's render method
        (e.g.
          myModel.on("change",function() {
            $("#body").append(v.render().el);
          });
        )
    - make 
      + helpful function for creating DOM elements
        (e.g.
          var el = new Backbone.View().make(
            "h3",
            {class: "not-very-important"},
            "Preliminary Version"
          );
          // <h3 class="not-very-important">Preliminary Version</h3>
        )
    - remove
      + a shortcut method to remove the view from the DOM
      + equivalent to $el.remove();
    - events
      + declarative syntax to register handlers for DOM events
        (e.g.
          var FormView = Backbone.View.extend({
            events: {
              "click .clickable": "handleClick"
            },
            handleClick: function() {}
          });
        )
        - equivalent to this.$(".clickable").click(handleClick);
  * templating
    - backbone requires underscore for rendering templates
    - 3 valid types of code blocks
      + '<% ... %>' - execute arbitrary code
      + '<%= ... %>' - evaluate an expression and render the result inline
      + '<%- ...%>' - evaluate an expression and render the html escaped result inline    
      (e.g.
        var V = Backbone.View.extend({
          render: function() {
            var data = { lat: -27, lon: 153 };
            this.$el.html(
              _.template("<%= lat %> <%= lon %>")(data);
            );
          }
        });
      )
    - underscore template in a script tag
      (e.g.
        <script id="latlon-template" type="text/template">
          <p>Latitude: <%= lat %></p>
          <p>Longitude: <%= lon %></p>
          <% _([1,2,3]).each(function(number) { %>
            <p>
              <%= number %>
            </p>
          <% }); %>
        </script>
      )
      + accessed on demand by jQuery
        ( var template = $("#latlon-template").html(); )
    - handlebars
      + templating engine based on mustache
      + philosophically opposed to code in templates
      + code blocks are delimited by {{ .. }}
        (e.g.
          <p>Latitude: {{lat}}</p>
          <p>Longitude: {{lon}}</p>
          {{#each numbers}}
            <p>
              {{this}}
            </p>
          {{/each}}
        )
      + rendering is a two-stage process
        - compile
          (e.g.
            var source = "<p>Latitude: {{lat}}</p>";
            var compiled = Handlebars.compile(source);
          )
        - execute
          (e.g.
            var rendered = compiled({lat: -27});
            // rendered === <p>Latitude: -27</p>
          )
    - pre-compiling templates
      + compiling a template === converting to a function
        (e.g.
          var source = "<p>Latitude: <%= lat %></p>";
          var compiled = _.template(source);
        )  
      + pre-compile templates for performance
      + script compilation as a build step
  * routing
    - client-side routes are a way to trigger a function when the browser url changes
    - backbone routing includes parsing of the url and matching the url to the correct route handler
    - don't use routes like MVC actions
    - each route results in two different scenarios
    - defining routes
      + define routes by defining a type that extends Backbone.Router
      + routes consist of a route pattern and a handler name (function name)
        (e.g.
          routes: {
            "search/:query" : "search"
          },
          search: function(query) {

          }
        )
    - navigate is the backbone function for updating the browser's address and triggering routing
      (e.g.
        var router = new Workspace();
        Backbone.history.start();
        router.navigate("search/cats", { 
          trigger: true
        })
      )
    - push state
      + the html5 history api introduced a way to change the browser url without reloading the page
        ( window.history.pushState(...); )
      + if the browser does not support html5 history api, backbone will use hash fragments
      + browsers have always allowed javascript to modify the page url by appending a hash followed by a string
    - search engine indexability
      + markup that is rendered on the client will not be indexed by search engines
      + workarounds
        - option 1 - render content on the server
        - option 2 - #! urls
  * collections
    - container for multiple models of the same type
    - retrieve models from the server
    - create models and save them to the server
    - group models by some attribute
    - collection is an array-like object
    - defining new collection types
      + define a new collection type by extending Backbone.Collection
      + specify the type of model that the collection holds
        (e.g.
          var Vehicles = Backbone.Collection.extend({
            model: Vehicle
          });
        )
      + collections can have 'class properties' too
        (e.g.
          var Vehicles = Backbone.Collection.extend({
            model: Vehicle
          },
          {
            myClassProperty: function() {}
          }
          });
        )
      + collections are sorted - either by insertion order or by a comparator
      (e.g.
        var Vehicles = Backbone.Collection.extend(
          model: Vehicle,
          comparator: function(vehicle) {
            return vehicle.get("sequence");
          }
        );
      )
    - instantiating a collection
      + to create a new collection object, call its constructor function with the 'new' operator
      + the simplest case is to create an instance of Backbone.Collection
        ( var collection = new Backbon.Collection(); )
      + or use custom types
        (e.g.
          var Vehicles = Backbone.Collection.extend({});
          var fords = new Vehicles();
        )
      + you can pass the collections data to the constructor
        (e.g.
          var collection = new Backbone.Collection([
            model1,
            model2,
            model3
          ]);
        )
      + if the collection has an 'initialize' function, it will be invoked after the constructor is called
    - add() & remove()
      (e.g.
        var model = new Backbone.Model();
        collection.add(model);
      )
      + use the 'at' option to insert a model at a specific index and the 'silent' option to suppress the 'add' event
        (e.g.
          var model = new Backbone.Model();
          collection.add(model, {at: 2});
          collection.add(2);
          => model
        )
      + add() and remove() both work on a single model, or an array of models
        (e.g.
          collection.remove(model);
          collection.remove([model2,model3]);
        )
      + at() retrieves a model from a collection by the index of the model in the collection
        (e.g.
          collection.at(0); // first model
          collection.at(collection.length - 1); // last model
        )
      + get() retrieves a model from a collection by its id
        ( collection.get(1); )
      + if the model has not been saved, it will not have an id, so use getByCid()
        ( collection.getByCid("c0"); )
    - working with collections
      + forEach
        (e.g.
          collection.foEach(function(item) {
            print(item);
          });

          collection.forEach(print);
        )
      + map
        (e.g.
          collection.map(function(item) {
            return transform(item);
          });
        )
      + reduce
        (e.g.
          var collectiveAge = collection.reduce(function(memo,item) {
            return memo + item.get("age")
          }, start);
          console.log(collectiveAge);
        )
      + find
        (e.g.
          var dave = collection.find(function(model) {
            return model.get("name") === "Dave";
          });
          console.log(JSON.stringify(dave));
        )
    - collection events
      + collections raise events when models are added or removed
        - 'add' event when a model is added
          (e.g.
            collection.on("add", function(model,collection) {
              console.log(JSON>stringify(model) + " added");
            });
          )
        - 'remove' event when a model is removed
          (e.g.
            collection.on("remove", function(model,collection) {
              console.log(JSON.stringify(model) + " removed");
            });
          )
      + collections forward model change events
        - bind to 'change' or 'change:[attribute]' events
          (e.g.
            collection.on("change", function(model,options) {
              console.log(JSON.stringify(model) + " changed");              
            });

            collection.on("change:name", function(model) {
              console.log("name property changed");
            });
          )
  * connecting to a server
    - Backbone uses RESTful web requests to synch data to and from a server
    - Backbone's data server does not have to be the server that served the page
      + the 'same origin policy' applies - prevents scripts from accessing resources belonging to another site
      + origin - application layer protocol + domain name + port number
        ( http://localhost:3000 )
    - Cross-origin Resource Sharing (CORS)
      + technology that allows cross-origin requests
      + uses special http headers to specify the set of valid origins
      + alternative to jsonp
    - Backbone defines a HTTP persistence protocol, but does not include a server
      + use any http server that can implement Backbone's RESTful protocol
    - model requests
      + person.fetch()
        - reset the model's state from the server
      + person.save()
        - create or update depending upon person.isNew()
        - create is the same as collection.create()
      + person.destroy()
        - deletes the model on the server and removes it from its client-side collection
    - Backbone.sync
      + a function that interfaces between backbone and the server
      + implements create, read, update and delete behavior
        - can be overridden globally, per collection, or per model
    - Backbone.localStorage
      + a backbone 'plugin' that uses local storage for persistence
      + replaces Backbone.syn with a local storage implementation