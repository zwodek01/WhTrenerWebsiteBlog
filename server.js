// JSON secret key
const serviceAccount = require("./whstrona-firebase-adminsdk");
const admin = require('firebase-admin');
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
let databaseCategory;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://whstrona.firebaseio.com"
});

const cloudFirestore = admin.firestore();


app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.post('/addNewPost', function (req, res) {
  cloudFirestore.collection('blog').doc(req.body.id).set(req.body)
    .then((response) => {
      res.send("OK")
    })
    .catch((error) => {
      res.send("Error")
    })
});


app.get('/getPosts', function (req, res) {
  let database = []
  cloudFirestore.collection('blog').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        database.push(doc.data())
      });
      res.send(database)
      databaseCategory = database
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
})

app.post('/getCategory', function (req, res) {
  const category = req.body.category;
  const result = databaseCategory.filter(obj => {
    return obj.category === category
  })
  res.send(result)
})

app.post('/deletePost', function (req, res) {
  let id = req.body.id;

  cloudFirestore.collection('blog').doc(id).delete()
    .then(() => {
      res.send("OK")
    })
    .catch((error) => {
      res.send("Error")
    })
})



app.listen(port, function () {
  console.log('Express started on port: ', port);
});
