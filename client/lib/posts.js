if (Meteor.isClient) {
  // This code only runs on the client
  Template.posts.helpers({
    posts: function () {
      return Posts.find();
    }
  });

  Template.newPost.events({
    "click #new-diary": function (event) {
      event.preventDefault();
      var title = $('input#title').val();
      var body = $('textarea#body').val();
      PostsService.createPost({
        title: title
        , body: body
        , createdAt: new Date()
        , updatedAt: new Date()
      })
    }
  });
}
