import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(ScrollTrigger, CustomEase)
CustomEase.create("boutique", "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1")

// ─── COPY ────────────────────────────────────────────────────
const COPY = {
  nav: {
    brand: "María Emilia Montes García",
    links: ["Terapias", "Enfoque", "Contacto"],
    cta: "Agendar Sesión"
  },
  hero: {
    eyebrow: "EL ESPACIO DONDE",
    title1: "La sanación",
    title2: "comienza.",
    subtitle: "Psicóloga clínica especializada en terapia individual, sistémica y familiar.",
    cta: "Iniciar Mi Proceso",
    status: "SESSION_STATUS: ABIERTO"
  },
  services: {
    sectionLabel: "// MODALIDADES_TERAPÉUTICAS",
    shuffler: {
      title: "Terapia Individual",
      desc: "Un proceso de autoconocimiento profundo y transformación personal.",
      cards: [
        { label: "DIAGNÓSTICO_INICIAL", desc: "Evaluación integral del estado emocional" },
        { label: "PROCESO_ACTIVO", desc: "Sesiones con seguimiento personalizado" },
        { label: "INTEGRACIÓN", desc: "Consolidación de herramientas terapéuticas" }
      ]
    },
    typewriter: {
      title: "Terapia Sistémica",
      desc: "Comprensión de los patrones familiares que moldean tu historia.",
      messages: [
        "> Analizando patrones de apego familiares...",
        "> Mapeando dinámicas sistémicas...",
        "> Identificando ciclos relacionales...",
        "> Recursos internos: DETECTADOS",
        "> Iniciando protocolo de sanación..."
      ]
    },
    scheduler: {
      title: "Terapia Familiar",
      desc: "Reconstrucción de los vínculos que dan forma a tu mundo."
    }
  },
  philosophy: {
    label: "// FILOSOFÍA_DE_PRÁCTICA",
    contrast1: "La mayoría de los enfoques tratan los síntomas.",
    title1: "Nosotros trabajamos con el",
    title2: "origen.",
    body: "Cada persona es un sistema complejo y único. Mi práctica integra la neurociencia, la terapia sistémica y el trabajo somático para crear transformación real y duradera."
  },
  journey: {
    panels: [
      { step: "01 / 03", title: "Comprensión", body: "El primer paso es crear un mapa completo de tu experiencia. Sin juicios, sin prisas. Entendemos el origen antes de trazar el camino." },
      { step: "02 / 03", title: "Transformación", body: "Sesión a sesión, construimos nuevos patrones neuronales. El cambio no es lineal, pero sí es medible. Estamos contigo en cada paso." },
      { step: "03 / 03", title: "Florecimiento", body: "El objetivo final no es solo sanar las heridas, sino construir una vida que refleje quién realmente eres. La terapia termina; la transformación permanece." }
    ]
  },
  cta: {
    label: "// PRÓXIMO_PASO",
    title1: "Estás lista para",
    title2: "comenzar.",
    subtitle: "Las sesiones son completamente confidenciales. El primer encuentro es para conocernos.",
    button: "Agendar Mi Primera Sesión",
    disclaimer: "SIN COMPROMISO · COMPLETAMENTE CONFIDENCIAL · PRIMERA SESIÓN INFORMATIVA"
  },
  footer: {
    name: "María Emilia\nMontes García",
    title: "PSICÓLOGA CLÍNICA",
    email: "contacto@mariaemiliamontes.mx",
    location: "Guadalajara, Jalisco, México",
    status: "CONSULTAS DISPONIBLES",
    legal: "© 2025 María Emilia Montes García. Todos los derechos reservados."
  }
}

// ─── HOOK: useMagnetic ────────────────────────────────────────
const useMagnetic = () => {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let rafId
    let targetX = 0, targetY = 0
    let currentX = 0, currentY = 0

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY)
      const maxDist = 120

      if (distance < maxDist) {
        const strength = (maxDist - distance) / maxDist
        targetX = (e.clientX - centerX) * strength * 0.4
        targetY = (e.clientY - centerY) * strength * 0.4
      } else {
        targetX = 0
        targetY = 0
      }
    }

    const animate = () => {
      currentX += (targetX - currentX) * 0.2
      currentY += (targetY - currentY) * 0.2
      el.style.transform = `translate(${currentX}px, ${currentY}px)`
      rafId = requestAnimationFrame(animate)
    }

    const handleMouseLeave = () => { targetX = 0; targetY = 0 }

    window.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafId)
      if (el) el.style.transform = ''
    }
  }, [])

  return ref
}

// ─── COMPONENT A: Navbar ──────────────────────────────────────
function Navbar({ scrolled }) {
  const magneticRef = useMagnetic()

  return (
    <nav
      style={{
        position: 'fixed',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        borderRadius: '100px',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        gap: '48px',
        transition: 'all 0.8s cubic-bezier(0.126, 0.382, 0.44, 1)',
        background: scrolled ? 'rgba(242, 240, 233, 0.65)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        border: scrolled ? '1px solid rgba(46, 64, 54, 0.15)' : '1px solid transparent',
        boxShadow: scrolled ? '0 8px 32px rgba(46, 64, 54, 0.08)' : 'none',
        color: scrolled ? '#2E4036' : 'white',
        whiteSpace: 'nowrap',
      }}
    >
      {/* Brand */}
      <span className="font-heading" style={{ fontSize: '14px', letterSpacing: '-0.01em' }}>
        María Emilia
      </span>

      {/* Links */}
      <div className="nav-links" style={{ display: 'flex', gap: '32px' }}>
        {COPY.nav.links.map(link => (
          <span key={link} className="nav-link font-heading" style={{ fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            {link}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div ref={magneticRef}>
        <button
          className="btn-magnetic"
          style={{
            background: '#CC5833',
            color: '#F2F0E9',
            padding: '10px 24px',
            fontSize: '13px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '-0.01em',
          }}
        >
          <div className="btn-bg" style={{ background: 'rgba(0,0,0,0.2)' }} />
          <span style={{ position: 'relative', zIndex: 1 }}>{COPY.nav.cta}</span>
        </button>
      </div>
    </nav>
  )
}

// ─── COMPONENT B: Hero ───────────────────────────────────────
function Hero({ sentinelRef }) {
  const containerRef = useRef(null)
  const bgRef = useRef(null)
  const eyebrowRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useMagnetic()
  const statusRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background zoom
      gsap.fromTo(bgRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 5, ease: 'power2.out' }
      )

      // Text entrance
      const elements = [eyebrowRef.current, line1Ref.current, line2Ref.current, subtitleRef.current, statusRef.current]
      gsap.fromTo(elements,
        { y: 60, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'boutique',
          duration: 1.2,
          stagger: 0.15,
          delay: 0.3,
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        height: '100dvh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: '120px',
        paddingLeft: '80px',
        paddingRight: '80px',
      }}
    >
      {/* Sentinel for nav observer */}
      <div ref={sentinelRef} style={{ position: 'absolute', top: 0, left: 0, height: '1px', width: '100%' }} />

      {/* Background image */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=2400&q=90)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transformOrigin: 'center',
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, #1A1A1A 0%, rgba(46,64,54,0.75) 50%, rgba(46,64,54,0.4) 100%)',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}>
        <p
          ref={eyebrowRef}
          className="font-mono-data"
          style={{ color: 'rgba(242,240,233,0.7)', marginBottom: '16px', opacity: 0 }}
        >
          {COPY.hero.eyebrow}
        </p>

        <h1 ref={line1Ref} className="font-heading" style={{
          fontSize: 'clamp(56px, 7vw, 96px)',
          color: '#F2F0E9',
          lineHeight: 0.95,
          opacity: 0,
        }}>
          {COPY.hero.title1}
        </h1>

        <h1 ref={line2Ref} className="font-drama" style={{
          fontSize: 'clamp(72px, 10vw, 140px)',
          color: '#CC5833',
          lineHeight: 0.85,
          opacity: 0,
        }}>
          {COPY.hero.title2}
        </h1>

        <p ref={subtitleRef} style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 400,
          fontSize: '18px',
          color: 'rgba(242,240,233,0.7)',
          maxWidth: '480px',
          marginTop: '32px',
          lineHeight: 1.6,
          opacity: 0,
        }}>
          {COPY.hero.subtitle}
        </p>

        <div style={{ marginTop: '48px' }}>
          <div ref={ctaRef}>
            <button
              className="btn-magnetic"
              style={{
                background: '#CC5833',
                color: '#F2F0E9',
                padding: '20px 48px',
                fontSize: '16px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <div className="btn-bg" style={{ background: 'rgba(0,0,0,0.15)' }} />
              <span style={{ position: 'relative', zIndex: 1 }}>{COPY.hero.cta}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom-right status */}
      <div
        ref={statusRef}
        style={{
          position: 'absolute',
          bottom: '48px',
          right: '80px',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          opacity: 0,
        }}
      >
        <div style={{ position: 'relative', width: '8px', height: '8px' }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: '#CC5833',
            opacity: 0.4,
          }} className="animate-pulse-ring" />
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: '#CC5833',
          }} />
        </div>
        <span className="font-mono-data" style={{ color: '#CC5833' }}>
          {COPY.hero.status}
        </span>
      </div>
    </section>
  )
}

// ─── ARTIFACT 1: Diagnostic Shuffler ─────────────────────────
function DiagnosticShuffler() {
  const [cards, setCards] = useState(COPY.services.shuffler.cards)

  useEffect(() => {
    const id = setInterval(() => {
      setCards(prev => {
        const next = [...prev]
        next.push(next.shift())
        return next
      })
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="artifact-card" style={{ height: '380px', display: 'flex', flexDirection: 'column' }}>
      <span className="font-mono-data" style={{ color: '#CC5833', marginBottom: '12px' }}>
        // ARTIFACT_01
      </span>
      <h3 className="font-heading" style={{ fontSize: '22px', color: '#2E4036', marginBottom: '8px' }}>
        {COPY.services.shuffler.title}
      </h3>
      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14px', color: 'rgba(26,26,26,0.6)', marginBottom: '32px', lineHeight: 1.6 }}>
        {COPY.services.shuffler.desc}
      </p>

      <div style={{ position: 'relative', flex: 1 }}>
        {cards.map((card, i) => (
          <div
            key={card.label}
            style={{
              position: 'absolute',
              inset: 0,
              background: i === 0 ? '#2E4036' : '#F2F0E9',
              borderRadius: '1.5rem',
              padding: '28px',
              border: '1px solid rgba(46,64,54,0.12)',
              zIndex: 3 - i,
              transform: `translateY(${i * -20}px) scale(${1 - i * 0.04})`,
              opacity: i === 0 ? 1 : i === 1 ? 0.7 : 0.4,
              transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <span className="font-mono-data" style={{ color: i === 0 ? '#CC5833' : '#2E4036', marginBottom: '8px' }}>
              {card.label}
            </span>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '15px',
              color: i === 0 ? 'rgba(242,240,233,0.8)' : 'rgba(26,26,26,0.7)',
              lineHeight: 1.5,
            }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── ARTIFACT 2: Telemetry Typewriter ────────────────────────
function TelemetryTypewriter() {
  const [displayText, setDisplayText] = useState('')
  const [msgIdx, setMsgIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const messages = COPY.services.typewriter.messages
    const currentMsg = messages[msgIdx]

    if (charIdx < currentMsg.length) {
      const t = setTimeout(() => {
        setDisplayText(currentMsg.slice(0, charIdx + 1))
        setCharIdx(c => c + 1)
      }, 40)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setMsgIdx(i => (i + 1) % messages.length)
        setCharIdx(0)
        setDisplayText('')
      }, 1800)
      return () => clearTimeout(t)
    }
  }, [charIdx, msgIdx])

  return (
    <div className="artifact-card" style={{ height: '380px', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        background: '#2E4036',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#CC5833' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#e5c14a' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#7FBF94' }} />
        </div>
        <span className="font-mono-data" style={{ color: 'rgba(242,240,233,0.4)', fontSize: '0.65rem' }}>
          TERMINAL_v2.4.1
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#CC5833' }} className="animate-pulse-dot" />
          <span className="font-mono-data" style={{ color: '#CC5833', fontSize: '0.6rem' }}>LIVE FEED</span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '20px 28px 0 28px', background: '#2E4036' }}>
        <span className="font-mono-data" style={{ color: '#CC5833', marginBottom: '4px', display: 'block' }}>
          // ARTIFACT_02
        </span>
        <h3 className="font-heading" style={{ fontSize: '18px', color: '#F2F0E9', marginBottom: '4px' }}>
          {COPY.services.typewriter.title}
        </h3>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', color: 'rgba(242,240,233,0.5)', lineHeight: 1.5 }}>
          {COPY.services.typewriter.desc}
        </p>
      </div>

      {/* Terminal body */}
      <div style={{
        flex: 1,
        background: '#2E4036',
        padding: '24px 28px 28px 28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        borderRadius: '0 0 2.5rem 2.5rem',
      }}>
        <div style={{ minHeight: '48px' }}>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '13px',
            color: '#7FBF94',
            lineHeight: 1.7,
          }}>
            {displayText}
            <span
              className="animate-blink"
              style={{
                display: 'inline-block',
                width: '2px',
                height: '14px',
                background: '#CC5833',
                marginLeft: '2px',
                verticalAlign: 'middle',
              }}
            />
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── ARTIFACT 3: Cursor Protocol Scheduler ───────────────────
function CursorScheduler() {
  const days = ['S', 'L', 'M', 'M', 'J', 'V', 'S']
  const [activeDay, setActiveDay] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: -40, y: 50 })
  const [cursorVisible, setCursorVisible] = useState(false)
  const phaseRef = useRef(0)

  const THURSDAY_X = 80 + 4 * 56 + 28
  const CONFIRM_X = 180
  const CONFIRM_Y = 160

  useEffect(() => {
    let timeout

    const runPhase = (phase) => {
      phaseRef.current = phase

      if (phase === 0) {
        // Enter
        setCursorVisible(true)
        setCursorPos({ x: -40, y: 50 })
        setTimeout(() => {
          setCursorPos({ x: THURSDAY_X, y: 50 })
        }, 100)
        timeout = setTimeout(() => runPhase(1), 1000)
      } else if (phase === 1) {
        // Click Thursday
        setActiveDay(4)
        timeout = setTimeout(() => runPhase(2), 700)
      } else if (phase === 2) {
        // Move to confirm
        setCursorPos({ x: CONFIRM_X, y: CONFIRM_Y })
        timeout = setTimeout(() => runPhase(3), 900)
      } else if (phase === 3) {
        // Click confirm
        setConfirmed(true)
        timeout = setTimeout(() => runPhase(4), 700)
      } else if (phase === 4) {
        // Fade out
        setCursorVisible(false)
        timeout = setTimeout(() => runPhase(5), 500)
      } else if (phase === 5) {
        // Reset
        setActiveDay(null)
        setConfirmed(false)
        setCursorPos({ x: -40, y: 50 })
        timeout = setTimeout(() => runPhase(0), 1500)
      }
    }

    timeout = setTimeout(() => runPhase(0), 800)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="artifact-card" style={{ height: '380px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <span className="font-mono-data" style={{ color: '#CC5833', marginBottom: '12px' }}>
        // ARTIFACT_03
      </span>
      <h3 className="font-heading" style={{ fontSize: '22px', color: '#2E4036', marginBottom: '8px' }}>
        {COPY.services.scheduler.title}
      </h3>
      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14px', color: 'rgba(26,26,26,0.6)', marginBottom: '28px', lineHeight: 1.6 }}>
        {COPY.services.scheduler.desc}
      </p>

      {/* Day grid */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {days.map((day, i) => (
          <div
            key={i}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: activeDay === i ? '#CC5833' : 'rgba(46,64,54,0.06)',
              color: activeDay === i ? '#F2F0E9' : 'rgba(46,64,54,0.5)',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '12px',
              fontWeight: 500,
              textTransform: 'uppercase',
              transform: activeDay === i ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              letterSpacing: '0.05em',
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Time slot */}
      <div style={{
        background: 'rgba(46,64,54,0.04)',
        borderRadius: '12px',
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}>
        <span className="font-mono-data" style={{ color: '#2E4036' }}>JUEVES · 10:00 AM</span>
        <span className="font-mono-data" style={{ color: activeDay === 4 ? '#CC5833' : 'rgba(46,64,54,0.3)' }}>
          {activeDay === 4 ? 'SELECCIONADO' : 'DISPONIBLE'}
        </span>
      </div>

      {/* Confirm button */}
      <button
        style={{
          background: confirmed ? '#CC5833' : 'transparent',
          border: `1px solid ${confirmed ? '#CC5833' : 'rgba(46,64,54,0.2)'}`,
          borderRadius: '12px',
          padding: '12px 24px',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: confirmed ? '#F2F0E9' : 'rgba(46,64,54,0.5)',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
          width: '100%',
        }}
      >
        {confirmed ? 'SESIÓN CONFIRMADA ✓' : 'CONFIRMAR CITA'}
      </button>

      {/* Animated cursor */}
      <div
        style={{
          position: 'absolute',
          width: '20px',
          height: '20px',
          pointerEvents: 'none',
          opacity: cursorVisible ? 1 : 0,
          transition: 'left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease',
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          zIndex: 10,
        }}
      >
        <svg viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8" stroke="#2E4036" strokeWidth="2" fill="rgba(242,240,233,0.9)" />
          <circle cx="10" cy="10" r="3" fill="#2E4036" />
        </svg>
      </div>
    </div>
  )
}

// ─── COMPONENT C: Services ────────────────────────────────────
function Services() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.0, ease: 'boutique',
          scrollTrigger: { trigger: labelRef.current, start: 'top 85%' }
        }
      )

      gsap.fromTo('.artifact-card',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.0, ease: 'boutique',
          stagger: 0.15,
          scrollTrigger: { trigger: '.artifact-card', start: 'top 80%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-base" style={{ background: '#F2F0E9' }}>
      <p ref={labelRef} className="font-mono-data" style={{ color: '#2E4036', marginBottom: '80px' }}>
        {COPY.services.sectionLabel}
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '40px',
      }}>
        <DiagnosticShuffler />
        <TelemetryTypewriter />
        <CursorScheduler />
      </div>
    </section>
  )
}

// ─── COMPONENT D: Philosophy ──────────────────────────────────
function Philosophy() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const wordsContainerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax bg
      gsap.to(bgRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })

      // Word reveal on scroll
      const words = wordsContainerRef.current?.querySelectorAll('.reveal-word')
      if (words && words.length) {
        gsap.fromTo(words,
          { opacity: 0, y: 20, filter: 'blur(8px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            ease: 'boutique',
            stagger: 0.08,
            scrollTrigger: {
              trigger: wordsContainerRef.current,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1,
            }
          }
        )
      }

      // Support text
      gsap.fromTo('.philosophy-body',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: 'boutique',
          scrollTrigger: { trigger: '.philosophy-body', start: 'top 80%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const bigLine1 = "Nosotros trabajamos con el"
  const bigLine1Words = bigLine1.split(' ')

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#2E4036',
        paddingTop: '160px',
        paddingBottom: '160px',
        paddingLeft: '80px',
        paddingRight: '80px',
        overflow: 'hidden',
      }}
    >
      {/* Parallax bg texture */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-20%',
          backgroundImage: 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.08,
          scale: 1.2,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>
        <p className="font-mono-data" style={{ color: '#CC5833', marginBottom: '64px' }}>
          {COPY.philosophy.label}
        </p>

        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 400,
          fontSize: '22px',
          color: 'rgba(242,240,233,0.5)',
          marginBottom: '32px',
          lineHeight: 1.5,
        }}>
          {COPY.philosophy.contrast1}
        </p>

        <div ref={wordsContainerRef}>
          <div style={{ lineHeight: 1.0 }}>
            {bigLine1Words.map((word, i) => (
              <span
                key={i}
                className="reveal-word font-heading"
                style={{
                  fontSize: 'clamp(40px, 5vw, 72px)',
                  color: '#F2F0E9',
                  display: 'inline-block',
                  marginRight: '0.3em',
                  opacity: 0,
                }}
              >
                {word}
              </span>
            ))}
          </div>
          <div>
            <span
              className="reveal-word font-drama"
              style={{
                fontSize: 'clamp(56px, 7vw, 100px)',
                color: '#CC5833',
                display: 'inline-block',
                opacity: 0,
                lineHeight: 0.9,
              }}
            >
              {COPY.philosophy.title2}
            </span>
          </div>
        </div>

        <p
          className="philosophy-body"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 400,
            fontSize: '20px',
            color: 'rgba(242,240,233,0.6)',
            maxWidth: '600px',
            marginTop: '48px',
            lineHeight: 1.7,
            opacity: 0,
          }}
        >
          {COPY.philosophy.body}
        </p>
      </div>
    </section>
  )
}

// ─── JOURNEY SVG VISUALS ──────────────────────────────────────
function ConcentricCircles() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <div style={{ position: 'relative', width: '280px', height: '280px' }}>
        <svg viewBox="0 0 280 280" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <circle className="animate-spin-slow" cx="140" cy="140" r="130" stroke="#2E4036" strokeWidth="1.5" fill="none" strokeOpacity="0.8" strokeDasharray="8 4" style={{ transformOrigin: '140px 140px' }} />
          <circle className="animate-spin-slow-reverse" cx="140" cy="140" r="95" stroke="#2E4036" strokeWidth="1" fill="none" strokeOpacity="0.5" strokeDasharray="4 8" style={{ transformOrigin: '140px 140px' }} />
          <circle className="animate-pulse-dot" cx="140" cy="140" r="55" stroke="#2E4036" strokeWidth="0.8" fill="none" strokeOpacity="0.25" style={{ transformOrigin: '140px 140px' }} />
          <circle cx="140" cy="140" r="8" fill="#CC5833" opacity="0.8" className="animate-pulse-dot" style={{ transformOrigin: '140px 140px' }} />
        </svg>
      </div>
    </div>
  )
}

function ScannerGrid() {
  const rows = 8, cols = 8
  const [scanY, setScanY] = useState(0)
  const [activeRow, setActiveRow] = useState(-1)

  useEffect(() => {
    let frame = 0
    const total = 120
    const id = setInterval(() => {
      frame = (frame + 1) % total
      const progress = frame / total
      setScanY(progress)
      setActiveRow(Math.floor(progress * rows))
    }, 25)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <div style={{ position: 'relative', width: '240px', height: '240px' }}>
        <svg viewBox="0 0 240 240" style={{ width: '100%', height: '100%' }}>
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={16 + c * 30}
                cy={16 + r * 30}
                r={2.5}
                fill="#2E4036"
                opacity={r === activeRow ? 1 : 0.15}
                style={{ transition: 'opacity 0.1s ease' }}
              />
            ))
          )}
          {/* Scan line */}
          <rect
            x={0}
            y={scanY * 240 - 1}
            width={240}
            height={2}
            fill="#CC5833"
            opacity={0.7}
          />
        </svg>
      </div>
    </div>
  )
}

function EKGWaveform() {
  const pathRef = useRef(null)
  const [dashOffset, setDashOffset] = useState(1)

  useEffect(() => {
    let start = null
    const duration = 4000
    let animId

    const animate = (ts) => {
      if (!start) start = ts
      const elapsed = (ts - start) % (duration * 1.3)
      const progress = Math.min(elapsed / duration, 1)
      setDashOffset(1 - progress)
      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [])

  const d = "M 10,80 L 50,80 L 60,40 L 70,120 L 85,20 L 100,120 L 115,80 L 125,80 L 135,60 L 145,100 L 155,80 L 230,80"

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <svg viewBox="0 0 240 140" style={{ width: '100%', maxWidth: '320px', overflow: 'visible' }}>
        <defs>
          <filter id="ekg-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <path
          ref={pathRef}
          d={d}
          stroke="#CC5833"
          strokeWidth="2.5"
          fill="none"
          filter="url(#ekg-glow)"
          strokeDasharray="1"
          strokeDashoffset={dashOffset}
          pathLength="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

// ─── COMPONENT E: Journey ─────────────────────────────────────
function Journey() {
  const containerRef = useRef(null)
  const panelRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return

        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: i < panelRefs.current.length - 1,
          scrub: 1,
          onUpdate: (self) => {
            if (i < panelRefs.current.length - 1) {
              const next = panelRefs.current[i + 1]
              if (next) {
                gsap.set(panel, {
                  scale: 1 - self.progress * 0.1,
                  filter: `blur(${self.progress * 20}px)`,
                  opacity: 1 - self.progress * 0.6,
                })
              }
            }
          }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const visuals = [<ConcentricCircles key="v1" />, <ScannerGrid key="v2" />, <EKGWaveform key="v3" />]

  return (
    <div ref={containerRef}>
      {COPY.journey.panels.map((panel, i) => (
        <div
          key={i}
          ref={el => panelRefs.current[i] = el}
          className="stack-panel"
          style={{
            background: i % 2 === 0 ? '#F2F0E9' : 'rgba(46,64,54,0.04)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            padding: '120px 80px',
            gap: '80px',
          }}
        >
          {/* Content */}
          <div>
            <p className="font-mono-data" style={{ color: '#CC5833', marginBottom: '24px' }}>
              {panel.step}
            </p>
            <h2 className="font-heading" style={{
              fontSize: 'clamp(48px, 5vw, 72px)',
              color: '#2E4036',
              lineHeight: 1.0,
              marginBottom: '32px',
            }}>
              {panel.title}
            </h2>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '18px',
              color: 'rgba(26,26,26,0.65)',
              lineHeight: 1.75,
              maxWidth: '460px',
            }}>
              {panel.body}
            </p>
          </div>

          {/* Visual */}
          <div className="stack-visual" style={{ height: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {visuals[i]}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── COMPONENT F: CTA Section ─────────────────────────────────
function CTASection() {
  const sectionRef = useRef(null)
  const magneticRef = useMagnetic()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-content > *',
        { y: 50, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0, opacity: 1, filter: 'blur(0px)',
          duration: 1.0, ease: 'boutique',
          stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#1A1A1A',
        paddingTop: '160px',
        paddingBottom: '160px',
        paddingLeft: '80px',
        paddingRight: '80px',
        borderRadius: '2.5rem 2.5rem 0 0',
        textAlign: 'center',
      }}
    >
      <div className="cta-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
        <p className="font-mono-data" style={{ color: '#CC5833', marginBottom: '32px', opacity: 0 }}>
          {COPY.cta.label}
        </p>

        <h2 className="font-heading" style={{
          fontSize: 'clamp(40px, 5vw, 64px)',
          color: '#F2F0E9',
          lineHeight: 1.0,
          opacity: 0,
        }}>
          {COPY.cta.title1}
        </h2>

        <h2 className="font-drama" style={{
          fontSize: 'clamp(56px, 7vw, 96px)',
          color: '#CC5833',
          lineHeight: 0.9,
          marginBottom: '40px',
          opacity: 0,
        }}>
          {COPY.cta.title2}
        </h2>

        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 400,
          fontSize: '18px',
          color: 'rgba(242,240,233,0.6)',
          maxWidth: '500px',
          lineHeight: 1.65,
          marginBottom: '48px',
          opacity: 0,
        }}>
          {COPY.cta.subtitle}
        </p>

        <div ref={magneticRef} style={{ opacity: 0 }}>
          <button
            className="btn-magnetic"
            style={{
              background: '#CC5833',
              color: '#F2F0E9',
              padding: '24px 64px',
              fontSize: '16px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
            }}
          >
            <div className="btn-bg" style={{ background: 'rgba(0,0,0,0.2)' }} />
            <span style={{ position: 'relative', zIndex: 1 }}>{COPY.cta.button}</span>
          </button>
        </div>

        <p className="font-mono-data" style={{ color: 'rgba(242,240,233,0.3)', marginTop: '24px', opacity: 0 }}>
          {COPY.cta.disclaimer}
        </p>
      </div>
    </section>
  )
}

// ─── COMPONENT G: Footer ──────────────────────────────────────
function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.status-ring', {
        scale: 2.2,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: 'power2.out',
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const nameLines = COPY.footer.name.split('\n')

  return (
    <footer
      ref={footerRef}
      style={{
        background: '#1A1A1A',
        borderRadius: '4rem 4rem 0 0',
        padding: '80px 80px 48px 80px',
        borderTop: '1px solid rgba(242,240,233,0.06)',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '64px',
        marginBottom: '64px',
      }}>
        {/* Col 1: Brand */}
        <div>
          <p className="font-drama" style={{
            fontSize: '32px',
            color: '#F2F0E9',
            lineHeight: 1.1,
            marginBottom: '16px',
          }}>
            {nameLines[0]}<br />{nameLines[1]}
          </p>
          <p className="font-mono-data" style={{ color: '#CC5833' }}>
            {COPY.footer.title}
          </p>
        </div>

        {/* Col 2: Nav */}
        <div>
          <p className="font-mono-data" style={{ color: 'rgba(242,240,233,0.3)', marginBottom: '24px' }}>
            NAVEGACIÓN
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {["Terapia Individual", "Terapia Sistémica", "Terapia Familiar", "Mi Enfoque", "Contacto"].map(link => (
              <span key={link} className="nav-link" style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '15px',
                color: 'rgba(242,240,233,0.6)',
                cursor: 'pointer',
              }}>
                {link}
              </span>
            ))}
          </div>
        </div>

        {/* Col 3: Contact */}
        <div>
          <p className="font-mono-data" style={{ color: 'rgba(242,240,233,0.3)', marginBottom: '24px' }}>
            CONTACTO
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', color: 'rgba(242,240,233,0.6)' }}>
              {COPY.footer.email}
            </p>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', color: 'rgba(242,240,233,0.6)' }}>
              {COPY.footer.location}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(242,240,233,0.08)',
        paddingTop: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <p className="font-mono-data" style={{ color: 'rgba(242,240,233,0.2)' }}>
          {COPY.footer.legal}
        </p>

        {/* Status indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative', width: '12px', height: '12px' }}>
            <div
              className="status-ring"
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: '#CC5833',
                opacity: 0.4,
              }}
            />
            <div style={{
              position: 'absolute',
              inset: '2px',
              borderRadius: '50%',
              background: '#CC5833',
            }} />
          </div>
          <span className="font-mono-data" style={{ color: '#CC5833' }}>
            {COPY.footer.status}
          </span>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ROOT ─────────────────────────────────────────────────
export default function App() {
  const [navScrolled, setNavScrolled] = useState(false)
  const sentinelRef = useRef(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => setNavScrolled(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Navbar scrolled={navScrolled} />
      <main>
        <Hero sentinelRef={sentinelRef} />
        <Services />
        <Philosophy />
        <Journey />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
