//
var cBandas = new Vue({
    el: '#comBandas',
    data: {
        bandas: []
    },
    methods:{
        ver:function(id){
            $("#idEncuestaAplicacion").val(id);
            $('form').submit();
            
        }
    }
});
var cForm= new Vue({
el: '#formulario',
data: {
banda: 
    {
        id:'',
        nombre: '',
        descripcion:'',
        logo:'',
        estilos:[],
        edit: false
    }

},
methods: {
addEstilo:function () {
    if(cForm.textoIndicador!=""){
        cForm.accion.indicadores.push({texto:cForm.textoIndicador})
    }
    
},
deleteIndicador:function () {
    cForm.accion.indicadores.pop(this)
},
addBanda:function () {
    
    cForm.banda.estilos=$("#txtEstilos").tagsinput('items');
    
     $.ajax({
        type: "GET",
        url: "/Bands/Admin/add",
        contentType: "application/json; charset=utf-8",
        data: {band:cForm.banda},
        dataType: "json", 
        async:false,
        success: function (msg) {
            cBandas.bandas=msg;
            $("#modalNew").modal("hide");

        }

    }); 
     $("#modalNew").modal("hide");
}
}
})