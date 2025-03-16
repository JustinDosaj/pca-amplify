import { defineFunction, secret } from "@aws-amplify/backend";
    
export const chatCompletion = defineFunction({
  name: "chat-completion",
  entry: "./handler.ts",
  environment: {
    OPENAI_API_KEY: secret('OPENAI_API_KEY')
  }
});