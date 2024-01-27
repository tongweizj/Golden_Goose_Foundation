const express = require('express');
const adminRoute = express.Router()

const services = require('../services/admin');
const myholdsServices = require('../services/admin_myholds');
const myholdsApi = require('../controller/myholds');
/**
 *  @description Root Route
 *  @method GET /
 */
 adminRoute.get('/', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
//  adminRoute.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
 adminRoute.get('/myholds/update', myholdsServices.update)

 // API
 adminRoute.post('/form/myholds', myholdsApi.update);
 adminRoute.post('/form/myholds/update', myholdsApi.update);
module.exports = adminRoute