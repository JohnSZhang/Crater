"user strict";

describe("Meteor Post Methods", function(){

   beforeEach(function () {
     MeteorStubs.install();
     mock(global, 'Posts');
     mock(global, 'Meteor');
     mock(global, 'Date');

   });

  afterEach(function () {
    MeteorStubs.uninstall();
  });

  describe("createPost", function(){
    it("Should be created with a title and a body", function(){
      spyOn(Meteor, "userId").and.returnValue("userId");
      spyOn(Posts, "insert").and.returnValue("testId")
      var options = {
          title: "test title"
          , body: "test body"
          , createdAt: "test date"
          , updatedAt: "test date"
      };

      PostsService.createPost(options);

      expect(Meteor.userId.calls.count()).toEqual(1);
      expect(Posts.insert).toHaveBeenCalledWith({
            owner: "userId"
            , title: "test title"
            , body: "test body"
            , createdAt: "test date"
            , updatedAt: "test date"
      // Need to figure out server side Date Creation (package?).
    }, jasmine.any(Function));
    });

    it("Should throw an error unless user is loggedin", function(){
      spyOn(Meteor, "userId").and.returnValue(null);
      spyOn(Posts, "insert").and.returnValue("testId")
      var options = {
          title: "test title"
          , body: "test body"
      };

      expect(function () {
        PostsService.createPost(options)
      }).toThrow();

    });

    it("Does not allow for empty title", function(){
      spyOn(Meteor, "userId").and.returnValue("1");
      spyOn(Posts, "insert").and.returnValue("testId")
      var options = {
          title: ""
          , body: "test body"
      };

      expect(function () {
        PostsService.createPost(options)
      }).toThrow();
    });

  });

  describe("getPosts", function(){
    it("Should list posts by reverse creation date when fethced", function(){

    });
  });

  describe("updatePost", function(){
    it("Should be updateable in both title and body", function(){
      
    });

    it("Should only be updatable by its owner", function(){

    });
  })

  describe("deletePost", function(){
    it("Should be detelable", function(){
      var docId = "abd"
      spyOn(Meteor, "userId").and.returnValue("1");
      spyOn(Posts, "remove").and.returnValue("abc");
      spyOn(Posts, "find").and.returnValue({owner: "1"});

      PostsService.deletePost(docId)

      expect(Posts.remove).toHaveBeenCalledWith("abd", jasmine.any(Function));
    });

    it("Should only be detelable by its owner", function(){
      var docId = "abd"
      spyOn(Meteor, "userId").and.returnValue("ebd");
      spyOn(Posts, "find").and.returnValue({owner: "abc"});

      expect(function () {
        PostsService.deletePost(docId);
      }).toThrow();

      expect(Posts.find.calls.argsFor(0)).toEqual(["abd"]);
    });
  });
});
