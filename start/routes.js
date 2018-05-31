'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')
const Helpers = use('Helpers')
const {ioc} = require('@adonisjs/fold')
var util = require('util')

Route.on('/').render('soon')
Route.on('/web').render('welcome')
Route.get('/login/google', 'Account/ExternalLogin.redirect')
Route.get('/google/callback', 'Account/ExternalLogin.callback')
Route.get('/Events','Events/Events.list')
Route.any('/:module/:controller/:action',  ({view ,request, response,params,auth, session}) => {
  
    const module = params.module
    
    const controller = params.controller
    
    const action = params.action
    
    
    const controllerPath = `App/Controllers/Http/${module}`
    
    const url = `${controllerPath}/${controller}.${action}`
    
    const controllerInstance = ioc.makeFunc(url)
   
    return controllerInstance.method.apply(controllerInstance.instance,[{view,request,response,params,auth, session}])
    
})//.middleware(['autenticacion:session'])