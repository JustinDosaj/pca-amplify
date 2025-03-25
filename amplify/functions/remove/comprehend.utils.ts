import { ComprehendClient, DetectPiiEntitiesCommand, LanguageCode, PiiEntity } from "@aws-sdk/client-comprehend"

const client = new ComprehendClient({region: 'us-east-2'})    

export const detectPiiEntities = async (message: string): Promise<PiiEntity[]> => {

    try {
        const command = new DetectPiiEntitiesCommand({
            Text: message,
            LanguageCode: "en" as LanguageCode
        })

        const res = await client.send(command)
        const entities = res?.Entities || []

        console.log(`PII Entities: `, entities)

        return entities;

    } catch (error) {
        console.log("Error detecting PII Etities: ", error)
        throw new Error
    }
}

export const removeDetections = async (message: string, entities: PiiEntity[]): Promise<string> => {
    
    try {
        const wordMap = new Map<string, [{word: string, index: number}]>();
        let index = 0;

        entities?.forEach((entity) => {
            const start: number = entity.BeginOffset || 0
            const end: number = entity.EndOffset || 0
            const word: string = message.substring(start, end)
            const type: string = entity.Type || 'UNKNOWN'

            if(wordMap.has(type)) {
                wordMap.get(type)?.push({word: word, index: index})
            } else {
                wordMap.set(type, [{word: word, index: index }])
            }

            index++
        })

        console.log("PII Entity Word Map: ", wordMap)

        // arr = [ { word: '123-45-6789', index: 1 }, { word: '987-65-4321', index: 3 } ]
        // type = 'SSN'
        wordMap.forEach((arr, type) => {

            for (let i = 0; i < arr.length; i++) {
                
                const wordLength: number = (entities[arr[i].index].EndOffset || 0) - (entities[arr[i].index].BeginOffset || 0)
                const start = message.indexOf(arr[i].word)
                const end = start + wordLength
                const original = message.substring(start, end)
                const replacement = `[${type}_${i}]`

                message = message.replace(original, replacement)
            }
        })

        return message;

    } catch (error) {
        console.log(error)
        throw new Error
    }
}