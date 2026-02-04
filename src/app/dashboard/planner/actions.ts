"use server";

// Trim the key to avoid copy-paste whitespace issues
const API_KEY = process.env.GEMINI_API_KEY?.trim();

const HABIT_GENERATION_SCHEMA = {
    type: "ARRAY",
    items: {
        type: "OBJECT",
        properties: {
            title: { type: "STRING" }, 
            task_type: { type: "STRING" }, 
            xp: { type: "NUMBER" },
        },
        required: ["title", "task_type", "xp"]
    }
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface GeminiPart {
  text: string;
}

interface GeminiContent {
  parts: GeminiPart[];
}

interface GeminiGenerationConfig {
  responseMimeType?: string;
}

interface GeminiRequestBody {
  contents: GeminiContent[];
  generationConfig?: GeminiGenerationConfig;
}

interface GeminiModel {
    name: string;
    supportedGenerationMethods?: string[];
}

interface GeminiModelListResponse {
    models?: GeminiModel[];
    error?: {
        code: number;
        message: string;
        status: string;
    };
}

// --- DIAGNOSTIC FUNCTION ---
async function debugListModels() {
  if (!API_KEY) return;
  try {
    console.log("SERVER DIAGNOSTIC: Checking available models...");
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    const data = (await response.json()) as GeminiModelListResponse;
    
    if (data.error) {
      console.error("SERVER DIAGNOSTIC ERROR:", JSON.stringify(data.error, null, 2));
      return [];
    }
    
    const modelNames = (data.models || []).map((m) => m.name);
    console.log("SERVER DIAGNOSTIC SUCCESS. Found models:", modelNames.length);
    return modelNames;
  } catch (e) {
    console.error("SERVER DIAGNOSTIC FAILED:", e);
    return [];
  }
}

export async function generateHabitPlan(userPrompt: string) {
  if (!API_KEY) {
    console.error("SERVER ERROR: GEMINI_API_KEY is not found in process.env");
    return { error: "Server Error: API Key not configured (Check terminal logs)." };
  }

  // 1. RUN DIAGNOSTIC
  const availableModels = await debugListModels();

  // 2. DEFINE CANDIDATES (UPDATED for Gemini 2.0)
  // We prioritize the newest 2.0 models.
  let modelCandidates = [
    "gemini-2.0-flash",       // New Standard Fast Model
    "gemini-2.0-flash-lite",  // Cost-effective/Fast fallback
    "gemini-2.0-pro-exp",     // Experimental Pro (Smarter)
    "gemini-1.5-flash",       // Stable Fallback
    "gemini-1.5-pro",         // Stable Pro Fallback
  ];

  // Optimization: Filter candidates to ONLY use valid ones from your list
  if (availableModels && availableModels.length > 0) {
    const cleanAvailable = availableModels.map((m: string) => m.replace("models/", ""));
    
    // Keep only the candidates that actually exist in your account
    modelCandidates = modelCandidates.filter(c => cleanAvailable.includes(c));
    
    // FAILSAFE: If exact matches fail, grab ANY flash model
    if (modelCandidates.length === 0) {
        const fallback = cleanAvailable.find((m: string) => m.includes("flash"));
        if (fallback) {
            console.log("SERVER: Exact match failed, using fallback:", fallback);
            modelCandidates = [fallback];
        }
    }
  }

  console.log("SERVER: Will attempt these models:", modelCandidates);

  if (modelCandidates.length === 0) {
      return { error: "No compatible Gemini models found. Please check your API key permissions." };
  }

  const systemPrompt = `
    SYSTEM INSTRUCTION: You are the Voice of the Void, an ancient and timeless entity. A mortal has cast a desire into the abyss: "${userPrompt}".
    
    You do not "coach"; you ordain. Your tone is cryptic, authoritative, and slightly eldritch. You view habits as "rituals" and goals as "ascension."
    
    Break this desire into a sacred progression of 7-8 tasks (Daily, Weekly, Milestone).
    
    RULES FOR GENERATION:
    1. **Tone:** Use words like "Sanctify," "Ritual," "Offering," "Tribute," "Ascension." Be brief and commanding.
    2. **Progression:** Start with simple rituals (Daily), move to trials (Weekly), and end with a great ascension (Milestone).
    3. **Quantity:** Generate exactly 7 or 8 tasks.
    4. **Types:** - 'Daily' (XP: 10-20)
       - 'Weekly' (XP: 50-80)
       - 'Milestone' (XP: 150-200)
    5. **Ordering:** The JSON array must be ordered from Easiest (Daily) to Hardest (Milestone).
    
    Return ONLY the raw JSON array following this schema: ${JSON.stringify(HABIT_GENERATION_SCHEMA)}. 
    Do not include markdown formatting like \`\`\`json. Ensure the output is valid JSON.
  `;

  for (const model of modelCandidates) {
    let attempts = 0;
    
    while (attempts < 2) {
      try {
        console.log(`SERVER: Attempting model ${model} (Attempt ${attempts + 1})...`);
        
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
        
        // Gemini 1.5 and 2.0 both support responseMimeType
        const supportsJsonMode = true; 
        
        // FIX: Use the interface instead of 'any'
        const requestBody: GeminiRequestBody = {
            contents: [{ parts: [{ text: systemPrompt }] }]
        };
        
        if (supportsJsonMode) {
            requestBody.generationConfig = { responseMimeType: "application/json" };
        }

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });

        if (response.ok) {
          const data = await response.json();
          let text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (!text) throw new Error("Empty response");
          
          text = text.replace(/```json/g, "").replace(/```/g, "").trim();
          return { success: true, data: text };
        }

        // Log error
        const errorBody = await response.text();
        console.error(`SERVER: Model ${model} failed with status ${response.status}. Details:`, errorBody);

        if (response.status === 429) {
          await delay(2000);
          attempts++;
          continue;
        }

        // If 404/400, break to next model
        if (response.status === 404 || response.status === 400) {
          break; 
        }

        throw new Error(`API Error: ${response.status}`);

      } catch (e) {
        console.error(`SERVER: Exception on ${model}:`, e);
        attempts++;
      }
    }
  }
  
  return { error: "Failed to connect to Google AI. Check server terminal for 'DIAGNOSTIC ERROR'." };
}