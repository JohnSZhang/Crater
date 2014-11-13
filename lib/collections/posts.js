Posts = new Mongo.Collection('posts')

PostsService = {
  createPost: function (options) {
    var userId = Meteor.userId()
    if ( ! userId ) {
      throw new Meteor.Error('authentication', 'need to be logged in to create post.')
    } else if ( ! options.title || ! options.body ) {
      throw new Meteor.Error('presence', 'title or body cannot be blank.')
    } else {
      Posts.insert({
        owner: userId
        , title: options.title
        , body: options.body
        , createdAt: options.createdAt
        , updatedAt: options.updatedAt
      }, function(error, id){
        Router.go("/posts/" + id);
      })
    }
  }
  , getPosts: function () {

  }
  , updatePost: function () {

  }
  , deletePost: function (docId) {
    var userId = Meteor.userId();
    if ( ! userId || Posts.find(docId).owner !== userId) {
      throw new Meteor.Error('authentication', "need to be logged in and the owner");
    } else {
      Posts.remove(docId, function(error, id){
        Router.go("/posts/");
      })
    }
  }
}
// {
//   _id: "blog_name"
//   , title: "blog full title"
//   , owner: 'user_name'
//   , posts [
//     post_name: "post_title"
//   ]
// }
// {
//   title: "post_title"
//   body: "post_body"
//   comments: [
//     user: "user_name"
//     body: "comment_body"
//   ]
// }
// {
//   _id: "user_name"
//   , email: "email"
// }
