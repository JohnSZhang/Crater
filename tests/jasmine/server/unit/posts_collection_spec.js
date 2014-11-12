"user strict";
describe("posts", function(){
  it("Should be created with a title and a body", function(){
    spyOn(Posts, "insert").and.callFake(function(doc, callback){
          callback(null, "1")
    });

    var post = new Post({
      id: null
      , title: "test title"
      , body: "test body"});

    expect(post.title).toBe("test title");
    expect(post.body).toBe("test body");

    post.save();

    expect(post.id).toEqual("1");
    expect(Posts.insert).toHaveBeenCalledWith({
      title: "test title"
      , body: "test body" }, jasmine.any(Function));
  });
});
