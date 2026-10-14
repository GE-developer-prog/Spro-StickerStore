export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;
  const nums = Array.from({ length: pages }, (_, i) => i + 1);
  return (
    <nav className="pagination" aria-label="Pages">
      <button onClick={() => onChange(page - 1)} disabled={page === 1}>Previous</button>
      {nums.map((n) => (
        <button key={n} className={n === page ? "active" : ""} onClick={() => onChange(n)} aria-current={n === page ? "page" : undefined}>{n}</button>
      ))}
      <button onClick={() => onChange(page + 1)} disabled={page === pages}>Next</button>
    </nav>
  );
}
