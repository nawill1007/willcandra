document.addEventListener("DOMContentLoaded", function () {
  // Loading screen
  setTimeout(function () {
    document.querySelector(".loading-screen").style.opacity = "0";
    setTimeout(function () {
      document.querySelector(".loading-screen").style.display = "none";
    }, 500);
  }, 1500);

  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.querySelector("nav ul");

  menuToggle.addEventListener("click", function () {
    nav.classList.toggle("active");
    menuToggle.innerHTML = nav.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      if (nav.classList.contains("active")) {
        nav.classList.remove("active");
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      });
    });
  });

  // Header scroll effect
  window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    if (window.scrollY > 100) {
      header.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
    } else {
      header.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
      header.style.boxShadow = "none";
    }
  });

  // Portfolio data
  const portfolioItems = [
    {
      title: "Metal Band Website",
      description: "Uji Coba.",
      image: "pajang/1.jpg",
      link: "#",
    },
    {
      title: "Concert Ticket System",
      description: "Uji Coba.",
      image: "bg.jpg",
      link: "#",
    },
    {
      title: "Music Player App",
      description: "Uji Coba.",
      image: "pajang/2.jpg",
      link: "#",
    },
    {
      title: "Album Cover Generator",
      description: "Uji Coba.",
      image: "pajang/3.jpg",
      link: "#",
    },
    {
      title: "Guitar Tab Archive",
      description: "Uji Coba.",
      image: "music.jpg",
      link: "#",
    },
    {
      title: "Metal News Aggregator",
      description: "Uji Coba.",
      image: "music.jpg",
      link: "#",
    },
  ];

  // Populate portfolio grid
  const portfolioGrid = document.querySelector(".portfolio-grid");
  portfolioItems.forEach((item) => {
    const portfolioItem = document.createElement("div");
    portfolioItem.className = "portfolio-item";
    portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="portfolio-img">
            <div class="portfolio-overlay">
                <h3 class="portfolio-title">${item.title}</h3>
                <p class="portfolio-description">${item.description}</p>
                <a href="${item.link}" class="btn">View Project</a>
            </div>
        `;
    portfolioGrid.appendChild(portfolioItem);
  });

  // Playlist data
  const playlist = [
    {
      title: "Mala",
      artist: "STRANGERS",
      albumArt: "songs/art/mala.jpeg",
      duration: "3:05",
      audioSrc: "songs/song/STRANGERS - Mala.mp3",
    },
    {
      title: "Sangkakala",
      artist: "Imagodei",
      albumArt: "songs/art/imagodei.jpg",
      duration: "4:19",
      audioSrc: "songs/song/Sangkakala.mp3",
    },
    {
      title: "Di Ujung Jalan",
      artist: "SamSonS",
      albumArt: "songs/art/samsons.jpg",
      duration: "3:51",
      audioSrc: "songs/song/Di ujung Jalan - samsons.mp3",
    },
    {
      title: "Rasa Percaya",
      artist: "U9",
      albumArt: "songs/art/u9.png",
      duration: "4:23",
      audioSrc: "songs/song/U9 - Rasa Percaya.mp3",
    },
    {
      title: "Penyangkalan",
      artist: "For Revenge",
      albumArt: "songs/art/penyangkalan.jpg",
      duration: "4:49",
      audioSrc: "songs/song/forrevenge - penyangkalan.mp3",
    },
    {
      title: "Sinsera",
      artist: "Revenge The Fate",
      albumArt: "songs/art/RTF.jpg",
      duration: "4:43",
      audioSrc: "songs/song/RTF - sinsera.mp3",
    },
    {
      title: "2020",
      artist: "DBHC",
      albumArt: "songs/art/2020.jpeg",
      duration: "4:19",
      audioSrc: "songs/song/DBHC - 2020.mp3",
    },
    {
      title: "Perjamuan Terakhir",
      artist: "Imagodei",
      albumArt: "songs/art/imagodei.jpg",
      duration: "3:26",
      audioSrc: "songs/song/Perjamuan terakhir - imagodei.mp3",
    },
    {
      title: "Surai Seraya",
      artist: "STRANGERS",
      albumArt: "songs/art/surai-seraya.jpEg",
      duration: "3:05",
      audioSrc: "songs/song/STRANGERS - Surai Seraya.mp3",
    },
  ];

  // Populate playlist
  const playlistContainer = document.querySelector(".playlist");
  const audioPlayer = document.getElementById("audioPlayer");
  const currentTrack = document.getElementById("currentTrack");
  const currentArtist = document.getElementById("currentArtist");
  const currentAlbumArt = document.getElementById("currentAlbumArt");
  const progressBar = document.getElementById("progressBar");
  const playBtn = document.getElementById("playBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentTrackIndex = 0;
  let isPlaying = false;

  playlist.forEach((track, index) => {
    const playlistItem = document.createElement("div");
    playlistItem.className = "playlist-item";
    playlistItem.dataset.index = index;
    playlistItem.innerHTML = `
            <img src="${track.albumArt}" alt="${track.title}">
            <div class="playlist-info">
                <h4>${track.title}</h4>
                <p>${track.artist}</p>
            </div>
            <span class="playlist-duration">${track.duration}</span>
        `;
    playlistContainer.appendChild(playlistItem);

    playlistItem.addEventListener("click", function () {
      playTrack(index);
    });
  });

  // Set first track as default
  function setCurrentTrack(index) {
    const track = playlist[index];
    currentTrack.textContent = track.title;
    currentArtist.textContent = track.artist;
    currentAlbumArt.src = track.albumArt;
    audioPlayer.src = track.audioSrc;

    // Update active state in playlist
    document.querySelectorAll(".playlist-item").forEach((item) => {
      item.classList.remove("active");
    });
    document
      .querySelector(`.playlist-item[data-index="${index}"]`)
      .classList.add("active");
  }

  function playTrack(index) {
    currentTrackIndex = index;
    setCurrentTrack(currentTrackIndex);
    audioPlayer.play();
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }

  function togglePlay() {
    if (isPlaying) {
      audioPlayer.pause();
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
      audioPlayer.play();
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
  }

  function prevTrack() {
    currentTrackIndex =
      (currentTrackIndex - 1 + playlist.length) % playlist.length;
    playTrack(currentTrackIndex);
  }

  function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    playTrack(currentTrackIndex);
  }

  // Event listeners for player controls
  playBtn.addEventListener("click", togglePlay);
  prevBtn.addEventListener("click", prevTrack);
  nextBtn.addEventListener("click", nextTrack);

  // Update progress bar
  audioPlayer.addEventListener("timeupdate", function () {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${progress}%`;
  });

  // Click on progress bar to seek
  document
    .querySelector(".progress-container")
    .addEventListener("click", function (e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      const duration = audioPlayer.duration;
      audioPlayer.currentTime = (clickX / width) * duration;
    });

  // When track ends, play next
  audioPlayer.addEventListener("ended", nextTrack);

  // Initialize with first track
  setCurrentTrack(0);

  // Contact form
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Here you would typically send the form data to a server
    console.log("Form submitted:", { name, email, message });

    alert("Thank you for your message! I'll get back to you soon.");
    contactForm.reset();
  });

  // Animate elements when scrolling
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".skill-item, .portfolio-item, .about-content"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for animation
  document
    .querySelectorAll(".skill-item, .portfolio-item, .about-content")
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on load
});
