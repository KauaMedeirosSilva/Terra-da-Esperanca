const { autenticarUsuario: autenticarUsuarioFn, definirUsuarioLogado: definirUsuarioLogadoFn, obterUsuarioPorLogin: obterUsuarioPorLoginFn } = window.TerraEsperanca || {}

const formLogin = document.querySelector('#login_form')
const campoLogin = document.querySelector('#login_usuario')
const campoSenha = document.querySelector('#senha_usuario')
const feedback = document.querySelector('#login_feedback')
const botaoLogin = document.querySelector('#btn_entrar_sistema')

function mostrarFeedbackLogin(mensagem, tipo = 'erro') {
   feedback.textContent = mensagem
   feedback.style.display = 'block'
   feedback.style.padding = '10px 12px'
   feedback.style.borderRadius = '10px'
   feedback.style.fontSize = '14px'
   feedback.style.lineHeight = '1.4'
   feedback.style.color = tipo === 'erro' ? '#b42318' : '#1f6f43'
   feedback.style.background = tipo === 'erro' ? 'rgba(180, 35, 24, 0.08)' : 'rgba(31, 111, 67, 0.08)'
   feedback.style.border = tipo === 'erro' ? '1px solid rgba(180, 35, 24, 0.18)' : '1px solid rgba(31, 111, 67, 0.18)'
}

formLogin.addEventListener('submit', async (evento) => {
   evento.preventDefault()

   if (!window.TerraEsperanca) {
      mostrarFeedbackLogin('As funções do sistema não carregaram corretamente.')
      return
   }

   if (botaoLogin) {
      botaoLogin.disabled = true
      botaoLogin.textContent = 'Entrando...'
   }

   try {
      const usuario = await autenticarUsuarioFn(campoLogin.value, campoSenha.value)

      if (!usuario) {
         const usuarioExistente = obterUsuarioPorLoginFn(campoLogin.value)
         if (!usuarioExistente) {
            mostrarFeedbackLogin('Login não encontrado. Verifique o nome de usuário cadastrado.')
         } else {
            mostrarFeedbackLogin('Senha incorreta. Confirme a senha provisória do cadastro.')
         }

         if (botaoLogin) {
            botaoLogin.disabled = false
            botaoLogin.textContent = 'Entrar no Sistema'
         }
         return
      }

      definirUsuarioLogadoFn(usuario)
      mostrarFeedbackLogin(`Bem-vindo, ${usuario.nome}. Redirecionando...`, 'sucesso')

      window.location.href = 'dashboard.html'
   } catch (erro) {
      mostrarFeedbackLogin(erro.message || 'Não foi possível acessar o armazenamento do navegador.')

      if (botaoLogin) {
         botaoLogin.disabled = false
         botaoLogin.textContent = 'Entrar no Sistema'
      }
   }
})