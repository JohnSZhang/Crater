Posts = new Mongo.Collection('posts')

PostsService = {
  createPost: function (options) {
    var userId = Meteor.userId()
    if ( ! userId ) {
      throw new Meteor.Error('login', 'need to be logged in to create post.')
    } else if ( ! options.title || ! options.body ) {
      throw new Meteor.Error('need text', 'title or body cannot be blank.')
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
  , deletePost: function () {

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
