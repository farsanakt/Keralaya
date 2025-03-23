import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "@/types/message";

interface ChatState {
  messages: Message[];
}

const initialState: ChatState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload; // ✅ Set initial messages
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage,setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
