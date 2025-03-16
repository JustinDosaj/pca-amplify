import { secret } from "@aws-amplify/backend";
import OpenAI from "openai";
import { Schema } from "../../data/resource";

export const handler: Schema["chatCompletion"]["functionHandler"] = async (event, context) => {

    console.log("Event: ", event)
    console.log("Context: ", context)

    try {

        const client = new OpenAI({apiKey: `${secret('OPENAI_API_KEY')}`})

        const completion = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: "Write a one-sentence bedtime story about a unicorn.",
                },
            ],
        });
        
        console.log(completion)

        return null;

    } catch (error) {
        console.log("Error: ", error)
        return null;
    }


};