window.onload = init;
var data;
var fiabilityCote;
var matchList = [];
var clubDict = {};
function init(){
    documentInput = document.getElementById("fileCsv").addEventListener("change", loadFile);
    document.getElementById("validClubStats1").addEventListener("click", loadClubStats1);
    document.getElementById("validClubStats2").addEventListener("click", loadClubStats2);
}

function loadFile(files){
    console.log("loadFile");
    Papa.parse(document.getElementById('fileCsv').files[0], {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
          data = results;
          let countHome = 0;
          let countDraw = 0;
          let countAway = 0;
          let countTrueB365 = 0;
          let countTrueBW = 0;
          let countTrueIW = 0;
          let countTrueLB = 0;
          let countTruePS = 0;
          let countTotal = 0;
          data.data.forEach(function(item, index, array) {
            clubDict[item.HomeTeam] = item.HomeTeam;
            
            result = item.FTR;
            homeCoteB365 = item.B365H;
            drawCoteB365 = item.B365D;
            awayCoteB365 = item.B365A;

            homeCoteBW = item.BWH;
            drawCoteBW = item.BWD;
            awayCoteBW = item.BWA;

            homeCoteIW = item.IWH;
            drawCoteIW = item.IWD;
            awayCoteIW = item.IWA;

            homeCoteLB = item.LBH;
            drawCoteLB = item.LBD;
            awayCoteLB = item.LBA;

            homeCotePS = item.PSH;
            drawCotePS = item.PSD;
            awayCotePS = item.PSA;
            


            switch (result){
                case 'H':
                    countHome += 1;
                    if(homeCoteB365 < drawCoteB365 && homeCoteB365 < awayCoteB365){
                        countTrueB365 += 1;
                    }
                    if(homeCoteBW < drawCoteBW && homeCoteBW < awayCoteBW){
                        countTrueBW += 1;
                    }
                    if(homeCoteIW < drawCoteIW && homeCoteIW < awayCoteIW){
                        countTrueIW += 1;
                    }
                    if(homeCoteLB < drawCoteLB && homeCoteLB < awayCoteLB){
                        countTrueLB += 1;
                    }
                    if(homeCotePS < drawCotePS && homeCotePS < awayCotePS){
                        countTruePS += 1;
                    }

                    break;
                case 'D':
                    countDraw += 1;
                    if(drawCoteB365 < homeCoteB365 && drawCoteB365 < awayCoteB365){
                        countTrueB365 += 1;
                    }
                    if(drawCoteBW < homeCoteBW && drawCoteBW < awayCoteBW){
                        countTrueBW += 1;
                    }
                    if(drawCoteIW < homeCoteIW && drawCoteIW < awayCoteIW){
                        countTrueIW += 1;
                    }
                    if(drawCoteLB < homeCoteLB && drawCoteLB < awayCoteLB){
                        countTrueLB += 1;
                    }
                    if(drawCotePS < homeCotePS && drawCotePS < awayCotePS){
                        countTruePS += 1;
                    }

                    break;
                case 'A' :
                    countAway += 1;
                    if(awayCoteB365 < drawCoteB365 && awayCoteB365 < homeCoteB365){
                        countTrueB365 += 1;
                    }
                    if(awayCoteBW < drawCoteBW && awayCoteBW < homeCoteBW){
                        countTrueBW += 1;
                    }
                    if(awayCoteIW < drawCoteIW && awayCoteIW < homeCoteIW){
                        countTrueIW += 1;
                    }
                    if(awayCoteLB < drawCoteLB && awayCoteLB < homeCoteLB){
                        countTrueLB += 1;
                    }
                    if(awayCotePS < drawCotePS && awayCotePS < homeCotePS){
                        countTruePS += 1;
                    }

                    break;
            }
            countTotal += 1;
          });
          document.getElementById("totaGame").innerHTML = countTotal;
          document.getElementById("totaHome").innerHTML = countHome;
          document.getElementById("totaAway").innerHTML = countAway;
          document.getElementById("totaDraw").innerHTML = countDraw;
          document.getElementById("totaCote").innerHTML = countTrueB365;

          google.charts.load('current', {'packages':['bar']});
            google.charts.setOnLoadCallback(drawChart1);

              function drawChart1() {
                var data = google.visualization.arrayToDataTable([
                  ['BetSite', 'True', 'Wrong'],
                  ['B365',     countTrueB365, countTotal - countTrueB365 ],
                  ['BW',     countTrueBW, countTotal - countTrueBW ],
                  ['IW',     countTrueIW, countTotal - countTrueIW ],
                  ['LB',     countTrueLB, countTotal - countTrueLB ],
                  ['PS',     countTruePS, countTotal - countTruePS ]
                ]);

                var options = {
                  title: "Bet Website Stast"
                };

               var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

                chart.draw(data, google.charts.Bar.convertOptions(options));
              }



          populateSelect();
        }
      });
}

function loadClubStats1(){
    club = document.getElementById("teamSelect1").value;
    let matchCountClub1 = 0;
    let winCount1 = 0;
    let drawCount1 = 0;
    let homeCount1 = 0;
    let awayCount1 = 0;
    let homeWin1 = 0;
    let awayWin1 = 0;
    let countTrueB365_1 = 0;
    let countTrueBW_1 = 0;
    Papa.parse(document.getElementById('fileCsv').files[0], {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            results.data.forEach(function(item, index, array) {
                if(item.HomeTeam == club || item.AwayTeam == club){
                    console.log(item);
                    matchCountClub1 += 1;
                    result = item.FTR;
                    if(item.HomeTeam == club){
                        homeCount1 += 1;
                    }else{
                        awayCount1 += 1;
                    }
                    console.log(result)
                    if(result == 'H' && item.HomeTeam == club){
                        console.log("home and win")
                        winCount1 +=1;
                        homeWin1 += 1;
                        if(item.B365H < item.B365D && item.B365H < item.B365A){
                            countTrueB365_1 += 1;
                        }
                        if(item.BWH < item.BWD && item.BWH < item.BWA){
                            countTrueBW_1 += 1;
                            console.log("Victoire dom")
                        }

                    }else if(result == 'A' && item.AwayTeam == club){
                        console.log("away and win")
                        winCount1 += 1;
                        awayWin1 += 1;
                        if(item.B365A < item.B365D && item.B365A < item.B365H){
                            countTrueB365_1 += 1;
                         }

                         if(item.BWA < item.BWD && item.BWA < item.BWH){
                            countTrueBW_1 += 1;
                            console.log("Victoire ext")
                         }

                    }else if(result == 'D'){
                        console.log("draw")
                        drawCount1 += 1;
                        if(item.B365D < item.B365A && item.B365D < item.B365H){
                            countTrueB365_1 += 1;
                        }
                        if(item.BWD < item.BWH && item.BWD < item.BWA){
                            countTrueBW_1 += 1;
                            console.log("Nul")
                        }
                    }else{
                        console.log("Losse");
                        if(item.AwayTeam == club && result == 'H'){
                           if(item.B365H < item.B365A && item.B365H < item.B365D){
                            countTrueB365_1 += 1;
                           } 
                        } else if(item.HomeTeam == club && result == 'A'){
                            if(item.B365A < item.B365H && item.B365A < item.B365D){
                            countTrueB365_1 += 1;
                           }
                        }

                        if(item.AwayTeam == club && result == 'H'){
                           if(item.BWH < item.BWA && item.BWH < item.BWD){
                            countTrueB365_1 += 1;
                            console.log("Defaite ext")
                           } 
                        } else if(item.HomeTeam == club && result == 'A'){
                            if(item.BWA < item.BWH && item.BWA < item.BWD){
                            countTrueBW_1 += 1;
                            console.log("Defaite dom")
                           }
                        }
                    }
                }
            });
            document.getElementById("totalGameClub1").innerHTML = matchCountClub1;
            document.getElementById("totalWinClub1").innerHTML = winCount1;
            document.getElementById("totalDrawClub1").innerHTML = drawCount1;
            document.getElementById("totalLooseClub1").innerHTML = matchCountClub1 - (winCount1 + drawCount1);
            document.getElementById("totaHomeGameClub1").innerHTML = homeCount1;
            document.getElementById("totaHomeWinClub1").innerHTML = homeWin1;
            document.getElementById("totaAwayGameClub1").innerHTML = awayCount1;
            document.getElementById("totaAwayWinClub1").innerHTML = awayWin1;
            document.getElementById("GoodBetsB3651").innerHTML = (countTrueB365_1/matchCountClub1) * 100;
            //document.getElementById("GoodBetsBW1").innerHTML = (countTrueBW_1/matchCountClub1) * 100;

            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart2);

              function drawChart2() {

                var data = google.visualization.arrayToDataTable([
                  ['Stats Club Saison', 'Per Match'],
                  ['Win',     winCount1],
                  ['Lose',      matchCountClub1 - (winCount1 + drawCount1)],
                  ['Draw',  drawCount1],
                ]);

                var options = {
                  title: club
                };

                var chart = new google.visualization.PieChart(document.getElementById('piechart1'));

                chart.draw(data, options);
              }
        }
    });
}
function loadClubStats2(){
    club = document.getElementById("teamSelect2").value;
    let matchCountClub2 = 0;
    let winCount2 = 0;
    let drawCount2 = 0;
    let homeCount2 = 0;
    let awayCount2 = 0;
    let homeWin2 = 0;
    let awayWin2 = 0;
    let countTrueB365_2 = 0;
    let countTrueBW_2 = 0;
    Papa.parse(document.getElementById('fileCsv').files[0], {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            results.data.forEach(function(item, index, array) {
                if(item.HomeTeam == club || item.AwayTeam == club){
                    console.log(item);
                    matchCountClub2 += 1;
                    result = item.FTR;
                    if(item.HomeTeam == club){
                        homeCount2 += 1;
                    }else{
                        awayCount2 += 1;
                    }
                    console.log(result)
                    if(result == 'H' && item.HomeTeam == club){
                        console.log("home and win")
                        winCount2 += 1;
                        homeWin2 += 1;
                        if(item.B365H < item.B365D && item.B365H < item.B365A){
                            countTrueB365_2 += 1;
                        }
                        if(item.BWH < item.BWD && item.BWH < item.BWA){
                            countTrueBW_2 += 1;
                        }

                    }else if(result == 'A' && item.AwayTeam == club){
                        console.log("away and win")
                        winCount2 += 1;
                        awayWin2 += 1;
                        if(item.B365A < item.B365D && item.B365A < item.B365H){
                            countTrueB365_2 += 1;
                        }
                         if(item.BWA < item.BWD && item.BWA < item.BWH){
                            countTrueBW_2 += 1;
                        }

                    }else if(result == 'D'){
                        console.log("draw")
                        drawCount2 += 1;
                        if(item.B365D < item.B365A && item.B365D < item.B365H){
                            countTrueB365_2 += 1;
                        }
                        if(item.BWD < item.BWH && item.BWD < item.BWA){
                            countTrueBW_2 += 1;
                        }

                    }else{
                        console.log("Losse");
                        if(item.AwayTeam == club && result == 'H'){
                           if(item.B365H < item.B365A && item.B365H < item.B365D){
                            countTrueB365_2 += 1;
                           } 
                        } else if(item.HomeTeam == club && result == 'A'){
                            if(item.B365A < item.B365H && item.B365A < item.B365D){
                            countTrueB365_2 += 1;
                           }
                        }
                        if(item.AwayTeam == club && result == 'H'){
                           if(item.BWH < item.BWA && item.BWH < item.BWD){
                            countTrueB365_2 += 1;
                           } 
                        } else if(item.HomeTeam == club && result == 'A'){
                            if(item.BWA < item.BWH && item.BWA < item.BWD){
                            countTrueBW_2 += 1;
                           }
                        }
                    }
                }
            });
            document.getElementById("totalGameClub2").innerHTML = matchCountClub2;
            document.getElementById("totalWinClub2").innerHTML = winCount2;
            document.getElementById("totalDrawClub2").innerHTML = drawCount2;
            document.getElementById("totalLooseClub2").innerHTML = matchCountClub2 - (winCount2 + drawCount2);
            document.getElementById("totaHomeGameClub2").innerHTML = homeCount2;
            document.getElementById("totaHomeWinClub2").innerHTML = homeWin2;
            document.getElementById("totaAwayGameClub2").innerHTML = awayCount2;
            document.getElementById("totaAwayWinClub2").innerHTML = awayWin2;
            document.getElementById("GoodBetsB3652").innerHTML = (countTrueB365_2/matchCountClub2) * 100;
            //document.getElementById("GoodBetsBW2").innerHTML = (countTrueBW_2/matchCountClub2) * 100;

            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart2);

              function drawChart2() {

                var data = google.visualization.arrayToDataTable([
                  ['Stats Club Saison', 'Per Match'],
                  ['Win',     winCount2],
                  ['Lose',      matchCountClub2 - (winCount2 + drawCount2)],
                  ['Draw',  drawCount2],
                ]);

                var options = {
                  title: club
                };

                var chart = new google.visualization.PieChart(document.getElementById('piechart2'));

                chart.draw(data, options);
              }
        }
    });
}

function populateSelect(){
    select = document.getElementById("teamSelect1");
    console.log(clubDict);
    for(var club in clubDict){
        var el = document.createElement("option");
        el.textContent = club;
        el.value = club;
        select.appendChild(el);
    }
    select = document.getElementById("teamSelect2");
    console.log(clubDict);
    for(var club in clubDict){
        var el = document.createElement("option");
        el.textContent = club;
        el.value = club;
        select.appendChild(el);
    }
}

let Match = class {
    constructor(home, away, result, ){
        this.home = home;
        this.away = away;
        this.result = result;
    }
}