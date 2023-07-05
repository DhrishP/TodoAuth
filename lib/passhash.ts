const bcrypt = require('bcrypt')

export  function hashPass(pass:string){
    return bcrypt.hash(pass,10).then(function(hash:string){
        return hash;
    })
}
export function passcompare(hashpass:string,pass:string ){
return bcrypt.compare(pass, hashpass).then(function(result:boolean) {
    return result
});

}

