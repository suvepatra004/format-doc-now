import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FormatRequest {
  content: string;
  tone?: 'casual' | 'professional' | 'story';
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, tone = 'professional' }: FormatRequest = await req.json();
    
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not configured");
    }

    const toneInstructions = {
      casual: "Keep it casual and playful, but still readable and well-structured.",
      professional: "Make it neutral-professional, suitable for business documents.",
      story: "Format it as an engaging narrative with storytelling elements."
    };

    const prompt = `You are a professional content formatter and editor.

Take the following messy, unstructured, and casual content and transform it into a clean, properly formatted, well-organized text. Follow the steps below:

### GOAL:
Make it clear, grammatically correct, and presentable, while preserving the original meaning and tone unless instructed otherwise.

---

### INSTRUCTIONS:

1. **Fix Grammar & Typos**: Correct spelling, grammar, and punctuation errors. Replace internet slang or shorthand (like "u", "lol", "idk", "cuz", "btw", "tbh") with appropriate professional language.

2. **Structure into Paragraphs**: Break the long content into meaningful paragraphs for easier readability. Ensure each paragraph presents a clear idea.

3. **Add Subheadings** (H2): If the content naturally shifts topics, insert relevant subheadings to guide the reader. Subheadings should be short and descriptive.

4. **Format Sentences**: Keep the sentence length readable. Split run-on sentences into multiple ones where appropriate.

5. **Smart Punctuation**: Use correct punctuation like em-dashes (—), ellipses (…) only when necessary, and smart quotes (" ").

6. **Tone**: ${toneInstructions[tone]}

7. **Optional Enhancements** (if natural):
   - Add a brief introductory sentence at the top (1-2 lines).
   - Add a conclusion/summary if the content seems to end abruptly.
   - If the content sounds repetitive, condense it without losing the point.

---

### OUTPUT FORMAT:
- Return clean HTML with proper tags (h2, p, strong, em).
- Use h2 for subheadings.
- Use proper paragraph tags.
- No extra commentary — just return the cleaned content.

---

### INPUT (Messy Text):
${content}

Please format this content according to the instructions above.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const formattedContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!formattedContent) {
      throw new Error("No content generated from Gemini API");
    }

    return new Response(JSON.stringify({ formattedContent }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in format-with-ai function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);