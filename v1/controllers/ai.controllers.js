import axios from "axios";

export const getModels = (req, res) => {
    res.json({ message: 'List of AI models' });
};

const API_KEY = process.env.GEMINI_25_API_KEY;
const MODEL = 'gemini-2.5-flash';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const headers = {
    'Content-Type': 'application/json',
    'x-goog-api-key': API_KEY
};

async function callGemini(text) {
    const body = {
        contents: [
            { parts: [{ text }] }
        ]
    };
    const response = await axios.post(ENDPOINT, body, { headers });
    const candidate = response.data?.candidates?.[0];
    const final = candidate?.content?.parts?.[0]?.text;
    return { final, data: response.data };
}

export const useGemini25Flash = async (req, res) => {
    try {
        const text = req.body.prompt;
        const { final, data } = await callGemini(text);
        res.json({ message: 'Gemini 2.5 Flash response', final, data });
    } catch (error) {
        console.error(error?.toString());
        res.status(500).json({ message: 'Ocurrió un error al usar el modelo Gemini 2.5 Flash' });
    }
};

export async function generateEcosystemTip(ecosystemName) {
    if (!ecosystemName) return null;
    const prompt = `Provee un consejo breve pero cientifico sobre el cuidado del ecosistema llamado "${ecosystemName}". Sé conciso y útil.`;
    try {
        const { final } = await callGemini(prompt);
        // strip surrounding whitespace
        return final ? String(final).trim() : null;
    } catch (err) {
        console.error('Error generando tip de ecosistema:', err?.toString());
        // Si la IA falla, intentamos generar un consejo localmente basado en palabras clave del nombre del ecosistema
        try {
            return generateLocalEcosystemTip(ecosystemName);
        } catch (localErr) {
            console.error('Error generating local tip fallback:', localErr?.toString());
            return null;
        }
    }
}

function generateLocalEcosystemTip(name) {
    const n = String(name || '').toLowerCase();
    // Simple keyword-based tips
    if (n.includes('acuario') || n.includes('acuário') || n.includes('aquario')) {
        if (n.includes('amazon')) {
            return 'Mantén agua blanda y ligeramente ácida (pH 6.0-7.0), temperatura 24–28°C y realiza cambios parciales de agua semanales.';
        }
        return 'Mantén filtración adecuada, controles regulares de amonio/nitritos/nitratos y cambios parciales de agua semanales.';
    }
    if (n.includes('terrario') || n.includes('terráreo') || n.includes('terrarium')) {
        return 'Controla humedad y temperatura específicas para las especies; proporciona sustrato limpio y puntos de escondite.';
    }
    if (n.includes('estanque') || n.includes('pond')) {
        return 'Mantén buena filtración y aeración, evita sobrepoblación y controla la entrada de luz para prevenir algas.';
    }
    if (n.includes('oceano') || n.includes('mar') || n.includes('marino')) {
        return 'Controla salinidad, temperatura y calidad del agua; usa equipo específico para acuarios marinos y realiza cambios parciales regulares.';
    }
    // Generic tip
    return 'Mantén parámetros estables (temperatura, pH, calidad del agua), evita sobrepoblación y realiza mantenimiento regular.';
}