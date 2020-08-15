// Incrementing Counter
document.getElementById("plus").onclick = function() {
  var count = document.getElementById("counter");
  var incrementedCount = parseInt(count.value)+1;
  count.value = incrementedCount.toString();
}
document.getElementById("minus").onclick = function() {
  var count = document.getElementById("counter");
  var incrementedCount = parseInt(count.value)-1;
  count.value = incrementedCount.toString();
}
