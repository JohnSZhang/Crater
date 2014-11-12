Posts = new Mongo.Collection('posts')

Post = function (options) {
  this._id = options.id;
  this._title = options.title;
  this._body = options.body;
};

Post.prototype = {
  get id() {
    return this._id;
  },

  get title() {
    return this._title;
  },

  get body() {
    return this._body;
  },

  set title(value) {
    this._title = value;
  },

  set body(value) {
    this._body = value;
  },
  save: function () {
    var self = this;
    var post = {title: self.title, body: self.body};

    Posts.insert(post, function(error, result){
      self._id = result;
    });
  }
};


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
