import { generateClient } from "aws-amplify/api"
import { Schema } from "../../amplify/data/resource";

interface ChatProps {
    message: string,
    privacySettings: Record<string, boolean>
}

export const sendChatMessage = async ({message, privacySettings}: ChatProps) => {

    const client = generateClient<Schema>({ authMode: 'userPool' })

    try {
        
        const response = await client.queries.removePersonalInfo({
            message: message,
            settings: JSON.stringify(privacySettings)
        })

        return response.data?.content || ''

    } catch (error) {
        console.log(error)
        throw new Error
    }

}