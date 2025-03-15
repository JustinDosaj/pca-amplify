import { secret } from "@aws-amplify/backend";
import OpenAI from "openai";

export const handler = async (): Promise<null> => {

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
};