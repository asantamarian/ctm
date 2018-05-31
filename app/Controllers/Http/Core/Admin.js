'use strict'

class Admin {
    async index({view,request, response}) {
        
        return view.render('admin/index',  {});
    }
}
module.exports = Admin 