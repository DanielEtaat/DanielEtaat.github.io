window.onload = function() {

  // Selecting the correct profile based on the url params
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.get("user") !== null) {
    document.getElementById("user").value = urlParams.get("user");
  }

  // Updating weekly and daily goals on the profile page
  var weekGoal = getWeeklyGoal();
  var dayGoal = Math.round(weekGoal/7);
  document.getElementById("weekgoal").innerText = weekGoal.toString();
  document.getElementById("daygoal").innerText = dayGoal.toString();

  // Retrieving user data
  // retrieveTotals();
}


// Returns the target number of pushups to be completed each week
function getWeeklyGoal() {
  const startDate = 1597042800000;
  const today = new Date();
  var daysPast = (today.getTime()-startDate) / 86400000;
  var weekNumber = Math.floor(daysPast / 7);
  var goal = 750 + weekNumber * 250;
  return goal;
}
