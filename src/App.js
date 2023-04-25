import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, editTodo } from '../src/components/todo/todoSlice';

function App() {
  const [text, setText] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && price.trim() && date.trim() && time.trim()) {
      if (selectedTodo) {
        dispatch(editTodo({ id: selectedTodo.id, text, price, date, time }));
        setSelectedTodo(null);
      } else {
        dispatch(addTodo({ text, price, date, time }));
      }
      setText('');
      setPrice('');
      setDate('');
      setTime('');
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setText(todo.text);
    setPrice(todo.price);
    setDate(todo.date);
    setTime(todo.time);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="w-2/3">
          <h1 className="text-3xl font-bold text-center my-8">TODO App</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                placeholder="Enter task"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
              />
              <input
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-32 py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
              />
              <input
                type="date"
                placeholder="Enter date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-48 py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
              />
              <input
                type="time"
                placeholder="Enter time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-40 py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
              >
                {selectedTodo ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </form>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 bg-gray-200 font-bold uppercase text-sm">Task</th>
                <th className="text-left py-2 px-4 bg-gray-200 font-bold uppercase text-sm">Price</th>
                <th className="text-left py-2 px-4 bg-gray-200 font-bold uppercase text-sm">Date</th>
                <th className="text-left py-2 px-4 bg-gray-200 font-bold uppercase text-sm">Time</th>
                <th className="text-left py-2 px-4 bg-gray-200 font-bold uppercase text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <td className="border py-2 px-4">{todo.text}</td>
                  <td className="border py-2 px-4">{todo.price}</td>
                  <td className="border py-2 px-4">{todo.date}</td>
                  <td className="border py-2 px-4">{todo.time}</td>
                  <td className="border py-2 px-4">
                    <button
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline mr-2"
                      onClick={() => handleEdit(todo)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline"
                      onClick={() => handleDelete(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;