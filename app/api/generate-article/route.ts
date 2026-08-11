export async function GET() {
  return Response.json({ ok: true, message: "API works" });
}

export async function POST() {
  return Response.json({ ok: true, message: "POST works" });
}