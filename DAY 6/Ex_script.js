function getRandomQuote(){
    fetch('http://api.quotable.io/random')
    .then(response =>{
        if(!response.ok){
            throw new Error('Failed to fetch quote');
        }
        console.log('data fetched successfully');
        return response.json();
    })
    .then(data=>{
        const quoteElement = document.getElementById('quote-text');
        const authorElement = document.getElementById('quote-author');
        quoteElement.textContent = data.content;
        authorElement.textContent = '-' + data.author;
        console.log('Quote update : ',data);
    })

    .catch(error => {
        console.log('Error fetching quote :', error);
        const quoteElement = document.getElementById('quote-text');
        quoteElement.textContent = 'Failed to load quote. Please try again.';
    })
}

const newQuoteBtn = document.getElementById('new-quote-btn');

newQuoteBtn.addEventListener('click',getRandomQuote);

getRandomQuote();