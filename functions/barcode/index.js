export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  const text = url.searchParams.get("text");
  if (!text) {
    return new Response("Missing ?text= parameter", {
      status: 400,
    });
  }

  // Simple fallback PNG (base64 transparent pixel)
  // This confirms PNG delivery works in Cloudflare
  const pngBase64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO5l5S8AAAAASUVORK5CYII=";

  const binary = Uint8Array.from(atob(pngBase64), (c) => c.charCodeAt(0));

  return new Response(binary, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
    },
  });
}