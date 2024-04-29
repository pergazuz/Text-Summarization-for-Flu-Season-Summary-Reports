'use client'

import { useState, FormEvent } from "react";

async function query(data: { inputs: string }): Promise<any> {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/PergaZuZ/cdc_influenza_pagasus-x-large",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    console.log("Result: ", result);
    return result;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
}

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const result = await query({ inputs: inputText });
    if (result && result.length > 0) {
      setSummary(result[0].generated_text);
    } else {
      setSummary("No summary available.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Text Summarization for flu season</h1>
      <div className="flex w-full max-w-7xl max-h-4xl">
        <form onSubmit={handleSubmit} className="flex-1 mr-4 bg-white dark:bg-white-200 shadow-md rounded-lg p-8">
          <textarea
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md mb-4 text-black dark:text-white bg-white dark:bg-black"
            rows={6}
            placeholder="Enter text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="w-full py-2 bg-black hover:bg-white border-4 border-black hover:border-black hover:text-black text-white rounded-md focus:outline-none focus:ring-4 focus:ring-white dark:focus:ring-white transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Summarizing...' : 'Summarize Text'}
          </button>
        </form>
          <div className="flex-1 ml-4 bg-white dark:bg-white shadow-md rounded-lg p-4 border border-gray-300 dark:border-gray-700">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-black mb-2 text-center">Summary</h1>
            <p className="text-gray-600 dark:text-gray-400">{summary}</p>
          </div>
      </div>
    </main>
  );
}