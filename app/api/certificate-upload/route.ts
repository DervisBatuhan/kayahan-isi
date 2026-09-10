import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { CERT_ALLOWED_TYPES, CERT_MAX_BYTES } from "@/lib/content/ported/certificates-shared";

/**
 * Client-upload token endpoint for certificate files. The admin editor calls
 * `upload(..., { handleUploadUrl: "/api/certificate-upload" })`, which hits this
 * route for a short-lived token and then PUTs the file straight to Vercel Blob —
 * so the 4.5 MB server-action body limit never applies (scanned PDFs are large).
 *
 * Requires an admin session. Needs BLOB_READ_WRITE_TOKEN in the environment
 * (auto-provisioned once a Blob store is attached to the Vercel project).
 */
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        const session = await getSession();
        if (!session) throw new Error("Yetkisiz.");
        return {
          allowedContentTypes: [...CERT_ALLOWED_TYPES],
          maximumSizeInBytes: CERT_MAX_BYTES,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ by: session.email }),
        };
      },
      // No onUploadCompleted: the client gets the URL from the upload() promise
      // and persists it via the normal "Kaydet" (savePortedContent) flow.
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(json);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Yükleme başarısız." },
      { status: 400 },
    );
  }
}
