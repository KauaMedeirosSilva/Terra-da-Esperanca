import { tratarNome } from '../services/tratativa_nome.js'
import { criarUser } from '../services/user_login.js'
import { validaCPF } from '../services/tratativa_cpf.js'
import { validaNascimento } from '../services/tratativa_nascimento.js'
import { validaTelefone } from '../services/tratativa_telefone.js'

const frm = document.querySelector("#cadastro_usuario")

frm.addEventListener("submit", (e) => {
   e.preventDefault()

   const nome_usuario = document.querySelector("#nome").value
   tratarNome(nome_usuario)
   criarUser(nome_usuario)

   const cpf_usuario = document.getElementById("cpf").value
   validaCPF(cpf_usuario)

   const dt_nascimento = document.getElementById("dt_nascimento").value
   validaNascimento(dt_nascimento)

   const telefone_usuario = document.getElementById("telefone").value
   validaTelefone(telefone_usuario)

   const email_usuario = document.getElementById("email").value
   const formacao_usuario = document.getElementById("formacao").value
   const acesso_usuario = document.getElementById("nivel_acesso").value

})