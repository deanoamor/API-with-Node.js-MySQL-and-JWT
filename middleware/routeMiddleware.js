module.exports = {
    apiRouteCheck : function (req, res, next) {
        if(!req.url.includes('/api')){
            res.status(500).send({
                message: `do you mean http://localhost:3000/api${req.url}?`
            })
        }else{
            next();
        }
    },

    notfoundRouteCheck : function (req, res) {
        const urlroute = req.url;
        res.status(404).
        send({
            status: '404',
            message: `url ${urlroute} not found`
        })
    }
}