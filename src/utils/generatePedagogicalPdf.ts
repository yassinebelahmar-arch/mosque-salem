import { PEDAGOGICAL_DOCUMENTS } from '../components/PedagogicalResourcesModal';

const blobUrlCache = new Map<string, string>();

/**
 * Fetches the exact, untouched original file (PDF or JPG) provided by the user
 * using credentials: 'include' so AI Studio's partitioned iframe cookie is sent,
 * preventing any redirect to /__cookie_check.html.
 */
export async function getPedagogicalFileBlobUrl(docId: string): Promise<string | null> {
  const cached = blobUrlCache.get(docId);
  if (cached) return cached;

  const pedagogicalDoc = PEDAGOGICAL_DOCUMENTS.find((d) => d.id === docId);
  if (!pedagogicalDoc) return null;

  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanPath = pedagogicalDoc.pdfPath.startsWith('/')
    ? pedagogicalDoc.pdfPath.slice(1)
    : pedagogicalDoc.pdfPath;

  const candidateUrls = [
    `${cleanBase}${cleanPath}`,
    `/${cleanPath}`,
  ];

  if (pedagogicalDoc.fallbackPath) {
    const cleanFallback = pedagogicalDoc.fallbackPath.startsWith('/')
      ? pedagogicalDoc.fallbackPath.slice(1)
      : pedagogicalDoc.fallbackPath;
    candidateUrls.push(`${cleanBase}${cleanFallback}`, `/${cleanFallback}`);
  }

  const isJpg = pedagogicalDoc.pdfFileName.toLowerCase().endsWith('.jpg') ||
    pedagogicalDoc.pdfFileName.toLowerCase().endsWith('.jpeg');
  const mimeType = isJpg ? 'image/jpeg' : 'application/pdf';

  for (const url of candidateUrls) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
      });

      if (!response.ok) continue;

      const contentType = (response.headers.get('content-type') || '').toLowerCase();
      if (contentType.includes('text/html')) {
        continue;
      }

      const arrayBuffer = await response.arrayBuffer();
      if (arrayBuffer.byteLength < 1024) {
        continue;
      }

      // Verify PDF or JPEG header bytes to guarantee file integrity
      const headerBytes = new Uint8Array(arrayBuffer.slice(0, 4));
      const isPdfMagic =
        headerBytes[0] === 0x25 && // %
        headerBytes[1] === 0x50 && // P
        headerBytes[2] === 0x44 && // D
        headerBytes[3] === 0x46;   // F
      const isJpgMagic = headerBytes[0] === 0xff && headerBytes[1] === 0xd8;

      if (!isPdfMagic && !isJpgMagic) {
        continue;
      }

      const blob = new Blob([arrayBuffer], { type: mimeType });
      const blobUrl = URL.createObjectURL(blob);
      blobUrlCache.set(docId, blobUrl);
      return blobUrl;
    } catch {
      // Try next candidate URL
    }
  }

  return null;
}

/**
 * Directly downloads the original pedagogical file provided by the user.
 * Uses Blob ObjectURL inside the iframe context so the browser saves the exact binary file
 * without any modification, fusion, watermark, or cookie-check redirect.
 */
export async function downloadPedagogicalPdf(
  docId: string,
  onStatusChange?: (isDownloading: boolean) => void
): Promise<void> {
  const pedagogicalDoc = PEDAGOGICAL_DOCUMENTS.find((d) => d.id === docId);
  if (!pedagogicalDoc) return;

  try {
    onStatusChange?.(true);
    const blobUrl = await getPedagogicalFileBlobUrl(docId);

    if (blobUrl) {
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = pedagogicalDoc.pdfFileName;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    // Fallback direct link without target="_blank"
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const cleanPath = pedagogicalDoc.pdfPath.startsWith('/')
      ? pedagogicalDoc.pdfPath.slice(1)
      : pedagogicalDoc.pdfPath;
    const a = document.createElement('a');
    a.href = `${cleanBase}${cleanPath}`;
    a.download = pedagogicalDoc.pdfFileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } finally {
    onStatusChange?.(false);
  }
}
