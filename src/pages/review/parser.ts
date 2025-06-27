
export default function parseGeminiResponse(raw: string) {
  const summaryMatch = raw.match(/\*\*Summary:\*\*([\s\S]*?)(\*\*|$)/);
  const summary = summaryMatch ? summaryMatch[1].trim() : "";

  const msgMatch = raw.match(/\*\*Message to Delivery Partner:\*\*([\s\S]*?)(\*\*|$)/);
  const message = msgMatch
    ? msgMatch[1].replace(/^["“]\s*|\s*["”]$/g, "").trim()
    : "";

  const tagBlockMatch = raw.match(
    /\*\*Most Common Sentiment Tags:\*\*([\s\S]*)/m
  );
  let tags: string[] = [];
  if (tagBlockMatch) {
    tags = tagBlockMatch[1]
      .split("\n")             
      .map((l) => l.replace(/^[\*\-\•]\s*/, "").trim())
      .filter(Boolean);         
  }

  return { summary, message, tags };
}
