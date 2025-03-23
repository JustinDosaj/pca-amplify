import dotenv from "dotenv";
import { Schema } from "../../data/resource";
import { ComprehendClient, DetectPiiEntitiesCommand, LanguageCode } from "@aws-sdk/client-comprehend";

export const handler: Schema["removePersonalInfo"]["functionHandler"] = async (event) => {

    dotenv.config()
    const client = new ComprehendClient({region: 'us-east-2'})

    // Try Comprehend
    try {
        
        let message: string = event.arguments.message || ''

        const input = {
            Text: message, 
            LanguageCode: "en" as LanguageCode,
        };
    
        const command = new DetectPiiEntitiesCommand(input)
        const res = await client.send(command) 
        const entities = res?.Entities || []
        const length = entities.length

        console.log("Entities: ", entities)
        
        // John went to the store for Frank

        for (let i = 0; i < length; i++) {
            
            console.log(`Message before alteration: ${message}`)

            const start: number = entities[i].BeginOffset || 0
            const end: number = entities[i].EndOffset || 0
            const type = entities[i].Type

            const substring = message.substring(start, end + 1)
            
            message = message.replace(substring, ` [${type}_${i}] `)
        }

        return { content: message }

    } catch (error) {
        console.log(error)
        return { content: 'failure' }
    }
};