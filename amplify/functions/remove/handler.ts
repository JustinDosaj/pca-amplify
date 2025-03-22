import dotenv from "dotenv";
import { Schema } from "../../data/resource";
import { ComprehendClient, DetectPiiEntitiesCommand, LanguageCode } from "@aws-sdk/client-comprehend";

export const handler: Schema["removePersonalInfo"]["functionHandler"] = async (event) => {

    dotenv.config()
    const client = new ComprehendClient({region: 'us-east-2'})

    // Try Comprehend
    try {
        
        const message: string = event.arguments.message || ''

        const input = {
            Text: message, 
            LanguageCode: "en" as LanguageCode,
        };
    
        const command = new DetectPiiEntitiesCommand(input)
        const res = await client.send(command) 
        console.log("Comphrehend Output: ", res)

        return { content: 'success' }

    } catch (error) {
        console.log(error)
        return { content: 'failure' }
    }
};