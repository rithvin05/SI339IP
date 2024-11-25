document.querySelectorAll(".All").forEach((cloud) => {
  cloud.addEventListener("click", () => {
    generateCards(danceTeams);
  });
});

document.querySelectorAll(".cloud").forEach((cloud) => {
  cloud.addEventListener("click", () => {
    const style = cloud.getAttribute("data-style");
    const filteredTeams = danceTeams.filter((team) => team.style === style);
    generateCards(filteredTeams);

    // Scroll to the cards section smoothly
    document.getElementById("cards-section").scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Dance team data with YouTube video IDs
const danceTeams = [
  {
    name: "EnCore",
    style: "Hip-Hop",
    insta: "https://www.instagram.com/encoreumich/",
    desc: "EnCore is a co-ed hip hop dance group based at the University of Michigan in Ann Arbor.",
    videoId: "https://www.youtube.com/embed/bgznwW2KN1o?si=U5_qGKFp5g6UZMGR",
  },
  {
    name: "Cadence Dance Co",
    desc: "Contemporary dance club at the University of Michigan. They are super talented and are incredible storytellers!",
    insta: "https://www.instagram.com/cadencedanceco/",
    style: "contemporary",
    videoId: "https://www.youtube.com/embed/c4acUuc0yAw",
  },
  {
    name: "Michigan Manzat",
    insta: "https://www.instagram.com/michiganmanzat/",
    desc: "Michigan's Co-Ed Bollywood Fusion Dance Team! They specialize in a combination of Bhangra, South Indian dance, Bollywood, and Hip-hop.",
    style: "fusion",
    videoId: "https://www.youtube.com/embed/lsuZe9YzYig?si=TZT1CttM0d6U6wa_",
  },
  {
    name: "Female Gayo",
    style: "kpop",
    insta: "https://www.instagram.com/femalegayo/",
    desc: "All girl k-pop dance team. They excell at covering popular choreographies and are well recognized within kpop dance teams here at UM!",
    videoId: "https://www.youtube.com/embed/nk9XSqkoYAw",
  },
  {
    name: "2XS",
    desc: "Co-ed Hip Hop Team based out of Ann Arbor, MI. They've been around for a while so be sure to check them out!",
    insta: "https://www.instagram.com/dance2xsmichigan/",
    style: "Hip-Hop",
    videoId: "https://www.youtube.com/embed/2w1g4RnjA1Y?si=n6P5WBOdDOnXnUBt",
  },
  {
    name: "IASA Legends",
    insta: "https://www.instagram.com/michiganiasa/",
    desc: "This sub-unit of Indian American Student Association has a lot to offer!",
    style: "fusion",
    videoId: "https://www.youtube.com/embed/cw_lll2sbf8?si=0m7mWOQI1gnrzMun",
  },
  {
    name: "Daebak 3",
    style: "kpop",
    desc: "All-Male Kpop Dance Team est. 2013 @ the University of Michigan",
    insta: "https://www.instagram.com/db3_umich/",
    videoId: "https://www.youtube.com/embed/Gi4I32lGJ14?si=ZHsYNvcDRL8GHyVN",
  },
];

const cardsContainer = document.getElementById("cards-container");

// Function to generate cards
function generateCards(teams) {
  cardsContainer.innerHTML = ""; // Clear current cards
  teams.forEach((team) => {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("tabindex", "0"); // Make the card focusable
    card.innerHTML = `
                    <h3>${team.name}</h3>
                    <p>Style: ${team.style}</p>
                `;
    card.addEventListener("click", () => showLightbox(team)); // Open lightbox on card click

    // Open lightbox with Enter key
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        showLightbox(team);
      }
    });

    cardsContainer.appendChild(card);
  });
}


// Show all cards initially
generateCards(danceTeams);

// Add event listeners to clouds
document.querySelectorAll(".cloud").forEach((cloud) => {
  // Handle click events
  cloud.addEventListener("click", () => {
    handleCloudClick(cloud);
  });

  // Handle Enter key press when focused
  cloud.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleCloudClick(cloud);
    }
  });
});

// Function to handle the cloud element click logic
function handleCloudClick(cloud) {
  const style = cloud.getAttribute("data-style");
  const filteredTeams = danceTeams.filter((team) => team.style === style);
  generateCards(filteredTeams);
}


// Function to show the lightbox with video
function showLightbox(team) {
  const lightbox = document.getElementById("lightbox");
  document.getElementById("lightbox-title").textContent = team.name;
  document.getElementById(
    "lightbox-description"
  ).textContent = `Learn more about ${team.name}! ${team.desc} See them in action below`;
  const videoUrl = team.videoId.includes("https://")
    ? team.videoId.split("?")[0]
    : `${team.videoId}`;
  document.getElementById("lightbox-video").src = videoUrl;
  document.getElementById("lightbox-insta").href = team.insta;
  lightbox.style.display = "flex";

  // Scroll to the lightbox smoothly
  lightbox.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });

  // Focus the lightbox
  lightbox.setAttribute("tabindex", "-1"); // Ensure the lightbox is focusable
  lightbox.focus();
}


// Function to hide the lightbox
const closeButton = document.querySelector(".lightbox-close");

closeButton.addEventListener("click", closeLightbox);
closeButton.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    closeLightbox();
  }
});

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";
  document.getElementById("lightbox-video").src = ""; // Stop video playback
}

