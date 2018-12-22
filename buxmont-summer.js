function calculateScores(event){
  var pts = [5,3,1];
  var rpts = [7,0,0];
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
  var isRelay = $(event.currentTarget).parents("tr").hasClass("relay"); //check if event is a relay
  for(var i=0; i<placed.length; i++){
    if($(placed[i]).text() == "1"){
      if(isRelay){
        currPts += rpts[0];
      } else if(currPts < (pts[1]+pts[2])){ //Already scored 2nd and 3rd place
        currPts += pts[0];
      } else{
        currPts = pts[0]+pts[1];
      }
    }
    else if($(placed[i]).text() == "2"){
      if(isRelay){
        currPts += rpts[1];
      } else if(currPts < (pts[0]+pts[2])){ //Already scored 2nd and 3rd place
        currPts += pts[1];
      } else {
        currPts = pts[0]+pts[1];
      }
    }
    else if($(placed[i]).text() == "3"){
      if(isRelay){
        currPts += rpts[2];
      } else if(currPts < (pts[0]+pts[1])){ //Already scored 2nd and 3rd place
        currPts += pts[2];
      } else{
        currPts = pts[0]+pts[1];
      }
    }
  }
  if(placed.length == 0 && dqd.length == 0){
    currPts = 1;
  }
  if(isRelay){
    oppPts = (rpts[0]+rpts[1]+rpts[2])-currPts;
  } else {
    oppPts = (pts[0]+pts[1]+pts[2])-currPts;
  }
  var yourOldPts = parseInt($("#homeScore").text());
  var oppOldPts = parseInt($("#awayScore").text());
  var attrPts =  $(event.currentTarget).parents("tr").attr("pts");
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
  $("#homeScore").text(yourOldPts+currPts);
  $("#awayScore").text(oppOldPts+oppPts);
  if(fade){
    $(event.currentTarget).parents("tr").delay(2000).fadeOut(500,function() {
      $(event.currentTarget).parents("table").append($(event.currentTarget).parents("tr"));
      $(event.currentTarget).parents("tr").fadeIn(300);
    });
  }

  $(event.target).blur(); //remove focus from button
  $(event.target).button('toggle');
}