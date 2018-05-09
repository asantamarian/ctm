'use strict'

class Events {
    async list({view,request, response}) {
        
        return view.render('events/list',  {});
    }
}
module.exports = Events 