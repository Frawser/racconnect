export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "deepseek-coder",
        prompt,
        stream: false,
      }),
    });

    if (!ollamaResponse.ok) {
      const errorText = await ollamaResponse.text();
      return new Response(
        JSON.stringify({
          error: "Failed to fetch from Ollama",
          details: errorText,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await ollamaResponse.json();
    return Response.json({ code: result.response });
  } catch (error) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({ error: "Server error", details: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
