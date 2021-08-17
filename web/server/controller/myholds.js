const MyHoldsApi = require('../../graphql/my-holds');
// Update a new idetified user by user id
exports.update = (req, res)=>{
    console.log(req.body.code)
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    MyHoldsApi.updateMyHolds(req.body.code,req.body.amount,req.body.cost, function (data) {
        // console.log(data);
        res.redirect('/admin/');
        })
}