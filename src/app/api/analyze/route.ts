import { NextRequest } from "next/server";
import { analyzeClaim, analyzeInspection } from "@/lib/analyze";

export const maxDuration = 120;

const toBase64 = async (file: File) => {
  const buffer = await file.arrayBuffer();
  return {
    mediaType: file.type || "image/jpeg",
    data: Buffer.from(buffer).toString("base64"),
  };
};

export async function POST(request: NextRequest) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }

  const mode = (formData.get("mode") as string) || "tenant";
  const beforeFiles = formData.getAll("beforePhotos") as File[];
  const afterFiles = formData.getAll("afterPhotos") as File[];

  if (mode !== "landlord" && beforeFiles.length === 0) {
    return Response.json({ error: "At least one before photo is required" }, { status: 400 });
  }
  if (afterFiles.length === 0) {
    return Response.json({ error: "At least one after photo is required" }, { status: 400 });
  }

  const [beforeImages, afterImages] = await Promise.all([
    Promise.all(beforeFiles.map(toBase64)),
    Promise.all(afterFiles.map(toBase64)),
  ]);

  try {
    if (mode === "landlord") {
      const result = await analyzeInspection(beforeImages, afterImages, {
        propertyAddress: (formData.get("propertyAddress") as string) || undefined,
        tenantName: (formData.get("tenantName") as string) || undefined,
        notes: (formData.get("notes") as string) || undefined,
      });
      return Response.json(result);
    } else {
      const deductionLetter = formData.get("deductionLetter");
      if (!deductionLetter || typeof deductionLetter !== "string" || !deductionLetter.trim()) {
        return Response.json({ error: "Deduction letter is required" }, { status: 400 });
      }
      const result = await analyzeClaim(deductionLetter, beforeImages, afterImages);
      return Response.json(result);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Analysis failed";
    console.error("Analysis error:", err);
    return Response.json({ error: message }, { status: 500 });
  }
}
