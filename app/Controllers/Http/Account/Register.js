const User = use('App/Models/User')
const Hash = use('Hash')
const Route = use('Route')

class Register{
    index({view,request}){
        return view.render('account/register');
      }
    async doRegister({view,request, response}) {
        const user = new User()
        user.username = request.input('name')
        user.email = request.input('email')
        user.password = request.input('password')
        
        
        await user.save()

        var registerMessage = {
            success: 'Registration Successful! Now go ahead and login'
        }

        return view.render('account/login',  {persona:persona,instrumento:instrumento});
    }
    
    async doRegisterPersonas({view,request, response}) {
       
        
        const personas = request.input("personas");
        for(var item in personas){
            const user = new User()
            const persona=personas[item];
            
            user.username = persona.identificador;
            user.email = persona.email;
            user.password = persona.password;
            
            try{
                var respuesta = await user.save();
            }
            catch(error)
            {

            }
        }
        

  /*      var registerMessage = {
            success: 'Registration Successful! Now go ahead and login'
        }
*/      
    }

    async registerPersona({request, response}) {
        //console.log("...", request.all());
        
        const user = new User()
            
        user.username = request.input('identificador')
        user.email = request.input('email')
        user.password = request.input('password')
        
        var resultado = 1;
        try{
            await user.save();

        }
        catch(error)
        {
            resultado = 0;
        }
        
        
  /*      var registerMessage = {
            success: 'Registration Successful! Now go ahead and login'
        }
*/      

        var objeto = { respuesta: resultado,usuario:user }
        response.json(objeto);
    }
}
module.exports = Register