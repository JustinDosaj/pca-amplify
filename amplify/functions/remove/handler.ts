import dotenv from "dotenv";
import { Schema } from "../../data/resource";
import { ComprehendClient, DetectPiiEntitiesCommand, LanguageCode } from "@aws-sdk/client-comprehend";

export const handler: Schema["removePersonalInfo"]["functionHandler"] = async (event) => {

    dotenv.config()

    try {
        
        // Setup comprehend client
        const client = new ComprehendClient({region: 'us-east-2'})        
        
        let message: string = event.arguments.message || ''
        
        // Run comprehend detection to receive entities array
        const command = new DetectPiiEntitiesCommand({
            Text: message,
            LanguageCode: "en" as LanguageCode
        })

        const res = await client.send(command) 
        const entities = res?.Entities || []

        console.log(`Entities: ${entities}`)

        const wordMap = new Map();

        // Go through each entity and map the word and it's index from entities array
        entities?.forEach((entity, index) => {
            
            const start: number = entity.BeginOffset || 0
            const end: number = entity.EndOffset || 0
            const word: string = message.substring(start, end)

            // Check if word exists in map
            // Add word and it's index from entities array
            if (wordMap.has(word)) {
                wordMap.get(word).push(index)
            } else {
                wordMap.set(word, [index])
            }
        })

        let index = 0

        // Perform word replacement for each detected word
        wordMap.forEach((item, name) => {

            for (let i = 0; i < item.length; i++) {

                // Difference of End Index and Starting Index to get length of word
                const wordLength: number = (entities[item[i]].EndOffset || 0) - (entities[item[i]].BeginOffset || 0)
                const type = entities[i].Type

                // Get word using start of word plus length of word
                const start = message.indexOf(name)
                const end = start + wordLength
                const original = message.substring(start, end)
                const replacement = `[${type}_${index}]`

                // Replace word with variable
                message = message.replace(original, replacement)

            }
            index++
        })
    
        return { content: message }

    } catch (error) {
        console.log(error)
        return { content: 'failure' }
    }
};