if (Meteor.isClient) {
  Template.postComments.events({
    "click a.delete-comment": function (event) {
      event.preventDefault();
      //need to escape for security
      var text = $(event.target).parent().find(".comment > p").html();
      CommentsService.deleteComment(this._id, {
        body: text
      });
    }
  })
};
