
const MyHoldsApi = require('../../graphql/my-holds');

exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    // axios.get('http://localhost:3030/api/users')
    //     .then(function(response){
    //         res.render('index', { users : response.data });
    //     })
    //     .catch(err =>{
    //         res.send(err);
    //     })
    MyHoldsApi.queryMyHolds(function (funds) {
        console.log(funds.myHolds[0]);
        var fundsList =[]
        funds.myHolds.forEach(item => {
            item['lastdayIncome']=(item['amount']*item['holdingIncome']['lastday']).toFixed(2);
            item['holdingIncome']['totalRate']= (item['holdingIncome']['totalRate']*100).toFixed(2)
            item['cost']= (item['cost']).toFixed(2)
            item['holdingIncome']['lastday']= (item['holdingIncome']['lastday']*item['amount']).toFixed(2)
            item['holdingIncome']['total']= (item['holdingIncome']['total']).toFixed(2)
            item['holdingIncome']['all']= (item['holdingIncome']['total']-item['amount']*item['cost']).toFixed(2)
            fundsList.push(item); 
            console.log(item);    
        });
    
        // let fundsList = funds.myHolds;
        res.render('admin/index', {
            title: 'Admin',
            path: '/',
            jobTitle: 'All',
            funds: fundsList,//funds.myHolds,
        });
        });
}

