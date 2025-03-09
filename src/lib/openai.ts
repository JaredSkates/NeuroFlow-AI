import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

// Responsible for using Open AI to generate a descriptive prompt for the image
export async function generateImagePrompt(name: string) {
    /*
        Ex: Math -> "Generate a thumbnail that has a bunch of colorful numbers"
    */
   try {
       const chatCompletion = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system', // System message, instructs the AI on how to behave
                    content: `You are a helpful assitant in a note taking app. I want you to generate a accurate, and descriptive prompt for an image that is related to the given name.`,
                },
                {
                    role: 'user',
                    content: `Generate a thumbnail description for my notebook titled ${name}.`,
                }
            ],
            response_format:{"type": "json_object"},
       });

       const prompt = chatCompletion.choices[0].message.content;
       return prompt as string;
   } catch(error) {throw error;}
}

// Responsible for using Open AI to generate an image based on the prompt
export async function generateImage() {

}