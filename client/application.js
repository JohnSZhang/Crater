if (Meteor.isClient) {
  // This code only runs on the client
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

  Template.postShow.events({
    "click button.post-edit": function (event) {
      Router.go(Router.current().url + "/edit")
    }
  })
}
