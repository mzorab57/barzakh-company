import { useState } from 'react';
import { CheckCircle2, MessageCircle, Store, Ticket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getStallsPageContent } from '@/data/pageContent';
import { ApiError, apiRequest } from '@/lib/api';

const initialForm = {
  lastName: '',
  whatsappNumber: '',
  phoneNumber: '',
  purpose: '',
  details: '',
  eventName: '',
};

export default function StallsPage() {
  const { t } = useTranslation();
  const stallsPageContent = getStallsPageContent(t);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(current => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!form.lastName || !form.whatsappNumber || !form.phoneNumber || !form.purpose || !form.details || !form.eventName) {
      setError(stallsPageContent.form.errors.required);
      setInfo('');
      return;
    }

    setError('');
    setInfo('');
    setSubmitting(true);

    try {
      const response = await apiRequest('/api/stalls/applications', {
        method: 'POST',
        body: {
          full_name: form.lastName,
          phone: form.phoneNumber,
          whatsapp: form.whatsappNumber,
          booth_type: form.purpose,
          business_name: form.eventName,
          message: form.details,
        },
      });

      setInfo(response?.message || stallsPageContent.form.errors.submitted || '');
      setForm(initialForm);
    } catch (requestError) {
      if (requestError instanceof ApiError) {
        setError(requestError.message || stallsPageContent.form.errors.required);
      } else {
        setError(stallsPageContent.form.errors.required);
      }
      setInfo('');
    } finally {
      setSubmitting(false);
    }
  };

  const { hero, note, highlights, form: formContent } = stallsPageContent;

  return (
    <section className="bg-[#f7f2e7] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-[2rem] bg-[#1d160b] text-white shadow-[0_30px_80px_rgba(49,31,0,0.22)]">
            <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(197,183,142,0.28),transparent_35%),linear-gradient(135deg,#1d160b,#31230f)] px-6 py-10 sm:px-8 lg:px-10">
              <p className="text-5xl  font-semibold uppercase  text-[#d9c999]">{hero.eyebrow}</p>
              <h1 className="mt-4 text-3xl leading-[1.2]  ">{hero.title}</h1>
              <h1 className="mt-4 text-2xl leading-[1.2]  ">{hero.title2}</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/78">{hero.description}</p>
            </div>

            <div className="grid gap-6 px-6 py-8 sm:px-8 lg:grid-cols-2 lg:px-10">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Store className="h-5 w-5 text-[#d9c999]" />
                  <h2 className="text-lg font-semibold uppercase text-white">{note.title}</h2>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/74">{note.description}</p>
                <ul className="mt-4 space-y-3 text-sm text-white/78">
                  {note.items.map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d9c999]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Ticket className="h-5 w-5 text-[#d9c999]" />
                  <h2 className="text-lg font-semibold uppercase text-white">{highlights.title}</h2>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-white/78">
                  {highlights.items.map(item => (
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
                <Store className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase  text-[#8a6f36]">{formContent.badge}</p>
                <h2 className="mt-1 text-2xl font-bold text-[#2d230f]">{formContent.title}</h2>
              </div>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder={formContent.fields.lastName}
                  className="rounded-2xl border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]"
                />
                <input
                  name="whatsappNumber"
                  value={form.whatsappNumber}
                  onChange={handleChange}
                  placeholder={formContent.fields.whatsappNumber}
                  className="rounded-2xl border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]"
                />
                <input
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder={formContent.fields.phoneNumber}
                  className="rounded-2xl border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]"
                />
                <input
                  name="purpose"
                  value={form.purpose}
                  onChange={handleChange}
                  placeholder={formContent.fields.purpose}
                  className="rounded-2xl border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]"
                />
                <textarea
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  rows={5}
                  placeholder={formContent.fields.details}
                  className="w-full rounded-[1.5rem] border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]"
                />
                <input
                  name="eventName"
                  value={form.eventName}
                  onChange={handleChange}
                  placeholder={formContent.fields.eventName}
                  className="rounded-2xl border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]"
                />
              </div>

              {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
              {info ? <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{info}</p> : null}

              <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-3 rounded-[1.25rem] bg-[#1f7a44] px-6 py-4 text-sm font-bold uppercase text-white transition hover:bg-[#176438] disabled:cursor-not-allowed disabled:opacity-60">
                <MessageCircle className="h-5 w-5" />
                {submitting ? '...' : formContent.submitLabel}
              </button>

              {/* <p className="text-center text-xs leading-6 text-[#6f5d35]">{formContent.helperText}</p> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
