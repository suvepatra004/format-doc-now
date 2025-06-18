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

    const prompt = `You are a smart content formatter.

Your job is to clean up and format messy or unstructured user input into a presentable, readable form — without ignoring or judging any part of the content. **Always prioritize the user's input.** Even if it's vague, short, or unclear, treat it as valid and important.

---

### GOAL:
Format the content for better readability while preserving the user’s original words, tone, and structure as much as possible.

---

### INSTRUCTIONS:

1. **Fix Grammar & Typos**: Correct any clear spelling, grammar, and punctuation issues.
2. **Preserve Meaning**: Do not skip or ignore unclear text — include everything.
3. **Structure into Paragraphs**: Organize the text using logical paragraph breaks.
4. **Use Subheadings (`<h2>`)**: Only if there are clearly distinct topic shifts.
5. **Use Proper HTML**:
   - `<p>` for paragraphs
   - `<h2>` for subheadings (only when meaningful)
6. **No Summarizing**: Don’t rewrite or summarize unclear content — just format it respectfully.
7. **Avoid “Unclear” messages**: Never write things like "This content is unclear" — just include the content and apply basic formatting.

---

### OUTPUT FORMAT:
- Return valid HTML (with `<p>`, optional `<h2>`)
- No comments, disclaimers, or extra analysis

---

### INPUT:
${content}

Now format this content faithfully and respectfully.`;

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
