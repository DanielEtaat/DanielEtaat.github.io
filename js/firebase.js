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
// Submits the total number of pushups inputed by the user to a firebase database
function SubmitCount() {
    var count = document.getElementById("count").value;
    if (count !== "" && count !== "0") {
        var user = document.getElementById("user").value;
        var timestamp = firebase.firestore.Timestamp.fromDate(new Date());
        db.collection("pushups").add({
            name: user,
            pushups: count,
            date: timestamp
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        })
        .then(function() {
            retrieveTotals();
        });
    }
}

// Reading Database
// Retrieves the total number of pushups done in the past day and week
var totalDay;
var totalWeek;
function retrieveTotals() {

    totalDay = 0;
    totalWeek = 0;
    var today = new Date();
    today.setHours(0,0,0,0);
    var monday = getPreviousMonday();
    var user = document.getElementById("user").value;

    db.collection("pushups").where("date", ">=", today)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            if (doc.data()["name"] == user) {
                totalDay += parseInt(doc.data()["pushups"]);
            }
        });
    });

    db.collection("pushups").where("date", ">=", monday)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            if (doc.data()["name"] == user) {
                totalWeek += parseInt(doc.data()["pushups"]);
            }
        });
    })
    .then(function() {
      resetForm();
    })

}

// Retrieves all user data from the past week and ranks them based on there pushup counts
var weeklyRanks;
var weeklyRankedNames;
function getWeeklyRankings() {
  var monday = getPreviousMonday();
  var name;
  weeklyRanks = {};
  db.collection("pushups").where("date", ">=", monday)
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        name = doc.data()["name"];
        if (name in weeklyRanks) {
          weeklyRanks[name] += doc.data()["pushups"];
        } else {
          weeklyRanks[name] = doc.data()["pushups"];
        }
      });
  }).then(function() {
    weeklyRankedNames = Object.keys(weeklyRanks).sort();
    resetWeeklyRankings();
  });
}

// Retrieves all user data from the past day and ranks them based on there pushup counts
var dailyRanks;
var dailyRankedNames;
function getDailyRankings() {
  var today = new Date();
  today.setHours(0,0,0,0);
  var name;
  dailyRanks = {};
  db.collection("pushups").where("date", ">=", today)
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        name = doc.data()["name"];
        if (name in dailyRanks) {
          dailyRanks[name] += doc.data()["pushups"];
        } else {
          dailyRanks[name] = doc.data()["pushups"];
        }
      });
  }).then(function() {
    dailyRankedNames = Object.keys(dailyRanks).sort();
    resetDailyRankings();
  });
}

// Misc Functions
// Gets most recent monday as a Timestamp
function getPreviousMonday() {
    var date = new Date();
    var day = date.getDay();
    var prevMonday = new Date();
    if (date.getDay() == 0) {
        prevMonday.setDate(date.getDate() - 7);
    }
    else {
        prevMonday.setDate(date.getDate() - day);
    }
    prevMonday.setHours(0,0,0,0);
    prevMonday.setTime(prevMonday.getTime() + 86400000);
    return firebase.firestore.Timestamp.fromDate(prevMonday);
}

// Resets the main page
function resetForm() {
  var dayCount = document.getElementById("daycount");
  var weekCount = document.getElementById("weekcount");
  var count = document.getElementById("count");
  dayCount.innerText = totalDay;
  weekCount.innerText = totalWeek;
  count.value = "";
}

// Resets the weekly rankings
function resetWeeklyRankings() {
  var weekNamesList = document.getElementById("week-names");
  var weekCountsList = document.getElementById("week-counts");
  for (var i = 0; i < weeklyRankedNames.length; i++) {
    var nameNode = document.createElement("li");
    var countNode = document.createElement("li");
    nameNode.innerText = (i+1).toString() + ". " + weeklyRankedNames[i];
    countNode.innerText = weeklyRanks[weeklyRankedNames[i]];
    weekNamesList.appendChild(nameNode);
    weekCountsList.appendChild(countNode);
  }
}

// Resets the daily rankings
function resetDailyRankings() {
  var dayNamesList = document.getElementById("today-names");
  var dayCountsList = document.getElementById("today-counts");
  for (var i = 0; i < dailyRankedNames.length; i++) {
    var nameNode = document.createElement("li");
    var countNode = document.createElement("li");
    nameNode.innerText = (i+1).toString() + ". " + dailyRankedNames[i];
    countNode.innerText = dailyRanks[dailyRankedNames[i]];
    dayNamesList.appendChild(nameNode);
    dayCountsList.appendChild(countNode);
  }
}
