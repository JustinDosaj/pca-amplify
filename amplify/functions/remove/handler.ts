import { PiiEntity } from "@aws-sdk/client-comprehend";
import { Schema } from "../../data/resource";
import { detectPiiEntities, removeDetections, cleanSettings } from "./comprehend.utils";

export const handler: Schema["removePersonalInfo"]["functionHandler"] = async (event) => {

    let message = event.arguments.message as string
    const settingArgs = event.arguments.settings as Record<string, boolean>

    try {   

        // Clean settings from JSON object to array of strings
        // {NAME: true, EMAIL: false, AGE: true, ...} --> ["NAME", "AGE"]
        const settings = await cleanSettings(settingArgs)
        const entities: PiiEntity[] = await detectPiiEntities(message, settings)
        message = await removeDetections(message, entities)

        return { content: message }

    } catch (error) {
        console.log(error)
        throw new Error
    }
};