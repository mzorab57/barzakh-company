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

function normalizeTimeValue(value) {
  const raw = String(value || '').trim();

  if (!raw) {
    return '';
  }

  return raw.slice(0, 5);
}

function buildScheduleText(eventDate, startTime, endTime) {
  const dateText = String(eventDate || '').trim();
  const startText = normalizeTimeValue(startTime);
  const endText = normalizeTimeValue(endTime);

  if (dateText && startText && endText) {
    return `${dateText} | ${startText} - ${endText}`;
  }

  if (dateText && startText) {
    return `${dateText} | ${startText}`;
  }

  return dateText || 'N/A';
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

function buildPassCardViewModel(passItem, index, total) {
  const display = passItem.display || {};
  const ticketIndex = Number(passItem.ticketIndex || index + 1);
  const ticketCount = Number(passItem.ticketCount || total || 1);

  return {
    title: display.title || 'Event Pass',
    subtitle: display.subtitle || 'Ticket',
    subEventTitle: display.subEventTitle || '',
    passengerName: display.passengerName || 'Guest',
    eventDate: display.eventDate || 'N/A',
    startTime: display.startTime || '',
    endTime: display.endTime || '',
    scheduleText: buildScheduleText(display.eventDate || 'N/A', display.startTime || '', display.endTime || ''),
    location: display.location || '',
    ticketCode: passItem.ticketCode || '',
    sequenceLabel: `TICKET ${ticketIndex} OF ${ticketCount}`,
  };
}

function createPdfCardNode({ passItem, qrDataUrl }, index, total) {
  const view = buildPassCardViewModel(passItem, index, total);
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
    'direction:ltr',
    'text-align:left',
  ].join(';');

  wrapper.innerHTML = `
    <div style="direction:ltr;text-align:left;">
      <div style="min-width:0;max-width:100%;">
        <h1 style="margin:0;font-size:28px;line-height:1.2;text-align:left;">${escapeHtml(view.title)}</h1>
        ${view.subEventTitle ? `<p style="margin:10px 0 0;color:#6b7280;font-size:15px;text-align:left;">${escapeHtml(view.subEventTitle)}</p>` : ''}
        <div style="margin-top:16px;display:grid;gap:6px;justify-items:start;text-align:left;">
          <span style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#6b7280;">TICKET TYPE</span>
          <div style="display:inline-flex;align-items:center;justify-content:center;padding:7px 14px;color:#111827;font-size:12px;font-weight:700;white-space:nowrap;">${escapeHtml(view.subtitle)}</div>
        </div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:minmax(0,1fr) 180px;gap:24px;margin-top:24px;align-items:center;direction:ltr;">
      <div style="display:grid;gap:14px;text-align:left;">
        <p style="margin:0;display:grid;gap:4px;font-size:14px;text-align:left;">
          <span style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#6b7280;">PASSENGER</span>
          ${escapeHtml(view.passengerName)}
        </p>
        <p style="margin:0;display:grid;gap:4px;font-size:14px;text-align:left;">
          <span style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#6b7280;">DATE & TIME</span>
          ${escapeHtml(view.scheduleText)}
        </p>
        ${view.location ? `
        <p style="margin:0;display:grid;gap:4px;font-size:14px;text-align:left;">
          <span style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#6b7280;">LOCATION</span>
          ${escapeHtml(view.location)}
        </p>
        ` : ''}
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid #e5e7eb;border-radius:24px;padding:14px;background:#ffffff;text-align:center;">
        <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#8a6a2f;">${escapeHtml(view.sequenceLabel)}</p>
        <img src="${qrDataUrl}" alt="QR code" style="width:100%;height:auto;display:block;" />
        <p style="margin:12px 0 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#6b7280;">TICKET CODE</p>
        <p style="margin:6px 0 0;font-size:18px;font-weight:700;letter-spacing:0.16em;color:#111827;">${escapeHtml(view.ticketCode)}</p>
      </div>
    </div>
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

export async function buildInlineEmailPasses(payload) {
  const qrEntries = await buildQrEntries(payload);
  const total = qrEntries.length;

  return qrEntries.map(({ passItem, qrDataUrl }, index) => {
    const view = buildPassCardViewModel(passItem, index, total);

    return {
      sequenceLabel: view.sequenceLabel,
      title: view.title,
      subtitle: view.subtitle,
      subEventTitle: view.subEventTitle,
      passengerName: view.passengerName,
      eventDate: view.eventDate,
      startTime: view.startTime,
      endTime: view.endTime,
      scheduleText: view.scheduleText,
      location: view.location,
      ticketCode: view.ticketCode,
      qrDataUrl,
    };
  });
}

export async function downloadPrintablePassesPdf(payload, options = {}) {
  const qrEntries = await buildQrEntries(payload);
  const captureRoot = createPdfCaptureRoot();
  try {
    qrEntries.forEach((entry, index) => {
      captureRoot.appendChild(createPdfCardNode(entry, index, qrEntries.length));
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
