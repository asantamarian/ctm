'use strict'
const data = use('App/Utils/Data')
var fs = require('fs');
const uuidv4 = require('uuid/v4');
class Admin {
    async index({view,request, response}) {
        
        return view.render('admin/index',  {});
    }
    async uploadFile({view,request, response}) {
        var file = request.file("file");
        var name = uuidv4().replace(/-/g,"");
        var fileExt = file.clientName.split('.').pop();
        name = `${name}.${fileExt}`;
        await file.move("public/images/", {
            name: name
        });
        return {fileName:name};
    }
}
module.exports = Admin 