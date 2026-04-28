const defaultHighlights = [
  'Detailed program information',
  'Travel and logistics guidance',
  'Registration updates and next steps',
];

export default function MenuLandingPage({
  eyebrow = 'Barzakh Company',
  title,
  description,
  highlights = defaultHighlights,
}) {
  return (
    <section className="min-h-[calc(100vh-10rem)] bg-[#f7f2e7] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#88743e]">
            {eyebrow}
          </p>
          <h1 className="text-4xl font-bold leading-tight text-[#2f2611] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5c4a24]">
            {description}
          </p>
        </div>

        <div className="w-full max-w-xl rounded-[2rem] bg-white p-8 shadow-[0_20px_60px_rgba(60,40,0,0.12)]">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#88743e]">
            Page Overview
          </p>
          <div className="mt-4 h-1.5 w-24 rounded-full bg-[#c6b78e]" />
          <ul className="mt-8 space-y-4">
            {highlights.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-[#efe3c7] bg-[#fcfaf4] px-5 py-4 text-base font-medium text-[#3d3218]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
