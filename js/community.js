window.onload = function() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.get("user") !== null) {
    document.getElementById("profile-link").href = "index.html?user=" + urlParams.get("user")
    document.getElementById("community-link").href = "community.html?user=" + urlParams.get("user")
  }
  getDailyRankings();
  getWeeklyRankings();
}
