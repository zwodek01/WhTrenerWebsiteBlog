const admin = require('firebase-admin');
// JSON secret key
const serviceAccount = require("./src/whstrona-firebase-adminsdk");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://whstrona.firebaseio.com"
});

//   const db = admin.database();
//   const cloudFirestore = admin.firestore();

//   function writeUserData(userId, name, email, imageUrl) {
//     return db.ref('users/' + userId).set({
//       username: name,
//       email: email,
//       profile_picture : imageUrl
//     });
//   }

//   writeUserData("2","1","4","9").then(() => {
//       console.log("OK")
//   })

// let data = {
//     name: 'Los Angeles',
//     state: 'CA',
//     country: 'USA'
//   };
  
  // Add a new document in collection "cities" with ID 'LA'

//   function addNewPost(collection,doc) {
//    return cloudFirestore.collection(collection).doc(doc).set(data);
//   }

//   addNewPost('Blog', 'Post').then(() => {
//       console.log("OK")
//   }).catch(() => {
// console.log("notok")
//   })