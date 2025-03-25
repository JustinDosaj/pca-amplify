import { PiiEntity } from "@aws-sdk/client-comprehend";
import { Schema } from "../../data/resource";
import { detectPiiEntities, removeDetections } from "./comprehend.utils";

export const handler: Schema["removePersonalInfo"]["functionHandler"] = async (event) => {

    let message: string = event.arguments.message || ''

    try {   

        const entities: PiiEntity[] = await detectPiiEntities(message)
        message = await removeDetections(message, entities)

        return { content: message }

    } catch (error) {
        console.log(error)
        throw new Error
    }
};