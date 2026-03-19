export async function onRequest() {
  return new Response("Function is working", {
    headers: { "Content-Type": "text/plain" },
  });
}