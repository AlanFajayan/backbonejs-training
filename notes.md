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
  
# 
