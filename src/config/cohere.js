// src/config/cohere.js

const API_KEY = "kmGSlr8Amro5PCk7pCS6fhD0nxWkWHVaDfOpxlLc";

const runChat = async (prompt) => {
  try {
    // Artificial delay for shimmer loader visibility
    await new Promise(res => setTimeout(res, 1500));
    const res = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command-light",
        message: prompt,
      }),
    });

    const data = await res.json();

    if (data.text) {
      console.log("📥 Response from Cohere:", data.text); // ✅ Console log
      return data.text;
    } else {
      console.error("❌ Invalid response format:", data);
      return "No valid response";
    }
  } catch (err) {
    console.error("❌ Fetch error from Cohere:", err);
    throw err;
  }
};

export default runChat;
