'use strict'

class Twitt {
    async index({view,request, response}) {
        
        return view.render('admin/index',  {});
    }
}
module.exports = Twitt 