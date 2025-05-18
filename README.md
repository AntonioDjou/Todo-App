# API de Lista de Tarefas em Node.js

Esta é uma API simples para gerenciar uma lista de tarefas.

## Rotas

### Login (`/login`)

* **Método:** `POST`
* **Descrição:** Autentica um usuário e retorna um token.
* **Corpo da Requisição (JSON):**
    ```json
    {
        "user": "admin",
        "pass": "senha123"
    }
    ```
* **Resposta de Sucesso (Status 200):**
    ```json
    {
        "message": "Login bem-sucedido",
        "token": "seu-token-simples"
    }
    ```
* **Resposta de Falha (Status 401):**
    ```json
    {
        "message": "Usuário ou senha incorretos"
    }
    ```
* **Como testar com Postman:**
    1.  Crie uma nova requisição `POST` para `http://localhost:3000/login`.
    2.  Na aba "Body", selecione "raw" e depois "JSON".
    3.  Cole o corpo da requisição JSON acima com as credenciais.
    4.  Clique em "Send". Verifique a resposta.

### Listar Tarefas (`/tasks`)

* **Método:** `GET`
* **Descrição:** Retorna a lista de todas as tarefas. **Requer autenticação.**
* **Cabeçalho da Requisição:** Você precisa enviar o token no cabeçalho `Authorization`.
    ```
    Authorization: seu-token-simples
    ```
* **Resposta de Sucesso (Status 200):**
    ```json
    [
        "Tarefa 1",
        "Tarefa 2",
        "Tarefa 3" // Exemplo, a lista real pode estar vazia ou conter outras tarefas
    ]
    ```
* **Resposta de Falha (Status 403):**
    ```json
    {
        "message": "Acesso proibido. Token inválido."
    }
    ```
* **Como testar com Postman:**
    1.  Crie uma nova requisição `GET` para `http://localhost:3000/tasks`.
    2.  Vá para a aba "Headers".
    3.  Adicione uma nova chave `Authorization` com o valor `seu-token-simples`.
    4.  Clique em "Send". Verifique a resposta. Se você não enviar o cabeçalho ou enviar um valor diferente, deverá receber um erro 403.

### Adicionar Tarefa (`/task`)

* **Método:** `POST`
* **Descrição:** Adiciona uma nova tarefa à lista. **Requer autenticação.**
* **Cabeçalho da Requisição:** Você precisa enviar o token no cabeçalho `Authorization`.
    ```
    Authorization: seu-token-simples
    ```
* **Corpo da Requisição (JSON):**
    ```json
    {
        "task": "Nome da nova tarefa"
    }
    ```
* **Resposta de Sucesso (Status 201):**
    ```json
    {
        "message": "Tarefa adicionada com sucesso!",
        "task": "Nome da nova tarefa"
    }
    ```
* **Resposta de Falha (Status 400):**
    ```json
    {
        "error": "Por favor, forneça a tarefa no corpo da requisição."
    }
    ```
* **Resposta de Falha de Autenticação (Status 403):**
    ```json
    {
        "message": "Acesso proibido. Token inválido."
    }
    ```
* **Como testar com Postman:**
    1.  Crie uma nova requisição `POST` para `http://localhost:3000/task`.
    2.  Vá para a aba "Headers" e adicione a chave `Authorization` com o valor `seu-token-simples`.
    3.  Vá para a aba "Body", selecione "raw" e depois "JSON".
    4.  Cole o corpo da requisição JSON acima com a tarefa que deseja adicionar.
    5.  Clique em "Send". Verifique a resposta.