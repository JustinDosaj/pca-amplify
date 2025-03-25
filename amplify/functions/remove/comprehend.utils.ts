import { ComprehendClient, DetectPiiEntitiesCommand, LanguageCode } from "@aws-sdk/client-comprehend"

const client = new ComprehendClient({region: 'us-east-2'})    

export const detectPiiEntities = async (message: string): Promise<string> => {

    try {
        const command = new DetectPiiEntitiesCommand({
            Text: message,
            LanguageCode: "en" as LanguageCode
        })

        const res = await client.send(command)
        const entities = res?.Entities || []

        console.log(`PII Entities: ${entities}`)

        const wordMap = new Map();

        entities?.forEach((entity, index) => {
            const start: number = entity.BeginOffset || 0
            const end: number = entity.EndOffset || 0
            const word: string = message.substring(start, end)

            if(wordMap.has(word)) {
                wordMap.get(word).push(index)
            } else {
                wordMap.set(word, [index])
            }
        })

        let index = 0;

        wordMap.forEach((idx, word) => {
            for (let i = 0; i < idx.length; i++) {
                const wordLength: number = (entities[idx[i]].EndOffset || 0) - (entities[idx[i]].BeginOffset || 0)
                const type = entities[idx[i]].Type

                const start = message.indexOf(word)
                const end = start + wordLength
                const original = message.substring(start, end)
                const replacement = `[${type}_${index}]`

                message = message.replace(original, replacement)
            }

            index++
        })

        return message;

    } catch (error) {
        console.log("Error detecting PII Etities: ", error)
        throw new Error
    }
}