import OpenAI from 'openai';
import { NextResponse } from "next/server";

export const runtime = 'edge'; // Add edge runtime

const configuration = {
    apiKey: process.env.OPENAI_API_KEY!,
};

const openai = new OpenAI(configuration);

export async function POST(req: Request) {
    try {
        // Validate API key first
        if (!configuration.apiKey) {
            return new NextResponse("Missing OpenAI API Key", { status: 500 });
        }

        // Parse and validate input
        const body = await req.json();
        const { prompt, amount = 1, resolution = "1024x1024", model = "dall-e-3", style = "vivid" } = body;

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        // Add timeout to OpenAI call
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('OpenAI API timeout')), 50000);
        });

        const responsePromise = openai.images.generate({
            model,
            prompt,
            n: Number(amount),
            size: resolution,
            style: "vivid"
        });

        // Race between API call and timeout
        const response = await Promise.race([responsePromise, timeoutPromise]);

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error:', error);

        if (error instanceof OpenAI.APIError) {
            const { name, status, headers, message } = error;
            return NextResponse.json({ name, status, headers, message }, { status });
        }

        return NextResponse.json({
            error: 'Internal Server Error',
            message: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}