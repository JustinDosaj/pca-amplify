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
        const length = entities.length

        console.log("Entities: ", entities)
        
        // Track difference in string length based on replacements
        let diff = 0
        
        // Loop through every entity to find replacement words
        for (let i = 0; i < length; i++) {

            // Define start and end of word to be replaced
            const start: number = (entities[i].BeginOffset || 0) + diff
            const end: number = (entities[i].EndOffset || 0) + diff
            const type = entities[i].Type

            // Find the string and construct the replacement
            const original = message.substring(start, end) 
            const replacement = ` [${type}_${i}] `
            
            // Calculate difference in length to re-calculate start/end next loop iteration
            const origLen = original.length
            const replaceLen = replacement.length
            diff += replaceLen - origLen

            // Replace all original words with thier replacements
            message = message.replace(original, replacement)
        }

        return { content: message }

    } catch (error) {
        console.log(error)
        return { content: 'failure' }
    }
};