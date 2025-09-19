let count = 0;
const counterElement = document.getElementById('counter');
function incrementCounter() {
count++;
counterElement.textContent = count;
// Add visual feedback
counterElement.style.color = count > 0 ? 'green' : count < 0 ? 'red' : 'black';
}
function decrementCounter() {
count--;
counterElement.textContent = count;
counterElement.style.color = count > 0 ? 'green' : count < 0 ? 'red' : 'black';
}
function resetCounter() {
count = 0;
counterElement.textContent = count;
counterElement.style.color = 'black';
}