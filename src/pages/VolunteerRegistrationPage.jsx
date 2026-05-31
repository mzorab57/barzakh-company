import { useState } from 'react';
import { CheckCircle2, ClipboardList, MessageCircle, ShieldCheck, Users } from 'lucide-react';
import { volunteerRegistrationPageContent } from '@/data/pageContent';

const initialForm = {
  firstName: '',
  lastName: '',
  whatsappNumber: '',
  phoneNumber: '',
  age: '',
  address: '',
  reason: '',
  hasVolunteeredBefore: 'No',
  experience: '',
  confirmCorrect: false,
  agreeRules: false,
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildWhatsappMessage(form) {
  const { fields, excel } = volunteerRegistrationPageContent.form;

  return [
    excel.title,
    '',
    `${fields.firstName}: ${form.firstName}`,
    `${fields.lastName}: ${form.lastName}`,
    `${fields.whatsappNumber}: ${form.whatsappNumber}`,
    `${fields.phoneNumber}: ${form.phoneNumber}`,
    `${fields.age}: ${form.age}`,
    `${fields.address}: ${form.address}`,
    '',
    `${fields.reason}: ${form.reason}`,
    `${fields.volunteeredBefore}: ${form.hasVolunteeredBefore}`,
    `${fields.experience}: ${form.experience || excel.emptyValue}`,
    '',
    `${fields.confirmCorrect}: ${form.confirmCorrect ? 'Yes' : 'No'}`,
    `${fields.agreeRules}: ${form.agreeRules ? 'Yes' : 'No'}`,
  ].join('\n');
}

function buildExcelHtml(form) {
  const { fields, excel } = volunteerRegistrationPageContent.form;
  const rows = [
    [excel.title, ''],
    [fields.firstName, form.firstName],
    [fields.lastName, form.lastName],
    [fields.whatsappNumber, form.whatsappNumber],
    [fields.phoneNumber, form.phoneNumber],
    [fields.age, form.age],
    [fields.address, form.address],
    [fields.reason, form.reason],
    [fields.volunteeredBefore, form.hasVolunteeredBefore],
    [fields.experience, form.experience || excel.emptyValue],
    [fields.confirmCorrect, form.confirmCorrect ? 'Yes' : 'No'],
    [fields.agreeRules, form.agreeRules ? 'Yes' : 'No'],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><th style="text-align:left;padding:12px;border:1px solid #d8cfbb;background:#f4ecda;">${escapeHtml(label)}</th><td style="padding:12px;border:1px solid #d8cfbb;">${escapeHtml(value)}</td></tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
  <head>
    <meta charset="UTF-8" />
    <meta name="ProgId" content="Excel.Sheet" />
    <meta name="Generator" content="Nukhba Volunteer Form" />
  </head>
  <body>
    <table style="border-collapse:collapse;font-family:Arial,sans-serif;width:100%;max-width:960px;">
      ${tableRows}
    </table>
  </body>
</html>`;
}

function createExcelFile(form) {
  const content = buildExcelHtml(form);
  const blob = new Blob([content], {
    type: 'application/vnd.ms-excel;charset=utf-8;',
  });
  const safeName = `${form.firstName || 'volunteer'}-${form.lastName || 'form'}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return new File([
    blob,
  ], `${volunteerRegistrationPageContent.form.excel.filePrefix}-${safeName || 'registration'}.xls`, {
    type: 'application/vnd.ms-excel;charset=utf-8;',
  });
}

function downloadExcelFile(file) {
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function VolunteerRegistrationPage() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    setForm(current => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!form.confirmCorrect || !form.agreeRules) {
      setError(volunteerRegistrationPageContent.form.errors.confirm);
      setInfo('');
      return;
    }

    if (!form.firstName || !form.lastName || !form.whatsappNumber || !form.phoneNumber || !form.age || !form.address || !form.reason) {
      setError(volunteerRegistrationPageContent.form.errors.required);
      setInfo('');
      return;
    }

    setError('');
    setInfo('');

    const file = createExcelFile(form);
    const whatsappText = buildWhatsappMessage(form);

    if (navigator.canShare && navigator.share && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: volunteerRegistrationPageContent.form.excel.shareTitle,
          text: whatsappText,
        });
        setInfo(volunteerRegistrationPageContent.form.errors.shared);
        return;
      } catch (shareError) {
        if (shareError?.name === 'AbortError') {
          setInfo(volunteerRegistrationPageContent.form.errors.canceled);
          return;
        }
      }
    }

    downloadExcelFile(file);
    const message = encodeURIComponent(
      `${whatsappText}\n\n${volunteerRegistrationPageContent.form.excel.followUpMessage}`
    );
    window.open(
      `https://wa.me/${volunteerRegistrationPageContent.whatsappNumber}?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    );
    setInfo(volunteerRegistrationPageContent.form.errors.downloaded);
  };

  const { hero, note, requirements, form: formContent } = volunteerRegistrationPageContent;

  return (
    <section className="bg-[#f7f2e7] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-[2rem] bg-[#1d160b] text-white shadow-[0_30px_80px_rgba(49,31,0,0.22)]">
            <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(197,183,142,0.28),transparent_35%),linear-gradient(135deg,#1d160b,#31230f)] px-6 py-10 sm:px-8 lg:px-10">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#d9c999]">{hero.eyebrow}</p>
              <h1 className="mt-4 text-4xl font-black uppercase leading-none sm:text-5xl lg:text-6xl">{hero.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/78">{hero.description}</p>
            </div>

            <div className="grid gap-6 px-6 py-8 sm:px-8 lg:grid-cols-2 lg:px-10">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-[#d9c999]" />
                  <h2 className="text-lg font-semibold uppercase text-white">{note.title}</h2>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/74">{note.description}</p>
                <ul className="mt-4 space-y-3 text-sm text-white/78">
                  {note.updates.map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d9c999]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <ClipboardList className="h-5 w-5 text-[#d9c999]" />
                  <h2 className="text-lg font-semibold uppercase text-white">{requirements.title}</h2>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-white/78">
                  {requirements.items.map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d9c999]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-[0_25px_70px_rgba(72,47,0,0.12)] sm:p-8">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#f4ecda] p-3 text-[#8a6f36]">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8a6f36]">{formContent.badge}</p>
                <h2 className="mt-1 text-2xl font-bold text-[#2d230f]">{formContent.title}</h2>
              </div>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-[#8a6f36]">{formContent.personalInformationTitle}</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder={formContent.fields.firstName} className="rounded-2xl border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]" />
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder={formContent.fields.lastName} className="rounded-2xl border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]" />
                  <input name="whatsappNumber" value={form.whatsappNumber} onChange={handleChange} placeholder={formContent.fields.whatsappNumber} className="rounded-2xl border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]" />
                  <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder={formContent.fields.phoneNumber} className="rounded-2xl border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]" />
                  <input name="age" value={form.age} onChange={handleChange} placeholder={formContent.fields.age} className="rounded-2xl border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]" />
                  <input name="address" value={form.address} onChange={handleChange} placeholder={formContent.fields.address} className="rounded-2xl border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-[#8a6f36]">{formContent.volunteerInformationTitle}</h3>
                <div className="mt-4 space-y-4">
                  <textarea name="reason" value={form.reason} onChange={handleChange} rows={4} placeholder={formContent.fields.reason} className="w-full rounded-[1.5rem] border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]" />
                  <div>
                    <p className="mb-3 text-sm font-semibold text-[#2d230f]">{formContent.fields.volunteeredBefore}</p>
                    <div className="flex flex-wrap gap-3">
                      {formContent.radioOptions.map(option => (
                        <label key={option} className="inline-flex items-center gap-2 rounded-full border border-[#e7dcc0] px-4 py-2 text-sm font-medium text-[#4e3f1d]">
                          <input type="radio" name="hasVolunteeredBefore" value={option} checked={form.hasVolunteeredBefore === option} onChange={handleChange} />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                  <textarea name="experience" value={form.experience} onChange={handleChange} rows={3} placeholder={formContent.fields.experience} className="w-full rounded-[1.5rem] border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-[#8a6f36]">{formContent.confirmationTitle}</h3>
                <div className="mt-4 space-y-3 rounded-[1.5rem] border border-[#efe5cf] bg-[#fcfaf4] p-5">
                  <label className="flex items-start gap-3 text-sm leading-7 text-[#433617]">
                    <input type="checkbox" name="confirmCorrect" checked={form.confirmCorrect} onChange={handleChange} className="mt-1" />
                    <span>{formContent.fields.confirmCorrect}</span>
                  </label>
                  <label className="flex items-start gap-3 text-sm leading-7 text-[#433617]">
                    <input type="checkbox" name="agreeRules" checked={form.agreeRules} onChange={handleChange} className="mt-1" />
                    <span>{formContent.fields.agreeRules}</span>
                  </label>
                </div>
              </div>

              {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
              {info ? <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{info}</p> : null}

              <button type="submit" className="inline-flex w-full items-center justify-center gap-3 rounded-[1.25rem] bg-[#1f7a44] px-6 py-4 text-sm font-bold uppercase tracking-[0.3em] text-white transition hover:bg-[#176438]">
                <MessageCircle className="h-5 w-5" />
                {formContent.submitLabel}
              </button>

              <p className="text-center text-xs leading-6 text-[#6f5d35]">{formContent.helperText}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
