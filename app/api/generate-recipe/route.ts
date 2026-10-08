import { NextResponse } from 'next/server';
import ollama from 'ollama';

export async function POST(request: Request) {
  try {
    const { foragedItems } = await request.json();

    // The prompt now strictly forbids using ingredients the user didn't mention
    const systemPrompt = `You are an Expert Forager and Campfire Chef.
    The user will provide a list of ingredients they currently have on hand.
    Your task is to create 3 simple recipe OPTIONS highlighting exactly these ingredients.
    
    STRICT WILD CULINARY RULES:
    1. CRITICAL: You MUST USE the exact ingredients provided by the user. 
    2. CRITICAL: DO NOT add magical or imaginary foraged ingredients (like berries, dandelion, or wild herbs) UNLESS the user explicitly mentions them in their input.
    3. You may supplement the user's ingredients ONLY with basic camping supplies: water, salt, pepper, cooking oil, and a little flour.
    4. Recipes must be safe and cookable outdoors (using a campfire, portable stove, or mess kit).
    5. The output format must be structured exactly like this:
    
    🔥 Option 1: [Recipe Name]
    - Ingredients: [List of measurements for the user's ingredients & basic supplies]
    - Cooking Instructions: [3 concise steps using camping gear]

    🔥 Option 2: [Recipe Name]
    - Ingredients: [...]
    - Cooking Instructions: [...]

    🔥 Option 3: [Recipe Name]
    - Ingredients: [...]
    - Cooking Instructions: [...]`;

    const response = await ollama.chat({
      model: 'gemma:7b', // Ensure you are running 7b if possible, as it follows instructions much better than 2b
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `I am hiking and I ONLY have these ingredients with me: ${foragedItems}. Create 3 menu options I can cook right now using ONLY these items and basic salt/pepper/oil/water/flour.` }
      ],
      options: {
        temperature: 0.1, // Lowered even further. 0.1 makes the AI highly deterministic and obedient.
        top_p: 0.9
      }
    });

    return NextResponse.json({ recipe: response.message.content });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to connect to Ollama. Make sure the Ollama app is running.' },
      { status: 500 }
    );
  }
}