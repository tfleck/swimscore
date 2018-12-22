function calculateScores(event){
  var pts = [6,4,3,2,1,0];
  var rpts = [8,4,2,0,0,0];
  var num = $(event.currentTarget).children(".placed").length;
  if($(event.target).hasClass("dq")){
    num -= 1;
    $(event.target).removeClass("dq");
    $(event.target).addClass("not-selected");
    $(event.target).removeClass("btn-danger");
    $(event.target).addClass("btn-outline-primary");
  }
  else if($(event.target).hasClass("placed")){
    num -= 1;
    $(event.target).removeClass("placed");
    $(event.target).addClass("dq");
    $(event.target).removeClass("btn-success");
    $(event.target).addClass("btn-danger");
  }
  else{
    num += 1;
    if(num > 3){
      $(event.target).removeClass("not-selected");
      $(event.target).addClass("dq");
      $(event.target).removeClass("btn-outline-primary");
      $(event.target).addClass("btn-danger");
    }
    else{
      $(event.target).removeClass("not-selected");
      $(event.target).addClass("placed");
      $(event.target).removeClass("btn-outline-primary");
      $(event.target).addClass("btn-success");
    }
  }
  var isRelay = $(event.currentTarget).parents("tr").hasClass("relay"); //check if event is a relay
  var dqd = $(event.currentTarget).children(".dq");
  for(var i=0; i<dqd.length; i++){
    if(isRelay){
      rpts[parseInt($(dqd[i]).text())-1] = 0;
    } else{
      pts[parseInt($(dqd[i]).text())-1] = 0; 
    }
  }
  var placed = $(event.currentTarget).children(".placed");
  var currPts = 0;
  var oppPts = 0;
  for(var i=0; i<placed.length; i++){
    if($(placed[i]).text() == "1"){
      if(isRelay){
        if(currPts < (rpts[1]+rpts[2])){ //Already scored 2nd and 3rd place
          currPts += rpts[0];
        } else{
          currPts = rpts[0]+rpts[1];
        }
      } else {
        currPts += pts[0];
      }
    }
    else if($(placed[i]).text() == "2"){
      if(isRelay){
        if(currPts < (rpts[0]+rpts[2])){ //Already scored 1st and 3rd place
          currPts += rpts[1];
        } else {
          currPts = rpts[0]+rpts[1];
        }
      } else {
        currPts += pts[1];
      }
    }
    else if($(placed[i]).text() == "3"){
      if(isRelay){
        if(currPts < (rpts[0]+rpts[1])){ //Already scored 1st and 2nd place
          currPts += rpts[2];
        }
      } else {
        currPts += pts[2];
      }
    }
    else if($(placed[i]).text() == "4"){
      if(isRelay){
        currPts += rpts[3];
      } else {
        currPts += pts[3];
      }
    }
    else if($(placed[i]).text() == "5"){
      if(isRelay){
        currPts += rpts[4];
      } else {
        currPts += pts[4];
      }
    }
    else if($(placed[i]).text() == "6"){
      if(isRelay){
        currPts += rpts[5];
      } else {
        currPts += pts[5];
      }
    }
  }
  if(isRelay){
    oppPts = (rpts[0]+rpts[1]+rpts[2]+rpts[3]+rpts[4]+rpts[5])-currPts;
  } else {
    oppPts = (pts[0]+pts[1]+pts[2]+pts[3]+pts[4]+pts[5])-currPts;
  }
  console.log("currpts: "+currPts+" oppPts: "+oppPts);
  var tableName = $(event.currentTarget).parents("table").attr("id");
  if(tableName == "girlSwimEvents"){
    var yourOldPts = parseInt($("#girlScore").text());
    var oppOldPts = parseInt($("#girlOppScore").text());
    var attrPts = $(event.currentTarget).parents("tr").attr("pts");
    var attrOppPts = $(event.currentTarget).parents("tr").attr("oppPts");
    var fade = false;
    if(attrPts === undefined){
      attrPts = 0;
      fade = true;
    }
    if(attrOppPts === undefined){
      attrOppPts = 0;
      fade = true;
    }
    yourOldPts -= attrPts;
    oppOldPts -= attrOppPts;
    $(event.currentTarget).parents("tr").attr("pts",currPts);
    $(event.currentTarget).parents("tr").attr("oppPts",oppPts);
    $("#girlScore").text(yourOldPts+currPts);
    $("#girlOppScore").text(oppOldPts+oppPts);
    if(num == 3 && fade){
      $(event.currentTarget).parents("tr").delay(500).fadeOut(400,function() {
        $('#girlSwimEvents').append($(event.currentTarget).parents("tr"));
        $(event.currentTarget).parents("tr").fadeIn(300);
      });
    }
  }
  else{
    var yourOldPts = parseInt($("#boyScore").text());
    var oppOldPts = parseInt($("#boyOppScore").text());
    var attrPts = $(event.currentTarget).parents("tr").attr("pts");
    var attrOppPts = $(event.currentTarget).parents("tr").attr("oppPts");
    var fade = false;
    if(attrPts === undefined){
      attrPts = 0;
      fade = true;
    }
    if(attrOppPts === undefined){
      attrOppPts = 0;
      fade = true;
    }
    yourOldPts -= attrPts;
    oppOldPts -= attrOppPts;
    $(event.currentTarget).parents("tr").attr("pts",currPts);
    $(event.currentTarget).parents("tr").attr("oppPts",oppPts);
    $("#boyScore").text(yourOldPts+currPts);
    $("#boyOppScore").text(oppOldPts+oppPts);
    if(num == 3 && fade){
      $(event.currentTarget).parents("tr").delay(500).fadeOut(400,function() {
        $('#boySwimEvents').append($(event.currentTarget).parents("tr"));
        $(event.currentTarget).parents("tr").fadeIn(300);
      });
    }
  }  
  $(event.target).blur(); //remove focus from button
  $(event.target).button('toggle');
}