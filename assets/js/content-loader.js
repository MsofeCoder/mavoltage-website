document.addEventListener('DOMContentLoaded', () => {
    // Load Stats
    fetch('assets/data/stats.json')
        .then(res => res.json())
        .then(data => {
            const items = data.items;
            const statItems = document.querySelectorAll('.stats .stat-item');
            statItems.forEach((item, i) => {
                if (items[i]) {
                    const iconEl = item.querySelector('.icon i');
                    const numEl = item.querySelector('.num');
                    const labelEl = item.querySelector('.label');

                    if (iconEl && items[i].icon) {
                        iconEl.className = items[i].icon;
                    }
                    if (numEl) {
                        if (items[i].target) {
                            const counter = numEl.querySelector('.counter');
                            if (counter) {
                                counter.setAttribute('data-target', items[i].target);
                            }
                        } else if (items[i].text) {
                            numEl.textContent = items[i].text;
                        }
                    }
                    if (labelEl && items[i].label) {
                        labelEl.textContent = items[i].label;
                    }
                }
            });
            if (items.length !== statItems.length) {
                console.warn(`Stats count mismatch: JSON has ${items.length}, HTML has ${statItems.length}`);
            }
        }).catch(err => console.error('Stats loading failed:', err));

    // Load Services (services.json is already object-shaped: data.cards / data.showcase)
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
            const items = data.items;
            const projectCards = document.querySelectorAll('.projects-grid .project-card');
            projectCards.forEach((card, i) => {
                if (items[i]) {
                    const img = card.querySelector('.project-thumb');
                    const tag = card.querySelector('.tag-sm');
                    const title = card.querySelector('h3');
                    const client = card.querySelector('p');

                    if (img) {
                        img.src = items[i].img;
                        img.alt = items[i].alt;
                    }
                    if (tag && items[i].tag) {
                        tag.textContent = items[i].tag;
                    }
                    if (title && items[i].title) {
                        title.textContent = items[i].title;
                    }
                    if (client && items[i].client) {
                        client.textContent = items[i].client;
                    }
                }
            });
            if (items.length !== projectCards.length) {
                console.warn(`Projects count mismatch: JSON has ${items.length}, HTML has ${projectCards.length}`);
            }
        }).catch(err => console.error('Projects loading failed:', err));

    // Load Testimonials
    fetch('assets/data/testimonials.json')
        .then(res => res.json())
        .then(data => {
            const items = data.items;
            const testimonialCards = document.querySelectorAll('.testimonial-grid .testimonial-card');
            testimonialCards.forEach((card, i) => {
                if (items[i]) {
                    const quote = card.querySelector('.quote');
                    const avatar = card.querySelector('.avatar');
                    const name = card.querySelector('.name');
                    const role = card.querySelector('.role');

                    if (quote && items[i].quote) {
                        quote.innerHTML = `&ldquo;${items[i].quote}&rdquo;`;
                    }
                    if (avatar && items[i].avatar) {
                        avatar.textContent = items[i].avatar;
                    }
                    if (name && items[i].name) {
                        name.textContent = items[i].name;
                    }
                    if (role && items[i].role) {
                        role.textContent = items[i].role;
                    }
                }
            });
            if (items.length !== testimonialCards.length) {
                console.warn(`Testimonials count mismatch: JSON has ${items.length}, HTML has ${testimonialCards.length}`);
            }
        }).catch(err => console.error('Testimonials loading failed:', err));
});
