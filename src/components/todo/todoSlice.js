import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todos',
  initialState: [
    {
      id: 1,
      text: 'Buy groceries',
      price: 25,
      date: '2023-04-27',
      time: '10:00',
    },
    {
      id: 2,
      text: 'Finish project',
      price: 0,
      date: '2023-04-30',
      time: '14:00',
    },
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload.text,
        price: action.payload.price,
        date: action.payload.date,
        time: action.payload.time,
      };
      state.push(newTodo);
    },
    deleteTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    editTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state[index].text = action.payload.text;
        state[index].price = action.payload.price;
        state[index].date = action.payload.date;
        state[index].time = action.payload.time;
      }
    },
  },
});

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;