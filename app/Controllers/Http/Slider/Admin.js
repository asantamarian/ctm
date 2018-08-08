'use strict'
const data = use('App/Utils/Data')
const dateformat = require('dateformat');
class Admin {
    async index({view,request, response}) {

        return view.render('slider/list');
    }
    async list({view,request, response}) {
        
        const querySlider = `call slider_getAll()`;        
        const rSlider   = await data.execQuery(querySlider);
        var slider = rSlider[0][0];
        
        return slider;
    }
    async add({view,request, response}) {
        
        var item = request.input("item");
        
        const query  = `call slider_add('${item.titulo}','${item.descripcion}','${item.textoBoton}','${item.linkBoton}','/images/${item.image}',1000,${item.publica},'${item.fechaPublicacion}')`;        
        
        const rQuery = await data.execQuery(query);
        const querySlider = `call slider_getAll()`;        
        const rSlider   = await data.execQuery(querySlider);
        var slider = rSlider[0][0];
        
        return slider;
    }
    async update({view,request, response}) {
        
        var item = request.input("item");
        var fecha = dateformat(item.publishDate ,"yyyy-mm-dd hh:mm:ss");
        const query  = `call slider_update('${item.id}','${item.title}','${item.description}','${item.buttonText}','${item.buttonLink}','${item.image}',${item.sliderOrder},${item.public},'${fecha}')`;        
        const rQuery = await data.execQuery(query);
        const querySlider = `call slider_getAll()`;        
        const rSlider   = await data.execQuery(querySlider);
        var slider = rSlider[0][0];
        
        return slider;
    }
    async delete({view,request, response}) {
        
        var item = request.input("item");
        const query  = `call slider_delete('${item.id}')`;        
        const rQuery = await data.execQuery(query);
        const querySlider = `call slider_getAll()`;        
        const rSlider   = await data.execQuery(querySlider);
        var slider = rSlider[0][0];
        
        return slider;
    }
}
module.exports = Admin 