'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')
class Events {
    async list({view,request, response}) {
        
        return view.render('events/list',  {});
    }
    async gallery({view,request, response}) {
        
        return view.render('events/gallery',  {});
    }
    async review({view,request, response}) {
        
        return view.render('events/review',  {});
    }
    

}
module.exports = Events 