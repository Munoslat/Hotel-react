import { useState } from 'react'
import './App.css'

const ROOMS = [
  {emoji:'🛏️',bg:'#1a1508',badge:'AVAILABLE',badgeCls:'badge-green',type:'Deluxe Room',name:'Ocean View Deluxe',desc:'Spacious room with stunning ocean views, king bed, and marble bathroom.',amenities:['📶 WiFi','❄️ A/C','🍳 Breakfast','🅿️ Parking'],price:'$180',featured:false},
  {emoji:'🌟',bg:'#12100a',badge:'FEATURED',badgeCls:'badge-gold',type:'Junior Suite',name:'Garden Junior Suite',desc:'Elegant suite with private garden terrace, living area, and premium amenities.',amenities:['📶 WiFi','🛁 Jacuzzi','🍽️ Room Service','🍷 Minibar'],price:'$350',featured:true},
  {emoji:'👑',bg:'#0d0c08',badge:'LAST ROOM',badgeCls:'badge-gold',type:'Presidential Suite',name:'Royal Presidential',desc:'The ultimate luxury — 3 rooms, private pool, butler service 24/7.',amenities:['🏊 Pool','👨‍🍳 Butler','🚗 Limo','💆 Spa'],price:'$850',featured:false},
]

const MENU = [
  {emoji:'🥩',bg:'#1a1205',name:'Grilled Somali Spiced Lamb',desc:'Slow-roasted lamb with aromatic spices, saffron rice, and roasted vegetables',price:'$42',tag:"Chef's Special"},
  {emoji:'🐟',bg:'#0a1510',name:'Indian Ocean Sea Bass',desc:'Fresh catch of the day, grilled with lemon butter, capers, and herb salad',price:'$36',tag:'Fresh Today'},
  {emoji:'🍝',bg:'#100a15',name:'Truffle Lobster Pasta',desc:'Tagliatelle with butter-poached lobster, black truffle, and parmesan cream',price:'$58',tag:null},
]

const DASH = [
  {num:'38/48',lbl:'Rooms Occupied',change:'↑ 79% occupancy',color:'#3d9970'},
  {num:'24',lbl:'Check-ins Today',change:'→ 8 pending',color:'#c9a84c'},
  {num:'$18,400',lbl:'Revenue Today',change:'↑ +12% vs yesterday',color:'#3d9970'},
  {num:'4.9★',lbl:'Guest Rating',change:'→ 847 reviews',color:'#c9a84c'},
]

export default function App() {
  const [modal, setModal] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [tableBooked, setTableBooked] = useState(false)

  const openModal = (room, price) => { setModal({room,price}); setConfirmed(false) }
  const closeModal = () => setModal(null)

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-logo">LUXE<span>STAY</span></div>
        <ul className="nav-links">
          <li><a>Rooms</a></li>
          <li><a>Restaurant</a></li>
          <li><a>Spa &amp; Wellness</a></li>
          <li><a>Events</a></li>
          <li><a>Contact</a></li>
        </ul>
        <div className="nav-right">
          <button className="nav-outline">SIGN IN</button>
          <button className="nav-gold" onClick={()=>openModal('Deluxe Suite','$250')}>BOOK NOW</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-pattern"></div>
        <div className="hero-content">
          <div className="hero-eyebrow">Luxury Hotel &amp; Dining</div>
          <h1 className="hero-title">Where Every<br/>Stay Is <em>Unforgettable</em></h1>
          <p className="hero-sub">Experience world-class hospitality, fine dining, and exceptional service.</p>
          <div className="hero-btns">
            <button className="btn-gold" onClick={()=>openModal('Deluxe Suite','$250')}>RESERVE A ROOM</button>
            <button className="btn-ghost">EXPLORE MORE</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="h-stat-box"><div className="h-stat-num">98%</div><div className="h-stat-lbl">SATISFACTION</div></div>
          <div className="h-stat-box"><div className="h-stat-num">48</div><div className="h-stat-lbl">LUXURY ROOMS</div></div>
          <div className="h-stat-box"><div className="h-stat-num">12+</div><div className="h-stat-lbl">YEARS</div></div>
        </div>
      </section>

      {/* BOOKING BAR */}
      <div className="booking-bar">
        <div className="booking-form">
          <div className="bf-field">
            <div className="bf-label">Check In</div>
            <input type="date" className="bf-input" defaultValue="2025-05-15"/>
          </div>
          <div className="bf-field">
            <div className="bf-label">Check Out</div>
            <input type="date" className="bf-input" defaultValue="2025-05-18"/>
          </div>
          <div className="bf-field">
            <div className="bf-label">Guests</div>
            <select className="bf-select">
              <option>1 Adult</option>
              <option>2 Adults</option>
              <option>2 Adults, 1 Child</option>
            </select>
          </div>
          <div className="bf-field">
            <div className="bf-label">Room Type</div>
            <select className="bf-select">
              <option>Any Room</option>
              <option>Deluxe Room</option>
              <option>Junior Suite</option>
              <option>Presidential Suite</option>
            </select>
          </div>
          <button className="search-btn" onClick={()=>alert('3 rooms available!')}>CHECK →</button>
        </div>
      </div>

      {/* LIVE STATS */}
      <div className="dash-grid">
        {DASH.map((s,i)=>(
          <div className="d-stat" key={i}>
            <div className="d-num">{s.num}</div>
            <div className="d-lbl">{s.lbl}</div>
            <div className="d-change" style={{color:s.color}}>{s.change}</div>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="main-wrap">

        {/* ROOMS */}
        <div className="section-eyebrow">Accommodations</div>
        <div className="section-title">Our Rooms &amp; Suites</div>
        <div className="rooms-grid">
          {ROOMS.map((r,i)=>(
            <div className="room-card" key={i} style={r.featured?{borderColor:'#c9a84c'}:{}}>
              <div className="room-img" style={{background:r.bg}}>
                {r.emoji}
                <span className={`room-badge ${r.badgeCls}`}>{r.badge}</span>
              </div>
              <div className="room-body">
                <div className="room-type">{r.type}</div>
                <div className="room-name">{r.name}</div>
                <div className="room-desc">{r.desc}</div>
                <div className="room-amenities">
                  {r.amenities.map((a,j)=><span className="amenity" key={j}>{a}</span>)}
                </div>
                <div className="room-footer">
                  <div><span className="price-num">{r.price}</span><span className="price-per"> / night</span></div>
                  <button className="book-room" onClick={()=>openModal(r.name,r.price)}>BOOK NOW</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RESTAURANT */}
        <div className="section-eyebrow">Fine Dining</div>
        <div className="section-title">Restaurant &amp; Menu</div>
        <div className="rest-grid">
          <div>
            {MENU.map((m,i)=>(
              <div className="menu-item" key={i}>
                <div className="menu-img" style={{background:m.bg}}>{m.emoji}</div>
                <div style={{flex:1}}>
                  <div className="menu-name">{m.name}</div>
                  <div className="menu-desc">{m.desc}</div>
                  <div className="menu-footer">
                    <div className="menu-price">{m.price}</div>
                    <div style={{display:'flex',gap:8,alignItems:'center'}}>
                      {m.tag && <span className="menu-diet">{m.tag}</span>}
                      <button className="add-item">+ ADD</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* TABLE BOOKING */}
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
            <div className="rb-field"><label>Your Name</label><input type="text" defaultValue="Muno" placeholder="Full name"/></div>
            <div className="rb-field"><label>Phone</label><input type="tel" placeholder="+252 907 178 891"/></div>
            <div className="rb-field"><label>Special Requests</label><input type="text" placeholder="Anniversary, allergy, window seat..."/></div>
            <button className={`rb-submit ${tableBooked?'done':''}`} onClick={()=>setTableBooked(true)}>
              {tableBooked ? 'TABLE RESERVED ✓' : 'CONFIRM RESERVATION →'}
            </button>
          </div>
        </div>
      </div>

      <footer>© 2025 LUXESTAY · Built by Muno Salat Nour · Somalia 🇸🇴</footer>

      {/* MODAL */}
      {modal && (
        <div className="overlay show" onClick={e=>e.target.className==='overlay show'&&closeModal()}>
          <div className="modal">
            <div className="modal-head">
              <div className="modal-title">{modal.room} — Booking</div>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            {!confirmed ? (
              <>
                <div className="modal-body">
                  <div className="m-info">
                    <strong>{modal.room}</strong>
                    <span>{modal.price} per night · 3 nights</span>
                  </div>
                  <div className="mfr">
                    <div className="mf"><label>First Name</label><input type="text" defaultValue="Muno"/></div>
                    <div className="mf"><label>Last Name</label><input type="text" placeholder="Nour"/></div>
                  </div>
                  <div className="mf"><label>Email</label><input type="email" defaultValue="munonour@gmail.com"/></div>
                  <div className="mf"><label>Phone</label><input type="tel" defaultValue="+252 907 178 891"/></div>
                  <div className="mfr">
                    <div className="mf"><label>Check In</label><input type="date" defaultValue="2025-05-15"/></div>
                    <div className="mf"><label>Check Out</label><input type="date" defaultValue="2025-05-18"/></div>
                  </div>
                </div>
                <div className="modal-foot">
                  <button className="m-cancel" onClick={closeModal}>CANCEL</button>
                  <button className="m-confirm" onClick={()=>setConfirmed(true)}>CONFIRM BOOKING →</button>
                </div>
              </>
            ) : (
              <div className="success-body">
                <div style={{fontSize:60}}>🏨</div>
                <h3>Booking Confirmed!</h3>
                <p style={{fontSize:14,color:'var(--muted)'}}>Your reservation is confirmed. Welcome to LuxeStay!</p>
                <button className="m-confirm" style={{marginTop:24,width:'100%'}} onClick={closeModal}>CLOSE</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}