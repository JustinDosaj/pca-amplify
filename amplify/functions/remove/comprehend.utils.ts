import { ComprehendClient, DetectPiiEntitiesCommand, LanguageCode, PiiEntity } from "@aws-sdk/client-comprehend"

const client = new ComprehendClient({region: 'us-east-2'})


export const DEFAULT_PII_TYPES = [
    "ADDRESS",
    "AGE",
    "ALL",
    "AWS_ACCESS_KEY",
    "AWS_SECRET_KEY",
    "BANK_ACCOUNT_NUMBER",
    "BANK_ROUTING",
    "CA_HEALTH_NUMBER",
    "CA_SOCIAL_INSURANCE_NUMBER",
    "CREDIT_DEBIT_CVV",
    "CREDIT_DEBIT_EXPIRY",
    "CREDIT_DEBIT_NUMBER",
    "DATE_TIME",
    "DRIVER_ID",
    "EMAIL",
    "INTERNATIONAL_BANK_ACCOUNT_NUMBER",
    "IN_AADHAAR",
    "IN_NREGA",
    "IN_PERMANENT_ACCOUNT_NUMBER",
    "IN_VOTER_NUMBER",
    "IP_ADDRESS",
    "LICENSE_PLATE",
    "MAC_ADDRESS",
    "NAME",
    "PASSPORT_NUMBER",
    "PASSWORD",
    "PHONE",
    "PIN",
    "SSN",
    "SWIFT_CODE",
    "UK_NATIONAL_HEALTH_SERVICE_NUMBER",
    "UK_NATIONAL_INSURANCE_NUMBER",
    "UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER",
    "URL",
    "USERNAME",
    "US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER",
    "VEHICLE_IDENTIFICATION_NUMBER"
]

export const detectPiiEntities = async (message: string, settings: string[]): Promise<PiiEntity[]> => {

    const ALLOWED_PII_SETTINGS = new Set(settings)

    try {
        const command = new DetectPiiEntitiesCommand({
            Text: message,
            LanguageCode: "en" as LanguageCode
        })

        const res = await client.send(command)
        const entities = (res?.Entities || []).filter((entity) => 
            entity.Type && ALLOWED_PII_SETTINGS.has(entity.Type)
        )

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

export const cleanSettings = async(settings: Record<string, boolean>): Promise<string[]> => {
    return Object.keys(settings).filter((key) => settings[key])
}