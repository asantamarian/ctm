'use strict'
const data = use('App/Utils/Data')
class Admin {
    async index({view,request, response}) {
        
        return view.render('admin/index',  {});
    }
    async slider({view,request, response}) {
        const querySlider = `call slider_getAllPublic()`;        
        const rSlider   = await data.execQuery(querySlider);
        var slider = rSlider[0][0];

        console.log(slider)

        
        return view.render('admin/slider',  {slider});
    }
}
module.exports = Admin 