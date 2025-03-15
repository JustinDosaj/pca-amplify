import { defineFunction } from "@aws-amplify/backend";
    
export const chatCompletion = defineFunction({
  name: "chat-completion",
  entry: "./handler.ts"
});