document.addEventListener('DOMContentLoaded', () => {
    // 1. Render Categories
    const categoryGrid = document.getElementById('category-grid');
    if (categoryGrid && window.siteData && window.siteData.categories) {
        // Render limited categories for homepage grid
        const categoriesToRender = window.siteData.categories.slice(0, 25);
        categoriesToRender.forEach((cat, index) => {
            const card = document.createElement('a');
            card.href = `products.html#${cat.slug}`;
            card.className = 'cat-card fade-in-up';
            card.style.transitionDelay = `${(index % 4) * 0.1}s`;
            
            card.innerHTML = `
                <div class="cat-img-wrapper">
                    <img src="${cat.img}" alt="${cat.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <div style="width:100%; height:100%; background:var(--warm-beige); position:absolute; top:0; left:0; display:none; align-items:center; justify-content:center; color:var(--charcoal); text-align:center; padding:1rem; font-size:0.8rem;">[IMG: ${cat.name}]</div>
                </div>
                <div class="cat-content">
                    <div style="font-family:var(--font-secondary); font-size:0.8rem; color:var(--charcoal); margin-bottom:0.5rem;">0${index + 1}</div>
                    <h3>${cat.name}</h3>
                    <p>${cat.desc}</p>
                    <div class="cat-arrow">VIEW PRODUCTS</div>
                </div>
            `;
            categoryGrid.appendChild(card);
        });
    }

    // 2. Render Brands
    const brandGrid = document.getElementById('brand-grid');
    if (brandGrid && window.siteData && window.siteData.brands) {
        // Render verified brands in a 3-line marquee
        const verifiedBrands = window.siteData.brands.filter(b => b.verified);
        if (verifiedBrands.length > 0) {
            const chunkSize = Math.ceil(verifiedBrands.length / 3);
            const chunks = [
                verifiedBrands.slice(0, chunkSize),
                verifiedBrands.slice(chunkSize, chunkSize * 2),
                verifiedBrands.slice(chunkSize * 2)
            ];

            chunks.forEach((chunk) => {
                if(chunk.length === 0) return;
                const row = document.createElement('div');
                row.className = 'marquee-row fade-in-up';
                
                const track = document.createElement('div');
                track.className = 'marquee-track';
                
                // Duplicate the chunk multiple times for seamless infinite scroll
                for(let i=0; i < 4; i++) {
                    chunk.forEach((brand) => {
                        const item = document.createElement('div');
                        item.className = 'brand-logo-item';
                        item.innerHTML = `
                            <img src="${brand.img}" alt="${brand.name} logo" loading="lazy" onerror="this.style.display='none';">
                        `;
                        track.appendChild(item);
                    });
                }
                
                row.appendChild(track);
                brandGrid.appendChild(row);
            });
        }
    }

    // 3. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // 4. Parallax Background Effect
    const parallaxImages = document.querySelectorAll('.parallax-bg');
    if (parallaxImages.length > 0) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                parallaxImages.forEach(img => {
                    // Get the section containing the image
                    const section = img.closest('section');
                    if (section) {
                        const rect = section.getBoundingClientRect();
                        // Only calculate if section is in viewport
                        if (rect.top < window.innerHeight && rect.bottom > 0) {
                            // Calculate how far the section is from the center of the screen
                            const centerOffset = rect.top - (window.innerHeight / 2) + (rect.height / 2);
                            // 20% slower parallax effect
                            const parallaxOffset = centerOffset * -0.2;
                            img.style.setProperty('--parallax-y', `${parallaxOffset}px`);
                        }
                    }
                });
            });
        }, { passive: true });
    }
});
