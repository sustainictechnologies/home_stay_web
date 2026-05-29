import { Suspense } from 'react'
import BuilderClient from './_components/BuilderClient'

export default function BuilderPage() {
  return (
    <Suspense>
      <BuilderClient />
    </Suspense>
  )
}
