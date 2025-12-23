const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const analyzeDocument = async (text) => {
    const prompt = `
  Analyse le document suivant et fournis une réponse en JSON valide, ENTIÈREMENT EN FRANÇAIS.
  
  Texte du document:
  "${text.substring(0, 15000)}"

  Structure la réponse JSON EXACTEMENT comme ceci (tout en français) :
  {
    "summary": "Résumé en 3-5 lignes en français",
    "keyPoints": ["point clé 1 en français", "point clé 2 en français", ...],
    "requiredActions": ["action 1 en français", "action 2 en français", ...],
    "simpleExplanation": "Explication simple pour un débutant, en français",
    "tone": "Description du ton en français",
    "intent": "Description de l'intention en français",
    "warnings": ["avertissement 1 en français", "information manquante", "délais importants", ...]
  }
  
  IMPORTANT : Réponds UNIQUEMENT en français, sans aucun mot en anglais.
  Ne mets PAS de formatage markdown (pas de \`\`\`json), juste le JSON brut.
  `;

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "Tu es un assistant IA expert en analyse de documents. Tu réponds TOUJOURS en français, de manière claire et professionnelle." },
                { role: "user", content: prompt }
            ],
            model: "gpt-3.5-turbo",
            response_format: { type: "json_object" },
        });

        const analysis = JSON.parse(completion.choices[0].message.content);
        return analysis;
    } catch (error) {
        console.error('Erreur d\'analyse LLM:', error);
        throw error;
    }
};

const rewriteText = async (text, instruction) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "Tu es un assistant IA expert en rédaction. Tu réponds TOUJOURS en français." },
                { role: "user", content: `Reformule le texte suivant selon cette instruction : "${instruction}".\n\nTexte à reformuler (en français) :\n"${text.substring(0, 5000)}"\n\nRéponds UNIQUEMENT en français.` }
            ],
            model: "gpt-3.5-turbo",
        });
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Erreur de reformulation LLM:', error);
        throw error;
    }
};

module.exports = { analyzeDocument, rewriteText };
