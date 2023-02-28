const express = require('express')
const router = express.Router()

router.get('/', async (req, res) =>
{
    let currentGameweek
    let teamId = 405835
    const leagueId = 81081; // replace with your head-to-head league ID

    fetch(`https://fantasy.premierleague.com/api/entry/${teamId}/`)
    .then(response => response.json())
    .then(data => {
      currentGameweek = data['current_event'];
      fetch(`https://fantasy.premierleague.com/api/leagues-h2h-matches/league/${leagueId}/?page=1&event=${currentGameweek}`)
        .then(response => response.json())
        .then(data => {
            const fixtures = data.results;

            // Filter the fixtures to get only this week's games
            const thisWeekFixtures = fixtures.filter(fixture => fixture.event === currentGameweek);

            // Log the fixtures to the console
            //res.send(thisWeekFixtures);
            res.render('index',{
                fixtures: thisWeekFixtures
            })
        })
        .catch(error => {
            console.error('Error fetching data from FPL API:', error);
        });
    })
    .catch(error => {
      console.error('Error fetching data from FPL API:', error);
    });
})

module.exports = router