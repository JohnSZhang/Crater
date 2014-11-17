Comments = new Mongo.Collection("comments");

CommentsService = {
  createComment: function (docId, data) {
    var currentUser = Meteor.userId();
    if( ! currentUser ) {
      throw new Meteor.Error('Authentication',
        "You must be logged in to leave a comment");
    } else {
      Comments.insert({
        post : docId
        , body: data.body
        , owner: currentUser
      }, function (error, num) {
        Router.go('/posts/' + docId)
      })
    }
  }
  , deleteComment: function (docId) {
    if ( ! this.isOwner(docId)) {
      throw new Meteor.Error('authentication' + commentOwner,
        "need to be logged in and the owner of comment");
    } else {
      Comments.remove(docId);
    }
  }
  , isOwner: function (docId) {
    return Meteor.userId() && this.commentOwner(docId) === Meteor.userId();
  }
  , commentOwner: function (docId) {
      return Comments.findOne(docId).owner
  }
}
