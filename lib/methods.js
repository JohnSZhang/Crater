Meteor.methods({

  addPost: function (params) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Posts.insert({
      title: params.title,
      body: params.body,
      createdAt: new Date(),
      owner: Meteor.userId(),
      userEmail: Meteor.user().emails[0].address
    });
  }
})
