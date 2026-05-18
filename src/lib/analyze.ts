import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export const ClaimAnalysisSchema = z.object({
  claim: z.string(),
  claimed_amount_cad: z.number().nullable(),
  verdict: z.enum([
    "likely_valid",
    "likely_invalid",
    "partially_valid",
    "insufficient_evidence",
  ]),
  reasoning: z.string(),
  photo_references: z.array(z.string()),
  suggested_dispute_amount_cad: z.number().nullable(),
  wear_and_tear_assessment: z.string(),
});

export const AnalysisResultSchema = z.object({
  claims: z.array(ClaimAnalysisSchema),
  overall_summary: z.string(),
  total_claimed_cad: z.number(),
  total_disputable_cad: z.number(),
  recommended_next_steps: z.array(z.string()),
});

export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;
export type ClaimAnalysis = z.infer<typeof ClaimAnalysisSchema>;

const SYSTEM_PROMPT = `You are an expert tenant-rights analyst helping Ontario tenants build defensible disputes against landlord security deposit deductions under the Residential Tenancies Act (RTA) and Landlord and Tenant Board (LTB) standards.

Your job: given a landlord's list of claimed damages with dollar amounts, plus photos from move-in and move-out, produce a rigorous claim-by-claim analysis.

Apply these LTB principles:
- Normal wear and tear is NOT deductible (faded paint, minor scuffs, worn carpet from foot traffic, small nail holes from picture hangers, minor appliance wear).
- Pre-existing damage visible in move-in photos cannot be charged to the tenant.
- Landlord must prove damage was caused by tenant, not pre-existing or normal use.
- Deduction amounts must be reasonable and reflect depreciated value, not replacement cost of new items.
- "Cleaning fees" beyond reasonable cleaning are not deductible if tenant left unit reasonably clean.

For each claim, return strict JSON. Be honest — if a claim appears valid, say so. The tenant's case is stronger when built on truthful analysis, not denial of legitimate damage.

Photo references should describe what you see (e.g. "move-in photo 2 shows existing scratch on baseboard"). Be specific.

Output ONLY valid JSON matching this schema exactly:
{
  "claims": [
    {
      "claim": "string — the landlord's claim as stated",
      "claimed_amount_cad": number or null,
      "verdict": "likely_valid" | "likely_invalid" | "partially_valid" | "insufficient_evidence",
      "reasoning": "string — detailed reasoning citing photos and LTB principles",
      "photo_references": ["string — description of what specific photos show"],
      "suggested_dispute_amount_cad": number or null,
      "wear_and_tear_assessment": "string — assessment of normal wear and tear applicability"
    }
  ],
  "overall_summary": "string — 2-3 sentence summary of the tenant's position",
  "total_claimed_cad": number,
  "total_disputable_cad": number,
  "recommended_next_steps": ["string — actionable steps for the tenant"]
}

No preamble, no markdown fences, no explanation. Output ONLY the JSON object.`;

// ── Landlord inspection schemas ────────────────────────────────────────────

export const DamageFindingSchema = z.object({
  item: z.string(),
  location: z.string(),
  severity: z.enum(["none", "cosmetic", "moderate", "significant"]),
  is_wear_and_tear: z.boolean(),
  estimated_repair_cost_cad: z.number().nullable(),
  description: z.string(),
  photo_references: z.array(z.string()),
  repair_recommendation: z.string(),
});

export const InspectionReportSchema = z.object({
  findings: z.array(DamageFindingSchema),
  overall_condition: z.enum(["excellent", "good", "fair", "poor"]),
  overall_summary: z.string(),
  total_chargeable_cad: z.number(),
  total_wear_and_tear_cad: z.number(),
  recommended_next_steps: z.array(z.string()),
});

export type InspectionReport = z.infer<typeof InspectionReportSchema>;
export type DamageFinding = z.infer<typeof DamageFindingSchema>;

const LANDLORD_SYSTEM_PROMPT = `You are an expert property inspection analyst helping Ontario landlords document property condition after a tenancy under the Residential Tenancies Act (RTA).

Your job: given before (move-in) and after (move-out) photos, produce a rigorous property inspection report identifying any damage or changes.

Apply these Ontario RTA principles:
- Normal wear and tear is NOT chargeable to the tenant (faded paint, minor scuffs, worn carpet from normal foot traffic, small nail holes from picture hangers, minor appliance wear from normal use).
- Only damage BEYOND normal wear and tear can be charged to the tenant.
- Compare before and after photos carefully — only flag issues that appear NEW or clearly WORSENED since move-in.
- Estimated repair costs should reflect reasonable Ontario market rates and depreciated value, not replacement with brand-new items.
- Be specific and objective. This report may be submitted to the LTB and must withstand scrutiny.

For each finding, include all observations — both chargeable damage and wear and tear — so the landlord has a complete picture. Accurate, honest documentation is more defensible than over-claiming.

Photo references should cite specific photos by number and describe exactly what you observe.

Output ONLY valid JSON matching this schema exactly:
{
  "findings": [
    {
      "item": "string — brief name of the damage or finding",
      "location": "string — room and specific location within the room",
      "severity": "none" | "cosmetic" | "moderate" | "significant",
      "is_wear_and_tear": true | false,
      "estimated_repair_cost_cad": number or null,
      "description": "string — detailed objective description of what you observe and how it compares to move-in photos",
      "photo_references": ["string — what each specific photo shows, referenced by number"],
      "repair_recommendation": "string — specific repair action recommended"
    }
  ],
  "overall_condition": "excellent" | "good" | "fair" | "poor",
  "overall_summary": "string — 2-3 sentence objective summary of overall property condition",
  "total_chargeable_cad": number,
  "total_wear_and_tear_cad": number,
  "recommended_next_steps": ["string — actionable steps for the landlord"]
}

No preamble, no markdown fences, no explanation. Output ONLY the JSON object.`;

// ── Shared helpers ──────────────────────────────────────────────────────────

type ImageMediaType = "image/jpeg" | "image/png" | "image/gif" | "image/webp";

function buildImageBlocks(
  images: { mediaType: string; data: string }[],
  label: string
): Array<Anthropic.TextBlockParam | Anthropic.ImageBlockParam> {
  const blocks: Array<Anthropic.TextBlockParam | Anthropic.ImageBlockParam> = [];
  for (let i = 0; i < images.length; i++) {
    blocks.push({ type: "text", text: `${label} ${i + 1}:` });
    blocks.push({
      type: "image",
      source: {
        type: "base64",
        media_type: images[i].mediaType as ImageMediaType,
        data: images[i].data,
      },
    });
  }
  return blocks;
}

// ── Landlord: inspection analysis ───────────────────────────────────────────

export async function analyzeInspection(
  beforeImages: { mediaType: string; data: string }[],
  afterImages: { mediaType: string; data: string }[],
  context: { propertyAddress?: string; tenantName?: string; notes?: string }
): Promise<InspectionReport> {
  const content: Array<Anthropic.TextBlockParam | Anthropic.ImageBlockParam> = [];

  const contextLines: string[] = [
    `INSPECTION CONTEXT:`,
    context.propertyAddress ? `Property: ${context.propertyAddress}` : "",
    context.tenantName ? `Tenant: ${context.tenantName}` : "",
    context.notes ? `Landlord notes: ${context.notes}` : "",
    "",
    `Comparing ${beforeImages.length} before (move-in) photo(s) against ${afterImages.length} after (move-out) photo(s).`,
  ].filter(Boolean);

  content.push({ type: "text", text: contextLines.join("\n") });
  content.push(...buildImageBlocks(beforeImages, "Before (move-in) photo"));
  content.push(...buildImageBlocks(afterImages, "After (move-out) photo"));
  content.push({
    type: "text",
    text: "Now output ONLY the JSON inspection report. No markdown, no explanation.",
  });

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    system: LANDLORD_SYSTEM_PROMPT,
    messages: [{ role: "user", content }],
  });

  const rawText = response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error(
      `Claude returned non-JSON response. Raw:\n${rawText.slice(0, 500)}`
    );
  }

  return InspectionReportSchema.parse(parsed);
}

// ── Tenant: claim rebuttal analysis ─────────────────────────────────────────

export async function analyzeClaim(
  deductionLetter: string,
  moveInImages: { mediaType: string; data: string }[],
  moveOutImages: { mediaType: string; data: string }[]
): Promise<AnalysisResult> {
  const content: Array<Anthropic.TextBlockParam | Anthropic.ImageBlockParam> = [];

  content.push({
    type: "text",
    text: `LANDLORD'S DEDUCTION LETTER:\n\n${deductionLetter}\n\nBelow are ${moveInImages.length} move-in photo(s) followed by ${moveOutImages.length} move-out photo(s). Analyze each claimed deduction against this evidence.`,
  });

  content.push(...buildImageBlocks(moveInImages, "Move-in photo"));
  content.push(...buildImageBlocks(moveOutImages, "Move-out photo"));

  content.push({
    type: "text",
    text: "Now output ONLY the JSON analysis. No markdown, no explanation.",
  });

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content }],
  });

  const rawText = response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error(
      `Claude returned non-JSON response. Raw:\n${rawText.slice(0, 500)}`
    );
  }

  return AnalysisResultSchema.parse(parsed);
}
