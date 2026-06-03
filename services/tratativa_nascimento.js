export function validaNascimento(dt_nascimento) {
  const dataAtual = new Date()
  
  const [ano, mes, dia] = dt_nascimento.split("-")
  const dataNasc = new Date(ano, mes - 1, dia)

  // calcula idade exata
  let idade = dataAtual.getFullYear() - ano
  const aindaNaoFezAniversario =
    dataAtual.getMonth() + 1 < mes ||
    (dataAtual.getMonth() + 1 == mes && dataAtual.getDate() < dia)

  if (aindaNaoFezAniversario) idade--

  if (idade < 18) {
    alert("Idade menor que 18 anos")
    document.querySelector("#dt_nascimento").value = ""
    document.querySelector("#dt_nascimento").focus()
    return 0
  }

  if (idade > 75) {
    alert("Idade maior que 75 anos")
    document.querySelector("#dt_nascimento").value = ""
    document.querySelector("#dt_nascimento").focus()
    return 0
  }

  console.log(dataNasc.toLocaleDateString("pt-BR") + " — Idade: " + idade)
}