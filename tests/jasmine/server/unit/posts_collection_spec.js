"user strict";

describe("Post Methods", function(){

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
      };

      PostsService.createPost(options);

      expect(Meteor.userId.calls.count()).toEqual(1);
      expect(Posts.insert).toHaveBeenCalledWith({
            owner: "userId"
            , title: "test title"
            , body: "test body"
            , createdAt: "test date"
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
    it("Should list posts by reverse creation date when fethced and limit to 5",
    function(){
      spyOn(Posts, "find").and.returnValue({});
      PostsService.getPosts();
      expect(Posts.find.calls.argsFor(0)).toEqual([{}, {
          sort: {createdAt: -1}
          , limit: 5
      }]);
    });
  });

  describe("updatePost", function(){
    it("Should be updateable in both title and body", function(){
      var docId = 'abc';
      var data = {
        title: "new title"
        , body: "new body"
      }
      spyOn(Posts, "findOne").and.returnValue({owner: "1"});
      spyOn(Meteor, "userId").and.returnValue("1");
      spyOn(Posts, "update").and.returnValue("1")

      PostsService.updatePost(docId, data);

      expect(Posts.findOne.calls.argsFor(0)).toEqual(["abc"]);
      expect(Posts.update).toHaveBeenCalledWith("abc", { $set:
          {
            title:  "new title"
            , body: "new body"
          }
        }, jasmine.any(Function));
    });

    it("Should only be updatable by its owner", function(){
      var docId = "abc"
      spyOn(Meteor, "userId").and.returnValue("2");
      spyOn(Posts, "findOne").and.returnValue({owner: "1"})

      var data = { };

      expect(function () {
        PostsService.updatePost(docId, data)
      }).toThrow();
      expect(Posts.findOne.calls.argsFor(0)).toEqual(['abc']);

    });
  })

  describe("deletePost", function(){
    it("Should be deleteable", function(){
      var docId = "abd"
      spyOn(Meteor, "userId").and.returnValue("1");
      spyOn(Posts, "remove").and.returnValue("abc");
      spyOn(PostsService, "isOwner").and.returnValue(true);
      spyOn(Posts, "findOne").and.returnValue({owner: "1"});

      PostsService.deletePost(docId)

      expect(Posts.remove).toHaveBeenCalledWith("abd", jasmine.any(Function));
    });

    it("Should only be deleteable by its owner", function(){
      var docId = "abd"
      spyOn(Meteor, "userId").and.returnValue("ebd");
      spyOn(Posts, "findOne").and.returnValue({owner: "abc"});

      expect(function () {
        PostsService.deletePost(docId);
      }).toThrow();

      expect(Posts.findOne.calls.argsFor(0)).toEqual(["abd"]);
    });
  });

  describe("isOwner", function(){
    it("Should return false unless logged in", function(){
      var docId = "abc"
      spyOn(Meteor, "userId").and.returnValue(null);
      expect(PostsService.isOwner(docId)).toBeNull();
    });

    it("Should return true if currentUser is document owner", function(){
      var docId = "abd"
      spyOn(Meteor, "userId").and.returnValue("1");
      spyOn(Posts, "findOne").and.returnValue({owner: "1"});

      expect(PostsService.isOwner(docId)).toBe(true);
      expect(Posts.findOne.calls.argsFor(0)).toEqual(["abd"])
    });
  })
});
