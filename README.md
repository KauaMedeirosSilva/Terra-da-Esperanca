# Terra da Esperança

Nome do Projeto
- Esperança em Rede

Integrantes do grupo
- Murillo Terçariol, Kauã Henrique, Pedro Brancaglioni e Rafael Fazolino

Objetivo do sistema
- Fornecer um protótipo de sistema para apoio à gestão de voluntários e acolhidos, com funcionalidades básicas de cadastro, listagem, autenticação e geração de relatórios simples.

Módulo escolhido para o protótipo
- Cadastro e gerenciamento de voluntários (inclui fluxo de login/autenticação por ID no MVP local).

Requisitos atendidos pelo protótipo
- Cadastro de voluntários com validação de campos (nome, CPF, data de nascimento, telefone, e-mail).
- Geração automática de identificador (ID) para usuário.
- Autenticação local via senha provisória (senha inicial baseada no CPF no MVP).
- Persistência temporária dos dados usando `localStorage`.
- Interfaces HTML/CSS para cadastro, login e visualização básica.

Tecnologias utilizadas
- HTML, CSS, JavaScript (vanilla).
- Armazenamento local do navegador (`localStorage` / `sessionStorage`).

Explicação da estrutura do projeto
- `view/`: páginas HTML do sistema (telas de login, cadastro, dashboard, etc.).
- `controller/`: scripts que ligam a interface às regras de negócio (validações, handlers de formulários).
- `services/`: funções utilitárias e de persistência (por exemplo `user_login.js`).
- `data/`: arquivos auxiliares e dados estáticos (quando houver).

O que foi implementado
- Fluxo de cadastro de voluntários com validações front-end.
- Geração de ID do usuário e senha provisória.
- Tela de login adaptada para autenticar por ID.
- Persistência e listagem de usuários via `localStorage`.

Rastreabilidade de Requisitos

| Requisito      | Descrição                     |     Status       | Cumprimento | Arquivo Principal            
|----------------|-------------------------------|-----------------|--------------|-------------------------------|
| **RF01.01**    | Cadastro de Voluntariado      | ✅ Funcional    |    90%      | `cadastro_voluntario.js/html` |
| **RF01.01.01** | Acessar Sistema (Login)       | ✅ Funcional    |    80%      | `login.js/html`               |
| **RF01.01.02** | Recuperação de Senha          | ❌ Não Iniciado |    20%      | `recuperar-senha.html`        |
| **RF01.02**    | Cadastro de Acolhido          | ⚠️ Pendente     |    40%      | `cadastrar-acolhido.html`     |
| **RF02.01**    | Nível de Acesso               | ⚠️ Incompleto   |    50%      | `user_login.js`               |
| **RF02.02**    | Permissões por Funcionalidade | ❌ Não Iniciado |    0%       | N/A                           |
| **RF03.01**    | Cadastro de Prestadores       | ⚠️ Pendente     |    40%      | `cadastrar-prestador.html`    |

O que ficou apenas planejado
- Migração para backend com banco de dados relacional (MySQL/Postgres) e APIs REST.
- Hashing seguro de senhas e gestão de sessões no servidor.
- Controle de permissões mais granular (papéis/roles separados em tabela apropriada).
- Funcionalidades avançadas de relatórios e exportação.

Dificuldades encontradas
- Limitações do `localStorage` para dados persistentes e multi-usuário.
- Garantir unicidade e normalização de campos (CPF, e-mail) sem um banco relacional.
- Ajustes em UX para transição de login por username para login por ID.

Próximos passos para concluir o desenvolvimento
- Implementar backend e migrar persistência para um banco de dados.
- Implementar hashing de senhas e autenticação segura.
- Substituir `localStorage` por chamadas a API e controlar sessões no servidor.

Como executar o MVP localmente
1. Abra `view/index.html` em um navegador moderno.
2. Para primeiro acesso, use o usuário padrão (ID: `1`, senha: `123456`).
3. Cadastre novos voluntários pela tela de gerenciamento de voluntários (Somente este cadastro está funcional no momento).

Observações finais
- Este repositório contém um protótipo (MVP) com foco em prova de conceito; para produção é necessária a migração para backend, melhorias de segurança e testes adicionais.



