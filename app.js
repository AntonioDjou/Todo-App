const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

let tasks = [];

function listTasks() {
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
}

function addTask(task) {
  tasks.push(task);
  console.log(`\nTarefa "${task}" adicionada!\n`);
  askForAction();
}

function removeTask(indexToRemove) {
  if (indexToRemove >= 1 && indexToRemove <= tasks.length) {
    const removedTask = tasks.splice(indexToRemove - 1, 1);
    console.log(`\nTarefa "${removedTask[0]}" removida!\n`);
  } else {
    console.log('\nÍndice de tarefa inválido.\n');
  }
  askForAction();
}

function askForAction() {
  readline.question(
    'O que você gostaria de fazer? (adicionar | listar | remover | sair): ',
    (action) => {
      const normalizedAction = action.toLowerCase().trim();
      if (normalizedAction === 'adicionar') {
        readline.question('Digite a nova tarefa: ', (newTask) => {
          addTask(newTask.trim());
        });
      } else if (normalizedAction === 'listar') {
        listTasks();
        askForAction(); // Adicionado para voltar ao menu após listar
      } else if (normalizedAction === 'remover') {
        listTasks();
        readline.question('Digite o número da tarefa para remover: ', (taskNumber) => {
          const indexToRemove = parseInt(taskNumber);
          if (!isNaN(indexToRemove)) {
            removeTask(indexToRemove);
          } else {
            console.log('\nPor favor, digite um número válido.\n');
            askForAction();
          }
        });
      } else if (normalizedAction === 'sair') {
        readline.close();
      } else {
        console.log('\nAção inválida. Por favor, digite "adicionar", "listar", "remover" ou "sair".\n');
        askForAction();
      }
    }
  );
}

console.log('Bem-vindo à sua lista de tarefas!');
askForAction();