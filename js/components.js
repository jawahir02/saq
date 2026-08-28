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
                    background-color: transparent !important;
                    color: var(--navy-blue, #1A2B4C) !important;
                    padding: 0.7rem 1.5rem;
                    border: 1.5px solid var(--navy-blue, #1A2B4C);
                    border-radius: 4px;
                    font-weight: 600;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                }
                .nav-cta:hover {
                    background-color: var(--navy-blue, #1A2B4C) !important;
                    color: white !important;
                    box-shadow: 0 4px 15px rgba(26,43,76,0.15);
                }
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0.5rem;
                }
                .mobile-menu-btn svg {
                    width: 28px;
                    height: 28px;
                    stroke: var(--charcoal, #2C2C2C);
                }
                .mobile-nav-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.5);
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.4s ease;
                    z-index: 1000;
                }
                .mobile-nav-overlay.active {
                    opacity: 1;
                    visibility: visible;
                }
                .mobile-nav {
                    display: flex;
                    flex-direction: column;
                    background: var(--charcoal, #363636); /* Charcoal grey */
                    position: fixed;
                    top: 0;
                    bottom: 0;
                    right: -100%;
                    width: 320px;
                    max-width: 85%;
                    height: 100vh;
                    height: 100dvh;
                    box-sizing: border-box;
                    padding: 80px 1.5rem calc(1.5rem + env(safe-area-inset-bottom, 0px));
                    box-shadow: -5px 0 25px rgba(0,0,0,0.3);
                    transition: right 0.4s cubic-bezier(0.77, 0, 0.175, 1);
                    z-index: 1001;
                    overflow-y: auto;
                }
                .mobile-nav.active {
                    right: 0;
                }
                .mobile-nav-close {
                    position: absolute;
                    top: 25px;
                    right: 25px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0.5rem;
                }
                .mobile-nav-close svg {
                    width: 24px;
                    height: 24px;
                    stroke: #FFFFFF;
                }
                .mobile-nav .nav-link {
                    padding: 1.2rem 0;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    text-decoration: none;
                    color: #FFFFFF;
                    font-weight: 500;
                    font-size: 0.95rem;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    flex-shrink: 0;
                    transition: color 0.3s ease;
                }
                .mobile-nav .nav-link:hover {
                    color: var(--gold, #B89C5D);
                }
                .mobile-nav .nav-cta-mobile {
                    margin-top: auto !important;
                    margin-bottom: 0 !important;
                    background-color: transparent;
                    color: #FFFFFF;
                    padding: 1.1rem 1rem;
                    text-align: center;
                    border-radius: 4px;
                    border: 1.5px solid #FFFFFF;
                    font-weight: 600;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    text-decoration: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                    flex-shrink: 0;
                    box-sizing: border-box;
                    width: 100%;
                }
                .mobile-nav .nav-cta-mobile:hover {
                    background-color: rgba(255,255,255,0.1);
                }
                @media (max-width: 768px) {
                    /* Keep the header layout */
                    .main-header {
                        width: 100%;
                    }

                    .header-container {
                        position: relative;
                        display: flex;
                        align-items: flex-start;
                        justify-content: space-between;
                        padding: 14px 18px 10px;
                    }

                    /* LOGO BLOCK */
                    .logo-container {
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        justify-content: flex-start !important;

                        width: 280px !important;
                        max-width: 280px !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        text-decoration: none !important;
                    }

                    /* MAKE THE ACTUAL SAQ LOGO LARGER (280px) */
                    .logo-container img {
                        display: block !important;

                        width: 280px !important;
                        height: auto !important;

                        max-width: none !important;
                        object-fit: contain !important;

                        margin: 0 !important;
                        padding: 0 !important;
                    }

                    /* TAGLINE DIRECTLY UNDER LOGO */
                    .logo-tagline {
                        display: block !important;

                        width: 116px !important;
                        max-width: 116px !important;

                        margin: 3px 0 0 0 !important;
                        padding: 0 !important;

                        text-align: center !important;

                        font-size: 5px !important;
                        line-height: 1.15 !important;
                        letter-spacing: 0.15px !important;

                        white-space: nowrap !important;
                        transform: translateX(0) !important;

                        color: var(--charcoal, #292929) !important;
                    }

                    /* SCROLLED COMPACT LOGO */
                    .main-header.scrolled .logo-container {
                        flex-direction: row !important;
                        align-items: center !important;
                        width: auto !important;
                        max-width: none !important;
                    }

                    .main-header.scrolled .logo-container img {
                        width: 70px !important;
                        height: auto !important;
                    }

                    .main-header.scrolled .logo-tagline {
                        width: auto !important;
                        max-width: 120px !important;
                        margin: 0 !important;
                        padding: 0 0 0 8px !important;
                        border-left: 1px solid rgba(41, 41, 41, 0.5) !important;
                        font-size: 4.6px !important;
                        line-height: 1.1 !important;
                        white-space: normal !important;
                        text-align: left !important;
                        transform: translateX(-22px) !important; /* Pull left to remove invisible image gap */
                    }

                    /* HAMBURGER */
                    .mobile-menu-btn {
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;

                        width: 36px !important;
                        height: 36px !important;

                        margin: 2px 0 0 auto !important;
                        padding: 0 !important;

                        background: transparent !important;
                        border: 0 !important;
                    }

                    .mobile-menu-btn svg {
                        width: 21px !important;
                        height: 21px !important;
                    }

                    /* DESKTOP NAV MUST REMAIN HIDDEN */
                    .nav-links {
                        display: none !important;
                    }
                }
            </style>
            <header class="main-header" id="main-header">
                <div class="mobile-nav-overlay"></div>
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
                        <a href="careers.html">Careers</a>
                        <a href="https://wa.me/971557566060" class="nav-cta">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 0C5.397 0 0 5.397 0 12.031C0 14.654 0.852 17.078 2.274 19.043L0.555 24L5.617 22.285C7.525 23.518 9.689 24 12.031 24C18.665 24 24.062 18.603 24.062 11.969C24.062 5.335 18.665 0 12.031 0ZM19.01 16.711C18.713 17.555 17.258 18.272 16.48 18.423C15.86 18.543 15.011 18.643 12.185 17.472C8.57 15.98 6.257 12.289 6.079 12.052C5.901 11.815 4.606 10.095 4.606 8.31C4.606 6.525 5.516 5.666 5.891 5.28C6.19 4.972 6.702 4.814 7.214 4.814C7.373 4.814 7.511 4.822 7.633 4.828C8.01 4.846 8.199 4.869 8.446 5.463C8.754 6.206 9.506 8.046 9.595 8.234C9.684 8.422 9.802 8.679 9.664 8.956C9.535 9.223 9.416 9.342 9.219 9.57C9.022 9.798 8.844 9.957 8.636 10.224C8.448 10.432 8.232 10.668 8.457 11.055C8.682 11.432 9.452 12.688 10.59 13.704C12.05 15.015 13.235 15.43 13.65 15.608C14.065 15.786 14.54 15.736 14.836 15.419C15.212 15.013 15.676 14.331 16.141 13.639C16.477 13.136 16.921 13.076 17.376 13.245C17.831 13.414 20.25 14.611 20.725 14.849C21.2 15.087 21.517 15.206 21.626 15.394C21.735 15.582 21.735 16.463 21.438 17.307Z"/></svg>
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
                    <button class="mobile-nav-close" aria-label="Close menu">
                        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <a href="index.html" class="nav-link">Home</a>
                    <a href="about.html" class="nav-link">About</a>
                    <a href="products.html" class="nav-link">Products</a>
                    <a href="contact.html" class="nav-link">Contact</a>
                    <a href="careers.html" class="nav-link">Careers</a>
                    <a href="https://wa.me/971557566060" class="nav-cta-mobile">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 0C5.397 0 0 5.397 0 12.031C0 14.654 0.852 17.078 2.274 19.043L0.555 24L5.617 22.285C7.525 23.518 9.689 24 12.031 24C18.665 24 24.062 18.603 24.062 11.969C24.062 5.335 18.665 0 12.031 0ZM19.01 16.711C18.713 17.555 17.258 18.272 16.48 18.423C15.86 18.543 15.011 18.643 12.185 17.472C8.57 15.98 6.257 12.289 6.079 12.052C5.901 11.815 4.606 10.095 4.606 8.31C4.606 6.525 5.516 5.666 5.891 5.28C6.19 4.972 6.702 4.814 7.214 4.814C7.373 4.814 7.511 4.822 7.633 4.828C8.01 4.846 8.199 4.869 8.446 5.463C8.754 6.206 9.506 8.046 9.595 8.234C9.684 8.422 9.802 8.679 9.664 8.956C9.535 9.223 9.416 9.342 9.219 9.57C9.022 9.798 8.844 9.957 8.636 10.224C8.448 10.432 8.232 10.668 8.457 11.055C8.682 11.432 9.452 12.688 10.59 13.704C12.05 15.015 13.235 15.43 13.65 15.608C14.065 15.786 14.54 15.736 14.836 15.419C15.212 15.013 15.676 14.331 16.141 13.639C16.477 13.136 16.921 13.076 17.376 13.245C17.831 13.414 20.25 14.611 20.725 14.849C21.2 15.087 21.517 15.206 21.626 15.394C21.735 15.582 21.735 16.463 21.438 17.307Z"/></svg> 
                        ORDER NOW
                    </a>
                </nav>
            </header>
        `;

        const mobileMenuBtn = this.querySelector('.mobile-menu-btn');
        const mobileNav = this.querySelector('.mobile-nav');
        const mobileNavOverlay = this.querySelector('.mobile-nav-overlay');
        const mobileNavClose = this.querySelector('.mobile-nav-close');
        const header = this.querySelector('#main-header');
        
        // Determine if we are on the homepage
        const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '';

        // If not on homepage, permanently apply the scrolled state
        if (!isHomePage) {
            header.classList.add('scrolled');
        }

        function toggleMenu() {
            mobileNav.classList.toggle('active');
            mobileNavOverlay.classList.toggle('active');
        }

        mobileMenuBtn.addEventListener('click', toggleMenu);
        if(mobileNavClose) mobileNavClose.addEventListener('click', toggleMenu);
        if(mobileNavOverlay) mobileNavOverlay.addEventListener('click', toggleMenu);

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
                    background-color: #FFFFFF;
                    color: var(--charcoal, #2C2C2C);
                    padding: 1.5rem 2rem 1rem;
                    font-size: 0.75rem;
                    border-top: 1px solid rgba(0,0,0,0.05); /* Added slight border to separate from body */
                }
                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1.5rem; /* Reduced gap to compact further */
                }
                .footer-logo-container {
                    display: flex;
                    align-items: center;
                    margin-bottom: 0.5rem; /* Reduced margin */
                }
                .footer-logo-container img {
                    height: 48px;
                    /* Original logo colors */
                }
                .footer-logo-tagline {
                    margin-left: 8px;
                    padding-left: 12px;
                    border-left: 1px solid rgba(44, 44, 44, 0.3); /* Dark border for white footer */
                    font-size: 0.55rem;
                    color: var(--charcoal, #2C2C2C); /* Dark text */
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    font-weight: 600;
                    line-height: 1.2;
                }
                .footer-col h3 {
                    color: var(--navy-blue, #1A2B4C); /* Dark heading for white footer */
                    font-family: var(--font-display, serif);
                    font-size: 0.95rem;
                    margin-bottom: 0.8rem;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                }
                .footer-col p {
                    margin-bottom: 0.4rem;
                    line-height: 1.4;
                }
                .footer-links {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .footer-links li {
                    margin-bottom: 0.4rem;
                }
                .footer-links a {
                    color: var(--charcoal, #2C2C2C); /* Dark links */
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                .footer-links a:hover {
                    color: var(--gold, #B89C5D);
                }
                .footer-bottom {
                    max-width: 1200px;
                    margin: 1.5rem auto 0;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(0,0,0,0.1); /* Darker border for white footer */
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
                            <li><a href="https://www.google.com/maps/place/25%C2%B010'22.7%22N+55%C2%B015'18.8%22E/@25.1729789,55.2526545,17z/data=!3m1!4b1!4m4!3m3!8m2!3d25.1729789!4d55.2552294" target="_blank" rel="noopener">Location: Al Quoz 3, Dubai, UAE</a></li>
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
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 0C5.397 0 0 5.397 0 12.031C0 14.654 0.852 17.078 2.274 19.043L0.555 24L5.617 22.285C7.525 23.518 9.689 24 12.031 24C18.665 24 24.062 18.603 24.062 11.969C24.062 5.335 18.665 0 12.031 0ZM19.01 16.711C18.713 17.555 17.258 18.272 16.48 18.423C15.86 18.543 15.011 18.643 12.185 17.472C8.57 15.98 6.257 12.289 6.079 12.052C5.901 11.815 4.606 10.095 4.606 8.31C4.606 6.525 5.516 5.666 5.891 5.28C6.19 4.972 6.702 4.814 7.214 4.814C7.373 4.814 7.511 4.822 7.633 4.828C8.01 4.846 8.199 4.869 8.446 5.463C8.754 6.206 9.506 8.046 9.595 8.234C9.684 8.422 9.802 8.679 9.664 8.956C9.535 9.223 9.416 9.342 9.219 9.57C9.022 9.798 8.844 9.957 8.636 10.224C8.448 10.432 8.232 10.668 8.457 11.055C8.682 11.432 9.452 12.688 10.59 13.704C12.05 15.015 13.235 15.43 13.65 15.608C14.065 15.786 14.54 15.736 14.836 15.419C15.212 15.013 15.676 14.331 16.141 13.639C16.477 13.136 16.921 13.076 17.376 13.245C17.831 13.414 20.25 14.611 20.725 14.849C21.2 15.087 21.517 15.206 21.626 15.394C21.735 15.582 21.735 16.463 21.438 17.307Z"/></svg>
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
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 0C5.397 0 0 5.397 0 12.031C0 14.654 0.852 17.078 2.274 19.043L0.555 24L5.617 22.285C7.525 23.518 9.689 24 12.031 24C18.665 24 24.062 18.603 24.062 11.969C24.062 5.335 18.665 0 12.031 0ZM19.01 16.711C18.713 17.555 17.258 18.272 16.48 18.423C15.86 18.543 15.011 18.643 12.185 17.472C8.57 15.98 6.257 12.289 6.079 12.052C5.901 11.815 4.606 10.095 4.606 8.31C4.606 6.525 5.516 5.666 5.891 5.28C6.19 4.972 6.702 4.814 7.214 4.814C7.373 4.814 7.511 4.822 7.633 4.828C8.01 4.846 8.199 4.869 8.446 5.463C8.754 6.206 9.506 8.046 9.595 8.234C9.684 8.422 9.802 8.679 9.664 8.956C9.535 9.223 9.416 9.342 9.219 9.57C9.022 9.798 8.844 9.957 8.636 10.224C8.448 10.432 8.232 10.668 8.457 11.055C8.682 11.432 9.452 12.688 10.59 13.704C12.05 15.015 13.235 15.43 13.65 15.608C14.065 15.786 14.54 15.736 14.836 15.419C15.212 15.013 15.676 14.331 16.141 13.639C16.477 13.136 16.921 13.076 17.376 13.245C17.831 13.414 20.25 14.611 20.725 14.849C21.2 15.087 21.517 15.206 21.626 15.394C21.735 15.582 21.735 16.463 21.438 17.307Z"/></svg>
            </a>
        `;
    }
}
customElements.define('floating-call-btn', FloatingCallBtn);
