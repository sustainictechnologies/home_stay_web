import Image from 'next/image'
import type { HostStoryBlockData } from '@/types/blocks.types'

interface Props {
  data: HostStoryBlockData
}

export default function HostStoryBlock({ data }: Props) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 flex flex-col sm:flex-row gap-6">
      {data.host_image_url && (
        <div className="shrink-0">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-stone-100">
            <Image
              src={data.host_image_url}
              alt={data.story_title}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        </div>
      )}
      <div className="space-y-2">
        <h2 className="text-base font-semibold text-stone-900">{data.story_title}</h2>
        <p className="text-sm text-stone-600 leading-relaxed">{data.story_text}</p>
      </div>
    </div>
  )
}