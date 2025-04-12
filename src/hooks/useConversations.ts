import { useContext } from "react";
import { ConversationsContext } from "@/providers/conversations.providers";

// Custom hook to use auth
export const useConversations = () => {
  const conversatons = useContext(ConversationsContext);
  if (!conversatons) throw new Error("useConversations must be used within an ConversationsProvider");
  return conversatons;
};