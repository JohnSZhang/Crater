if (Meteor.isClient) {
  // This code only runs on the client
  $(function(){
    console.log(Posts.find().count())
  })
  console.log('loading template')
  console.log(Posts)
  Template.body.helpers({
    posts: function () {
      return Posts.find();
    }
  });
}
