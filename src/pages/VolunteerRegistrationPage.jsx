import { useState } from 'react';
import { CheckCircle2, ClipboardList, MessageCircle, ShieldCheck, Users } from 'lucide-react';

const whatsappNumber = '9647713857171';

const requirements = [
  'Female volunteers are required to wear full Islamic dress and niqab during events and courses.',
  'The official staff dress color for both men and women is black.',
  'Volunteers must wear the official Nukhba Organization staff badge.',
  'Applicants must be 18 years old or older.',
  'Outstanding volunteers may later be selected for official paid roles based on qualifications and performance.',
];

const updates = [
  'Preparation dates and times',
  'Event and course schedules',
  'All updates and announcements related to the organization',
];

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

function buildWhatsappMessage(form) {
  return [
    'Volunteer Registration Form',
    '',
    `First Name: ${form.firstName}`,
    `Last Name: ${form.lastName}`,
    `WhatsApp Number: ${form.whatsappNumber}`,
    `Phone Number: ${form.phoneNumber}`,
    `Age: ${form.age}`,
    `Address: ${form.address}`,
    '',
    `Why do you want to become a volunteer?: ${form.reason}`,
    `Have you volunteered before?: ${form.hasVolunteeredBefore}`,
    `If yes, please explain: ${form.experience || 'N/A'}`,
    '',
    `I confirm that all provided information is correct: ${form.confirmCorrect ? 'Yes' : 'No'}`,
    `I agree to the rules and conditions: ${form.agreeRules ? 'Yes' : 'No'}`,
  ].join('\n');
}

export default function VolunteerRegistrationPage() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    setForm(current => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!form.confirmCorrect || !form.agreeRules) {
      setError('Please confirm the information and agree to the rules before submitting.');
      return;
    }

    if (!form.firstName || !form.lastName || !form.whatsappNumber || !form.phoneNumber || !form.age || !form.address || !form.reason) {
      setError('Please complete all required fields before submitting.');
      return;
    }

    setError('');

    const message = encodeURIComponent(buildWhatsappMessage(form));
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="bg-[#f7f2e7] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-[2rem] bg-[#1d160b] text-white shadow-[0_30px_80px_rgba(49,31,0,0.22)]">
            <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(197,183,142,0.28),transparent_35%),linear-gradient(135deg,#1d160b,#31230f)] px-6 py-10 sm:px-8 lg:px-10">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#d9c999]">Get Involved</p>
              <h1 className="mt-4 text-4xl font-black uppercase leading-none sm:text-5xl lg:text-6xl">Volunteer Registration Form</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/78">
                Thank you for your interest in volunteering with us. All your information will be kept confidential.
                After submitting the form, we will contact you. Acceptance as a volunteer is subject to the approval of the Nukhba.global team.
              </p>
            </div>

            <div className="grid gap-6 px-6 py-8 sm:px-8 lg:grid-cols-2 lg:px-10">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-[#d9c999]" />
                  <h2 className="text-lg font-semibold uppercase text-white">Important Note</h2>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/74">
                  After being accepted as a volunteer, you will be added to the private Nukhba staff group. Through the group, you will receive:
                </p>
                <ul className="mt-4 space-y-3 text-sm text-white/78">
                  {updates.map(item => (
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
                  <h2 className="text-lg font-semibold uppercase text-white">Requirements</h2>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-white/78">
                  {requirements.map(item => (
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
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8a6f36]">Join The Team</p>
                <h2 className="mt-1 text-2xl font-bold text-[#2d230f]">Apply Through WhatsApp</h2>
              </div>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-[#8a6f36]">Personal Information</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="rounded-2xl border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]" />
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="rounded-2xl border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]" />
                  <input name="whatsappNumber" value={form.whatsappNumber} onChange={handleChange} placeholder="WhatsApp Number" className="rounded-2xl border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]" />
                  <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="rounded-2xl border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]" />
                  <input name="age" value={form.age} onChange={handleChange} placeholder="Age" className="rounded-2xl border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]" />
                  <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="rounded-2xl border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-[#8a6f36]">Volunteer Information</h3>
                <div className="mt-4 space-y-4">
                  <textarea name="reason" value={form.reason} onChange={handleChange} rows={4} placeholder="Why do you want to become a volunteer?" className="w-full rounded-[1.5rem] border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]" />
                  <div>
                    <p className="mb-3 text-sm font-semibold text-[#2d230f]">Have you volunteered before?</p>
                    <div className="flex flex-wrap gap-3">
                      {['Yes', 'No'].map(option => (
                        <label key={option} className="inline-flex items-center gap-2 rounded-full border border-[#e7dcc0] px-4 py-2 text-sm font-medium text-[#4e3f1d]">
                          <input type="radio" name="hasVolunteeredBefore" value={option} checked={form.hasVolunteeredBefore === option} onChange={handleChange} />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                  <textarea name="experience" value={form.experience} onChange={handleChange} rows={3} placeholder="If yes, please explain" className="w-full rounded-[1.5rem] border border-[#eadfc6] bg-[#fcfaf4] px-4 py-3 text-[#2d230f] outline-none transition focus:border-[#b59a62]" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-[#8a6f36]">Confirmation</h3>
                <div className="mt-4 space-y-3 rounded-[1.5rem] border border-[#efe5cf] bg-[#fcfaf4] p-5">
                  <label className="flex items-start gap-3 text-sm leading-7 text-[#433617]">
                    <input type="checkbox" name="confirmCorrect" checked={form.confirmCorrect} onChange={handleChange} className="mt-1" />
                    <span>I confirm that all provided information is correct.</span>
                  </label>
                  <label className="flex items-start gap-3 text-sm leading-7 text-[#433617]">
                    <input type="checkbox" name="agreeRules" checked={form.agreeRules} onChange={handleChange} className="mt-1" />
                    <span>I agree to the rules and conditions.</span>
                  </label>
                </div>
              </div>

              {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

              <button type="submit" className="inline-flex w-full items-center justify-center gap-3 rounded-[1.25rem] bg-[#1f7a44] px-6 py-4 text-sm font-bold uppercase tracking-[0.3em] text-white transition hover:bg-[#176438]">
                <MessageCircle className="h-5 w-5" />
                Submit To WhatsApp
              </button>

              <p className="text-center text-xs leading-6 text-[#6f5d35]">
                This form opens WhatsApp and sends your volunteer request directly to `0771-385-7171`.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
