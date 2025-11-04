# 📚 App de Gestão Escolar – Professores

Aplicativo desenvolvido em **React Native** integrado ao **Supabase**, com o objetivo de facilitar o gerenciamento de **turmas** e **atividades** por professores.

---

## 🚀 Funcionalidades

- 👨‍🏫 **Cadastro e login de professores**
  - Autenticação via Supabase Auth.
  - Dados do professor armazenados na tabela `professores`.

- 🏫 **Gerenciamento de turmas**
  - Criar, editar e excluir turmas.
  - Listagem dinâmica (atualiza automaticamente após criar/editar/excluir).

- 📋 **Gerenciamento de atividades**
  - Cadastrar atividades vinculadas a uma turma.
  - Editar e excluir atividades existentes.
  - Proteção de integridade: só é possível excluir uma turma se todas as atividades dela forem removidas antes.

- 🔐 **Logout seguro**
  - Exibe alerta de confirmação antes de sair.

- 👋 **Saudação personalizada**
  - Mostra o nome do professor logado na tela inicial.

---

## 🧠 Tecnologias Utilizadas

- **React Native (Expo)**
- **Supabase** (Auth + Database)
- **React Navigation**
- **React Native Safe Area Context**
- **React Hooks (useState, useEffect)**

---

## 🗂️ Estrutura das Tabelas no Supabase

### 🧑‍🏫 Tabela `professores`
| Coluna     | Tipo        | Descrição                            |
|-------------|-------------|--------------------------------------|
| id          | UUID (PK)   | Mesmo `id` do usuário autenticado.   |
| nome        | Texto       | Nome do professor.                   |
| email       | Texto       | E-mail do professor.                 |

### 🏫 Tabela `turmas`
| Coluna     | Tipo        | Descrição                            |
|-------------|-------------|--------------------------------------|
| id          | Serial (PK) | Identificador da turma.              |
| nome        | Texto       | Nome da turma.                       |
| professor_id| UUID (FK)   | ID do professor (referência).        |

### 📋 Tabela `atividades`
| Coluna       | Tipo        | Descrição                            |
|---------------|-------------|--------------------------------------|
| id            | Serial (PK) | Identificador da atividade.          |
| titulo        | Texto       | Título da atividade.                 |
| descricao     | Texto       | Descrição detalhada.                 |
| turma_id      | Inteiro (FK)| Turma à qual pertence.               |
| criado_em     | Timestamp   | Data de criação automática.          |

---

## ⚙️ Como Rodar o Projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio

### 2. Instalar dependências
npm install ou yarn install

### 3. Configurar o Supabase
Crie um projeto no Supabase
No painel, configure as tabelas professores, turmas e atividades conforme a estrutura acima.
Copie sua URL e anon key do Supabase.
Crie o arquivo supabase.js na raiz do projeto:


import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://SEU-PROJETO.supabase.co';
const SUPABASE_ANON_KEY = 'SUA-CHAVE-ANON';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


### 4. Executar o app
npm start ou expo start



📱 Telas Principais
Login.js → autenticação e criação do professor.
HomeScreen.js → listagem de turmas, saudação e logout.
CreateTurma.js → criação de turmas.
EditarTurma.js → edição de turmas existentes.
TurmaAtividades.js → listagem e gerenciamento de atividades.
CreateAtividade.js → criação de nova atividade.
EditarAtividade.js → edição e exclusão de atividade.


💬 Observações
Ao tentar excluir uma turma que contenha atividades, será exibido um aviso pedindo que as atividades sejam removidas primeiro.
Todos os dados são sincronizados automaticamente com o Supabase.
O app foi desenvolvido com foco em simplicidade e funcionalidade para professores.
