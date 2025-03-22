import dotenv from "dotenv";
import { Schema } from "../../data/resource";
import OpenAI from "openai"
import { ComprehendClient, DetectPiiEntitiesCommand, LanguageCode } from "@aws-sdk/client-comprehend";

export const handler: Schema["chatCompletion"]["functionHandler"] = async (event) => {

    dotenv.config()
    const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
    const client = new ComprehendClient({region: 'us-east-2'})

    // Try Comprehend
    try {

        const input = {
            Text: "John went to the bank", 
            LanguageCode: "en" as LanguageCode,
        };
    
        const command = new DetectPiiEntitiesCommand(input)
        const res = await client.send(command)
        console.log("Comphrehend Output: ", res)

    } catch (error) {

        console.log(error)
    }


    // Try chat completion
    try {

        const message: string = event.arguments.message || ''
        const completion = await openai.chat.completions.create({
            messages: [{ 
                role: "developer", 
                content: message 
            }],
            model: "gpt-3.5-turbo",
        });
        
        const content = completion.choices[0].message.content
        const response = { content: content }

        return response;

    } catch (error) {
        console.error("Error: ", error)
    }
};