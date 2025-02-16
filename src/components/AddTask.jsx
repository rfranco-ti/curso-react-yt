import { useState } from "react";
import Input from "./Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";

function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const formatDate = (date) => new Intl.DateTimeFormat("pt-BR").format(date);

  const handleSubmit = () => {
    //onst createdAt = formatDate(new Date()); // Data de criação formatada

    if (!title || !description || !dueDate) {
      return alert("Preencha todos os campos!");
    }

    onAddTaskSubmit(
      title,
      description,
      formatDate(dueDate),
      formatDate(new Date())
    );

    // Reset dos estados
    setTitle("");
    setDescription("");
    setDueDate(null);
  };
  //
  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <Input
        type="text"
        placeholder="Digite o título da tarefa"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Input
        type="text"
        placeholder="Digite a descrição da tarefa"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <div className="flex flex-col justify-center relative mb-6 w-full">
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          dateFormat="dd/MM/yyyy"
          className="border border-slate-300 outline-none px-4 py-2 pr-10 rounded-md focus:ring-2 w-full"
          placeholderText="Data de conclusão"
          minDate={new Date()}
        />

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-600">
          <CalendarDays />
        </div>
      </div>

      <button
        className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
        onClick={handleSubmit}
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTask;
