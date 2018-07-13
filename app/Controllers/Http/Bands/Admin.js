'use strict'
const data = use('App/Utils/Data')
class Admin {
    async list({view,request, response}) {
        const query = `select * from Bands;`;            
        const result   = await data.execQuery(query);
        var bands = result[0];
        
        return view.render('bands/list',  {bands});
    }
    async add({view,request, response}) {
    
        var accion = request.get('band')
        
        console.log(accion)

        response.json({});        
    }
}
module.exports = Admin 