jQuery(document).ready(function($) {
  var cookies = (document.cookie).split(";");
  var ruleset = "piaa-winter";
  var times = "girls";
  for(var i=0; i<cookies.length; i++){
    var str = cookies[i].trim();
    var rulesetIndex = str.indexOf("ruleset=");
    var timesIndex = str.indexOf("times=");
    if(rulesetIndex != -1){
      ruleset = str.substring(rulesetIndex+8);
    }
    if(timesIndex != -1){
      times = str.substring(timesIndex+6);
    }
  }
  $.get(ruleset+'.html',function(data) {
    $("#container").after(data);
    addListeners();
    updateCookies(ruleset,times);
    if(times == "girls"){
      $("#showGirlsTimes").trigger("click");
    }
    else{
      $("#showBoysTimes").trigger("click");
    }
  });
});

function addListeners(){
  $(".btn-place-group").click(function(event) {
    event.preventDefault();
    calculateScores(event);
  });
  $(".ruleset-item").click(function(event) {
    var cookie = "ruleset="+$(event.currentTarget).attr("ruleset")+";";
    expires = new Date(new Date().getTime() + 7 * 1000 * 60 * 60 * 24);
    cookie += "expires=" + expires.toGMTString() + ";";
    document.cookie = cookie;
    location.reload();
  });
  $("#showGirlsTimes").click(function(event) {
    $("#boysDistrictTimes").fadeOut(300, function(event) {
      $("#girlsDistrictTimes").fadeIn(300);
    });
    var cookie = "times=girls;";
    expires = new Date(new Date().getTime() + 7 * 1000 * 60 * 60 * 24);
    cookie += "expires=" + expires.toGMTString() + ";";
    document.cookie=cookie;
  });
  $("#showBoysTimes").click(function(event) {
    $("#girlsDistrictTimes").fadeOut(300, function(event) {
      $("#boysDistrictTimes").fadeIn(300);
    });
    var cookie = "times=boys;";
    expires = new Date(new Date().getTime() + 7 * 1000 * 60 * 60 * 24);
    cookie += "expires=" + expires.toGMTString() + ";";
    document.cookie=cookie;
  });
}

function updateCookies(ruleset,times){
  var cookie = "times="+times+";";
  expires = new Date(new Date().getTime() + 7 * 1000 * 60 * 60 * 24);
  cookie += "expires=" + expires.toGMTString() + ";";
  document.cookie = cookie;
  cookie = "ruleset="+ruleset+";";
  cookie += "expires=" + expires.toGMTString() + ";";
  document.cookie = cookie;
}