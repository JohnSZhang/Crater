if (Meteor.isClient) {
  Template.postComments.helpers({
    comments: function () {
      return Comments.find({ post: this._id });
    }
  })
  , Template.postComments.events({
    "click button.delete-comment": function (event) {
      event.preventDefault();
      CommentsService.deleteComment(this._id);
    }
  })
};
