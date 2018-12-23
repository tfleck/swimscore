jQuery(document).ready(function($) {
  var cookies = readCookies();
  loadRuleset(cookies[0], cookies[1]);
});

function loadRuleset(ruleset, times) {
  var request = $.get(ruleset + '.html');
  request.done(function(data) {
    $("#container").html(data);
    setupRuleset();
    addListeners();
    updateCookies(ruleset, times);
    if (times == "girls") {
      $("#showGirlsTimes").trigger("click");
    } else {
      $("#showBoysTimes").trigger("click");
    }
  });
  request.fail(function(error) {
    $("#container").html(`
            <div class="alert alert-danger" role="alert">
                There was an error trying to load the scoreboard, try reloading or selecting another scoreboard from the dropdown
            </div>`);
    console.log("error loading ruleset");
    addListeners();
    updateCookies(ruleset, times);
  });
}

function addListeners() {
  $(".btn-place-group").click(function(event) {
    event.preventDefault();
    calculateScores(event);
  });
  $(".ruleset-item").click(function(event) {
    $("#rulesetChoices").find("i").remove();
    $(event.currentTarget).html($(event.currentTarget).attr("long-name") + `<i class="fas fa-check"></i>`);
    var cookies = readCookies();
    loadRuleset($(event.currentTarget).attr("ruleset"), cookies[1]);
  });
  $("#showGirlsTimes").click(function(event) {
    $("#boysDistrictTimes").fadeOut(300, function(event) {
      $("#girlsDistrictTimes").fadeIn(300);
    });
    var cookies = readCookies();
    updateCookies(cookies[0], "girls");
  });
  $("#showBoysTimes").click(function(event) {
    $("#girlsDistrictTimes").fadeOut(300, function(event) {
      $("#boysDistrictTimes").fadeIn(300);
    });
    var cookies = readCookies();
    updateCookies(cookies[0], "boys");
  });
}

function readCookies() {
  var cookies = (document.cookie).split(";");
  var ruleset = "piaa-winter";
  var times = "girls";
  for (var i = 0; i < cookies.length; i++) {
    var str = cookies[i].trim();
    var rulesetIndex = str.indexOf("ruleset=");
    var timesIndex = str.indexOf("times=");
    if (rulesetIndex != -1) {
      ruleset = str.substring(rulesetIndex + 8);
    }
    if (timesIndex != -1) {
      times = str.substring(timesIndex + 6);
    }
  }
  return [ruleset, times];
}

function updateCookies(ruleset, times) {
  var cookie = "times=" + times + ";";
  expires = new Date(new Date().getTime() + 7 * 1000 * 60 * 60 * 24);
  cookie += "expires=" + expires.toGMTString() + ";";
  document.cookie = cookie;
  cookie = "ruleset=" + ruleset + ";";
  cookie += "expires=" + expires.toGMTString() + ";";
  document.cookie = cookie;
}