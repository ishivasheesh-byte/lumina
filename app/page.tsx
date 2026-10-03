'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Bike, CarFront, Check, ChevronDown, CloudLightning, Crosshair, Menu, Package, Route, ShieldCheck, Sparkles, UserRound, UsersRound, X, Zap } from 'lucide-react'

const locations = ['Delhi', 'Gurugram', 'Noida', 'Ghaziabad', 'Faridabad']
const vehicleTypes = [
  { name: 'Bike', icon: Bike, copy: 'Quick, practical city movement.' },
  { name: 'Auto', icon: CarFront, copy: 'Familiar everyday travel.' },
  { name: 'Cab', icon: CarFront, copy: 'Comfort for longer journeys.' },
  { name: 'EV Cab', icon: Zap, copy: 'A cleaner way to move.' },
  { name: 'XL Cab', icon: UsersRound, copy: 'More room for people and luggage.' },
  { name: 'Parcel', icon: Package, copy: 'Reliable local movement for essentials.' },
]
const faqs = [
  ['What is Torkk?', 'Torkk is a mobility company building fairer, safer, and more transparent ways to move across Delhi NCR.'],
  ['Where will Torkk launch?', 'Torkk is preparing to launch city by city across Delhi, Gurugram, Noida, Ghaziabad, and Faridabad.'],
  ['Can I book a ride on this website?', 'Not yet. This website is Torkk’s presence and information hub. Ride availability and booking will happen in the Torkk app when launched.'],
  ['How does Torkk approach safety?', 'Torkk is building around verified driver partners, vehicle checks, live ride visibility, and access to emergency support.'],
  ['How can I drive with Torkk?', 'Use the driver interest form or contact the Torkk team to learn about onboarding in your area.'],
]

export default function Page() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f6f8] text-[#121526]">
      <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? 'bg-white/95 shadow-sm backdrop-blur-lg' : 'bg-transparent'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-3"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO-tjDix3WcQf1OneFSPWsHo2ddCsrJz2.jpeg" alt="Torkk" className="size-10 rounded-xl object-cover shadow-lg" /><span className="text-sm font-black tracking-[.12em] text-[#d946a1]">TORKK</span></a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-[#5b6074] lg:flex">{['About', 'Vehicles', 'Safety', 'Drive', 'Support'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-[#d946a1]">{item}</a>)}</nav>
          <div className="flex items-center gap-3"><a href="#drive" className="hidden rounded-full bg-[#10152c] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#10152c]/15 transition hover:bg-[#273a91] sm:block">Drive with Torkk</a><button aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)} className="rounded-full p-2 lg:hidden">{menuOpen ? <X /> : <Menu />}</button></div>
        </div>
        {menuOpen && <nav className="flex flex-col gap-5 border-t bg-white px-6 py-6 text-sm font-semibold lg:hidden">{['About', 'Vehicles', 'Safety', 'Drive', 'Support'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav>}
      </header>

      <section id="top" className="relative flex min-h-[690px] items-center overflow-hidden bg-[#10152c] pt-24">
        <div className="absolute inset-0 bg-cover bg-center opacity-45" style={{ backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Desktop.png-4tcHSFv4QvWcbAyFnhMyKsjrEtAPcc.jpeg')" }} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,14,34,.96),rgba(10,14,34,.55),rgba(10,14,34,.7))]" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 lg:px-8"><div className="max-w-3xl text-white"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium text-white/80 backdrop-blur"><Sparkles className="size-3.5 text-[#ef79bd]" /> Built for Delhi NCR</div><h1 className="max-w-3xl text-5xl font-bold leading-[.98] tracking-[-.055em] sm:text-7xl">A fairer, safer way to <span className="bg-gradient-to-r from-[#fff] via-[#e1a0f0] to-[#71a4ff] bg-clip-text text-transparent">move.</span></h1><p className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg">Torkk is building transparent, people-first mobility for riders and driver partners across Delhi NCR.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#about" className="rounded-full bg-[#d946a1] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#ec63b2]">Discover Torkk <ArrowRight className="ml-2 inline size-4" /></a><a href="#drive" className="rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20">Drive with Torkk</a></div><div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-white/65"><span><Check className="mr-1 inline size-3.5 text-[#ed7bc0]" /> Transparent by design</span><span><Check className="mr-1 inline size-3.5 text-[#ed7bc0]" /> Verified partners</span><span><Check className="mr-1 inline size-3.5 text-[#ed7bc0]" /> Safety first</span></div></div></div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8" id="about"><div className="mx-auto max-w-2xl text-center"><p className="eyebrow">The Torkk difference</p><h2 className="section-title">Mobility with more thought behind it.</h2><p className="section-copy">We are building a better relationship between riders, drivers, and the cities they share.</p></div><div className="mt-12 grid gap-3 sm:grid-cols-3"><div className="soft-card"><Crosshair className="icon-box" /><h3>Fair by design</h3><p>Clear choices and transparent information for everyday travel.</p></div><div className="soft-card"><ShieldCheck className="icon-box" /><h3>Safety at the centre</h3><p>Verification, visibility, and support built into the experience.</p></div><div className="soft-card"><Route className="icon-box" /><h3>Made for the city</h3><p>Practical mobility shaped around how Delhi NCR actually moves.</p></div></div></section>

      <section className="bg-white py-24" id="vehicles"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="max-w-xl"><p className="eyebrow">Our mobility network</p><h2 className="section-title">The right vehicle for every reason to move.</h2><p className="section-copy">Torkk is bringing a considered mix of everyday vehicles to the region. Availability will vary by city and launch phase.</p></div><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{vehicleTypes.map(({ name, icon: Icon, copy }) => <div key={name} className="soft-card flex items-start gap-4"><div className="icon-box shrink-0"><Icon /></div><div><h3 className="mt-1">Torkk {name}</h3><p>{copy}</p></div></div>)}</div><div className="mt-10 flex flex-wrap gap-2">{locations.map((item) => <span key={item} className="rounded-full bg-[#f1f2f6] px-4 py-2 text-xs font-bold text-[#62697a]">{item}</span>)}</div></div></section>

      <section className="bg-[#10152c] py-24 text-white" id="safety"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="max-w-xl"><p className="eyebrow text-[#ef79bd]">Built into every journey</p><h2 className="section-title text-white">Safety you can feel.</h2><p className="mt-4 leading-7 text-white/60">A simple, visible approach to safety before, during, and after every ride.</p></div><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[['Verified partners', 'Identity and document checks.', UserRound], ['Vehicle checks', 'Vehicle details reviewed before activation.', ShieldCheck], ['Ride visibility', 'Trip and location details while moving.', Route], ['Emergency support', 'SOS and human support features.', CloudLightning]].map(([title, copy, Icon]) => { const I = Icon as typeof ShieldCheck; return <div key={title as string} className="rounded-2xl border border-white/10 bg-white/[.06] p-6"><I className="size-6 text-[#ef79bd]" /><h3 className="mt-8 font-bold">{title as string}</h3><p className="mt-3 text-sm leading-6 text-white/55">{copy as string}</p></div> })}</div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8" id="drive"><div className="grid gap-10 rounded-[2rem] bg-gradient-to-br from-[#273a91] to-[#d946a1] p-8 text-white sm:p-12 lg:grid-cols-[1.2fr_.8fr] lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-white/70">For driver partners</p><h2 className="mt-3 text-4xl font-bold tracking-[-.045em]">Drive with Torkk.</h2><p className="mt-4 max-w-xl leading-7 text-white/75">Choose your hours, get clear trip information, and be part of a mobility network designed with drivers in mind.</p><div className="mt-8 flex flex-wrap gap-3 text-xs font-bold text-white/80"><span>Apply</span><ArrowRight className="size-3" /><span>Verify</span><ArrowRight className="size-3" /><span>Onboard</span><ArrowRight className="size-3" /><span>Start driving</span></div><a href="mailto:support@torkk.in?subject=Drive with Torkk" className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-[#273a91]">Express driver interest <ArrowRight className="ml-2 size-4" /></a></div><div className="rounded-3xl border border-white/20 bg-white/10 p-6"><Bike className="size-12 text-white" /><p className="mt-6 text-sm leading-6 text-white/75">Driver applications are reviewed as Torkk launches in each area.</p></div></div></section>

      <section className="mx-auto max-w-4xl px-5 pb-24 lg:px-8" id="support"><div className="text-center"><p className="eyebrow">Questions</p><h2 className="section-title">Rider & driver support.</h2></div><div className="mt-10 divide-y divide-[#e4e6ed] rounded-2xl bg-white px-6">{faqs.map(([question, answer], index) => <div key={question}><button className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-semibold" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>{question}<ChevronDown className={`size-4 shrink-0 text-[#d946a1] transition ${openFaq === index ? 'rotate-180' : ''}`} /></button>{openFaq === index && <p className="max-w-2xl pb-5 text-sm leading-6 text-[#73798a]">{answer}</p>}</div>)}</div></section>

      <footer className="bg-[#10152c] px-5 py-12 text-white lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row"><div><div className="flex items-center gap-3"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO-tjDix3WcQf1OneFSPWsHo2ddCsrJz2.jpeg" alt="Torkk" className="size-10 rounded-xl object-cover" /><div className="font-black tracking-[-.08em] text-2xl">TORKK</div></div><p className="mt-3 max-w-xs text-sm leading-6 text-white/55">Fair, safe, and smarter mobility for Delhi NCR.</p></div><div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/65"><a href="#about" className="hover:text-white">About</a><a href="#vehicles" className="hover:text-white">Vehicles</a><a href="#safety" className="hover:text-white">Safety</a><a href="#drive" className="hover:text-white">Drive</a><a href="#support" className="hover:text-white">Support</a><a href="/legal" className="hover:text-white">Privacy & legal</a></div></div></footer>
    </main>
  )
}
