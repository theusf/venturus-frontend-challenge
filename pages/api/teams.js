const teams = require('./database/teams.json')

export default (req, res) => {
    res.status(200).json(teams)
}
