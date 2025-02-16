import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  //pegar tarefa existente no armazenamento local OU lista vazia
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  //executa a função sempre que um valor na lista >> [] for alterado
  //cria um ""efeito" quando algo [lista] muda
  useEffect(() => {
    //console.log("TASKS FOI ALTERADO!");
    //(nome para identificar o que esta sendo armazenado, o que eu quero armazenar);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  /*   //call api
  //aprender axios e implementar
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setTasks(data);
    };
    //pode chamar uma api pra preencher as tarefas
    //fetchTasks();
  }, []); */

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        //atualizar tarefa
        return { ...task, isCompleted: !task.isCompleted };
      }
      //não precisa atualizar a tarefa
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const formatedDate = (data) =>
      [
        data.getDate().toString().padStart(2, "0"),
        (data.getMonth() + 1).toString().padStart(2, "0"),
        data.getFullYear(),
      ].join("/");
    const createDate = formatedDate(new Date());
    const newTask = {
      id: v4(),
      text: description,
      title: title,
      day: createDate,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[700px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
