export async function onRequest(context) {
  const url = new URL(context.request.url);
  const text = url.searchParams.get("text");

  if (!text) {
    return new Response("Missing ?text=", { status: 400 });
  }

  const apiUrl = `https://bwipjs-api.metafloor.com/?bcid=code128&text=${encodeURIComponent(text)}&scale=3`;

  const res = await fetch(apiUrl);

  if (!res.ok) {
    return new Response("Failed to generate barcode", { status: 502 });
  }

  return new Response(res.body, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400"
    }
  });
}