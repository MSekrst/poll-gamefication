var polls = [];
var solvedPulls = 0;
var times = ['7:00', '12:00', '17:00', '21:00', '3:00'];
var start = Math.floor((Math.random() * 5) + 1);

var daytime;
var soc1;
var soc2;
var cost;

function newPool() {
  var n = (5 - start + solvedPulls)%5 +1;
  daytime = times[solvedPulls];
  soc1 = Math.floor((Math.random() * 20*n) + 20*(n-1));
  soc2 = Math.floor((Math.random() * 100) + soc1);
  cost = Math.floor((Math.random() * 100));
  solvedPulls += 1;
}

function savePool(wtp, time) {
  var poll = {"time": daytime, "soc1": soc1, "soc2": soc2, "cost":cost, "wtp": wtp, "time": time};
  polls.push(poll);

}

