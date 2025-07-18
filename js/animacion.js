const navRoot = document.querySelector("nav");

const createSpan = (char, i) => {
  const span = document.createElement("span");
  span.textContent = char;
  span.style.setProperty("--index", i);
  return span;
};

const splitByLetter = (text) => [...text].map(createSpan);

const { matches: motionEnabled } = window.matchMedia("(prefers-reduced-motion: no-preference)");

if (motionEnabled) {
  const splitTargets = document.querySelectorAll("[split-by]");

  splitTargets.forEach((node) => {
    
    if (!node.dataset.originalText) {
      node.dataset.originalText = node.textContent;
    }

    const originalText = node.dataset.originalText;
    const type = node.getAttribute("split-by");

    if (type === "letter") {
      
      node.innerHTML = "";
      const spanLetters = splitByLetter(originalText);
      spanLetters.forEach(span => node.appendChild(span));
    }
  });

  function restartAnimation() {
    navRoot.classList.remove("animate");
    void navRoot.offsetWidth; 
    navRoot.classList.add("animate");
  }

  navRoot.classList.add("animate");
  setInterval(restartAnimation, 3000);
}

const navMenu = document.querySelector("nav");

const wrapChar = (char, i) => {
  const el = document.createElement("span");
  el.textContent = char;
  el.style.setProperty("--index", i);
  return el;
};

const splitLetters = (text) => [...text].map(wrapChar);

const motionActive = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

if (motionActive) {
  const animatedTextNodes = document.querySelectorAll("[split-by]");

  animatedTextNodes.forEach((target) => {
    if (!target.dataset.originalContent) {
      target.dataset.originalContent = target.textContent;
    }

    const rawText = target.dataset.originalContent;
    const splitMode = target.getAttribute("split-by");

    if (splitMode === "letter") {
      target.innerHTML = "";
      const spans = splitLetters(rawText);
      spans.forEach(span => target.appendChild(span));
    }
  });

  function restartNavAnimation() {
    navMenu.classList.remove("animate");
    void navMenu.offsetWidth;
    navMenu.classList.add("animate");
  }

  navMenu.classList.add("animate");
  setInterval(restartNavAnimation, 3000);
}

const navHeader = document.querySelector("nav");

const genCharSpan = (char, idx) => {
  const span = document.createElement("span");
  span.textContent = char;
  span.style.setProperty("--index", idx);
  return span;
};

const splitTextByChar = (text) => [...text].map(genCharSpan);

const animAllowed = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

if (animAllowed) {
  const animatedElements = document.querySelectorAll("[split-by]");

  animatedElements.forEach((el) => {
    if (!el.dataset.originalText) {
      el.dataset.originalText = el.textContent;
    }

    const original = el.dataset.originalText;
    const type = el.getAttribute("split-by");

    if (type === "letter") {
      el.innerHTML = "";
      const spans = splitTextByChar(original);
      spans.forEach((s) => el.appendChild(s));
    }
  });

  function restartHeaderAnimation() {
    navHeader.classList.remove("animate");
    void navHeader.offsetWidth;
    navHeader.classList.add("animate");
  }

  navHeader.classList.add("animate");
  setInterval(restartHeaderAnimation, 3000);
}


