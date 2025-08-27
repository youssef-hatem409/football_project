    // make default page is matches content
    document.querySelector('.matches').style.display = 'block';
    document.querySelector('.Standings').style.display = 'none';
    document.querySelector('.topScores').style.display = 'none';
    
    $('header ul li:nth-child(1) a').click(show_Match); 
    $('header ul li:nth-child(2) a').click(show_Standings); 
    $('header ul li:nth-child(3) a').click(show_topScores); 
    // --- Functions to manage content visibility ---

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

var footballApiKey="d73a572bc535a4d890f0e602583312c573e02621038fd3fd2296dfafeea9babf";
var leagueId='';
var league_from='';
var league_to='';

var leagueURL=`https://allsportsapi.com/api/football/?met=Fixtures&leagueId=LEAGUE_ID&from=YYYY-MM-DD&to=YYYY-MM-DD&APIkey=${footballApiKey}`;



console.log(leagueURL);





$.ajax({

    url:leagueURL,
    type:'get',
    dataType:'json',
    success:function(data){

         var league=data.result[21];
         console.log(league);
    }

});



