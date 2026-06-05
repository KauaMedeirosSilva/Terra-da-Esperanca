const SESSION_KEY = "terra_esperanca_usuario_logado"
const STORAGE_KEY = "terra_esperanca_usuarios"
const USUARIO_PADRAO = {
   nome: "Admin",
   login: "Admin",
   senha: "123456",
   nivelAcesso: "administrador",
}
let usuariosFallback = []

function normalizarTexto(texto) {
   return String(texto || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
}

function lerUsuariosSalvos() {
   try {
      const dados = localStorage.getItem(STORAGE_KEY)
      const usuarios = dados ? JSON.parse(dados) : []
      return Array.isArray(usuarios) ? usuarios : []
   } catch {
      return Array.isArray(usuariosFallback) ? usuariosFallback : []
   }
}

function salvarUsuariosSalvos(usuarios) {
   usuariosFallback = Array.isArray(usuarios) ? usuarios : []

   try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usuariosFallback))
   } catch {
      // Mantém o estado apenas em memória quando o navegador bloqueia storage.
   }
}

function garantirUsuarioPadrao() {
   const usuarios = lerUsuariosSalvos()
   if (usuarios.some((usuario) => String(usuario.login || "").trim().toLowerCase() === "admin")) {
      return
   }

   usuarios.push({
      ...USUARIO_PADRAO,
      criadoEm: new Date().toISOString(),
   })

   salvarUsuariosSalvos(usuarios)
}

garantirUsuarioPadrao()

function gerarLogin(nome, cpf = "") {
   const partesNome = normalizarTexto(nome).split(/\s+/).filter(Boolean)
   const primeiroNome = partesNome[0] || "usuario"
   const ultimoNome = partesNome.length > 1 ? partesNome[partesNome.length - 1] : "mvp"
   const cpfNumeros = String(cpf).replace(/\D/g, "")
   const sufixo = cpfNumeros.slice(-4).padStart(4, "0")

   return `${primeiroNome}.${ultimoNome}.${sufixo}`
}

function criarUser(nome, cpf = "") {
   return gerarLogin(nome, cpf)
}

async function listarUsuarios() {
   return lerUsuariosSalvos()
}

async function criarUsuario(usuario) {
   const usuarios = lerUsuariosSalvos()
   const login = usuario.login || gerarLogin(usuario.nome, usuario.cpf)
   const cpfNormalizado = String(usuario.cpf || "").replace(/\D/g, "")
   const emailNormalizado = String(usuario.email || "").trim().toLowerCase()

   if (usuarios.some((item) => item.login === login)) {
      throw new Error("Já existe um usuário com esse login.")
   }

   if (cpfNormalizado && usuarios.some((item) => String(item.cpf || "").replace(/\D/g, "") === cpfNormalizado)) {
      throw new Error("Já existe um usuário com esse CPF.")
   }

   if (emailNormalizado && usuarios.some((item) => String(item.email || "").trim().toLowerCase() === emailNormalizado)) {
      throw new Error("Já existe um usuário com esse e-mail.")
   }

   const novoUsuario = {
      ...usuario,
      login,
      cpf: cpfNormalizado,
      senha: usuario.senha || cpfNormalizado,
      criadoEm: new Date().toISOString(),
   }

   usuarios.push(novoUsuario)
   salvarUsuariosSalvos(usuarios)

   return { usuario: novoUsuario }
}

async function autenticarUsuario(login, senha) {
   const loginNormalizado = String(login || "").trim().toLowerCase()
   const senhaNormalizada = String(senha || "").trim()
   const usuarios = lerUsuariosSalvos()

   return usuarios.find((usuario) => {
      return String(usuario.login || "").trim().toLowerCase() === loginNormalizado && String(usuario.senha || "") === senhaNormalizada
   }) || null
}

function obterUsuarioPorLogin(login) {
   const loginNormalizado = String(login || "").trim().toLowerCase()
   const usuarios = lerUsuariosSalvos()

   return usuarios.find((usuario) => String(usuario.login || "").trim().toLowerCase() === loginNormalizado) || null
}

function definirUsuarioLogado(usuario) {
   try {
      sessionStorage.setItem(
         SESSION_KEY,
         JSON.stringify({
            login: usuario.login,
            nome: usuario.nome,
            nivelAcesso: usuario.nivelAcesso,
         })
      )
   } catch {
      // Se o storage da sessão estiver bloqueado, apenas ignora para não quebrar o fluxo.
   }
}

function obterUsuarioLogado() {
   try {
      const dados = sessionStorage.getItem(SESSION_KEY)
      return dados ? JSON.parse(dados) : null
   } catch {
      return null
   }
}

window.TerraEsperanca = {
   gerarLogin,
   criarUser,
   listarUsuarios,
   criarUsuario,
   autenticarUsuario,
   obterUsuarioPorLogin,
   definirUsuarioLogado,
   obterUsuarioLogado,
}
