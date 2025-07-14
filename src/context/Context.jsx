import { createContext, useState } from "react";
import runChat from "../config/cohere";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async (prompt) => {
    try {
      setResultData("");
      setLoading(true);
      setShowResult(true);
      setRecentPrompt(input)
      const result = await runChat(prompt); // ✅ use prompt, not input
      setResultData(result);
      setLoading(false);
      setInput("");
      setRecentPrompt(prompt);
      setPrevPrompt((prev) => [prompt, ...prev]);
    } catch (error) {
      console.error("Cohere Error:", error);
      setLoading(false);
    }
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    onSent,
  };

  return (
    <Context.Provider value={{ contextValue }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
export { Context };
