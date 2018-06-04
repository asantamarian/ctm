
'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')

class Web {
    async index({view,request, response,antl}) {
        const querySlider = `call slider_getAllPublic()`;        
        const rSlider   = await data.execQuery(querySlider);
      
        var slider = rSlider[0][0];

        antl.switchLocale('es');
        return view.render('welcome',  {slider});
    }
    
    

}
module.exports = Web 
