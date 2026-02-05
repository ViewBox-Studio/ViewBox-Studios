document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('movieGrid');
    const heroTitle = document.getElementById('heroTitle');
    const heroDesc = document.getElementById('heroDesc');
    const heroSection = document.getElementById('hero');
    const searchInput = document.getElementById('searchInput');
    
    // Select the buttons
    const trailerBtn = document.querySelector('.btn-primary');
    const infoBtn = document.querySelector('.btn-secondary');

    let allMovies = [];

    // 1. Fetch Data from the JSON file
    fetch('movies.json')
        .then(response => response.json())
        .then(data => {
            allMovies = data;
            loadHero(allMovies[0]); // Load the first movie as Hero
            renderMovies(allMovies); // Show all movies in grid
        })
        .catch(error => console.error('Error loading movies:', error));

    // 2. Function to update the big Hero section
    function loadHero(movie) {
        heroTitle.textContent = movie.title;
        heroDesc.textContent = movie.description;
        
        // Update Background
        heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.9)), url('${movie.background}')`;

        // Update Trailer Button
        trailerBtn.onclick = () => {
            if(movie.trailer) {
                window.open(movie.trailer, '_blank'); // Opens in new tab
            } else {
                alert('Trailer coming soon!');
            }
        };
    }

    // 3. Function to create the grid cards
    function renderMovies(movies) {
        grid.innerHTML = '';
        movies.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'movie-card';
            card.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}">
                <div class="movie-info">
                    <div class="movie-title">${movie.title}</div>
                    <div class="movie-date">${movie.releaseDate}</div>
                </div>
            `;
            
            // Click card to change Hero section
            card.onclick = () => {
                loadHero(movie);
                window.scrollTo({top: 0, behavior: 'smooth'});
            };
            grid.appendChild(card);
        });
    }

    // 4. Search Logic
    searchInput.oninput = (e) => {
        const val = e.target.value.toLowerCase();
        const filtered = allMovies.filter(m => m.title.toLowerCase().includes(val));
        renderMovies(filtered);
    };
});