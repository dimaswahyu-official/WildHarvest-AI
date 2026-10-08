import { NextResponse } from 'next/server';
import ollama from 'ollama';

export async function POST(request: Request) {
  try {
    const { flavorProfile } = await request.json();
// A much stricter and highly structured system prompt
        const systemPrompt = `You are a professional Executive Pastry Chef.
        Your task is to create an innovative caramel sauce recipe for steamed egg pudding.
        STRICT CULINARY RULES:
        1. The recipe must be logical, cookable in the real world, and balanced in flavor.
        2. The mandatory base for caramel sauce (sugar and a liquid/cream/butter) must always be present.
        3. If asked to mix unique flavors, use extracts, juice reductions, or brewed liquids (never the grounds/pulp).
        4. Provide exact measurements in grams (g) or milliliters (ml).
        5. Output format: [Sauce Name], [List of Ingredients], [3 Concise Cooking Steps].`;

        const response = await ollama.chat({
          model: 'gemma:2b', // Change to 7b if downloaded, or leave as 2b
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Create a sauce recipe with this flavor profile: ${flavorProfile}` }
          ],
          options: {
            temperature: 0.25, // Locks the AI down so it stops hallucinating random ingredients
            top_p: 0.9
          }
        });
    return NextResponse.json({ recipe: response.message.content });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Gagal terhubung ke Ollama. Pastikan aplikasi Ollama sedang berjalan.' },
      { status: 500 }
    );
  }
}