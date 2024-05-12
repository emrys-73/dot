// import { OPENAI_KEY } from '$env/static/private';
import { OPENAI_API_KEY} from '$env/static/private'
import type { RequestHandler } from '@sveltejs/kit';
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge';


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

