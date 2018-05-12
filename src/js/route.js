(function () {
    // create a model array
    var documents = [
        new Backbone.Model({
            title: "JavaScript Modules",
            content: "Why do we need modules? Organizing JavaScript into modules makes it easier to reason about programs and makes it possible to test."
        }),
        new Backbone.Model({
            title: "Module Systems",
            content: "There are three competing module systems at the moment: CommonJS, AMD and ECMAScript Harmony modules."
        })
    ];

    // create event aggregator
    var eventAggregator = _.extend({}, Backbone.Events);

    // create contents view
    var ContentsView = Backbone.View.extend({
        tagName: "ul",
        render: function() {
            _(this.collection).each(function(document) {
                this.$el.append(new DocumentListView({model: document}).render().el);
            },this);
            return this;
        }
    });

    // create documents list view
    var DocumentListView = Backbone.View.extend({
        tagName: "li",
        className: "routeListItem",
        events: {
            "click": function() {
                eventAggregator.trigger("document:selected", this.model);
            }
        },
        render: function() {
            this.$el.html(this.model.get("title"));
            return this;
        }
    });

    // create document view
    var DocumentView = Backbone.View.extend({
        render: function() {
            this.$el.append("<h1>" + this.model.get("title") + "</h1>");
            this.$el.append("<div>" + this.model.get("content") + "</div>");            
            return this;
        }
    });

    // create document router
    var DocumentRouter = Backbone.Router.extend({
        routes: {
            "contents": "contents",
            "view/:title": "viewDocument"
        },
        contents: function() {
            $("#divDocuments").html(new ContentsView({collection: documents}).render().el);
        },
        viewDocument: function(title) {            
            var selectedDocument = _(documents).find(function(document) {
                return document.get("title") === title;
            });

            $("#divDocuments").empty().append(new DocumentView({model: selectedDocument}).render().el);
        }
    });

    // create router instance
    var router = new DocumentRouter();
    // start listening for url changes
    //Backbone.history.start();

    // create action
    eventAggregator.on("document:selected", function(document) {
        var urlPath = "view/" + document.get("title");
        router.navigate(urlPath, {trigger: true});
    });

    router.navigate("contents", {trigger: true});
 
 })();
