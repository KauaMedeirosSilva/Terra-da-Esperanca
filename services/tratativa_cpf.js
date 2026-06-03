export function validaCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, "") 

  if (isNaN(cpf) || cpf.length !== 11) {
    alert("CPF inválido")
    document.querySelector("#cpf").value = ""
    document.querySelector("#cpf").focus()
    return 0
  }
}