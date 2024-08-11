//données spécifique by Data
const data = {
  1: [
    {
      src: "set1.png",
      title: "Template 1",
      description:
        "Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle.",
      link : "View Portfolio"  
    },
    {
      src: "set2.png",
      title: "Template 2",
      description:
        "Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle.",
      link : "View Portfolio"
    },
    {
      src: "set3.png",
      title: "Template 3",
      description:
        "Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle.",
      link : "Read case study"  
    },
    {
      src: "set4.png",
      title: "Template 4",
      description:
        "Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle.",
        link : "Read case study"  
    },
    {
      src: "set5.png",
      title: "Template 5",
      description:
        "Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle.",
        link : "Read case study"  
    },
    {
      src: "set6.png",
      title: "Template 6",
      description:
        "Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle.",
        link : "Read case study"
    },
  ],
  2: [
    {
      src: "set4.png",
      title: "Template 4",
      description:
        "Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle.",
        link : "View Portfolio"
    },
    {
      src: "set5.png",
      title: "Template 5",
      description:
        "Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle.",
        link : "Read case study"
    },
    {
      src: "set6.png",
      title: "Template 6",
      description:
        "Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle.",
        link : "Read case study"
    },
  ],
  3: [
    {
      src: "set1.png",
      title: "Template 1",
      description:
        "Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle.",
        link : "View Portfolio"
    },

    {
      src: "set3.png",
      title: "Template 3",
      description:
        "Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle.",
        link : "Read case study"
    },
    {
      src: "set2.png",
      title: "Template 2",
      description:
        "Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle.",
        link : "View Portfolio"
    },
  ],
};
var menu = document.getElementById('menu');
var toggle = document.querySelector('.toggle');
var icon = document.getElementById('icon');
var menuItems = document.querySelectorAll('#menu ul > li > a');
var detailsElements = document.querySelectorAll(".accordion_details");
var menuWorks = document.querySelectorAll(".menu_works");
var gallerieWorks = document.getElementById("gallerie_works");
var readMore = document.querySelector('.btn-read-more');
var moreText = document.getElementById('more-text');

let open = false;
//function toggle menu
toggle.addEventListener('click' , () => {
  console.log('toggle');
  if(!open){
    setTimeout(() => {
      menu.style.display="flex";
    }, 150)
    document.body.style.overflowY = "hidden";
    icon.src = "./assets/images/xmark-solid.svg";
    open = true;
    console.log("show menu");
  }
  else{
    setTimeout(() => {
      menu.style.display = "none";
    }, 150)
    document.body.style.overflowY = "auto";
    icon.src = "./assets/images/bars-solid.svg";
    open = false;
    console.log('remove menu')
  }
})


  // Fonction pour mettre à jour les liens actifs en fonction de l'URL actuelle
  function setActiveLink() {
      var currentUrl = window.location.pathname.split("/").slice(-1)[0];
      var locationUrl = window.location.href;
      console.log('locationUrl' , locationUrl.split("/").slice(-1)[0]);
      console.log('cuurentUrl' , currentUrl);
      menuItems.forEach(function(link) {
          var linkUrl = link.getAttribute('href').split("/").slice(-1)[0];
          // Comparer l'URL actuelle avec l'attribut href du lien
          if (linkUrl === currentUrl) {
              link.classList.add('active');
          } else {
              link.classList.remove('active');
          }
      });
  }

  // // Initialiser les liens actifs
  setActiveLink();

function updateMenu(value) {
  if (data[value]) {
    gallerieWorks.innerHTML = "";
    data[value].forEach((item) => {
      gallerieWorks.innerHTML += `
        <article>
          <a href="#"><img src="./assets/images/${item.src}" class="w-[100%]"></a>
          <h3 class="mt-[16px] mb-[8px]">${item.title}</h3>
          <p class="mb-[16px]">${item.description}</p>
          <a href="#" class="font-medium">
          ${item.link}
          <img src="./assets/images/arrow-right-black.png" alt="arrow-right" class="ml-[12px] align-middle" loading="lazy">
          </a>
        </article>
      `;
    });
  } else {
    gallerieWorks.innerHTML =
      "<p>Aucune information disponible pour ce menu.</p>";
  }
}

menuWorks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const menu = link.getAttribute("data-menu");
    console.log(menu);
    console.log("item : ", data[menu]);
    menuWorks.forEach((menu) => menu.classList.remove("menu_active"));
    link.classList.add("menu_active");
    updateMenu(menu);
  });
  updateMenu(1); // Initialiser avec toutes les données (menu 1) au chargement de la page
});

detailsElements.forEach((detail) => {
  detail.addEventListener("toggle", function () {
    if (detail["open"]) {
      detailsElements.forEach((otherDetail) => {
        if (otherDetail !== detail) {
          otherDetail.removeAttribute("open");
        }
      });
    }
    updateIcons();
  });
});

function updateIcons() {
  var summaryAfterElements = document.querySelectorAll(".summary_after");
  detailsElements.forEach((element, index) => {
    if (element["open"]) {
      summaryAfterElements[index].classList.add("open");
    } else {
      summaryAfterElements[index].classList.remove("open");
    }
  });
}

updateIcons(); // Initial call to set the correct icons on page load

readMore.addEventListener('click', () => {
  console.log("read more");
  if (open) {
    moreText.style.display="none";
    console.log("remove text")
    readMore.innerHTML = 'Lire la suite <img src="./assets/images/chevron-up.svg">';
  } else {
    moreText.style.display="block";
    console.log("show text")
    readMore.innerHTML = 'Lire moins <img src="./assets/images/chevron-down.svg">';
  }
  open = !open; // Toggle the state
});
moreText.style.display = "none";


