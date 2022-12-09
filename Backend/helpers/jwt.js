const { expressjwt:expressJwt} = require('express-jwt');

function authJwt(){
    const secret ='im-happy';
    return expressJwt({
            secret,
            algorithms:['HS256'],
           //isRevoked:isRevoked

    }).unless({
       
        path:[
             //pour afficher les produits sans authentification 
              {url : '/products',methods : ['GET','OPTIONS'] },
              {url : '/categories',methods : ['GET','OPTIONS'] },
               
                '/users/login',
                'users/register'
        ]
    })
}

/* async function isRevoked(req, payload, done ){
   if(!payload.isAdmin){
       done(null,true)
    }

   done();
}
*/
module.exports=authJwt; 