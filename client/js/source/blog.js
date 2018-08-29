//HOLA
var list = function(){
    $.ajax({
        type: "GET",
        url: "/Blog/Admin/list",
        contentType: "application/json; charset=utf-8",
        data: {},
        dataType: "json", 
        async:false,
        success: function (msg) {
            cItems.items=msg;
            $("#modalNew").modal("hide");

        }

    }); 
}

var showForm = function(){
    $("#modalNew").modal("show");
  

}
var cItems = new Vue({
    el: '#comItems',
    data: {
        items: []
    },
    methods:{
        update:function(item){
            
            $.ajax({
                type: "GET",
                url: "/Slider/Admin/update",
                contentType: "application/json; charset=utf-8",
                data: {item:item},
                dataType: "json", 
                async:false,
                success: function (msg) {
                    cItems.items=msg;
                    $("#modalNew").modal("hide");
    
                }
    
            }); 
        },
        deleteItem:function(item){
            
            $.ajax({
                type: "GET",
                url: "/Slider/Admin/delete",
                contentType: "application/json; charset=utf-8",
                data: {item:item},
                dataType: "json", 
                async:false,
                success: function (msg) {
                    cItems.items=msg;
                    $("#modalNew").modal("hide");
    
                }
    
            }); 
        }
    }
});
var cForm= new Vue({
    el: '#formulario',
    data: {
    item: 
        {
            id:'',
            titulo: '',
            descripcion:'',
            imagen:'',
            edit: false,
            image:'',
            textoBoton:'',
            linkBoton:'',
            publica:0,
            fechaPublicacion:''
        }
    
    },
    mounted() {
        $('.datetimepicker').bootstrapMaterialDatePicker({
            format: 'YYYY-MM-DD hh:mm:ss',
            clearButton: true,
            weekStart: 1
        }).on(
            "changeDate", function(date) {
                
                cForm.item.fechaPublicacion = $('#fecha').val();
               }
       );
      },
    methods: {
        addItem:function () {
            cForm.item.fechaPublicacion = $('#fecha').val();
            $.ajax({
                type: "GET",
                url: "/Slider/Admin/add",
                contentType: "application/json; charset=utf-8",
                data: {item:cForm.item},
                dataType: "json", 
                async:false,
                success: function (msg) {
                    cItems.items=msg;
                    $("#modalNew").modal("hide");
    
                }
    
            }); 

            $("#modalNew").modal("hide");
        }
    }
    });
$(function () {
    var myDropzone = new Dropzone("div#fileUpload", { 
        url:'/Core/Admin/uploadFile',
        paramName: "file",
        maxFilesize: 10
    });
    
    myDropzone.on("sending", function(file, xhr, formData) {
        // Will send the filesize along with the file as POST data.
        
        formData.append("_csrf", $("input[name=_csrf]").val());
    });
    
    myDropzone.on("success", function(file, xhr, formData) {
    // Will send the filesize along with the file as POST data.
    
        cForm.item.image= xhr.fileName
    });
    list();

    $("#btnNuevo").click(function(){
        showForm();
    });

    
});
