Router.route("/", function () {
  this.render("welcome")
});

Router.route("/posts/new", function () {
  this.render("newPost")
});

Router.route("/posts/:_id", function () {
  this.render("postShow", {
    data: function () {
      return Posts.findOne({_id: this.params._id});
    }
  })
});
