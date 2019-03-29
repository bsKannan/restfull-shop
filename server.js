var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var mongoose = require('mongoose');
var ejsLayouts = require('express-ejs-layouts');
var config = require('./config/config');

var app = express();

var postsController = require('./controllers/posts');
var commentsController = require('./controllers/comments');
var usersController = require('./controllers/users');


app.use(morgan('dev')); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(ejsLayouts);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


mongoose.connect(config.url,{useNewUrlParser:true},function(err,con){
    if(err)
    console.log(err)
    if(con){
        console.log("connected")
    }
})


app.get('/',(req,res)=>{
    res.send("Hello World");
})


app.get('/posts',postsController.postsIndex);
app.post('/posts',postsController.postsCreate);


app.get('/posts/new',postsController.postsNew);

app.get('/posts/:id',postsController.postsShow)
    .put(postsController.postsUpdate)
    .delete(postsController.postsDestroy);

app.post('/posts/:id/comments',commentsController.commentsCreate)


app.get('/users',usersController.usersIndex)
    .post(usersController.usersCreate);

app.get('/users/new',usersController.usersNew);
  
app.get('/users/:id',usersController.usersShow)
    .put(usersController.usersUpdate)
    .delete(usersController.usersDestroy);
  

app.get("/",postsController.postsIndex)



var alex = new User({
    name: "Alex",
    images: [{
      url: "http://fillmurray.com/200/200"
    }]
});
alex.save();

var gerry = new User({
  name: "Gerry",
  images: [{
    url: "http://fillmurray.com/201/201"
  }]
})
gerry.save();

// https://coderwall.com/p/6v5rcw/querying-sub-documents-and-sub-sub-documents-in-mongoose
// Querying sub-document using _id
var id = alex.images[0]._id
// console.log(alex.images.id(id))

// Adding sub-document using push + save");
var newImage = alex.images.push({ url: "http://fillmurray.com/202/202" });
alex.save();

// Adding sub-document using create
var newdoc = alex.images.create({ url: "http://fillmurray.com/203/203" });

// Creating a new post with some comments
var post = new Post({
  title: "Hello World",
  _author: alex._id,
  comments: [
    {
      text: "Nice post!",
      _author: gerry._id
    }, {
      text: "Thanks :)",
      _author: alex._id
    }
  ]
});

post.save(function(err) {
  if (!err) {
    // Display the posts out on the page
    Post.find({})
// In mongoose >= 3.6, we can pass a space delimited string of path names to populate. Before 3.6 you must execute the populate() method multiple times.
    // .populate('_author')
    // .populate('comments._author')
    .populate('_author comments._author')
    .exec(function(err, posts) {
      // Stringify to display nested objects instead of: [Object]
      // console.log(JSON.stringify(posts, null, "\t"))
    })
  }
});


app.listen(3000,()=>{console.log("Server connected on port 3000")});