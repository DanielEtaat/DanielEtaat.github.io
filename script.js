// incrmenting counter
document.getElementById("plus").onclick = function() {
  var count = document.getElementById("counter");
  var incrementedCount = parseInt(count.innerText)+1;
  count.innerText = incrementedCount.toString();
}
document.getElementById("minus").onclick = function() {
  var count = document.getElementById("counter");
  var incrementedCount = parseInt(count.innerText)-1;
  count.innerText = incrementedCount.toString();
}
