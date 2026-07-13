import { useState } from 'react';
import { CheckCircle2, ClipboardList, MessageCircle, ShieldCheck, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getVolunteerRegistrationPageContent } from '@/data/pageContent';
import { ApiError, apiRequest } from '@/lib/api';

const initialForm = {
  firstName: '',
  lastName: '',
  whatsappNumber: '',
  phoneNumber: '',
  age: '',
  gender: '',
  address: '',
  reason: '',
  hasVolunteeredBefore: 'no',
  experience: '',
  confirmCorrect: false,
  agreeRules: false,
};

export default function VolunteerRegistrationPage() {
  const { t } = useTranslation();
  const volunteerRegistrationPageContent = getVolunteerRegistrationPageContent(t);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

    if (!form.firstName || !form.lastName || !form.whatsappNumber || !form.phoneNumber || !form.age || !form.gender || !form.address || !form.reason) {
      setError(volunteerRegistrationPageContent.form.errors.required);
      setInfo('');
      return;
    }

    setError('');
    setInfo('');
    setSubmitting(true);

    try {
      const experience = [
        form.gender ? `Gender: ${form.gender}` : '',
        form.experience || '',
      ]
        .filter(Boolean)
        .join('\n\n');

      const response = await apiRequest('/api/volunteers/applications', {
        method: 'POST',
        body: {
          first_name: form.firstName,
          last_name: form.lastName,
          whatsapp_number: form.whatsappNumber,
          phone_number: form.phoneNumber,
          age: Number(form.age),
          address: form.address,
          reason: form.reason,
          has_volunteered_before: form.hasVolunteeredBefore,
          experience: experience || null,
          confirm_correct: form.confirmCorrect,
          agree_rules: form.agreeRules,
        },
      });

      setInfo(response?.message || volunteerRegistrationPageContent.form.errors.submitted || '');
      setForm(initialForm);
    } catch (requestError) {
      if (requestError instanceof ApiError) {
        setError(requestError.message || volunteerRegistrationPageContent.form.errors.required);
      } else {
        setError(volunteerRegistrationPageContent.form.errors.required);
      }
      setInfo('');
    } finally {
      setSubmitting(false);
    }
  };

  const { hero, note, requirements, form: formContent } = volunteerRegistrationPageContent;

  return (
    <section className="bg-[#f7f2e7] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-[2rem] bg-[#1d160b] text-white shadow-[0_30px_80px_rgba(49,31,0,0.22)]">
            <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(197,183,142,0.28),transparent_35%),linear-gradient(135deg,#1d160b,#31230f)] px-6 py-10 sm:px-8 lg:px-10">
              <h1 className="text-4xl  font-semibold uppercase tracking-[0.35em] text-[#d9c999]">{hero.eyebrow}</h1>
              <h1 className="mt-4 text-3xl font-black uppercase leading-none sm:text-5xl lg:text-6xl">{hero.title}</h1>
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
                  <input name="gender" value={form.gender} onChange={handleChange} placeholder={formContent.fields.gender} className="rounded-2xl border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]" />
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
                        <label key={option.value} className="inline-flex items-center gap-2 rounded-full border border-[#e7dcc0] px-4 py-2 text-sm font-medium text-[#4e3f1d]">
                          <input type="radio" name="hasVolunteeredBefore" value={option.value} checked={form.hasVolunteeredBefore === option.value} onChange={handleChange} />
                          {option.label}
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

              <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-3 rounded-[1.25rem] bg-[#1f7a44] px-6 py-4 text-sm font-bold uppercase tracking-[0.3em] text-white transition hover:bg-[#176438] disabled:cursor-not-allowed disabled:opacity-60">
                {/* <MessageCircle className="h-5 w-5" /> */}
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
