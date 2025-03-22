import { defineFunction } from "@aws-amplify/backend";
    
export const removePersonalInfo = defineFunction({
  name: "remove-personal-info",
  entry: "./handler.ts",
  runtime: 22
});