"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function GeneratePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prompt = searchParams.get("prompt") || "";
  const [conversation, setConversation] = useState<
    { prompt: string; response: string }[]
  >([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const hasInitialMessageSent = useRef(false);

  const splitCodeAndText = (text: string) => {
    const codeRegex = /```(?:[\w]+)?\n([\s\S]*?)```/g;
    const codeBlocks: string[] = [];
    let match;

    while ((match = codeRegex.exec(text)) !== null) {
      codeBlocks.push(match[1]);
    }

    const textOnly = text.replace(codeRegex, "").trim();
    return { codeBlocks, textOnly };
  };

  const sendMessage = async (newPrompt: string) => {
    if (!newPrompt.trim()) return;

    setLoading(true);
    setConversation((prev) => [...prev, { prompt: newPrompt, response: "" }]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: newPrompt }),
      });

      const data = await res.json();
      setConversation((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].response = data.code || "No code generated";
        return updated;
      });
    } catch {
      setConversation((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].response = "Error generating code";
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUserInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    sendMessage(userInput);
    setUserInput("");
  };

  useEffect(() => {
    if (prompt && !hasInitialMessageSent.current) {
      hasInitialMessageSent.current = true;
      sendMessage(prompt);
    }
  }, [prompt]);


  const navigateHome = () => {
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Clickable Racconnect title */}
        <h1
          className="text-4xl font-bold text-center mb-4 cursor-pointer hover:text-blue-400"
          onClick={navigateHome}
        >
          Racconnect
        </h1>

        {/* Display conversation */}
        {conversation.map((item, idx) => (
          <div key={idx} className="space-y-6">
            {/* User Prompt Bubble */}
            <div className="bg-blue-600 text-white p-3 rounded-xl w-fit max-w-full ml-auto shadow-md relative">
              <p className="text-base">{item.prompt}</p>
            </div>

            {/* AI Response */}
            {loading && idx === conversation.length - 1 && (
              <div className="text-gray-300 text-center mt-8">
                Generating code...
              </div>
            )}

            {!loading && item.response && (
              <div className="space-y-6 mt-6">
                {/* Explanation text */}
                <div className="bg-gray-800 p-3 rounded-xl relative shadow">
                  <p className="text-gray-200">{item.response}</p>
                </div>

                {/* Code blocks */}
                {splitCodeAndText(item.response).codeBlocks.map(
                  (block, idx) => (
                    <div key={idx} className="relative">
                      <pre className="bg-gray-900 text-green-400 p-3 rounded-xl overflow-x-auto whitespace-pre-wrap font-mono text-sm">
                        <code>{block}</code>
                      </pre>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}

        {/* User input form */}
        <div className="mt-8">
          <form onSubmit={handleUserInput}>
            <textarea
              className="w-full p-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              placeholder="Ask something..."
              rows={3}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 mt-4 w-full"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
