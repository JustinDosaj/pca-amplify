import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { secret } from "@aws-amplify/backend";
import OpenAI from "openai";

export const handler = async ( event: APIGatewayProxyEventV2 ): Promise<APIGatewayProxyResultV2> => {

    try {

        const client = new OpenAI({apiKey: `${secret('OPENAI_API_KEY')}`})
        
        console.log(event)

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
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ response: completion.choices[0].message.content }),
          };

    } catch (error) {
        console.log("Error: ", error)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Something went wrong" }),
        };
    }


};