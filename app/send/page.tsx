import { Suspense } from 'react'
import SendForm from './SendForm'

export default function SendPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-[#F5F0E8]">Loading...</div>}>
      <SendForm />
    </Suspense>
  )
}
