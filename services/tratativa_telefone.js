export function validaTelefone (telefone){
  telefone = telefone.replace(/[^\d]/g, "") 

  if(telefone.length !== 11 ){
   alert("Valor Inválido")
   document.querySelector("#telefone").value = ""
   document.querySelector("#telefone").focus()
   return 0
  }
   //16996288617
}