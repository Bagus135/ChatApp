import { create } from "zustand";

interface ConversationState{
    selectedConversation : ConversationType | null;
    setSelectedConversation : (conversation : ConversationType| null) => void;
    messages : MessagesType[];
    setMessages : (messages : MessagesType[]) => void;
}

const useConversation = create<ConversationState>((set)=> ({
    selectedConversation : null,
    setSelectedConversation : (conversation) => set({selectedConversation : conversation}),
    messages : [],
    setMessages : (messages) => set({messages : messages})
}))

export default useConversation