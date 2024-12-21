// import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import OpenAI from 'openai';

import { OpenAIStream, StreamingTextResponse } from 'ai';


const configuration = {
    apiKey: process.env.OPENAI_API_KEY
}

const instructionMessage = {
    role: "system",
    content: "You are Chat XPT AI on XRPL.Link: hhttps://x.com/XRPAI_ChatXPT,https://t.me/ChatXPT_Portal"
};
const openai = new OpenAI(configuration)

export async function POST(req: Request) {



    try {

        const { messages } = await req.json()

        // const { userId } = auth()




        // if (!userId) {

        //     console.log(111);

        //     // return new NextResponse("Unauthorized", { status: 401 })

        // }
        if (!configuration.apiKey) {

            return new NextResponse("Miss Open API Key", { status: 500 })

        }

        if (!messages) {
            return new NextResponse("Miss Message", { status: 400 })
        }

        // Ask OpenAI for a streaming chat completion given the prompt
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: [instructionMessage, ...messages]
        });

        // Convert the response into a friendly text-stream dữ liệu sẽ được gửi về dần dần
        const stream = OpenAIStream(response);
        // Respond with the stream
        return new StreamingTextResponse(stream);

    } catch (error) {
        if (error instanceof OpenAI.APIError) {

            const { name, status, headers, message } = error
            return NextResponse.json({ name, status, headers, message }, { status })

        } else {
            throw error
        }
    }

}