if (Posts.find().count() === 0) {

  Posts.insert({
    title: "Feeling IFFE On Js"
    , body: "Friday we redid a bunch of our week1 projects, but in javascript! There’s no other programming topic that gave the entire class pause quite the way callbacks did, though due to Javascripts asynchronous nature it is also one of the most popular patterns. Functions are first class objects here, there’s no discrimination. Today we’ll build an astroids game filled with callbacks, IFFEs, and closures; and you know what, I cannot wait."
    , comments: []
  });
  Posts.insert({
    title: "AppAcademy w4d5"
    , body: "Dammit!, the reddit clone is what we did today. The beginning was a review of what we have been doing this week again and again - the process of using the authenticity token to prevent CSRF attacks, and using the session token to have a user be logged in for more than one page, which we have an assessment on, on Monday. This process actually took a while and only after finished that, did we actually get to work on the actual reddit mechanics.The reddit that we made had users. Users could create, edit, and delete subs, and within the subs were posts, and within the posts were comments. Users are able to cross reference any post and deleting the original will not delete all of the cross references. Since comments could have comments, we implemented a nested comment query that fired way too many queries. We need to fix that somehow. But other than that, all of the functions are there. We have not learned css or javascript so there is no styling yet. I would definitely want to go back to add styling after we learn it."
    , comments: [ { body: "man that was a really great post! I wish I was cool like you.",
        user: "ABDCAER"}]
  });
}
