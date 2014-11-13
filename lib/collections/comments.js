Comments = new Mongo.Collection("comments");

CommentsService = {
  createComment: function (docId, data) {
    var currentUser = Meteor.userId();
    if( ! currentUser ) {
      throw new Meteor.Error('Authentication',
        "You must be logged in to leave a comment");
    } else {
      Posts.update(docId, { $push: {
        comments: {
          body: data.body
          , owner: currentUser
        }
      }}, function(error, num){
        router.go("/posts/" + docId );
      })
    }
  }
  , deleteComment: function () {

  }
}
