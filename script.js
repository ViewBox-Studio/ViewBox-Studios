// Select the Search Input and the Grid of Posters
const searchInput = document.getElementById('search-input');
const posters = document.querySelectorAll('.poster-card');

searchInput.addEventListener('keyup', (e) => {
    // Get the value typed in and convert to lowercase
    const term = e.target.value.toLowerCase();

    // Loop through every poster
    posters.forEach((poster) => {
        // Find the movie title inside the card
        const title = poster.querySelector('h3').textContent.toLowerCase();

        // Check if the title contains the search term
        if (title.includes(term)) {
            poster.style.display = 'block'; // Show it
        } else {
            poster.style.display = 'none'; // Hide it
        }
    });
});
