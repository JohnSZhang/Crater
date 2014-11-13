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
      spyOn(Posts, "update").and.returnValue("1")

      CommentsService.createComment(docId, data);
      expect(Posts.update).toHaveBeenCalledWith("abc", {
        $push: { comments: { body: "test comment", owner: "user id" } }
      }, jasmine.any(Function));

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
      var data = { data: "old comment" };

      spyOn(Meteor, "userId").and.returnValue("user id");
      spyOn(Posts, "find").and.returnValue("user id");

      CommentsService.deleteComment(docId, data);

      expect(Posts.update).toHaveBeenCalledWith("abc", { $pull: { body:
      "old comment" }}, jasmine.any(Function));

    });

    it ("Should only be deletable by comment Owner", function(){
      var docId = "abc";
      spyOn(Meteor, "userId").and.returnValue("2");

      expect(function(){
        CommentsService.deleteComment(docId)
      }).toThrow();
    });
  })
})
