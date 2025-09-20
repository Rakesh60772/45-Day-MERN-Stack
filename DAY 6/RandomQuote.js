const quoteElement = document.getElementById('quote-text');
const authorElement = document.getElementById('quote-author');
const loader = document.getElementById('loader');
const categorySelect = document.getElementById('category-select');
const twitterBtn = document.getElementById('twitter-btn');
const whatsappBtn = document.getElementById('whatsapp-btn');

const fallbackQuotes = [
  { content: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { content: "Simplicity is prerequisite for reliability.", author: "Edsger Dijkstra" },
  { content: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson" }
];

const seenQuotes = new Set();

async function getRandomQuote() {
  const category = categorySelect.value;

  // Show loader & reset text
  loader.style.display = 'block';
  quoteElement.textContent = '';
  authorElement.textContent = '';

  try {
    let data;
    let tries = 0;

    // Avoid duplicates (max 5 tries)
    do {
      const res = await fetch(`https://api.quotable.io/random${category ? '?tags=' + category : ''}`);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      data = await res.json();
      tries++;
    } while (seenQuotes.has(data._id) && tries < 5);

    seenQuotes.add(data._id);

    quoteElement.textContent = `"${data.content}"`;
    authorElement.textContent = `— ${data.author}`;
  } catch (err) {
    // console.error('Fetch error:', err);
    // quoteElement.textContent = '⚠️ Could not load quote. Please try again.';
    // authorElement.textContent = '';
    const fallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    quoteElement.textContent = `"${fallback.content}"`;
    authorElement.textContent = `— ${fallback.author}`;
  } finally {
    loader.style.display = 'none';
  }
}

// Sharing functions
function shareOnTwitter() {
  const quote = quoteElement.innerText;
  const author = authorElement.innerText;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${quote} ${author}`)}`;
  window.open(url, '_blank');
}

function shareOnWhatsApp() {
  const quote = quoteElement.innerText;
  const author = authorElement.innerText;
  const url = `https://wa.me/?text=${encodeURIComponent(`${quote} ${author}`)}`;
  window.open(url, '_blank');
}

// Event listeners
document.getElementById('new-quote-btn').addEventListener('click', getRandomQuote);
twitterBtn.addEventListener('click', shareOnTwitter);
whatsappBtn.addEventListener('click', shareOnWhatsApp);
categorySelect.addEventListener('change', getRandomQuote);

// Load first quote
getRandomQuote();
