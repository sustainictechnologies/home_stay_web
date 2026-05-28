import Topbar from '../_components/Topbar'

export default function RegionsPage() {
  return (
    <div className="flex flex-col h-full">
      <Topbar title="Regions" subtitle="Manage active travel regions" />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto">
            <span className="text-3xl">🌿</span>
          </div>
          <p className="text-sm font-semibold text-stone-700">Regions</p>
          <p className="text-xs text-stone-400">This section is under construction.</p>
        </div>
      </main>
    </div>
  )
}
