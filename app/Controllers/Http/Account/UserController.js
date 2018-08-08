'use strict'

const data = use('App/Utils/Data')
class UserController {
    
      async login ({ view,request, auth ,response, session}) {
        const { username, password } = request.all()
        await auth.attempt(username, password)

        var obj = {
          "idUser":auth.user.id
        };
        
        
        
          try{
           
          }catch(err){
            console.log(err)
          }
          

       
        


        return response.redirect('/admin')
      }
      
      async logout ({ view,request, auth ,response,session}) {
        session.clear();
        await auth.logout()
    //
        return response.redirect('/')
      }

      loginView({view,request}){
        return view.render('account/login');
      }
      
      profile ({ auth, params }) {
          
        if (auth.user.id !== Number(params.id)) {
          return 'You cannot   else\'s profile'
        }
        return auth.user
      }

      async list({view,request,response}){
        const Env = use('Env')
        var server = Env.get('API_SERVER', 'development')

        const result = await got(`${server}/Core/Users/find`,
        {
          
          json:true,
          query:{nombre:"a"}
          
        })
        
        const usuarios = result.body
        
        return view.render('account/users',{usuarios:usuarios})
      }

}
module.exports = UserController