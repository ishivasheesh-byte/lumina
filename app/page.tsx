'use client'

import { FormEvent, useEffect, useState } from 'react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import {
  ArrowRight, Bike, CarFront, Check, ChevronDown, CloudLightning, Crosshair,
  Equal, LocateFixed, Menu, Navigation, Package, Route, ShieldCheck, Smartphone,
  Sparkles, UserRound, UsersRound, X, Zap,
} from 'lucide-react'

const supabase: SupabaseClient | null = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  : null

const locations = [
  { name: 'Delhi', services: ['Bike', 'Auto', 'Cab', 'EV Cab', 'XL Cab', 'Parcel'] },
  { name: 'Gurugram', services: ['Bike', 'Auto', 'Cab', 'EV Cab', 'XL Cab'] },
  { name: 'Noida', services: ['Bike', 'Auto', 'Cab', 'EV Cab', 'Parcel'] },
  { name: 'Ghaziabad', services: ['Bike', 'Auto', 'Cab', 'Parcel'] },
  { name: 'Faridabad', services: ['Bike', 'Auto', 'Cab'] },
]
const rideTypes = [
  { id: 'bike', name: 'Bike', icon: Bike, description: 'Fast, practical mobility for short city trips.' },
  { id: 'auto', name: 'Auto', icon: CarFront, description: 'A familiar option for everyday local travel.' },
  { id: 'cab', name: 'Cab', icon: CarFront, description: 'Comfortable rides for work, errands, and longer journeys.' },
  { id: 'ev-cab', name: 'EV Cab', icon: Zap, description: 'Electric travel where available in your area.' },
  { id: 'xl-cab', name: 'XL Cab', icon: UsersRound, description: 'More space for groups, luggage, and family trips.' },
  { id: 'parcel', name: 'Parcel', icon: Package, description: 'Local parcel movement for everyday delivery needs.' },
]
const faqs = [
  ['Is Torkk available in my area?', 'Torkk is launching across Delhi NCR city by city. Availability can vary by locality and launch phase.'],
  ['How is pricing calculated?', 'The app shows the ride option, route, and final price before confirmation. Pricing varies by service, distance, time, and availability.'],
  ['How are drivers verified?', 'Driver onboarding includes identity and required document checks. Vehicle details are reviewed before activation.'],
  ['How does SOS work?', 'During an active ride, the app provides access to safety assistance and emergency support features.'],
  ['What if my driver does not arrive?', 'Use the in-app ride and support options so the Torkk team can help with the active trip.'],
  ['Can I drive part-time?', 'Yes. Driver partners can share a part-time, weekend, or flexible preference during onboarding.'],
]

export default function Page() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [location, setLocation] = useState('Delhi')
  const [selectedRide, setSelectedRide] = useState('cab')
  const [openFaq, setOpenFaq] = useState(0)
  const [planner, setPlanner] = useState({ pickup: '', destination: '', date: '', time: '', passengers: '1' })
  const [plannerMessage, setPlannerMessage] = useState('')
  const [driverMessage, setDriverMessage] = useState('')
  const [supportMessage, setSupportMessage] = useState('')
  const [driverLoading, setDriverLoading] = useState(false)
  const [supportLoading, setSupportLoading] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const activeLocation = locations.find((item) => item.name === location) ?? locations[0]
  const selected = rideTypes.find((ride) => ride.id === selectedRide) ?? rideTypes[2]

  function planRide(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!planner.pickup || !planner.destination || !planner.date || !planner.time) {
      setPlannerMessage('Add your pickup, destination, date, and time to continue.')
      return
    }
    setPlannerMessage('TORKK booking is launching soon in your area. Your ride details are ready for the app.')
  }

  async function submitLead(event: FormEvent<HTMLFormElement>, type: 'driver_application' | 'support_request') {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const payload = Object.fromEntries(form.entries())
    const setMessage = type === 'driver_application' ? setDriverMessage : setSupportMessage
    const setLoading = type === 'driver_application' ? setDriverLoading : setSupportLoading
    setLoading(true)
    setMessage('')
    if (!supabase) {
      setMessage('Form submissions are being connected. Please email support@torkk.in for now.')
      setLoading(false)
      return
    }
    const { error } = await supabase.from('torkk_leads').insert({ lead_type: type, ...payload })
    setLoading(false)
    if (error) {
      setMessage('We could not send that yet. Please email support@torkk.in and the TORKK team will help.')
      return
    }
    setMessage(type === 'driver_application' ? 'Application received → Verification → Onboarding → Start driving.' : 'Message received. The TORKK support team will get back to you.')
    event.currentTarget.reset()
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f6f8] text-[#121526]">
      <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? 'bg-white/95 shadow-sm backdrop-blur-lg' : 'bg-transparent'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-2 font-black tracking-[-0.08em] text-xl"><span className="rounded-md bg-[#10152c] px-2 py-1 text-white">TORKK</span><span className="hidden text-[10px] font-semibold tracking-[0.12em] text-[#d946a1] sm:inline">MOBILITY</span></a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-[#5b6074] lg:flex">{['Ride', 'Safety', 'Features', 'Drive', 'Support'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-[#d946a1]">{item}</a>)}</nav>
          <div className="flex items-center gap-3"><a href="#drive" className="hidden text-sm font-semibold text-[#5b6074] sm:block">Drive with Torkk</a><a href="#plan" className="rounded-full bg-[#10152c] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#10152c]/15 transition hover:-translate-y-0.5 hover:bg-[#273a91]">Book a Ride</a><button aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)} className="rounded-full p-2 lg:hidden">{menuOpen ? <X /> : <Menu />}</button></div>
        </div>
        {menuOpen && <nav className="flex flex-col gap-5 border-t bg-white px-6 py-6 text-sm font-semibold lg:hidden">{['Ride', 'Safety', 'Features', 'Drive', 'Support'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav>}
      </header>

      <section id="top" className="relative flex min-h-[690px] items-center overflow-hidden bg-[#10152c] pt-24">
        <div className="absolute inset-0 bg-cover bg-center opacity-45" style={{ backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Desktop.png-4tcHSFv4QvWcbAyFnhMyKsjrEtAPcc.jpeg')" }} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,14,34,.96),rgba(10,14,34,.55),rgba(10,14,34,.7))]" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
          <div className="max-w-2xl text-white"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium text-white/80 backdrop-blur"><Sparkles className="size-3.5 text-[#ef79bd]" /> Built for Delhi NCR</div><h1 className="max-w-2xl text-5xl font-bold leading-[.98] tracking-[-.055em] sm:text-7xl">Delhi NCR&apos;s <span className="bg-gradient-to-r from-[#fff] via-[#e1a0f0] to-[#71a4ff] bg-clip-text text-transparent">fairer way to move.</span></h1><p className="mt-6 max-w-lg text-base leading-7 text-white/70 sm:text-lg">A ride platform built around transparent fares, verified drivers, live tracking, and SOS support across Delhi NCR.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#plan" className="rounded-full bg-[#d946a1] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#ec63b2]">Book a Ride <ArrowRight className="ml-2 inline size-4" /></a><a href="#drive" className="rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20">Drive with Torkk</a></div><div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-white/65"><span><Check className="mr-1 inline size-3.5 text-[#ed7bc0]" /> Transparent pricing</span><span><Check className="mr-1 inline size-3.5 text-[#ed7bc0]" /> Verified drivers</span><span><Check className="mr-1 inline size-3.5 text-[#ed7bc0]" /> Safety first</span></div></div>
          <div className="hidden justify-end lg:flex"><div className="w-[290px] rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-xl"><div className="mb-4 flex items-center justify-between text-white"><span className="text-sm font-semibold">Your Torkk ride</span><span className="rounded-full bg-[#d946a1] px-2 py-1 text-[10px]">Coming soon</span></div><div className="relative h-64 overflow-hidden rounded-2xl bg-[#dfe7fb]"><div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'linear-gradient(125deg, transparent 48%, #7890db 49%, #7890db 51%, transparent 52%), linear-gradient(15deg, transparent 42%, #fff 43%, #fff 44%, transparent 45%)' }} /><LocateFixed className="absolute left-12 top-16 rounded-full bg-[#d946a1] p-2 text-white shadow-lg" /><Navigation className="absolute bottom-12 right-14 rounded-full bg-[#10152c] p-2 text-white shadow-lg" /><div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white p-3 shadow-lg"><div className="flex items-center justify-between text-xs"><span className="font-semibold">Delhi → Gurugram</span><span className="text-[#d946a1]">Preview</span></div></div></div><div className="mt-4 flex items-center gap-3 text-white/80"><Smartphone className="size-5 text-[#ef79bd]" /><span className="text-xs leading-5">One app for every ride, route, and reason to move.</span></div></div></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8" id="about"><div className="mx-auto max-w-xl text-center"><p className="eyebrow">The Torkk difference</p><h2 className="section-title">Why choose Torkk?</h2><p className="section-copy">A clearer alternative to one-size-fits-all platforms — with practical choices for riders and a better deal for driver partners.</p></div><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><div className="soft-card lg:col-span-2"><Equal className="icon-box" /><h3>Fair by design</h3><p>Transparent ride options designed to create a better experience for both riders and drivers.</p></div><div className="gradient-card lg:col-span-2"><ShieldCheck className="icon-box border-white/20 bg-white/15 text-white" /><h3>Uncompromised safety</h3><p>Verified drivers, real-time ride visibility, and safety-first features designed around every journey.</p></div></div></section>

      <section className="bg-white py-24" id="ride"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="eyebrow">Local, by design</p><h2 className="section-title">Where do you ride?</h2><p className="section-copy">Explore the launch footprint. Service status can vary by locality, and areas will be marked live as they open.</p></div><div className="flex gap-2 overflow-x-auto pb-1">{locations.map((item) => <button key={item.name} onClick={() => setLocation(item.name)} className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${location === item.name ? 'bg-[#10152c] text-white' : 'bg-[#f2f3f6] text-[#6b7082] hover:bg-[#e8eaf0]'}`}>{item.name}</button>)}</div></div><div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl bg-[#f5f6f8] p-5"><span className="mr-2 text-sm font-semibold">{activeLocation.name} services</span>{activeLocation.services.map((service) => <span key={service} className="rounded-full border border-[#e1e3eb] bg-white px-3 py-2 text-xs font-medium text-[#53586b]"><Check className="mr-1 inline size-3 text-[#d946a1]" />{service}</span>)}</div><p className="mt-4 text-xs text-[#85899a]">Availability may vary by locality, time, service type, and driver availability.</p></div></section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="eyebrow">Move your way</p><h2 className="section-title">Choose your Torkk</h2><p className="section-copy">Different journeys need different rides.</p></div><div className="flex max-w-full gap-2 overflow-x-auto pb-1">{rideTypes.map((ride) => <button key={ride.id} onClick={() => setSelectedRide(ride.id)} className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-xs font-bold transition ${selectedRide === ride.id ? 'border-[#d946a1] bg-[#d946a1] text-white' : 'border-[#e2e4eb] bg-white text-[#697084] hover:border-[#d946a1]'}`}>{ride.name}</button>)}</div></div><div className="mt-10 grid overflow-hidden rounded-[2rem] bg-white shadow-[0_22px_80px_rgba(26,31,66,.08)] lg:grid-cols-2"><div className="relative flex min-h-[310px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#e4e7f7] via-[#f0e8f1] to-[#d8e4fa]"><div className="rounded-3xl bg-[#10152c] p-6 text-white shadow-xl"><selected.icon className="size-12" /></div><span className="absolute bottom-8 rounded-full bg-[#d946a1] px-3 py-1 text-[10px] font-bold text-white">{selected.name} selected</span></div><div className="flex flex-col justify-center p-8 sm:p-12"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#d946a1]">Selected service</p><h3 className="mt-3 text-3xl font-bold tracking-tight">Torkk {selected.name}</h3><p className="mt-4 max-w-md leading-7 text-[#707688]">{selected.description}</p><p className="mt-7 text-xs font-bold uppercase tracking-[.14em] text-[#8a8ea0]">Best for</p><div className="mt-3 flex flex-wrap gap-2"><span className="rounded-full bg-[#f4ddea] px-3 py-2 text-xs font-semibold text-[#9a3472]">{location}</span><span className="rounded-full bg-[#edf0fa] px-3 py-2 text-xs font-semibold text-[#485da7]">Availability varies</span></div></div></div></section>

      <section className="bg-[#ebeef6] py-24" id="plan"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="mx-auto max-w-2xl text-center"><p className="eyebrow">Plan your journey</p><h2 className="section-title">See what your ride could look like.</h2><p className="section-copy">Plan details here, then finish booking in the Torkk app when service launches in your area.</p></div><form onSubmit={planRide} className="mx-auto mt-10 max-w-4xl rounded-[2rem] bg-white p-6 shadow-[0_18px_70px_rgba(26,31,66,.08)] sm:p-10"><div className="grid gap-5 sm:grid-cols-2"><label className="field">Pickup location<input required value={planner.pickup} onChange={(e) => setPlanner({ ...planner, pickup: e.target.value })} placeholder="Enter pickup location" /></label><label className="field">Destination<input required value={planner.destination} onChange={(e) => setPlanner({ ...planner, destination: e.target.value })} placeholder="Enter destination" /></label><label className="field">Date<input required type="date" value={planner.date} onChange={(e) => setPlanner({ ...planner, date: e.target.value })} /></label><label className="field">Time<input required type="time" value={planner.time} onChange={(e) => setPlanner({ ...planner, time: e.target.value })} /></label><label className="field">Ride type<select value={selectedRide} onChange={(e) => setSelectedRide(e.target.value)}>{rideTypes.map((ride) => <option key={ride.id} value={ride.id}>{ride.name}</option>)}</select></label><label className="field">Passengers<select value={planner.passengers} onChange={(e) => setPlanner({ ...planner, passengers: e.target.value })}>{['1', '2', '3', '4', '5+'].map((n) => <option key={n}>{n}</option>)}</select></label></div><div className="mt-7 flex flex-col items-start justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center"><p className="text-xs leading-5 text-[#7c8292]">No fake confirmation. We’ll tell you when booking is available.</p><button className="rounded-full bg-[#10152c] px-5 py-3 text-sm font-bold text-white hover:bg-[#273a91]">Check availability <ArrowRight className="ml-2 inline size-4" /></button></div>{plannerMessage && <p role="status" className="mt-5 rounded-xl bg-[#fdf1f8] p-4 text-sm font-semibold text-[#9a3472]">{plannerMessage}</p>}</form></div></section>

      <section className="bg-[#10152c] py-24 text-white" id="safety"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="max-w-xl"><p className="eyebrow text-[#ef79bd]">Built into every journey</p><h2 className="section-title text-white">Safety you can feel.</h2><p className="mt-4 leading-7 text-white/60">Our safety journey is designed to make the important checks visible before, during, and after your ride.</p></div><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[['Verified driver partners', 'Identity and required document checks.', UserRound], ['Vehicle verification', 'Vehicle details reviewed before activation.', ShieldCheck], ['Live ride visibility', 'Trip and location details during your journey.', LocateFixed], ['Emergency support', 'SOS and human support features in the app.', CloudLightning]].map(([title, copy, Icon]) => { const I = Icon as typeof ShieldCheck; return <div key={title as string} className="rounded-2xl border border-white/10 bg-white/[.06] p-6 transition hover:-translate-y-1 hover:bg-white/[.1]"><I className="size-6 text-[#ef79bd]" /><h3 className="mt-8 font-bold">{title as string}</h3><p className="mt-3 text-sm leading-6 text-white/55">{copy as string}</p></div> })}</div><div className="mt-10 flex flex-wrap items-center gap-3 text-xs font-bold text-white/70">{['Driver verification', 'Vehicle verification', 'Trip details', 'Live tracking', 'SOS', 'Support'].map((step, index) => <div key={step} className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-full bg-[#d946a1] text-white">{index + 1}</span>{step}{index < 5 && <ArrowRight className="hidden size-4 text-[#ef79bd] sm:block" />}</div>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8" id="features"><div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]"><div><p className="eyebrow">Simple steps</p><h2 className="section-title">How it works</h2><p className="section-copy">Book your journey in a few clear, confident steps.</p><div className="mt-10 hidden rounded-[2rem] bg-[#e4e8f7] p-6 lg:block"><div className="mx-auto w-52 rounded-[2rem] border-[7px] border-[#121526] bg-white p-3 shadow-2xl"><div className="mb-6 flex items-center justify-between text-[9px] font-bold"><span>Good morning</span><span className="rounded-full bg-[#f4d3e8] p-2"><UserRound className="size-3" /></span></div><div className="h-28 rounded-xl bg-[#dce5fa] p-3"><Route className="size-12 text-[#3b5bdb]" /><div className="mt-5 h-1 rounded bg-[#a8b9ea]" /></div><p className="mt-4 text-[10px] font-bold">Choose a ride</p>{['Bike', 'Auto', 'Cab'].map((item) => <div key={item} className="mt-2 flex items-center justify-between rounded-lg bg-[#f5f6f8] p-2 text-[9px]"><span>{item}</span><span className="text-[#d946a1]">Select</span></div>)}<div className="mt-3 rounded-full bg-[#d946a1] py-2 text-center text-[9px] font-bold text-white">Continue</div></div></div></div><div className="grid gap-3">{[['01', 'Set your pickup & destination', 'Enter where you are and where you want to go.', Navigation], ['02', 'Choose your ride', 'Select from available Torkk ride options.', CarFront], ['03', 'Get matched', 'Connect with an eligible nearby driver.', Crosshair], ['04', 'Track & reach safely', 'Follow your journey and stay connected.', LocateFixed]].map(([num, title, copy, Icon]) => { const I = Icon as typeof Navigation; return <div key={num as string} className="flex gap-5 rounded-2xl bg-white p-6 shadow-[0_10px_40px_rgba(26,31,66,.05)]"><span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#d946a1] text-xs font-bold text-white">{num as string}</span><div><I className="size-5 text-[#d946a1]" /><h3 className="mt-3 font-bold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-[#73798a]">{copy as string}</p></div></div> })}</div></div></section>

      <section className="bg-white py-24" id="drive"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.85fr_1.15fr] lg:px-8"><div><p className="eyebrow">For driver partners</p><h2 className="section-title">Drive with Torkk.</h2><p className="section-copy">Know what each trip is worth, choose your hours, and get clear onboarding support. Payment timing and fee details are shared before you start accepting rides in your area.</p><div className="mt-8 flex flex-wrap gap-2 text-xs font-bold text-[#6d7384]"><span>Apply</span><ArrowRight className="size-3 text-[#d946a1]" /><span>Verify</span><ArrowRight className="size-3 text-[#d946a1]" /><span>Onboard</span><ArrowRight className="size-3 text-[#d946a1]" /><span>Start driving</span></div></div><form onSubmit={(e) => submitLead(e, 'driver_application')} className="rounded-[2rem] bg-[#f5f6f8] p-6 sm:p-8"><div className="grid gap-4 sm:grid-cols-2"><label className="field">Name<input required name="name" placeholder="Your name" /></label><label className="field">Phone<input required name="phone" type="tel" placeholder="+91" /></label><label className="field">Vehicle type<select required name="vehicle_type"><option value="">Select one</option><option>Bike</option><option>Auto</option><option>Cab</option><option>EV Cab</option><option>XL Cab</option></select></label><label className="field">Operating area<select required name="operating_area"><option value="">Select one</option>{locations.map((item) => <option key={item.name}>{item.name}</option>)}</select></label><label className="field sm:col-span-2">Vehicle details<input required name="vehicle_details" placeholder="Model, year, registration" /></label><label className="field sm:col-span-2">Driving preference<select required name="driving_preference"><option value="">Select one</option><option>Full-time</option><option>Part-time</option><option>Weekends</option><option>Flexible</option></select></label></div><button disabled={driverLoading} className="mt-6 rounded-full bg-[#10152c] px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{driverLoading ? 'Sending…' : 'Apply to drive'} <ArrowRight className="ml-2 inline size-4" /></button>{driverMessage && <p role="status" className="mt-4 text-sm font-semibold text-[#9a3472]">{driverMessage}</p>}</form></div></section>

      <section className="bg-[#ebeef6] py-24" id="support"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.75fr_1.25fr] lg:px-8"><div><p className="eyebrow">Rider & driver support</p><h2 className="section-title">Need a hand?</h2><p className="section-copy">Ask about rides, onboarding, safety, or launch availability. Email us directly at <a className="font-bold text-[#9a3472]" href="mailto:support@torkk.in">support@torkk.in</a>.</p></div><form onSubmit={(e) => submitLead(e, 'support_request')} className="rounded-[2rem] bg-white p-6 shadow-[0_18px_70px_rgba(26,31,66,.08)] sm:p-8"><div className="grid gap-4 sm:grid-cols-2"><label className="field">Name<input required name="name" placeholder="Your name" /></label><label className="field">Phone<input required name="phone" type="tel" placeholder="+91" /></label><label className="field">I need help with<select required name="support_category"><option value="">Select one</option><option>Rider support</option><option>Driver support</option><option>Safety question</option><option>Launch availability</option></select></label><label className="field">Email<input name="email" type="email" placeholder="you@example.com" /></label><label className="field sm:col-span-2">Message<textarea required name="message" rows={4} placeholder="How can we help?" /></label></div><button disabled={supportLoading} className="mt-6 rounded-full bg-[#d946a1] px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{supportLoading ? 'Sending…' : 'Send message'} <ArrowRight className="ml-2 inline size-4" /></button>{supportMessage && <p role="status" className="mt-4 text-sm font-semibold text-[#9a3472]">{supportMessage}</p>}</form></div></section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8" id="faq"><div className="grid gap-12 lg:grid-cols-[.6fr_1.4fr]"><div><p className="eyebrow">Questions, answered</p><h2 className="section-title">FAQ</h2><p className="section-copy">Clear answers for riders and driver partners as Torkk launches across Delhi NCR.</p></div><div className="rounded-[2rem] bg-white p-4 shadow-[0_15px_50px_rgba(26,31,66,.06)]">{faqs.map(([question, answer], index) => <div key={question} className="border-b border-[#ececf1] last:border-0"><button className="flex w-full items-center justify-between gap-6 px-4 py-5 text-left text-sm font-semibold" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>{question}<ChevronDown className={`size-4 shrink-0 transition ${openFaq === index ? 'rotate-180 text-[#d946a1]' : 'text-[#9a9eaa]'}`} /></button>{openFaq === index && <p className="px-4 pb-5 text-sm leading-6 text-[#73798a]">{answer}</p>}</div>)}</div></div></section>

      <footer className="bg-[#10152c] px-5 py-12 text-white lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row"><div><div className="font-black tracking-[-0.08em] text-2xl">TORKK</div><p className="mt-3 max-w-xs text-sm leading-6 text-white/55">Fair, safe, and smarter mobility for Delhi NCR. Launching soon in your area.</p></div><div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/65"><a href="#ride" className="hover:text-white">Rider</a><a href="#drive" className="hover:text-white">Driver</a><a href="#safety" className="hover:text-white">Safety</a><a href="#support" className="hover:text-white">Support</a><a href="mailto:support@torkk.in" className="hover:text-white">Contact</a></div></div><div className="mx-auto mt-10 flex max-w-7xl justify-between border-t border-white/10 pt-5 text-xs text-white/40"><span>© 2026 Torkk Mobility</span><span>support@torkk.in</span></div></footer>
    </main>
  )
}
