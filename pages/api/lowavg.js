
const fakelowavg = require('./database/fakelowavg.json')

export default (req, res) => {
    return res.status(200).json(fakelowavg)
}
