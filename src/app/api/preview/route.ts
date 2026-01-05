import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

const PREVIEW_SECRET = process.env.SANITY_PREVIEW_SECRET;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const disable = searchParams.get("disable");

  const dm = await draftMode();

  if (disable === "true") {
    dm.disable();
    return NextResponse.json({ preview: false });
  }

  if (!PREVIEW_SECRET || secret !== PREVIEW_SECRET) {
    return NextResponse.json({ message: "Secret invalide" }, { status: 401 });
  }

  dm.enable();
  return NextResponse.json({ preview: true });
}
