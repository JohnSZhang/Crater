if (Meteor.isClient) {
  // This code only runs on the client
  $(function(){
    console.log(Posts.find().count())
  })
  Template.body.helpers({
    posts: function () {
      return Posts.find();
    }
  });
}
