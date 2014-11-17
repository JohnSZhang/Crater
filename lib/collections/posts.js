Posts = new Mongo.Collection('posts');

PostsService = {
  createPost: function (options) {
    var userId = Meteor.userId()
    if ( ! userId ) {
      throw new Meteor.Error('authentication',
        'need to be logged in to create post.')
    } else if ( ! options.title || ! options.body ) {
      throw new Meteor.Error('presence',
        'title or body cannot be blank.')
    } else {
      Posts.insert({
        owner: userId
        , title: options.title
        , body: options.body
        , createdAt: options.createdAt
      }, function(error, id){
        Router.go("/posts/" + id);
      })
    }
  }
  , getPosts: function () {
    return Posts.find({}, {sort: {createdAt: -1 }, limit: 5 } );
  }
  , updatePost: function (docId, data) {
    if ( ! this.isOwner(docId)) {
      throw new Meteor.Error('authentication' + postOwner,
        "need to be logged in and the owner");
    } else {
      Posts.update(docId, { $set: {
          title: data.title
          , body: data.body
        }
      }, function(error, id){
        Router.go("/posts/" + docId);
      });
    }

  }
  , deletePost: function (docId) {
    if ( ! this.isOwner(docId)) {
      throw new Meteor.Error('authentication' + postOwner,
        "need to be logged in and the owner");
    } else {
      Posts.remove(docId, function(error, id){
        Router.go("/");
      })
    }
  }
  , isOwner: function (docId) {
    return Meteor.userId() && this.postOwner(docId) === Meteor.userId();
  }
  , postOwner: function (docId) {
      return Posts.findOne(docId).owner
  }
}
