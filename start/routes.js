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
Route.any('/web','Core/Web.index')
Route.any('/admin','Core/Admin.index').middleware(['autenticacion:session'])
Route.get('/login/google', 'Account/ExternalLogin.redirect')
Route.get('/google/callback', 'Account/ExternalLogin.callback')
Route.get('/Events','Events/Events.list')
Route.get('users/:id', 'Account/UserController.profile').middleware('autenticacion')
Route.get('/Account/Register/doRegister','/Account/Register.doRegister')
Route.get('/login', 'Account/UserController.loginView')

Route.post('/login', 'Account/UserController.login')

Route.get('/logout', 'Account/UserController.logout')

Route.any('/:module/:controller/:action',  ({view ,request, response,params,auth, session,antl}) => {
  
    const module = params.module
    
    const controller = params.controller
    
    const action = params.action
    
    
    const controllerPath = `App/Controllers/Http/${module}`
    
    const url = `${controllerPath}/${controller}.${action}`
    
    const controllerInstance = ioc.makeFunc(url)
   
    return controllerInstance.method.apply(controllerInstance.instance,[{view,request,response,params,auth, session,antl}])
    
}).middleware(['autenticacion:session'])