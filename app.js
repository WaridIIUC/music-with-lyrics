const songSearchButton = document.getElementById("song-search-button");
songSearchButton.addEventListener("click", function(){
    const searchSong = document.getElementById("song-input").value;
    loadSongs(searchSong);
})

const loadSongs = async(searchSong) =>{
     try {
        const res = await fetch(`https://api.lyrics.ovh/suggest/:${searchSong}`);
        const data = await res.json();
         displaySongs(data.data);
     } 
     catch (error) {
         alert("No match");
     }
}

if (location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
const displaySongs = songs => {
    const parentDiv = document.getElementById("parent-div");
    parentDiv.innerHTML ="";
    songs.forEach(song => {
        const childDiv = document.createElement("div");
        const songP = `https:${(song.preview).split(":")[1]}`;
        console.log(songP);
        childDiv.className = "single-result row align-items-center my-3 p-3";
        childDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${songP}" type="audio/ogg">
                </audio>
                </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `
        parentDiv.appendChild(childDiv);

    });
}

const getLyrics = (artist, title) => {
    fetch(`https://api.lyrics.ovh/v1/:${artist}/:${title}`)
    .then(res => res.json())
    .then(data => {
        displayLyrics(data);
    })
    .catch(error => alert(error));
}

const displayLyrics = lyrics => {
    const displayDiv = document.getElementById("lyrics-container");
    console.log(lyrics);
    displayDiv.innerText = lyrics.lyrics;
}

