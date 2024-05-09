/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck

import OpenAI from 'openai';
import type { RequestHandler } from './$types'
import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_API_KEY } from '$env/static/private';

const config = new Configuration({
    apiKey: OPENAI_API_KEY
})

const openai = new OpenAIApi(config);

export const POST: RequestHandler = async ({ request })  => {

    const { messages } = await request.json();


        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: messages,
        })

        const stream = OpenAIStream(response)

        return new StreamingTextResponse(stream)
    }    

