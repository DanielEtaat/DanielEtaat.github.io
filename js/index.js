window.onload = function() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.get("user") !== null) {
    document.getElementById("user").value = urlParams.get("user");
  }
  retrieveTotals();
}
