/**
 * WEB222 – Assignment 06
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Duong Truong Phuc Nguyen
 *      Student ID: 176712230
 *      Date:       NOV-27-2024
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");

// Event handler to run when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Loading...Wait a minute!"); // log the loading when the page is loading
    displayArtists();  // Display initial set of artists
    if (window.artists.length > 0) {
        displaySongs(window.artists[0].artistId);
    }
 
});

let currentArtistIndex = 0;  
const artistsPerPage = 8; 

function displayArtists() {
    const menu = document.querySelector('#menu'); // find element of menu in DOM
    menu.innerHTML = '';  // clear existing artists

    console.log("Generating the artist buttons...Wait a minute!"); // log the process of generating button

    const artistsToShow = window.artists.slice(currentArtistIndex, currentArtistIndex + artistsPerPage);

    artistsToShow.forEach(artist => {
        const button = document.createElement('button'); // create new DOM elements
        button.classList.add('artist-button'); // add the artist button for BONUS

        const artistImage = document.createElement('img');
        artistImage.src = artist.image; // use the URL image
        artistImage.alt = artist.name; // add alternative text
        artistImage.classList.add('artist=image');

        // set the styles for the image artist for BONUS
        artistImage.style.width = '150px';  // set width 
        artistImage.style.height = '150px'; // set height 
        artistImage.style.objectFit = 'cover'; // keep the image normal
        artistImage.style.borderRadius = '100px'; // add rounded corner for beautiful
        artistImage.style.border = '5px solid #45ada8'; // a thin border around picture for beautiful
        artistImage.style.margin = '0 auto'; // align center 
        

        button.appendChild(artistImage);
        button.addEventListener('click', () => displaySongs(artist.artistId)); // add event listener to display songs

        menu.appendChild(button); // add the button to the menu
    });
}

function displaySongs(artistId) {
    console.log({artistId}); // log the ID artist to the function

    const songsContainer = document.querySelector('#songsContainer');
    const artistInfoContainer = document.querySelector('#artistInfo'); 
    
    // clear previous songs and artist info
    songsContainer.innerHTML = ''; 
    artistInfoContainer.innerHTML = ''; 
    
    // find the artist by artistId
    const artist = artists.find(a => a.artistId === artistId);

    // if the artist is found, display their name and social links
    if (artist) {
        // display the artist's name
        const artistName = document.createElement('h2');
        artistName.textContent = artist.name;
        artistInfoContainer.appendChild(artistName);

        // display the social links for the artist
        const socialLinksContainer = document.createElement('div');
        socialLinksContainer.classList.add('social-links');
        artist.urls.forEach(url => {
            const socialLink = document.createElement('a');
            socialLink.href = url.url;
            socialLink.target = '_blank';
            
            const socialLogo = document.createElement('img');
            socialLogo.src = url.logo;
            socialLogo.alt = url.name;
            socialLogo.style.width = '30px';  
            socialLogo.style.height = '30px'; 
            socialLinksContainer.appendChild(socialLink);
            socialLink.appendChild(socialLogo);
        });
        
        artistInfoContainer.appendChild(socialLinksContainer); // append social links to the name
    }

    // display the song cards
    const artistSongs = songs.filter(song => song.artistId === artistId);
    artistSongs.forEach(song => {
        songsContainer.appendChild(createSongCard(song));
    });
}

// function to create a song card
function createSongCard(song) {
    const card = document.createElement('div');
    card.classList.add('song-card');
    
    // add the song image as an <img> tag
    const songImage = song.imageUrl ? `<img class="song-image" src="${song.imageUrl}" alt="${song.title} image" />` : '';

    card.innerHTML = 
    `<a href="${song.url}" target="_blank">
            ${songImage}  <!-- Insert the image here -->
            <h3>${song.title}</h3>
            <p><strong>Album:</strong> ${song.album}</p>
            <p><strong>Year:</strong> ${song.year}</p>
            <p><strong>Duration:</strong> ${formatDuration(song.duration)}</p>
        </a>`;
    return card;
}

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}




