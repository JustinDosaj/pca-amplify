import { defineFunction } from "@aws-amplify/backend";
    
export const helloWorld = defineFunction({
  name: "my-first-function",
  entry: "./handler.ts"
});