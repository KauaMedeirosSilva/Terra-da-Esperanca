export function tratarNome (username) {
   const nomeUser = username.trim().split(" ")

   if (nomeUser.length == 1){
      alert("Digite seu Nome Completo")
      document.querySelector("#nome").value = ""
      document.querySelector("#nome").focus()
      return 0
   }

   if (username.match(/[0-9]/g)){
      alert("Valor Inválido para Nome Completo")
      document.querySelector("#nome").value = ""
      document.querySelector("#nome").focus()
      return 0
   }
}

