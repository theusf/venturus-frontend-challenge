const players = require('./database/players.json')

export default (req, res) => {

    var mostPicked = players[Math.floor(Math.random() * players.length)];
    var lessPicked = players[Math.floor(Math.random() * players.length)];

    mostPicked.percentage = Math.floor((Math.random()*100) + 20)
    lessPicked.percentage = Math.floor(Math.random() * 30);

    res.status(200).json({mostPicked, lessPicked})
}
