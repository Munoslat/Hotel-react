import { useState, useEffect, useRef } from 'react'
import './App.css'

// ===== DATA =====
const ROOMS = [
  { emoji:'🛏️', bg:'linear-gradient(135deg,#1a1508,#2d2410)', badge:'AVAILABLE', badgeCls:'badge-green',
    type:'Deluxe Room', name:'Ocean View Deluxe', desc:'Spacious room with stunning ocean views, king bed, and marble bathroom.',
    amenities:['📶 WiFi','❄️ A/C','🍳 Breakfast','🅿️ Parking'], price:'$180', featured:false },
  { emoji:'🌟', bg:'linear-gradient(135deg,#12100a,#1f1a08)', badge:'FEATURED', badgeCls:'badge-gold',
    type:'Junior Suite', name:'Garden Junior Suite', desc:'Elegant suite with private garden terrace, living area, and premium amenities.',
    amenities:['📶 WiFi','🛁 Jacuzzi','🍽️ Room Service','🍷 Minibar'], price:'$350', featured:true },
  { emoji:'👑', bg:'linear-gradient(135deg,#0d0c08,#1a170a)', badge:'LAST ROOM', badgeCls:'badge-gold',
    type:'Presidential Suite', name:'Royal Presidential', desc:'The ultimate luxury — 3 rooms, private pool, butler service 24/7.',
    amenities:['🏊 Pool','👨‍🍳 Butler','🚗 Limo','💆 Spa'], price:'$850', featured:false },
  { emoji:'🌙', bg:'linear-gradient(135deg,#080d18,#0f1628)', badge:'AVAILABLE', badgeCls:'badge-green',
    type:'Honeymoon Suite', name:'Moonlight Romance Suite', desc:'Romantic suite with canopy bed, champagne on arrival, and rose petal turndown.',
    amenities:['🍾 Champagne','🕯️ Candles','🛁 Soaking Tub','🌹 Rose Service'], price:'$480', featured:false },
  { emoji:'🏔️', bg:'linear-gradient(135deg,#0a1210,#0f1e1a)', badge:'AVAILABLE', badgeCls:'badge-green',
    type:'Mountain View', name:'Alpine Premium Room', desc:'Wake up to breathtaking mountain views with a cozy fireplace and premium bedding.',
    amenities:['🔥 Fireplace','☕ Coffee Maker','🧖 Sauna Access','🎿 Ski Storage'], price:'$220', featured:false },
  { emoji:'🌊', bg:'linear-gradient(135deg,#060e18,#0a1828)', badge:'SOLD OUT', badgeCls:'badge-red',
    type:'Penthouse', name:'Sky Penthouse Suite', desc:'Top floor penthouse with panoramic 360° views, private terrace, and jacuzzi.',
    amenities:['🏙️ 360° Views','🛗 Private Elevator','🎭 Cinema Room','🍾 Butler'], price:'$1,200', featured:false },
]

const MENU = [
  { emoji:'🥩', bg:'linear-gradient(135deg,#1a1205,#251908)', name:'Grilled Somali Spiced Lamb',
    desc:'Slow-roasted lamb with aromatic spices, saffron rice, and roasted vegetables', price:'$42', tag:"Chef's Special" },
  { emoji:'🐟', bg:'linear-gradient(135deg,#0a1510,#0f2018)', name:'Indian Ocean Sea Bass',
    desc:'Fresh catch of the day, grilled with lemon butter, capers, and herb salad', price:'$36', tag:'Fresh Today' },
  { emoji:'🍝', bg:'linear-gradient(135deg,#100a15,#1a1022)', name:'Truffle Lobster Pasta',
    desc:'Tagliatelle with butter-poached lobster, black truffle, and parmesan cream', price:'$58', tag:null },
  { emoji:'🥗', bg:'linear-gradient(135deg,#0a1508,#0f1f0d)', name:'Summer Garden Salad',
    desc:'Heirloom tomatoes, burrata, fresh basil, aged balsamic, and extra virgin olive oil', price:'$24', tag:'Vegetarian' },
  { emoji:'🍰', bg:'linear-gradient(135deg,#1a0d0d,#2d1515)', name:'Valrhona Chocolate Fondant',
    desc:'Warm dark chocolate lava cake, vanilla bean ice cream, and caramel sauce', price:'$18', tag:'Dessert' },
]

const DASH = [
  { num:'38/48', lbl:'Rooms Occupied',  change:'↑ 79% occupancy',       color:'#3d9970' },
  { num:'24',    lbl:'Check-ins Today', change:'→ 8 pending',            color:'#c9a84c' },
  { num:'$18,400',lbl:'Revenue Today',  change:'↑ +12% vs yesterday',   color:'#3d9970' },
  { num:'4.9★',  lbl:'Guest Rating',   change:'→ 847 reviews',          color:'#c9a84c' },
]

const AMENITIES = [
  { icon:'🏊', title:'Infinity Pool', desc:'Rooftop pool with panoramic views, open 6AM–10PM daily' },
  { icon:'💆', title:'Luxury Spa', desc:'Full-service spa with 12 treatment rooms and expert therapists' },
  { icon:'🏋️', title:'Fitness Center', desc:'State-of-the-art equipment, yoga studio, and personal trainers' },
  { icon:'🍽️', title:'Fine Dining', desc:'Award-winning restaurant serving international and local cuisine' },
  { icon:'🎭', title:'Events Hall', desc:'Elegant ballroom for weddings, conferences, and private events' },
  { icon:'🚗', title:'Valet Parking', desc:'Complimentary valet service with 24/7 security monitoring' },
]

const REVIEWS = [
  { init:'AH', color:'#c9a84c', name:'Ahmed Hassan', country:'Somalia 🇸🇴', rating:5,
    text:'Absolutely phenomenal experience. The Ocean View Deluxe exceeded all expectations — the staff was incredibly attentive.' },
  { init:'SM', color:'#3d9970', name:'Sarah Mitchell', country:'UK 🇬🇧', rating:5,
    text:'The Garden Suite was pure magic. Woke up to birdsong every morning. The breakfast was world-class. Will definitely return!' },
  { init:'KO', color:'#1d6feb', name:'Kenji Osaka', country:'Japan 🇯🇵', rating:5,
    text:'Best hotel stay I have ever had. The Presidential Suite was breathtaking. The butler service was second to none.' },
]

const GALLERY = [
  { emoji:'🌅', bg:'linear-gradient(135deg,#1a0a05,#2d1508)', label:'Sunrise View' },
  { emoji:'🏊', bg:'linear-gradient(135deg,#051018,#0a1f30)', label:'Infinity Pool' },
  { emoji:'🍽️', bg:'linear-gradient(135deg,#100a05,#1f1208)', label:'Fine Dining' },
  { emoji:'🛁', bg:'linear-gradient(135deg,#0d0c08,#1f1a10)', label:'Luxury Bath' },
  { emoji:'💆', bg:'linear-gradient(135deg,#080d12,#101828)', label:'Spa & Wellness' },
  { emoji:'🌃', bg:'linear-gradient(135deg,#060810,#0a1020)', label:'Night View' },
]

// ===== FADE HOOK =====
function useFade() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    el.style.cssText = 'opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease'
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity='1'; el.style.transform='translateY(0)' }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function scrollTo(id) {
  document.querySelector(id)?.scrollIntoView({ behavior:'smooth', block:'start' })
}

// ===== NAVBAR =====
function Navbar({ onBook }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Rooms')
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const links = ['Rooms','Restaurant','Amenities','Gallery','Reviews','Contact']
  const anchors = { Rooms:'#rooms', Restaurant:'#restaurant', Amenities:'#amenities', Gallery:'#gallery', Reviews:'#reviews', Contact:'#contact' }
  return (
    <nav className={`navbar ${scrolled?'scrolled':''}`}>
      <div className="nav-logo" onClick={() => scrollTo('#hero')}>LUXE<span>STAY</span></div>
      <ul className="nav-links">
        {links.map(l => (
          <li key={l}><a className={active===l?'active':''} onClick={() => { setActive(l); scrollTo(anchors[l]) }}>{l}</a></li>
        ))}
      </ul>
      <div className="nav-right">
        <button className="nav-outline">SIGN IN</button>
        <button className="nav-gold" onClick={onBook}>BOOK NOW</button>
      </div>
    </nav>
  )
}

// ===== HERO =====
function Hero({ onBook }) {
  const ref = useFade()
  return (
    <section className="hero" id="hero">
      <div className="hero-pattern"></div>
      <div className="hero-content" ref={ref}>
        <div className="hero-eyebrow">⭐⭐⭐⭐⭐ &nbsp; Luxury Hotel & Dining</div>
        <h1 className="hero-title">Where Every<br />Stay Is <em>Unforgettable</em></h1>
        <p className="hero-sub">Experience world-class hospitality, fine dining, and exceptional service in the heart of the city.</p>
        <div className="hero-btns">
          <button className="btn-gold" onClick={onBook}>RESERVE A ROOM</button>
          <button className="btn-ghost" onClick={() => scrollTo('#rooms')}>EXPLORE ROOMS</button>
        </div>
      </div>
      <div className="hero-stats">
        <div className="h-stat-box"><div className="h-stat-num">98%</div><div className="h-stat-lbl">SATISFACTION</div></div>
        <div className="h-stat-box"><div className="h-stat-num">48</div><div className="h-stat-lbl">LUXURY ROOMS</div></div>
        <div className="h-stat-box"><div className="h-stat-num">12+</div><div className="h-stat-lbl">YEARS</div></div>
        <div className="h-stat-box"><div className="h-stat-num">847</div><div className="h-stat-lbl">REVIEWS</div></div>
      </div>
    </section>
  )
}

// ===== BOOKING BAR =====
function BookingBar({ onSearch }) {
  return (
    <div className="booking-bar">
      <div className="booking-form">
        <div className="bf-field"><div className="bf-label">📅 Check In</div><input type="date" className="bf-input" defaultValue="2025-05-15"/></div>
        <div className="bf-field"><div className="bf-label">📅 Check Out</div><input type="date" className="bf-input" defaultValue="2025-05-18"/></div>
        <div className="bf-field"><div className="bf-label">👥 Guests</div>
          <select className="bf-select"><option>1 Adult</option><option>2 Adults</option><option>2 Adults, 1 Child</option><option>Group (5+)</option></select>
        </div>
        <div className="bf-field"><div className="bf-label">🛏️ Room Type</div>
          <select className="bf-select"><option>Any Room</option><option>Deluxe Room</option><option>Junior Suite</option><option>Presidential Suite</option><option>Penthouse</option></select>
        </div>
        <button className="search-btn" onClick={onSearch}>CHECK AVAILABILITY →</button>
      </div>
    </div>
  )
}

// ===== LIVE STATS =====
function LiveStats() {
  const ref = useFade()
  return (
    <div className="dash-grid" ref={ref}>
      {DASH.map((s,i) => (
        <div className="d-stat" key={i}>
          <div className="d-num">{s.num}</div>
          <div className="d-lbl">{s.lbl}</div>
          <div className="d-change" style={{color:s.color}}>{s.change}</div>
        </div>
      ))}
    </div>
  )
}

// ===== ROOMS =====
function RoomsSection({ onBook }) {
  const ref1 = useFade(), ref2 = useFade()
  return (
    <div className="main-wrap" id="rooms">
      <div ref={ref1}>
        <div className="section-eyebrow">Accommodations</div>
        <div className="section-title">Our Rooms & Suites</div>
        <p className="section-sub">From cozy deluxe rooms to grand presidential suites, every space is crafted for ultimate comfort.</p>
      </div>
      <div className="rooms-grid" ref={ref2}>
        {ROOMS.map((r,i) => (
          <div className={`room-card ${r.featured?'room-featured':''}`} key={i}>
            <div className="room-img" style={{background:r.bg}}>
              <span className="room-emoji">{r.emoji}</span>
              <span className={`room-badge ${r.badgeCls}`}>{r.badge}</span>
            </div>
            <div className="room-body">
              <div className="room-type">{r.type}</div>
              <div className="room-name">{r.name}</div>
              <div className="room-desc">{r.desc}</div>
              <div className="room-amenities">{r.amenities.map((a,j) => <span className="amenity" key={j}>{a}</span>)}</div>
              <div className="room-footer">
                <div><span className="price-num">{r.price}</span><span className="price-per"> / night</span></div>
                <button className="book-room" onClick={() => onBook(r.name, r.price)} disabled={r.badge==='SOLD OUT'}>
                  {r.badge==='SOLD OUT' ? 'SOLD OUT' : 'BOOK NOW'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ===== RESTAURANT =====
function RestaurantSection() {
  const [tableBooked, setTableBooked] = useState(false)
  const [cart, setCart] = useState([])
  const ref1 = useFade(), ref2 = useFade()
  const addItem = (name) => setCart(c => [...c, name])
  return (
    <div className="main-wrap" id="restaurant">
      <div ref={ref1}>
        <div className="section-eyebrow">Fine Dining</div>
        <div className="section-title">Restaurant & Menu</div>
        <p className="section-sub">Award-winning cuisine inspired by the Indian Ocean, crafted by world-class chefs.</p>
      </div>
      <div className="rest-grid" ref={ref2}>
        <div>
          {MENU.map((m,i) => (
            <div className="menu-item" key={i}>
              <div className="menu-img" style={{background:m.bg}}>{m.emoji}</div>
              <div style={{flex:1}}>
                <div className="menu-name">{m.name}</div>
                <div className="menu-desc">{m.desc}</div>
                <div className="menu-footer">
                  <div className="menu-price">{m.price}</div>
                  <div style={{display:'flex',gap:8,alignItems:'center'}}>
                    {m.tag && <span className="menu-diet">{m.tag}</span>}
                    <button className="add-item" onClick={() => addItem(m.name)}>+ ADD</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {cart.length > 0 && (
            <div className="cart-summary">
              🛒 {cart.length} item{cart.length>1?'s':''} in order &nbsp;·&nbsp;
              <button className="cart-clear" onClick={() => setCart([])}>Clear</button>
            </div>
          )}
        </div>
        <div className="res-booking">
          <h3>Reserve a Table</h3>
          <div className="rb-row">
            <div className="rb-field"><label>Date</label><input type="date" defaultValue="2025-05-12"/></div>
            <div className="rb-field"><label>Time</label>
              <select><option>7:00 PM</option><option>7:30 PM</option><option>8:00 PM</option><option>9:00 PM</option></select>
            </div>
          </div>
          <div className="rb-field"><label>Guests</label>
            <select><option>2 People</option><option>3–4 People</option><option>5–6 People</option></select>
          </div>
          <div className="rb-field"><label>Your Name</label><input type="text" placeholder="Full name"/></div>
          <div className="rb-field"><label>Phone</label><input type="tel" placeholder="+252 907 178 891"/></div>
          <div className="rb-field"><label>Special Requests</label><input type="text" placeholder="Anniversary, allergy, window seat..."/></div>
          <button className={`rb-submit ${tableBooked?'done':''}`} onClick={() => setTableBooked(true)}>
            {tableBooked ? 'TABLE RESERVED ✓' : 'CONFIRM RESERVATION →'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ===== AMENITIES =====
function AmenitiesSection() {
  const ref1 = useFade(), ref2 = useFade()
  return (
    <div className="amenities-section" id="amenities">
      <div ref={ref1} style={{textAlign:'center',marginBottom:'2.5rem'}}>
        <div className="section-eyebrow" style={{justifyContent:'center'}}>Hotel Features</div>
        <div className="section-title">World-Class Amenities</div>
        <p className="section-sub" style={{margin:'0 auto'}}>Every detail designed to elevate your stay beyond imagination.</p>
      </div>
      <div className="amenities-grid" ref={ref2}>
        {AMENITIES.map((a,i) => (
          <div className="amenity-card" key={i}>
            <div className="amenity-icon">{a.icon}</div>
            <div className="amenity-title">{a.title}</div>
            <div className="amenity-desc">{a.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ===== GALLERY =====
function GallerySection() {
  const ref1 = useFade(), ref2 = useFade()
  return (
    <div className="main-wrap" id="gallery">
      <div ref={ref1}>
        <div className="section-eyebrow">Visual Tour</div>
        <div className="section-title">Hotel Gallery</div>
        <p className="section-sub">A glimpse into the world of LuxeStay.</p>
      </div>
      <div className="gallery-grid" ref={ref2}>
        {GALLERY.map((g,i) => (
          <div className="gallery-item" key={i} style={{background:g.bg}}>
            <span className="gallery-emoji">{g.emoji}</span>
            <div className="gallery-label">{g.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ===== REVIEWS =====
function ReviewsSection() {
  const ref1 = useFade(), ref2 = useFade()
  return (
    <div className="reviews-section" id="reviews">
      <div ref={ref1} style={{textAlign:'center',marginBottom:'2.5rem'}}>
        <div className="section-eyebrow" style={{justifyContent:'center'}}>Guest Stories</div>
        <div className="section-title">What Our Guests Say</div>
      </div>
      <div className="reviews-grid" ref={ref2}>
        {REVIEWS.map((r,i) => (
          <div className="review-card" key={i}>
            <div className="review-stars">{'⭐'.repeat(r.rating)}</div>
            <div className="review-text">"{r.text}"</div>
            <div className="review-author">
              <div className="review-av" style={{background:r.color}}>{r.init}</div>
              <div><div className="review-name">{r.name}</div><div className="review-country">{r.country}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ===== CONTACT =====
function ContactSection({ onBook }) {
  const [sent, setSent] = useState(false)
  const ref = useFade()
  return (
    <div className="contact-section" id="contact">
      <div className="contact-inner" ref={ref}>
        <div>
          <div className="section-eyebrow">Get In Touch</div>
          <div className="contact-title">Plan Your<br /><em>Perfect Stay</em></div>
          <p className="contact-sub">Our concierge team is available 24/7 to assist with reservations and special requests.</p>
          <div className="contact-details">
            <div className="cd-item"><span className="cd-icon">📍</span><span>123 Beachfront Avenue, Mogadishu, Somalia</span></div>
            <div className="cd-item"><span className="cd-icon">📞</span><span>+252 907 178 891</span></div>
            <div className="cd-item"><span className="cd-icon">✉️</span><span>reservations@luxestay.com</span></div>
            <div className="cd-item"><span className="cd-icon">🕐</span><span>Check-in: 3PM · Check-out: 11AM</span></div>
          </div>
          <button className="btn-gold" style={{marginTop:'1.5rem'}} onClick={onBook}>BOOK YOUR ROOM →</button>
        </div>
        <div className="contact-form">
          <h3 style={{marginBottom:'1.2rem',fontSize:'1rem',fontWeight:700,color:'#c9a84c'}}>Send a Message</h3>
          <div className="cf-row">
            <div className="cf-group"><label>First Name</label><input type="text" placeholder="Ahmed"/></div>
            <div className="cf-group"><label>Last Name</label><input type="text" placeholder="Hassan"/></div>
          </div>
          <div className="cf-group"><label>Email</label><input type="email" placeholder="ahmed@email.com"/></div>
          <div className="cf-group"><label>Phone</label><input type="tel" placeholder="+252 ..."/></div>
          <div className="cf-group"><label>Message</label><textarea rows="4" placeholder="Tell us how we can help..."></textarea></div>
          <button className={`rb-submit ${sent?'done':''}`} onClick={() => setSent(true)}>
            {sent ? 'MESSAGE SENT ✓' : 'SEND MESSAGE →'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ===== MODAL =====
function BookingModal({ modal, onClose }) {
  const [confirmed, setConfirmed] = useState(false)
  if (!modal) return null
  return (
    <div className="overlay show" onClick={e => e.target.className==='overlay show' && onClose()}>
      <div className="modal">
        <div className="modal-head">
          <div className="modal-title">{modal.room} — Booking</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        {!confirmed ? (
          <>
            <div className="modal-body">
              <div className="m-info"><strong>{modal.room}</strong><span>{modal.price} per night</span></div>
              <div className="mfr">
                <div className="mf"><label>First Name</label><input type="text" placeholder="Ahmed"/></div>
                <div className="mf"><label>Last Name</label><input type="text" placeholder="Hassan"/></div>
              </div>
              <div className="mf"><label>Email</label><input type="email" placeholder="ahmed@email.com"/></div>
              <div className="mf"><label>Phone</label><input type="tel" placeholder="+252 907 178 891"/></div>
              <div className="mfr">
                <div className="mf"><label>Check In</label><input type="date" defaultValue="2025-05-15"/></div>
                <div className="mf"><label>Check Out</label><input type="date" defaultValue="2025-05-18"/></div>
              </div>
              <div className="mf"><label>Special Requests</label><input type="text" placeholder="Late check-in, extra pillows..."/></div>
            </div>
            <div className="modal-foot">
              <button className="m-cancel" onClick={onClose}>CANCEL</button>
              <button className="m-confirm" onClick={() => setConfirmed(true)}>CONFIRM BOOKING →</button>
            </div>
          </>
        ) : (
          <div className="success-body">
            <div style={{fontSize:60}}>🏨</div>
            <h3>Booking Confirmed!</h3>
            <p>Your reservation is confirmed. A confirmation email is on its way. Welcome to LuxeStay!</p>
            <button className="m-confirm" style={{marginTop:24,width:'100%'}} onClick={onClose}>CLOSE</button>
          </div>
        )}
      </div>
    </div>
  )
}

// ===== TOAST =====
function Toast({ msg }) {
  return <div className="toast-msg">{msg}</div>
}

// ===== APP =====
export default function App() {
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState(null)

  const openBook = (room='Deluxe Suite', price='$250') => setModal({ room, price })
  const closeBook = () => setModal(null)
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000) }

  return (
    <>
      <Navbar onBook={openBook} />
      <Hero onBook={openBook} />
      <BookingBar onSearch={() => showToast('✅ 3 rooms available for your dates!')} />
      <LiveStats />
      <RoomsSection onBook={openBook} />
      <AmenitiesSection />
      <RestaurantSection />
      <GallerySection />
      <ReviewsSection />
      <ContactSection onBook={openBook} />
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">LUXE<span>STAY</span></div>
          <p className="footer-tagline">Luxury redefined. Memories forever.</p>
          <div className="footer-links">
            {['Rooms','Restaurant','Spa','Events','Gallery','Contact'].map(l => (
              <a key={l} onClick={() => scrollTo(`#${l.toLowerCase()}`)}>{l}</a>
            ))}
          </div>
          <div className="footer-copy">© 2025 LuxeStay · Built by Muno Salat Nour · Somalia 🇸🇴</div>
        </div>
      </footer>
      <BookingModal modal={modal} onClose={closeBook} />
      {toast && <Toast msg={toast} />}
    </>
  )
}