import dotenv from "dotenv";
import { Schema } from "../../data/resource";
import { ComprehendClient, DetectPiiEntitiesCommand, LanguageCode } from "@aws-sdk/client-comprehend";


// PROBLEM: .replace() does NOT replace all matching words --> only the first one it finds
// SOLUTION 1: Find all words from entity list first 
// --> create new object/map that has all word occurance locations 
// --> inside current loop, check object for multiple occurances
// --> If multiple occurances exist, loop through that and keep doing .replace() until all replaced
// SOLUTION 2: Just keep creating new vars for each name regardless of duplicates? --> inefficient
export const handler: Schema["removePersonalInfo"]["functionHandler"] = async (event) => {

    try {

        dotenv.config()
        const client = new ComprehendClient({region: 'us-east-2'})        
        
        let message: string = event.arguments.message || ''

        const input = {
            Text: message, 
            LanguageCode: "en" as LanguageCode,
        };
    
        const command = new DetectPiiEntitiesCommand(input)
        const res = await client.send(command) 
        const entities = res?.Entities || []
        //const length = entities.length

        console.log("Entities: ", entities)

        const wordMap = new Map();

        entities?.forEach((entity, index) => {
            const start = entity.BeginOffset || 0
            const end = entity.EndOffset

            const word = message.substring(start, end)

            if (wordMap.has(word)) {
                wordMap.get(word).push(index)
            } else {
                wordMap.set(word, [index])
            }
        })

        let index = 0
        // [NAME_0] went to the store. Jason left the store. [NAME_0] went home.

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