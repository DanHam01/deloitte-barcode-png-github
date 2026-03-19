import bwipjs from 'bwip-js/browser';

export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const text = url.searchParams.get("text");

  if (!text) {
    return new Response("Missing ?text= parameter", { status: 400 });
  }

  try {
    const png = await bwipjs.toBuffer({
      bcid: "code128",
      text,
      scale: 3,
      height: 10,
      includetext: true,
      textxalign: "center",
    });

    return new Response(png, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (err) {
    return new Response("Error: " + err.message, { status: 500 });
  }
}