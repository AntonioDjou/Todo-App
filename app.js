const readline = require('readline').createInterface({ // Interage com o usuário.
  input: process.stdin,
  output: process.stdout,
});

let tasks = []; // Array para armazenar as tarefas.

function listTasks() { // Lista as tarefas.
  if (tasks.length === 0) {
    console.log('\nSua lista de tarefas está vazia!\n');
    askForAction();
    return;
  }
  console.log('\n--- Lista de Tarefas ---');
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task}`);
  });
  console.log('-----------------------\n');
  askForAction();
}

function addTask(task) { // Adiciona tarefas.
  tasks.push(task);
  console.log(`\nTarefa "${task}" adicionada!\n`);
  askForAction();
}

function askForAction() { // Espera a próxima ação do usuário.
  readline.question(
    'O que você gostaria de fazer? (adicionar | listar | sair): ',
    (action) => {
      const normalizedAction = action.toLowerCase().trim();
      if (normalizedAction === 'adicionar') {
        readline.question('Digite a nova tarefa: ', (newTask) => {
          addTask(newTask.trim());
        });
      } else if (normalizedAction === 'listar') {
        listTasks();
      } else if (normalizedAction === 'sair') {
        readline.close();
      } else {
        console.log('\nAção inválida. Por favor, digite "adicionar", "listar" ou "sair".\n');
        askForAction();
      }
    }
  );
}

console.log('Bem-vindo à sua lista de tarefas!');
askForAction();