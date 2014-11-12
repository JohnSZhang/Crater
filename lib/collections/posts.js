Blogs = new Mongo.Collection('blogs')

Posts = new Mongo.Collection('posts')

Users = new Mongo.Collection('user')
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
