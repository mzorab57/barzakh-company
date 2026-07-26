import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { generateQrDataUrl } from './qr';

const PDF_PAGE_MARGIN = 24;
const PDF_CAPTURE_WIDTH = 720;

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildClientMessageHtml(display = {}) {
  const passengerName = display.passengerName || 'Guest';
  const eventDate = display.eventDate || 'N/A';
  const subEventTitle = display.subEventTitle || 'Main event';
  const location = display.location || 'N/A';

  return `
    <div style="margin-top:22px;padding:18px 20px;border-radius:22px;background:#faf7ef;border:1px solid #eadfb9;line-height:1.9;font-size:14px;color:#2f2410;">
      <p style="margin:0 0 10px;font-weight:700;">السلام عليكم ورحمه الله وبركاته</p>
      <p style="margin:0 0 10px;">${escapeHtml(passengerName)} خۆشەویست،</p>
      <p style="margin:0 0 10px;">سوپاس بۆ داواکارییەکەت، داواکارییەکەت بە سەرکەوتوویی ئەنجامدرا. هیوادارین بە بەژداری کردنت ببێتە مایەی خێر و بەرەکەت بۆ دونیا و قیانەی، ئێمەش بەردەوام بین کە خزمەتکردنی ئێوەی ئازیز و خۆشەویست و دین و نیشتیمانمان بکەین.</p>
      <p style="margin:0;"><strong>${escapeHtml(eventDate)}</strong> / <strong>${escapeHtml(subEventTitle)}</strong> [ <strong>${escapeHtml(location)}</strong> ]</p>
    </div>
  `;
}

function buildPdfFileName(payload, options = {}) {
  const explicitFileName = String(options.fileName || '').trim();
  if (explicitFileName) {
    return explicitFileName.endsWith('.pdf') ? explicitFileName : `${explicitFileName}.pdf`;
  }

  const orderNumber = String(payload?.order?.orderNumber || 'passes').trim();
  const safeName = orderNumber.replace(/[^a-z0-9-_]+/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

  return `${safeName || 'passes'}.pdf`;
}

async function buildQrEntries(payload) {
  const passes = Array.isArray(payload?.printablePasses) ? payload.printablePasses : [];

  if (passes.length === 0) {
    throw new Error('No printable passes are available.');
  }

  return Promise.all(
    passes.map(async (passItem) => ({
      passItem,
      qrDataUrl: await generateQrDataUrl(passItem.qrPayload || passItem.ticketCode),
    })),
  );
}

function createPdfCardNode({ passItem, qrDataUrl, orderNumber }) {
  const display = passItem.display || {};
  const wrapper = document.createElement('article');

  wrapper.style.cssText = [
    `width:${PDF_CAPTURE_WIDTH}px`,
    'background:#ffffff',
    'border:1px solid #e5e7eb',
    'border-radius:28px',
    'padding:28px',
    'color:#111827',
    'box-sizing:border-box',
    'font-family:Doran, Inter, Arial, sans-serif',
    'box-shadow:0 10px 30px rgba(17,24,39,0.08)',
  ].join(';');

  wrapper.innerHTML = `
    <div style="display:flex;justify-content:space-between;gap:12px;align-items:center;">
      <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6b7280;">NukhbaGlobal Pass</p>
      <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:0.16em;color:#92400e;">${escapeHtml(display.status || 'valid')}</p>
    </div>
    <h1 style="margin:18px 0 0;font-size:26px;line-height:1.25;">${escapeHtml(display.title || 'Event Pass')}</h1>
    <p style="margin:8px 0 0;color:#4b5563;font-size:15px;">${escapeHtml(display.subtitle || 'Ticket')}</p>
    <div style="display:grid;grid-template-columns:1fr 180px;gap:24px;margin-top:24px;align-items:center;">
      <div style="display:grid;gap:14px;">
        <p style="margin:0;display:grid;gap:4px;font-size:14px;">
          <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#6b7280;">Passenger</span>
          ${escapeHtml(display.passengerName || 'Guest')}
        </p>
        <p style="margin:0;display:grid;gap:4px;font-size:14px;">
          <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#6b7280;">Order</span>
          ${escapeHtml(display.orderNumber || orderNumber || '')}
        </p>
        <p style="margin:0;display:grid;gap:4px;font-size:14px;">
          <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#6b7280;">Event Date</span>
          ${escapeHtml(display.eventDate || 'N/A')}
        </p>
        <p style="margin:0;display:grid;gap:4px;font-size:14px;">
          <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#6b7280;">Session</span>
          ${escapeHtml(display.subEventTitle || 'Main event')}
        </p>
        ${display.location ? `
        <p style="margin:0;display:grid;gap:4px;font-size:14px;">
          <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#6b7280;">Location</span>
          ${escapeHtml(display.location)}
        </p>
        ` : ''}
        <p style="margin:0;display:grid;gap:4px;font-size:14px;">
          <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#6b7280;">Ticket Code</span>
          ${escapeHtml(passItem.ticketCode || '')}
        </p>
      </div>
      <div style="display:flex;align-items:center;justify-content:center;border:1px solid #e5e7eb;border-radius:24px;padding:12px;background:#ffffff;">
        <img src="${qrDataUrl}" alt="QR code" style="width:100%;height:auto;display:block;" />
      </div>
    </div>
    ${buildClientMessageHtml(display)}
  `;

  return wrapper;
}

function createPdfCaptureRoot() {
  const root = document.createElement('div');
  root.setAttribute('aria-hidden', 'true');
  root.style.cssText = [
    'position:fixed',
    'left:-10000px',
    'top:0',
    'width:0',
    'height:0',
    'overflow:hidden',
    'opacity:0',
    'pointer-events:none',
    'z-index:-1',
  ].join(';');
  document.body.appendChild(root);
  return root;
}

async function waitForImages(root) {
  const images = Array.from(root.querySelectorAll('img'));
  const pendingImages = images.filter((img) => !img.complete);

  await Promise.all(
    pendingImages.map(
      (img) =>
        new Promise((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        }),
    ),
  );
}

function appendCanvasToPdf(pdf, canvas, pageIndex) {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const maxWidth = pageWidth - (PDF_PAGE_MARGIN * 2);
  const maxHeight = pageHeight - (PDF_PAGE_MARGIN * 2);
  const widthRatio = maxWidth / canvas.width;
  const heightRatio = maxHeight / canvas.height;
  const scaleRatio = Math.min(widthRatio, heightRatio);
  const renderWidth = canvas.width * scaleRatio;
  const renderHeight = canvas.height * scaleRatio;
  const x = (pageWidth - renderWidth) / 2;
  const y = (pageHeight - renderHeight) / 2;

  if (pageIndex > 0) {
    pdf.addPage();
  }

  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, renderWidth, renderHeight, undefined, 'FAST');
}

function triggerPdfDownload(pdfBlob, fileName) {
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}

export async function downloadPrintablePassesPdf(payload, options = {}) {
  const qrEntries = await buildQrEntries(payload);
  const captureRoot = createPdfCaptureRoot();
  const orderNumber = payload?.order?.orderNumber || 'Order';

  try {
    qrEntries.forEach((entry) => {
      captureRoot.appendChild(createPdfCardNode({ ...entry, orderNumber }));
    });

    await waitForImages(captureRoot);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
      compress: true,
    });

    for (let index = 0; index < captureRoot.children.length; index += 1) {
      const card = captureRoot.children[index];
      const canvas = await html2canvas(card, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      appendCanvasToPdf(pdf, canvas, index);
    }

    const pdfBlob = pdf.output('blob');
    triggerPdfDownload(pdfBlob, buildPdfFileName(payload, options));
  } finally {
    captureRoot.remove();
  }
}
