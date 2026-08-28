class SAQHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                .main-header {
                    background-color: transparent;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    width: 100%;
                    z-index: 1000;
                    padding: 0.3rem 0;
                    transition: all 0.3s ease;
                }
                .main-header.scrolled {
                    background-color: #F9F8F6; /* Off-white background */
                    box-shadow: 0 2px 15px rgba(0,0,0,0.05);
                    padding: 0.5rem 0;
                }
                .header-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 3%;
                }
                .logo-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-decoration: none;
                    margin-top: 5px;
                    transition: all 0.3s ease;
                }
                .main-header.scrolled .logo-container {
                    flex-direction: row;
                    margin-top: 0;
                }
                .logo-container img {
                    height: 107px;
                    transition: all 0.3s ease;
                }
                .main-header.scrolled .logo-container img {
                    height: 48px; /* Increased slightly */
                }
                .logo-tagline {
                    font-size: 0.49rem;
                    color: var(--charcoal, #2C2C2C);
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    font-weight: 600;
                    margin-top: 3px;
                    white-space: nowrap;
                    transform: translateX(-12%);
                    transition: all 0.3s ease;
                }
                .main-header.scrolled .logo-tagline {
                    transform: none;
                    margin-top: 0;
                    margin-left: 8px; /* Moved vertical line closer to the logo */
                    padding-left: 12px;
                    border-left: 1px solid rgba(44, 44, 44, 0.3); /* Vertical line */
                    font-size: 0.55rem;
                }
                .nav-links {
                    display: flex;
                    gap: 1.8rem;
                    align-items: center;
                    transform: translateY(-16px);
                    transition: all 0.3s ease;
                }
                .main-header.scrolled .nav-links {
                    transform: translateY(0);
                }
                .nav-links a {
                    text-decoration: none;
                    color: var(--charcoal, #2C2C2C);
                    font-weight: 600;
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    transition: color 0.3s ease;
                }
                .nav-links a:hover {
                    color: var(--gold, #B89C5D);
                }
                .nav-cta {
                    background-color: var(--navy-blue, #1A2B4C) !important;
                    color: white !important;
                    padding: 0.7rem 1.5rem;
                    border: 1px solid rgba(0,0,0,0.08);
                    border-radius: 4px;
                    font-weight: 600;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.02);
                    transition: all 0.3s ease;
                }
                .nav-cta:hover {
                    border-color: rgba(0,0,0,0.15);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                }
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0.5rem;
                }
                .mobile-menu-btn svg {
                    width: 24px;
                    height: 24px;
                    stroke: var(--charcoal, #2C2C2C);
                }
                .mobile-nav {
                    display: none;
                    flex-direction: column;
                    background: white;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    padding: 1rem 2rem;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }
                .mobile-nav.active {
                    display: flex;
                }
                .mobile-nav a {
                    padding: 0.8rem 0;
                    border-bottom: 1px solid #eaeaea;
                    text-decoration: none;
                    color: var(--charcoal, #2C2C2C);
                    font-weight: 500;
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .mobile-nav a:last-child {
                    border-bottom: none;
                }
                @media (max-width: 768px) {
                    .nav-links { display: none; }
                    .mobile-menu-btn { display: block; }
                    .header-container { padding: 0.8rem 5%; }
                    .logo-container img { height: 50px; }
                    .main-header.scrolled .logo-container img { height: 35px; }
                    .main-header.scrolled .logo-tagline { display: none; } /* Hide text on mobile when scrolled to save space */
                }
            </style>
            <header class="main-header" id="main-header">
                <div class="header-container">
                    <a href="index.html" class="logo-container">
                        <img src="herologo.png" alt="SAQ Building Materials Logo" onerror="this.src='1.png'">
                        <div class="logo-tagline">Building Materials Supplier In Dubai</div>
                    </a>
                    <nav class="nav-links">
                        <a href="index.html">Home</a>
                        <a href="about.html">About</a>
                        <a href="products.html">Products</a>
                        <a href="contact.html">Contact</a>
                        <a href="https://wa.me/971557566060" class="nav-cta">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                            ORDER NOW
                        </a>
                    </nav>
                    <button class="mobile-menu-btn" aria-label="Toggle menu">
                        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <nav class="mobile-nav">
                    <a href="index.html">Home</a>
                    <a href="about.html">About</a>
                    <a href="products.html">Products</a>
                    <a href="contact.html">Contact</a>
                    <a href="https://wa.me/971557566060" style="color: var(--navy-blue); font-weight: bold;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: text-bottom;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg> ORDER NOW
                    </a>
                </nav>
            </header>
        `;

        const mobileMenuBtn = this.querySelector('.mobile-menu-btn');
        const mobileNav = this.querySelector('.mobile-nav');
        const header = this.querySelector('#main-header');
        
        // Determine if we are on the homepage
        const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '';

        // If not on homepage, permanently apply the scrolled state
        if (!isHomePage) {
            header.classList.add('scrolled');
        }

        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
        });

        window.addEventListener('scroll', () => {
            // Only toggle on scroll if we are on the homepage
            if (isHomePage) {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        });
    }
}
customElements.define('saq-header', SAQHeader);

class SAQFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                .main-footer {
                    background-color: var(--navy-blue, #1A2B4C);
                    color: rgba(255,255,255,0.7);
                    padding: 1.5rem 2rem 1rem; /* Reduced padding to make blue box smaller */
                    font-size: 0.75rem;
                }
                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 2rem;
                }
                .footer-logo-container {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                .footer-logo-container img {
                    height: 48px;
                    /* Removed filter to use original logo colors */
                }
                .footer-logo-tagline {
                    margin-left: 8px;
                    padding-left: 12px;
                    border-left: 1px solid rgba(255, 255, 255, 0.3);
                    font-size: 0.55rem;
                    color: rgba(255,255,255,0.8);
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    font-weight: 600;
                    line-height: 1.2;
                }
                .footer-col h3 {
                    color: white;
                    font-family: var(--font-display, serif);
                    font-size: 0.95rem;
                    margin-bottom: 1rem;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                }
                .footer-col p {
                    margin-bottom: 0.6rem;
                    line-height: 1.5;
                }
                .footer-links {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .footer-links li {
                    margin-bottom: 0.6rem;
                }
                .footer-links a {
                    color: rgba(255,255,255,0.7);
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                .footer-links a:hover {
                    color: var(--gold, #B89C5D);
                }
                .footer-bottom {
                    max-width: 1200px;
                    margin: 2rem auto 0;
                    padding-top: 1.5rem;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    text-align: center;
                    font-size: 0.7rem;
                }
            </style>
            <footer class="main-footer">
                <div class="footer-container">
                    <div class="footer-col">
                        <div class="footer-logo-container">
                            <img src="herologo.png" alt="SAQ Logo" onerror="this.src='1.png'">
                            <div class="footer-logo-tagline">Building Materials<br>Supplier In Dubai</div>
                        </div>
                        <p>Leading supplier of premium building materials, paints, and consumables for contractors across the UAE.</p>
                        <p>Dubai, United Arab Emirates</p>
                    </div>
                    <div class="footer-col">
                        <h3>Quick Links</h3>
                        <ul class="footer-links">
                            <li><a href="index.html">Home</a></li>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="products.html">All Products</a></li>
                            <li><a href="brands.html">Partner Brands</a></li>
                            <li><a href="careers.html">Careers</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h3>Contact Us</h3>
                        <ul class="footer-links">
                            <li><a href="tel:+971557566060">Phone: +971 55 756 6060</a></li>
                            <li><a href="mailto:sales@saqtrading.com">Email: sales@saqtrading.com</a></li>
                            <li><a href="https://wa.me/971557566060">WhatsApp: +971 55 756 6060</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    &copy; ${new Date().getFullYear()} SAQ Building Materials. All rights reserved.
                </div>
            </footer>
        `;
    }
}
customElements.define('saq-footer', SAQFooter);

class MobileContactBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                .mobile-contact-bar {
                    display: none;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    background: white;
                    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
                    z-index: 999;
                }
                .mcb-container {
                    display: flex;
                    height: 60px;
                }
                .mcb-btn {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.9rem;
                    border-right: 1px solid #eaeaea;
                }
                .mcb-btn:last-child {
                    border-right: none;
                }
                .mcb-call {
                    color: var(--navy-blue, #1A2B4C);
                }
                .mcb-wa {
                    background: #25D366;
                    color: white;
                }
                @media (max-width: 768px) {
                    .mobile-contact-bar { display: block; }
                }
            </style>
            <div class="mobile-contact-bar">
                <div class="mcb-container">
                    <a href="tel:+971557566060" class="mcb-btn mcb-call">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        Call
                    </a>
                    <a href="https://wa.me/971557566060" class="mcb-btn mcb-wa">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                        WhatsApp
                    </a>
                </div>
            </div>
        `;
    }
}
customElements.define('mobile-contact-bar', MobileContactBar);

class FloatingCallBtn extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                .floating-call-btn {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 60px;
                    height: 60px;
                    background-color: #25D366;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
                    text-decoration: none;
                    z-index: 998;
                    transition: transform 0.3s ease;
                }
                .floating-call-btn:hover {
                    transform: scale(1.1);
                }
                @media (max-width: 768px) {
                    .floating-call-btn { display: none; }
                }
            </style>
            <a href="https://wa.me/971557566060" class="floating-call-btn" aria-label="WhatsApp Us">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            </a>
        `;
    }
}
customElements.define('floating-call-btn', FloatingCallBtn);
