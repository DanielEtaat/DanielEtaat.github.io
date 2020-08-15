// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAPbqJ4L_1C-wUT3SY45nwWhRUTmDDAMnI",
  authDomain: "fitnesschallenge-f9494.firebaseapp.com",
  databaseURL: "https://fitnesschallenge-f9494.firebaseio.com",
  projectId: "fitnesschallenge-f9494",
  storageBucket: "fitnesschallenge-f9494.appspot.com",
  messagingSenderId: "661986350762",
  appId: "1:661986350762:web:0294e7a3713d9e18f8a2d3",
  measurementId: "G-927WXDZ4ZE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();

// Updating Database
function Submit() {
  var count = document.getElementById("counter").innerText;
  var today = new Date();
  db.collection("pushups").add({
      pushups: count,
      datetime: today.getUTCFullYear() + ':' + (today.getMonth()+1) + ':' + today.getDate() + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}
