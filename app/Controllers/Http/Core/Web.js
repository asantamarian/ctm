
'use strict'
const Database = use('Database')
const data = use('App/Utils/Data')

class Web {
    async index({view,request, response,antl}) {
        const querySlider = `call slider_getAllPublic()`;        
        const rSlider   = await data.execQuery(querySlider);
        const queryAlbums = `call albums_getTop()`;        
        const rAlbums   = await data.execQuery(queryAlbums);
        
        var slider = [];
        var albums =[];
        if(rSlider[0] != undefined){
            slider=rSlider[0][0];
        }
        if(rAlbums[0] != undefined){
            albums=rAlbums[0][0];
        }
        

        antl.switchLocale('es');

        return view.render('welcome',  {slider,albums});
    }
    
    

}
module.exports = Web 
