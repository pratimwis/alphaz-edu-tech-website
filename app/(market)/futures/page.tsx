import MarketTable from "@/components/MarketTable";

export default function FuturesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-[var(--text-strong)]">Futures Markets</h1>
        <p className="text-sm text-[var(--text-muted)]">Trade perpetual contracts with up to 200x leverage</p>
      </div>
      
      <MarketTable />
    </div>
  );
}
