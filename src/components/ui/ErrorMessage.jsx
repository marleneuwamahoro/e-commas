export default function ErrorMessage({ message = "Something went wrong.", retry }) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <div className="text-4xl">⚠️</div>
      <p className="text-ink-muted max-w-sm">{message}</p>
      {retry && (
        <button onClick={retry} className="btn-secondary">
          Try again
        </button>
      )}
    </div>
  );
}
