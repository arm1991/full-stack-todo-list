import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
};

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        setData(state, { payload }) {
            state.data = payload;
        },
        setIsEditing(state, { payload }) {
            const id = payload;
            state.data = state.data.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        isEditing: !todo.isEditing,
                    };
                }
                return todo;
            });
        },
    },
});

export const { setData, setIsEditing } = todosSlice.actions;
export default todosSlice.reducer;
