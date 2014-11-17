"use strict";

describe("Post Comment Methods", function(){
  beforeEach(function(){
    MeteorStubs.install();
    mock(global, "Comments");
    mock(global, "Meteor");
    mock(global, "Posts");
  });

  afterEach(function(){
    MeteorStubs.uninstall();
  })

  describe("createComment", function(){
    it("Should be created with a body", function(){
      var docId = "abc";
      var data = {
        body: "test comment"
      };
      spyOn(Meteor, "userId").and.returnValue("user id");
      spyOn(Comments, "insert").and.returnValue("1")

      CommentsService.createComment(docId, data);
      expect(Comments.insert).toHaveBeenCalledWith({
        post: "abc", body: "test comment", owner: "user id" }
      , jasmine.any(Function));

    });

    it("Should throw error unless user is loggedin", function(){
      var docId = "abc";
      var data = {};
      spyOn(Meteor, "userId").and.returnValue(null);

      expect(function(){
        CommentsService.createComment(docId, data)
      }).toThrow();
    });
  })


  describe("deleteComment", function(){
    it ("Should be deleteable", function(){
      var docId = "abc";

      spyOn(Meteor, "userId").and.returnValue("user id");
      spyOn(Comments, "remove").and.returnValue("1");
      spyOn(CommentsService, "commentOwner").and.returnValue('user id')

      CommentsService.deleteComment(docId);

      expect(Comments.remove).toHaveBeenCalledWith("abc");
    });

    it ("Should only be deletable by comment Owner", function(){
      var docId = "abc";
      spyOn(Meteor, "userId").and.returnValue("2");
      spyOn(Comments, "findOne").and.returnValue({ owner: "testuser"})
      expect(function(){
        CommentsService.deleteComment(docId)
      }).toThrow();
    });
  });

  describe("isOwner", function(){
    it("Should return false unless logged in", function(){
      var docId = "abc"
      spyOn(Meteor, "userId").and.returnValue(null);
      expect(CommentsService.isOwner(docId)).toBeNull();
    });

    it("Should return true if currentUser is document owner", function(){
      var docId = "abd"
      spyOn(Meteor, "userId").and.returnValue("1");
      spyOn(Comments, "findOne").and.returnValue({owner: "1"});

      expect(CommentsService.isOwner(docId)).toBe(true);
      expect(Comments.findOne.calls.argsFor(0)).toEqual(["abd"])
    });
  })
})
