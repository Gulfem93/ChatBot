import { useState } from 'react';

import './App.css';
import { Chatbot } from './components/Chatbot';
import User from './components/User';
import { GoogleGenAI } from "@google/genai";



function App() {
  const [userInput, setUserInput] = useState('');
  const [history, setHistory] = useState([{ role: "user", text: "tell me about Turkey" }, { role: "model", text: "Sorry :(" }])

  const genAI = new GoogleGenAI({ apiKey: "AIzaSyCKsVW8FZVivPeF4M9lrMMT7zvWUqwu4c4" });

  async function handleChat(event) {
    event.preventDefault();

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: userInput,
    });

    const result = response

    const newChatPrompt = { role: "user", text: userInput }
    setHistory((prevState)=>[...prevState, newChatPrompt])

    const newAI = { role: "model", text: response.text }
    setHistory((prevState)=>[...prevState, newAI])
    console.log(result.text)
  }

  function handleChange(event) {
    const { value } = event.target;
    setUserInput(value);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-slate-200">
      <div className=" bottom-[calc(4rem+1.5rem)] right-0 m-auto bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]">
        {/* Heaading */}
        <div className="flex flex-col space-y-1.5 pb-6">
          <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
          <p className="text-sm text-[#6b7280] leading-3">Powered by Wit1225</p>
        </div>

        {/* Chat container */}
        <div
          className="pr-4 h-[474px]"
          style={{ minWidth: '100%', display: 'table' }}
        >
          <div className="max-h-[454px] overflow-auto">
            {
              history.map((item, index) => (
                item.role === "user" ?
                  <User key={index} text={item.text} /> :
                  <Chatbot key={index} text={item.text} />

              ))
            }

          </div>
        </div>
        {/*input box */}
        <div className="flex items-center pt-0">
          <form className="flex items-center justify-center w-full space-x-2">
            <input
              className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
              placeholder="Message Gemini"
              value={userInput}
              onChange={handleChange}
            />
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
              onClick={handleChat}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
