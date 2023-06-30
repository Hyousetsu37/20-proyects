const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const amorcitoBtn = document.getElementById("amorcito");

let apiQuotes = [];

//Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

//Show new quote
function newQuote() {
  loading();
  quoteText.classList.remove("amorcito");
  authorText.classList.remove("amorcito");
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //Check if author is blank and replace it with 'unknown'
  authorText.textContent = !quote.author ? "Unknown" : quote.author;
  //Check quote length to determine styling

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes from API
async function getQuotes() {
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    loading();
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //Catch Error here
  }
}

//Tweet
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Amorcito
function amorcitoQuote() {
  quoteText.textContent =
    "Mi amor, habrá días en los que no puedas más, donde quieras dejarlo todo y es en esos días donde más cerca estaré de ti, para que puedas recuperarte y seguir adelante, te amo, y aquí estaré mi princesa hermosa";
  authorText.textContent = "Tu amorcito";
  if (quoteText.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.classList.add("amorcito");
  authorText.classList.add("amorcito");
}

//Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
amorcitoBtn.addEventListener("click", amorcitoQuote);

//On Load
getQuotes();
