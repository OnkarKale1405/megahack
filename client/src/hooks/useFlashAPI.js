import { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = "AIzaSyCztjmipRapoDY1gp-VcMD0WF0YkO6fTiY";
const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

const cleanText = (text) => {
  if (!text) return text;
  return text.replace(/\*\s*/g, '').trim(); // Removes * followed by optional spaces
};

const cleanObjectText = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;

  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = cleanText(obj[key]);
    } else if (Array.isArray(obj[key])) {
      obj[key] = obj[key].map((item) => (typeof item === 'string' ? cleanText(item) : item));
    } else if (typeof obj[key] === 'object') {
      cleanObjectText(obj[key]);
    }
  }
  return obj;
};

const useFlashAPI = (product) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!product) return;

    const fetchData = async () => {
      const prompt = `
        Provide detailed information about "${product}" in JSON format with the following fields:
        {
          "${product.toLowerCase()}": {
              "alsoKnownAs": ["Common Names"],
              "basicInfo": "Basic description of the product.",
              "healthInfo": "Health benefits and nutritional information.",
              "bestUses": "Best culinary uses and recipes.",
              "seasonUpdate": "Current season availability and storage tips."
          }
        }
      `;

      try {
        const response = await axios.post(
          apiURL,
          {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
          if (jsonMatch) {
            const parsedJSON = JSON.parse(jsonMatch[1]);
            const cleanedData = cleanObjectText(parsedJSON[product]);
            setData(cleanedData);
          }
        }
      } catch (err) {
        console.error('API Error:', err);
        setError(err);
      }
    };

    fetchData();
  }, [product]);

  return { data, error };
};

export default useFlashAPI;
