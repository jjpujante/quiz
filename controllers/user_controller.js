var users = { admin: {id:1, username:"admin", password:"1234"}, 
              invitado:{id:2, username:"invitado", password:"1111"}
};


exports.autenticar = 
    function (login, password, callback){
        if (users[login]){
            if (password === users[login].password){
                // lanzamos la función recibida como parámetro, que está en session_controller
                callback(null, users[login]);
            }
            else callback(new Error("Clave errónea"));
        }
        else callback(new Error("No existe usuario"));
    };