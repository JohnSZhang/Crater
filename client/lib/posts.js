if (Meteor.isClient) {
  // This code only runs on the client
  Template.posts.helpers({
    posts: function () {
      return PostsService.getPosts();
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

  Template.postShow.events({
    "click .post-delete": function (event) {
      event.preventDefault();
      PostsService.deletePost(this._id);
    }
    , "click button.post-edit": function (event) {
      Router.go(Router.current().url + "/edit")
    }
    , "submit .new-comment": function (event) {
      event.preventDefault();
      var text = $(event.target).find("input").val();
      CommentsService.createComment(this._id, {
        body: text
      })
    }
  });

  Template.postEdit.events({
    "click button#edit-diary": function (event) {
      event.preventDefault();
      var data = {
        title: $("#title").val()
        , body: $("#body").val()
      }
      PostsService.updatePost(this._id, data)
    }
  })
}
