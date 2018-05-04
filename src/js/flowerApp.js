var redRoses = new app.singleFlower({
  name: "Red Roses",
  price: 39.95,
  color: "Red",
  img: "/images/redRoses.jpg",
  link: "redRose"
});

var rainbowRoses = new app.singleFlower({
  name: "Rainbow Roses",
  price: 29.95,
  color: "Orange",
  link: "rainbowRose"
});

var heirloomRoses = new app.singleFlower({
  name: "Heirloom Roses",
  price: 19.95,
  img: "/images/heirloomPinkRoses.jpg",
  link: "heirloomRose"
});

// create a collections array
var flowerGroup = new app.FlowersCollection([
  redRoses, rainbowRoses, heirloomRoses
]);

var flowerGroupView = new app.allFlowersView({ collection: flowerGroup });
$("#allFlowers").html(flowerGroupView.render().el);

var flowerRouter = new app.Router();

Backbone.history.start();

// add element to collections array
// flowerGroup.add(heirloomRoses);
// remove element from collections array
// flowerGroup.remove(redRoses);

// console.log(flowerGroup.toJSON());
