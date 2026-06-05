const frm = document.querySelector("#cadastro_usuario")
const feedbackCadastro = document.querySelector("#cadastro_feedback")
const botaoCadastro = document.querySelector("#btn_cadastrar_voluntario")

const { criarUser: criarUserFn, criarUsuario: criarUsuarioFn } = window.TerraEsperanca || {}

function tratarNome(username) {
   const nomeUser = String(username || "").trim().split(" ")

   if (nomeUser.length === 1) {
      return 0
   }

   if (String(username || "").match(/[0-9]/g)) {
      return 0
   }

   return 1
}

function validaCPF(cpf) {
   cpf = String(cpf || "").replace(/[^\d]/g, "")

   if (isNaN(cpf) || cpf.length !== 11) {
      return 0
   }

   return 1
}

function validaNascimento(dt_nascimento) {
   const dataAtual = new Date()
   const partes = String(dt_nascimento || "").split("-")

   if (partes.length !== 3) {
      return 0
   }

   const [ano, mes, dia] = partes
   let idade = dataAtual.getFullYear() - ano
   const aindaNaoFezAniversario =
      dataAtual.getMonth() + 1 < mes ||
      (dataAtual.getMonth() + 1 == mes && dataAtual.getDate() < dia)

   if (aindaNaoFezAniversario) idade--

   if (idade < 18 || idade > 75) {
      return 0
   }

   return 1
}

function validaTelefone(telefone) {
   telefone = String(telefone || "").replace(/[^\d]/g, "")

   if (telefone.length !== 11) {
      return 0
   }

   return 1
}

function mostrarFeedbackCadastro(mensagem, tipo = "sucesso") {
   if (!feedbackCadastro) return

   feedbackCadastro.textContent = mensagem
   feedbackCadastro.style.display = "block"
   feedbackCadastro.style.padding = "10px 12px"
   feedbackCadastro.style.borderRadius = "10px"
   feedbackCadastro.style.fontSize = "14px"
   feedbackCadastro.style.lineHeight = "1.4"
   feedbackCadastro.style.color = tipo === "erro" ? "#b42318" : "#1f6f43"
   feedbackCadastro.style.background = tipo === "erro" ? "rgba(180, 35, 24, 0.08)" : "rgba(31, 111, 67, 0.08)"
   feedbackCadastro.style.border = tipo === "erro" ? "1px solid rgba(180, 35, 24, 0.18)" : "1px solid rgba(31, 111, 67, 0.18)"
}

frm.addEventListener("submit", async (e) => {
   e.preventDefault()

   if (!window.TerraEsperanca) {
      mostrarFeedbackCadastro("As funções do sistema não carregaram corretamente.", "erro")
      return
   }

   const nome_usuario = document.querySelector("#nome").value
   const cpf_usuario = document.getElementById("cpf").value
   const dt_nascimento = document.getElementById("dt_nascimento").value
   const telefone_usuario = document.getElementById("telefone").value
   const email_usuario = document.getElementById("email").value
   const formacao_usuario = document.getElementById("formacao").value
   const acesso_usuario = document.getElementById("nivel_acesso").value

   if (tratarNome(nome_usuario) === 0) {
      mostrarFeedbackCadastro("Digite o nome completo sem números.", "erro")
      return
   }

   if (validaCPF(cpf_usuario) === 0) {
      mostrarFeedbackCadastro("CPF inválido. Verifique os 11 dígitos.", "erro")
      return
   }

   if (validaNascimento(dt_nascimento) === 0) {
      mostrarFeedbackCadastro("Data de nascimento inválida ou idade fora do limite permitido.", "erro")
      return
   }

   if (validaTelefone(telefone_usuario) === 0) {
      mostrarFeedbackCadastro("Telefone inválido. Use 11 dígitos com DDD.", "erro")
      return
   }

   mostrarFeedbackCadastro("Salvando cadastro...")
   if (botaoCadastro) {
      botaoCadastro.disabled = true
      botaoCadastro.textContent = "Salvando..."
   }

   const loginGerado = criarUserFn(nome_usuario, cpf_usuario)
   const senhaProvisoria = String(cpf_usuario).replace(/\D/g, "")
   document.querySelector("#login").value = loginGerado

   try {
      const usuarioSalvo = await criarUsuarioFn({
         nome: nome_usuario.trim(),
         cpf: cpf_usuario,
         dataNascimento: dt_nascimento,
         telefone: telefone_usuario,
         email: email_usuario.trim(),
         formacao: formacao_usuario.trim(),
         nivelAcesso: acesso_usuario,
         login: loginGerado,
         senha: senhaProvisoria,
      })

      mostrarFeedbackCadastro(`Usuário cadastrado com sucesso. Login: ${usuarioSalvo.usuario.login} | Senha provisória: ${usuarioSalvo.usuario.senha}`)
      frm.reset()
      document.querySelector("#login").value = usuarioSalvo.usuario.login
   } catch (erro) {
      mostrarFeedbackCadastro(erro.message, "erro")
   } finally {
      if (botaoCadastro) {
         botaoCadastro.disabled = false
         botaoCadastro.textContent = " Cadastrar Voluntário "
      }
   }

})