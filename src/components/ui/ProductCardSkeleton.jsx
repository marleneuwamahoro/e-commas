export default function ProductCardSkeleton() {
  return (
    <div className="card flex flex-col animate-pulse">
      <div className="bg-surface-border aspect-square" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-4 bg-surface-border rounded w-3/4" />
        <div className="h-3 bg-surface-border rounded w-full" />
        <div className="h-3 bg-surface-border rounded w-2/3" />
        <div className="mt-4 pt-3 border-t border-surface-border flex justify-between items-center">
          <div className="h-5 bg-surface-border rounded w-16" />
          <div className="h-7 bg-surface-border rounded w-20" />
        </div>
      </div>
    </div>
  );
}
