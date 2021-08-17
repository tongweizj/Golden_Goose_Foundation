const MyHoldsApi = require('../../graphql/my-holds');

exports.myholds = (req, res) => {
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

exports.add_user = (req, res) =>{
    res.render('add_user');
}

exports.update = (req, res) =>{
    console.log(req.query.code);
    MyHoldsApi.queryMyHoldByCode(req.query.code,function (data) {
        console.log(data.myHoldByCode);
       
    
        // let fundsList = funds.myHolds;
        res.render('admin/myholds/update', {
            title: 'Admin',
            path: '/',
            fund: data.myHoldByCode,//funds.myHolds,
        });
        });
}