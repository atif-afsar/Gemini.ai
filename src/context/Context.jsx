import { createContext, useState } from "react";
import runChat from "../config/cohere";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]); // Now stores objects: { prompt, response }
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const onSent = async (prompt) => {
    try {
      setResultData("");
      setLoading(true);
      setShowResult(true);
      setRecentPrompt(input);
      const minLoaderTime = 400;
      const loaderStart = Date.now();
      await new Promise(res => setTimeout(res, 50)); // Let React render loader
      const result = await runChat(prompt);
      const elapsed = Date.now() - loaderStart;
      if (elapsed < minLoaderTime) {
        await new Promise(res => setTimeout(res, minLoaderTime - elapsed));
      }
      setLoading(false); // Loader will show until here
      setResultData(result);
      setIsTyping(true); // Start typing effect after loading
      setInput("");
      setRecentPrompt(prompt);
      setPrevPrompt((prev) => [{ prompt, response: result }, ...prev]);
    } catch (error) {
      console.error("Cohere Error:", error);
      setLoading(false);
    }
  };

  // Clear chat state for new chat
  const clearChat = () => {
    setRecentPrompt("");
    setResultData("");
    setShowResult(false);
    setInput("");
    setIsTyping(false);
  };

  // Load a previous chat session (prompt/response)
  const loadChat = (chat) => {
    setRecentPrompt(chat.prompt);
    setResultData(chat.response);
    setShowResult(true);
    setInput("");
    setIsTyping(false);
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    isTyping,
    input,
    setInput,
    onSent,
    clearChat,
    loadChat,
  };

  return (
    <Context.Provider value={{ contextValue }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
export { Context };

