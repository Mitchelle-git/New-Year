function checkRelation() {
  const nameInput = document.getElementById("nameInput");
  const raw = nameInput.value || "";
  const name = raw.trim();

  const people = {
    janelle: { message: "Kaluluuuuu the drippy one 😎 my one and only niece", image: "images/janelle.jpg", crop: "crop-circle" },
    kelvin: { message: "aaaahhhhh my brudaaaa 👦", image: "images/kelvin.jpg", crop: "crop-square" },
    besh: { message: "aunty wa madooooooo 👱\u200d♂️", image: "images/besh.jpg", crop: "crop-landscape" },
    pauline: { message: "segggzyyyy billionareee ladddy 💰", image: "images/pauline.jpg", crop: "crop-square" },
    zawadi: { message: "my shyyy girllyyyy 👩\u200d🦰", image: "images/zawadi.jpg", crop: "crop-circle" },
    nikkita: { message: "beautiful mama the one that created an icon.......my momaaa ❤️", image: "images/nikkita.jpg", crop: "crop-portrait" },
    bianca: { message: "family cat 🐱", image: "images/bianca.jpg", crop: "crop-circle" },
    bear: { message: "family dog 🐶", image: "images/bear.jpg", crop: "crop-square" },
    imma: { message: "the legend aunty 👴", image: "images/imma.jpg", crop: "crop-circle" },
    bryan: { message: "the next Messiiiiii⚽⚽⚽⚽⚽ and my baby brudaaa 😎", image: "images/bryan.jpg", crop: "crop-landscape" },
    antony: { message: "my cooolll uncle 😎", image: "images/antony.jpg", crop: "crop-portrait" }
  };

  const key = name.toLowerCase();
  let message, image, crop;

  if (people[key]) {
    message = people[key].message;
    image = people[key].image;
    crop = people[key].crop;
  } else {
    message = "aaahhhhhh I dunno you braah 😭";
    image = "images/unknown.jpg";
    crop = "crop-circle";
  }

  document.getElementById("message").textContent = message;

  const imgEl = document.getElementById("personImage");
  imgEl.className = crop;
  imgEl.src = image;

  document.getElementById("result").classList.remove("hidden");
}

function shareLink() {
  const name = document.getElementById('nameInput').value.trim();
  const statusEl = document.getElementById('shareStatus');
  if (!name) {
    if (statusEl) statusEl.textContent = 'Enter a name first';
    return;
  }

  const url = new URL(window.location.href);
  url.searchParams.set('name', name);
  const shareUrl = url.toString();

  if (navigator.share) {
    navigator.share({ title: document.title, url: shareUrl }).catch(() => {});
  } else if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareUrl).then(() => {
      if (statusEl) statusEl.textContent = 'Link copied to clipboard ✅';
      setTimeout(() => { if (statusEl) statusEl.textContent = ''; }, 2500);
    }).catch(() => {
      if (statusEl) statusEl.textContent = 'Could not copy link';
    });
  } else {
    prompt('Copy this link:', shareUrl);
  }
}

// If page is opened with ?name=..., prefill and run the check
document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(location.search);
  const n = params.get('name');
  if (n) {
    document.getElementById('nameInput').value = n;
    checkRelation();
  }
});