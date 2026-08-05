document.addEventListener('DOMContentLoaded', () => {
    // Load Stats
    fetch('assets/data/stats.json')
        .then(res => res.json())
        .then(data => {
            const statItems = document.querySelectorAll('.stats .stat-item');
            statItems.forEach((item, i) => {
                if (data[i]) {
                    const iconEl = item.querySelector('.icon i');
                    const numEl = item.querySelector('.num');
                    const labelEl = item.querySelector('.label');

                    if (iconEl && data[i].icon) {
                        iconEl.className = data[i].icon;
                    }
                    if (numEl) {
                        if (data[i].target) {
                            const counter = numEl.querySelector('.counter');
                            if (counter) {
                                counter.setAttribute('data-target', data[i].target);
                            }
                        } else if (data[i].text) {
                            numEl.textContent = data[i].text;
                        }
                    }
                    if (labelEl && data[i].label) {
                        labelEl.textContent = data[i].label;
                    }
                }
            });
            if (data.length !== statItems.length) {
                console.warn(`Stats count mismatch: JSON has ${data.length}, HTML has ${statItems.length}`);
            }
        }).catch(err => console.error('Stats loading failed:', err));

    // Load Services
    fetch('assets/data/services.json')
        .then(res => res.json())
        .then(data => {
            if (data.cards) {
                const serviceCards = document.querySelectorAll('.services-grid .service-card');
                serviceCards.forEach((card, i) => {
                    if (data.cards[i]) {
                        const iconEl = card.querySelector('.service-icon i');
                        const titleEl = card.querySelector('h3');
                        const descEl = card.querySelector('p');

                        if (iconEl && data.cards[i].icon) {
                            iconEl.className = data.cards[i].icon;
                        }
                        if (titleEl && data.cards[i].title) {
                            titleEl.textContent = data.cards[i].title;
                        }
                        if (descEl && data.cards[i].description) {
                            descEl.textContent = data.cards[i].description;
                        }
                    }
                });
                if (data.cards.length !== serviceCards.length) {
                    console.warn(`Services cards count mismatch: JSON has ${data.cards.length}, HTML has ${serviceCards.length}`);
                }
            }
            
            if (data.showcase) {
                const showcaseItems = document.querySelectorAll('.services-showcase .showcase-item');
                showcaseItems.forEach((item, i) => {
                    if (data.showcase[i]) {
                        const img = item.querySelector('img');
                        if (img) {
                            img.src = data.showcase[i].img;
                            img.alt = data.showcase[i].alt;
                        }
                    }
                });
                if (data.showcase.length !== showcaseItems.length) {
                    console.warn(`Services showcase count mismatch: JSON has ${data.showcase.length}, HTML has ${showcaseItems.length}`);
                }
            }
        }).catch(err => console.error('Services loading failed:', err));

    // Load Projects
    fetch('assets/data/projects.json')
        .then(res => res.json())
        .then(data => {
            const projectCards = document.querySelectorAll('.projects-grid .project-card');
            projectCards.forEach((card, i) => {
                if (data[i]) {
                    const img = card.querySelector('.project-thumb');
                    const tag = card.querySelector('.tag-sm');
                    const title = card.querySelector('h3');
                    const client = card.querySelector('p');

                    if (img) {
                        img.src = data[i].img;
                        img.alt = data[i].alt;
                    }
                    if (tag && data[i].tag) {
                        tag.textContent = data[i].tag;
                    }
                    if (title && data[i].title) {
                        title.textContent = data[i].title;
                    }
                    if (client && data[i].client) {
                        client.textContent = data[i].client;
                    }
                }
            });
            if (data.length !== projectCards.length) {
                console.warn(`Projects count mismatch: JSON has ${data.length}, HTML has ${projectCards.length}`);
            }
        }).catch(err => console.error('Projects loading failed:', err));

    // Load Testimonials
    fetch('assets/data/testimonials.json')
        .then(res => res.json())
        .then(data => {
            const testimonialCards = document.querySelectorAll('.testimonial-grid .testimonial-card');
            testimonialCards.forEach((card, i) => {
                if (data[i]) {
                    const quote = card.querySelector('.quote');
                    const avatar = card.querySelector('.avatar');
                    const name = card.querySelector('.name');
                    const role = card.querySelector('.role');

                    if (quote && data[i].quote) {
                        quote.innerHTML = `&ldquo;${data[i].quote}&rdquo;`;
                    }
                    if (avatar && data[i].avatar) {
                        avatar.textContent = data[i].avatar;
                    }
                    if (name && data[i].name) {
                        name.textContent = data[i].name;
                    }
                    if (role && data[i].role) {
                        role.textContent = data[i].role;
                    }
                }
            });
            if (data.length !== testimonialCards.length) {
                console.warn(`Testimonials count mismatch: JSON has ${data.length}, HTML has ${testimonialCards.length}`);
            }
        }).catch(err => console.error('Testimonials loading failed:', err));
});
