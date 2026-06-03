export function criarUser(nome){
   const nomeUser = nome.trim().split(" ")
   let nomeUsuario = "" 
   
   nomeUser.forEach(parte => {
      const i = 0
      nomeUsuario += parte.charAt(i)
   });
   
   nomeUsuario = nomeUsuario.slice(0, -1)
   nomeUsuario += nomeUser[nomeUser.length-1]
   
   console.log(`${nomeUsuario.toUpperCase()}`)
}
