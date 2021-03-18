
const fakehighavg = require('./database/fakehighavg.json')

export default (req, res) => {
    return res.status(200).json(fakehighavg)
}
