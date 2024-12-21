
import OpenAI from 'openai';
import { NextResponse } from "next/server";
import axios from "axios";
import fs from "fs";
import { Readable } from "stream";
import { promisify } from "util";
import Jimp from "jimp";

const configuration = {
    apiKey: process.env.OPENAI_API_KEY!,
};

const openai = new OpenAI(configuration);


async function getImageBuffer(url: string): Promise<Buffer> {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data);
}

async function convertToRGBA(inputBuffer: Buffer): Promise<Buffer> {
    const image = await Jimp.read(inputBuffer);
    return await image.getBufferAsync(Jimp.MIME_PNG);
}


export async function POST(req: Request) {

    try {

        const { prompt, imageUrl } = await req.json();


        if (!configuration.apiKey) {
            return new NextResponse("Miss OpenAI API Key.", { status: 500 });
        }

        if (!prompt) {
            return new NextResponse("Prompt are required", { status: 400 });
        }


        const imageBuffer = await getImageBuffer(imageUrl);
        const rgbaBuffer = await convertToRGBA(imageBuffer);

        // Lưu buffer vào file tạm thời
        const tempFilePath = './temp_image.png';
        await promisify(fs.writeFile)(tempFilePath, rgbaBuffer);

        try {
            const response = await openai.images.edit({
                image: fs.createReadStream(tempFilePath),
                mask: fs.createReadStream("cat.png"),
                prompt: "a floor plant on the masked position",
            });

            console.log(response.data);

            // Xóa file tạm sau khi sử dụng
            await promisify(fs.unlink)(tempFilePath);

            return NextResponse.json(response);
        } catch (error) {
            await promisify(fs.unlink)(tempFilePath);
        }



    } catch (error) {

        if (error instanceof OpenAI.APIError) {
            const { name, status, headers, message } = error;

            return NextResponse.json({ name, status, headers, message }, { status });
        } else {
            throw error;
        }
    }
}