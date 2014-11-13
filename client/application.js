if (Meteor.isClient) {
  // This code only runs on the client
  $(function(){
    console.log(Posts.find().count())
  });

  Template.posts.helpers({
    posts: function () {
      return Posts.find();
    }
  });

  Template.body.helpers({
    userEmail: function () {
      return Meteor.user().emails[0].address
    }
  });

  Template.body.events({
    "click button.new-post": function (event) {
      Router.go("/posts/new")
    }
  });
}
