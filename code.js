// make default page is matches content
document.querySelector('.matches').style.display = 'block';
document.querySelector('.Standings').style.display = 'none';
document.querySelector('.topScores').style.display = 'none';

$('header ul li:nth-child(1) a').click(show_Match); 
$('header ul li:nth-child(2) a').click(show_Standings); 
$('header ul li:nth-child(3) a').click(show_topScores); 

function show_Match() {
    document.querySelector('.matches').style.display = 'block';
    document.querySelector('.Standings').style.display = 'none';
    document.querySelector('.topScores').style.display = 'none';
}
function show_Standings() {
    document.querySelector('.matches').style.display = 'none';
    document.querySelector('.Standings').style.display = 'block';
    document.querySelector('.topScores').style.display = 'none';
}
function show_topScores() {
    document.querySelector('.matches').style.display = 'none';
    document.querySelector('.Standings').style.display = 'none';
    document.querySelector('.topScores').style.display = 'block';
}

//------------------------------------------ <   topScores >-------------------------------------------------------------------
var footballApiKey = "d73a572bc535a4d890f0e602583312c573e02621038fd3fd2296dfafeea9babf";
var topScoreURL = `https://apiv2.allsportsapi.com/football/?&met=Topscorers&leagueId=152&APIkey=${footballApiKey}`;

$.ajax({
    url: topScoreURL,
    type: 'get',
    dataType: 'json',
    success: function (data) {
        console.log(data);
        var table = document.querySelector('.topScores table');

        // إضافة هيدر
        if (table.tHead === null) {
            var thead = table.createTHead();
            var headerRow = thead.insertRow();
            ["#", "Player", "Team", "Goals", "Penalty", "Rank"].forEach(text => {
                var th = document.createElement('th');
                th.textContent = text;
                headerRow.appendChild(th);
            });
        }

        for (var i = 0; i < 15; i++) {
            var player = data.result[i];
            var tr = document.createElement('tr');

            var td_index = document.createElement('td');
            td_index.textContent = i + 1;

            var td_name = document.createElement('td');
            td_name.textContent = player.player_name;

            var td_team = document.createElement('td');
            td_team.textContent = player.team_name;

            var td_goals = document.createElement('td');
            td_goals.textContent = player.goals;

            var td_penalty = document.createElement('td');
            td_penalty.textContent = player.penalty_goals;

            var td_rank = document.createElement('td');
            td_rank.textContent = player.player_place;

            tr.appendChild(td_index);
            tr.appendChild(td_name);
            tr.appendChild(td_team);
            tr.appendChild(td_goals);
            tr.appendChild(td_penalty);
            tr.appendChild(td_rank);

            table.appendChild(tr);
        }
    }
});

//------------------------------------------ <   Standings >-------------------------------------------------------------------
var StandingURL = `https://apiv2.allsportsapi.com/football/?&met=Standings&leagueId=152&APIkey=${footballApiKey}`;
$.ajax({
    url: StandingURL,
    type: 'get',
    dataType: 'json',
    success: function (Teams) {
        console.log(Teams);
        var table = document.querySelector('.Standings table');

        // إضافة هيدر
        if (table.tHead === null) {
            var thead = table.createTHead();
            var headerRow = thead.insertRow();
            ["#", "Team", "PL", "W", "D", "L", "GF", "GA", "GD", "PTS"].forEach(text => {
                var th = document.createElement('th');
                th.textContent = text;
                headerRow.appendChild(th);
            });
        }

        for (var i = 0; i < 15; i++) {
            var team = Teams.result.total[i];
            var tr = document.createElement('tr');

            var td_num = document.createElement('td');
            td_num.textContent = i + 1;

            var td_Team = document.createElement('td');
            td_Team.innerHTML = `<img src="${team.team_logo}" width="50" height="50"> ${team.standing_team}`;

            var td_PL = document.createElement('td');
            td_PL.textContent = team.standing_P;

            var td_W = document.createElement('td');
            td_W.textContent = team.standing_W;

            var td_D = document.createElement('td');
            td_D.textContent = team.standing_D;

            var td_L = document.createElement('td');
            td_L.textContent = team.standing_L;

            var td_GF = document.createElement('td');
            td_GF.textContent = team.standing_F;

            var td_GA = document.createElement('td');
            td_GA.textContent = team.standing_A;

            var td_GD = document.createElement('td');
            td_GD.textContent = team.standing_GD;

            var td_Points = document.createElement('td');
            td_Points.textContent = team.standing_PTS;

            tr.appendChild(td_num);
            tr.appendChild(td_Team);
            tr.appendChild(td_PL);
            tr.appendChild(td_W);
            tr.appendChild(td_D);
            tr.appendChild(td_L);
            tr.appendChild(td_GF);
            tr.appendChild(td_GA);
            tr.appendChild(td_GD);
            tr.appendChild(td_Points);

            table.appendChild(tr);
        }
    }
});

//------------------------------------------ < matches >-------------------------------------------------------------------
// عند الضغط على الزر الأول، قم باستدعاء الدالة مع تواريخ الأسبوع الأول
$('.matches button:nth-child(1)').click(function() {
    fetchAndDisplayMatches('2025-08-15', '2025-08-18');
});

// عند الضغط على الزر الثاني، قم باستدعاء الدالة مع تواريخ الأسبوع الثاني
$('.matches button:nth-child(2)').click(function() {
    fetchAndDisplayMatches('2025-08-22', '2025-08-25');
});

// عند الضغط على الزر الثالث، قم باستدعاء الدالة مع تواريخ الأسبوع الثالث
$('.matches button:nth-child(3)').click(function() {
    fetchAndDisplayMatches('2025-08-30', '2025-08-31');
});
$('.matches button:nth-child(4)').click(function() {
    fetchAndDisplayMatches('2025-09-13', '2025-09-14');
});
$('.matches button:nth-child(5)').click(function() {
    fetchAndDisplayMatches('2025-09-20', '2025-09-21');
});
$('.matches button:nth-child(6)').click(function() {
    fetchAndDisplayMatches('2025-09-27', '2025-09-29');
});

function fetchAndDisplayMatches(dateFrom, dateTO) {
    // 1. مسح المحتوى القديم من الجدول قبل إضافة المحتوى الجديد
    document.querySelector('table').innerHTML = '';

    // 2. استخدام معرّف الدوري الإنجليزي الممتاز الصحيح (140)
    var matchesURL = `https://apiv2.allsportsapi.com/football/?met=Fixtures&leagueId=152&from=${dateFrom}&to=${dateTO}&APIkey=${footballApiKey}`;
    console.log(matchesURL);

    $.ajax({
        url: matchesURL,
        type: 'get',
        dataType: 'json',
        success: function(matchesData) {
            console.log(matchesData);

                for (var i = 0; i < matchesData.result.length; i++) {
                    var match = matchesData.result[i];
                    var week1_tr = document.createElement('tr');
                    var result = match.event_final_result || 'Vs';
                    
                    week1_tr.innerHTML = `
                        <td style="padding:10px; margin:auto ">
                            <img src="${match.home_team_logo}" width="50" height="50">
                            <h3>${match.event_home_team}</h3>
                        </td>
                        <td style="padding:10px; margin:auto ;font-size:15px">
                            <p>${match.event_date}</p>
                            <p>${result}</p>
                            <p>${match.event_time}</p>
                        </td>
                        <td style="padding:10px; margin:auto;font-size:15px">
                            <img src="${match.away_team_logo}" width="50" height="50">
                            <h3>${match.event_away_team}</h3>
                        </td>
                    `;
                    document.querySelector('table').appendChild(week1_tr);
                }
        },
        error: function(error) {
            console.error('حدث خطأ في جلب البيانات:', error);
        }
    });
}