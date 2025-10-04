# 🛡️ Sistema de E-commerce de Segurança Eletrônica  

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
---

## 📘 Sobre o Projeto  
Este projeto foi desenvolvido como **Trabalho de Conclusão de Curso (TCC)** na ETEC, com o objetivo de criar um **sistema de e-commerce voltado à venda de produtos de segurança eletrônica**, como câmeras, cercas elétricas, DVRs e alarmes.  

A aplicação permite que usuários realizem **cadastro, login, navegação entre produtos, adição ao carrinho** e gerenciamento de perfil.  
Também há um **painel administrativo** para controle dos produtos e informações do sistema.  

---

## ⚙️ Tecnologias Utilizadas  

- **HTML5** e **CSS3** — estrutura e estilização das páginas  
- **JavaScript** — interatividade e recursos dinâmicos  
- **PHP** — integração do frontend com o backend  
- **MySQL** — armazenamento e gerenciamento dos dados  

---

## 🧱 Estrutura do Projeto  

```bash
📦 tcc-etec-main
├── index.html          # Página inicial
├── home.php            # Página inicial autenticada
├── login.html          # Tela de login
├── cadastro.html       # Cadastro de usuários
├── meucarrinho.html    # Carrinho de compras
├── adm_produto.html    # Página administrativa
├── Produto.html        # Página de detalhes do produto
├── backend/            # Lógica do servidor e banco de dados
│   ├── banco/          # Scripts SQL e estrutura de tabelas
│   ├── connection/     # Configuração de conexão com o banco
│   └── models/         # Modelos e operações com dados
├── assets/             # Imagens, ícones e estilos
└── README.md           # Documentação do projeto
````
 
# 🚀 Como Executar o Projeto  

## 1. Clonar o repositório
git clone https://github.com/seu-usuario/tcc-etec-main.git
cd tcc-etec-main

## 2. Configurar o ambiente local
Instale o XAMPP ou WAMP

Mova a pasta do projeto para o diretório:
   - htdocs (XAMPP)
   - www (WAMP)
Inicie os módulos Apache e MySQL

## 3. Criar o banco de dados
Acesse o phpMyAdmin

Crie um novo banco de dados (verifique o nome no arquivo backend/connection/)

Importe o arquivo .sql localizado na pasta backend/banco

## 4. Rodar o projeto
Abra no navegador:
http://localhost/tcc-etec-main

## 👤 Funcionalidades
✅ Cadastro e autenticação de usuários  
✅ Catálogo de produtos com descrição e preço  
✅ Carrinho de compras funcional  
✅ Área administrativa para gerenciar produtos  
