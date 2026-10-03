'use client'

import { useState } from 'react'
import { ArrowLeft, ExternalLink, FileText, ShieldCheck } from 'lucide-react'

const documents = [
  { id: 'privacy', title: 'Privacy Policy', description: 'How Torkk collects, uses, protects, and shares information across its platform.', href: '/legal/privacy-policy.pdf' },
  { id: 'terms', title: 'Terms & Conditions', description: 'The user terms governing access to the Torkk platform and mobility services.', href: '/legal/terms-and-conditions-users.pdf' },
  { id: 'refunds', title: 'Refund & Cancellation', description: 'Cancellation windows, service failures, refund timelines, and dispute support.', href: '/legal/cancellation-refund-policy.pdf' },
]

export default function LegalPage() {
  const [active, setActive] = useState('privacy')
  const document = documents.find((item) => item.id === active) ?? documents[0]

  return (
    <main className="min-h-screen bg-[#f5f6f8] text-[#121526]">
      <header className="border-b border-[#e3e5ec] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="Back to Torkk home">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO-T91eFJ8KrteFXlOyDg2p1yw09CatDK.jpeg" alt="Torkk" className="size-11 rounded-xl object-cover" />
            <span className="font-black tracking-[-0.07em] text-xl">TORKK</span>
          </a>
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#5d6375] hover:text-[#d946a1]"><ArrowLeft className="size-4" /> Back home</a>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="max-w-2xl"><p className="eyebrow">Transparency first</p><h1 className="mt-3 text-5xl font-bold tracking-[-0.05em]">Policies that keep every journey clear.</h1><p className="mt-5 leading-7 text-[#707688]">Review the policies for Torkk, operated by BLACKORIGINX PRIVATE LIMITED. These documents are provided for your reference before using the platform or services.</p></div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <nav className="flex flex-col gap-3" aria-label="Legal documents">{documents.map((item) => <button key={item.id} onClick={() => setActive(item.id)} className={`rounded-2xl p-5 text-left transition ${active === item.id ? 'bg-[#10152c] text-white shadow-xl shadow-[#10152c]/15' : 'bg-white text-[#121526] hover:-translate-y-0.5 hover:shadow-lg'}`}><div className="flex items-start gap-3"><FileText className={`mt-0.5 size-5 ${active === item.id ? 'text-[#ef79bd]' : 'text-[#d946a1]'}`} /><span><span className="block font-bold">{item.title}</span><span className={`mt-2 block text-sm leading-6 ${active === item.id ? 'text-white/65' : 'text-[#747a8b]'}`}>{item.description}</span></span></div></button>)}</nav>
          <article className="rounded-[2rem] bg-white p-7 shadow-[0_18px_70px_rgba(26,31,66,.08)] sm:p-10"><div className="flex items-start justify-between gap-5"><div><ShieldCheck className="size-7 text-[#d946a1]" /><h2 className="mt-5 text-3xl font-bold tracking-tight">{document.title}</h2><p className="mt-3 leading-6 text-[#747a8b]">{document.description}</p></div><a href={document.href} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#10152c] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#273a91]">Open PDF <ExternalLink className="size-3.5" /></a></div><div className="mt-10 overflow-hidden rounded-2xl border border-[#e5e7ee] bg-[#f5f6f8]"><iframe title={document.title} src={`${document.href}#view=FitH`} className="h-[680px] w-full" /></div></article>
        </div>
      </section>
      <footer className="border-t border-[#e3e5ec] bg-white px-5 py-7 text-center text-xs text-[#858a9a]">© {new Date().getFullYear()} BLACKORIGINX PRIVATE LIMITED · TORKK</footer>
    </main>
  )
}
