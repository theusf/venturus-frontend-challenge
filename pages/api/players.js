
const players = require('./database/players.json')

export default (req, res) => {
    const { teamid } = req.query

    if (teamid) {
        const filtred_players = players.filter(value => value.team_id == teamid)
        return res.status(200).json(filtred_players)
    }
 
    return res.status(200).json(players)
}
