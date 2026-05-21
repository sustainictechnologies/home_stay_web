interface Props {
  videoId: string
  caption?: string
}

export default function VideoBlock({ videoId, caption }: Props) {
  if (!videoId) return null

  return (
    <div className="rounded-2xl overflow-hidden border border-stone-200 bg-black">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
          title="Homestay video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {caption && (
        <p className="px-4 py-2.5 text-xs text-stone-400 bg-white border-t border-stone-100">
          {caption}
        </p>
      )}
    </div>
  )
}