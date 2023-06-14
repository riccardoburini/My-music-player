const APIUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const fetchByQuery = async (query) => {
  const res = await fetch(`${APIUrl}${query}`);
  const { data: songs } = await res.json();
  return songs;
};

const duaLipaSongs = async () => {
  let songs = await fetchByQuery("dua lipa");
  let row = document.querySelector("#favArtistLipa");
  let favSongs = [songs[5], songs[7], songs[9], songs[1]];
  favSongs.forEach(({ album, title, rank, artist, link }) => {
    row.innerHTML += `
    <div class='col mt-5 bg-dark'> 
        <div class="card m-3 " >
             <img src="${album.cover_xl}" class="img-fluid rounded-start card-img-top" alt="${title}">
      
        <div class="card-body">
          <h5 class="card-title" songRank='${rank}'>${title}</h5>
          
          <p class="card-text">${artist.name}</p>
          <p class="card-text">${rank}</p>
          </div>
           <a class="btn btn-dark" href="${link} ">Listen now on Dizzle </a> 

  </div>
  </div>
        `;
  });
};
const renderFavSection = async () => {
  let [myFavSong] = await fetchByQuery("Flowers");
  console.log(myFavSong);
  const { album, title, artist, rank, link } = myFavSong;
  let section = document.querySelector("#favSong");
  section.innerHTML = `<div class="card m-3 mt-5 border-dark bg-light " >
    <div class="row g-0">
      <div class="col-md-3">
        <img src="${album.cover_xl}" class="img-fluid rounded-start w-100 h-100" alt="${title}">
      </div>
      <div class="col-md-8 mt-5">
        <div class="card-body d-flex display-4 flex-column h-75">
          <h5 class="card-title display-3" songRank='${rank}'>${title}</h5>
          <p class="card-text text-5">${artist.name}</p>
          <a class="btn btn-dark w-25 " href="${link} ">out now on Dizzle </a> 
        </div>
      </div>
    </div>
    
  </div>`;
};

let mainAlbum = async () => {
  try {
    let albumCovers = [
      "This is acting",
      "1000 forms of fear",
      "plastic hearts",
    ];
    for (let i = 0; i < albumCovers.length; i++) {
      let singolaQuery = albumCovers[i];
      let [song] = await fetchByQuery(singolaQuery);
      const section = document.querySelector(".carousel-inner");
      section.innerHTML += `<div class="carousel-item ${
        i == 0 ? "active" : ""
      }">
    <img style="border-radius:30px" src="${
      song.album.cover_xl
    }" class="d-block w-100 "alt="..."></div>`;
    }
  } catch (error) {
    console.error(error);
  }
};

const arrayDiTitoli = () => {
  let h5 = document.querySelectorAll("h5");
  let titles = [];
  h5.forEach((element) => {
    titles.push({
      title: element.innerText,
      rank: Number(element.getAttribute("songRank")),
    });
  });
  return titles;
};

const titles = () => {
  let titles = arrayDiTitoli();
  let sorted = titles.map((song) => song.title).sort();
  console.log(sorted);
  let alert = document.querySelector(".modal ul.orderedSongs");
  alert.innerHTML = "";
  sorted.forEach((song) => {
    alert.innerHTML += `<li class='list-group-item'> ${song}</li>`;
  });
};

// const titles1 = () => {
//   let titles = arrayDiTitoli();
//   let sorted = titles.sort((a, b) => {
//     return a.rank - b.rank;
//   });
//   console.log(sorted);
//   let alert = document.querySelector(".alert ul.list");
//   alert.innerHTML = "";
//   sorted.forEach((song) => {
//     alert.innerHTML += `<li class='list-group-item'>
//         ${song.title} - ${song.rank}

//         </li>`;
//   });
//   alert.parentElement.classList.toggle("d-none");
// }; NO DA VEDERE

window.onload = async () => {
  await renderFavSection();
  await mainAlbum();
  await duaLipaSongs();
  titles();
  // titles1();  // non aspetta la chiamata esce subito sulla pagina
  // await titles1();
};
