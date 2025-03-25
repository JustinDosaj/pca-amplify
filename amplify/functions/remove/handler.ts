import { Schema } from "../../data/resource";
import { detectPiiEntities } from "./comprehend.utils";

export const handler: Schema["removePersonalInfo"]["functionHandler"] = async (event) => {

    let message: string = event.arguments.message || ''

    try {   
        console.log("Message Before: ", message)
        message = await detectPiiEntities(message)
        console.log("Message After: ", message)

        return { content: message }

    } catch (error) {
        console.log(error)
        throw new Error
    }
};