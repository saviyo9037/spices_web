// Decorative line-art leaf spray used as a quiet background ornament.
export default function BotanicalLeaf({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M20 190C60 150 100 100 170 20" />
      <path d="M52 160c-6-26 2-44 24-58 6 26-2 44-24 58Z" />
      <path d="M82 128c-4-24 6-42 30-54 4 24-6 42-30 54Z" />
      <path d="M112 96c0-22 12-38 34-46 0 22-12 38-34 46Z" />
      <path d="M44 150c24 4 42-4 54-24-24-4-42 4-54 24Z" />
      <path d="M78 116c22 2 38-8 48-26-22-2-38 8-48 26Z" />
      <path d="M108 84c20 0 34-10 42-26-20 0-34 10-42 26Z" />
    </svg>
  );
}
