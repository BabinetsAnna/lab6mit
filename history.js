// history.js
let historyStack = JSON.parse(localStorage.getItem('historyStack')) || [];

// Викликайте updateHistory при завантаженні сторінки
window.onload = function() {
  updateHistory();
};

function goBack() {
  // Перенаправлення на головну сторінку
  window.location.href = 'index.html';
}

function clearHistory() {
  historyStack = [];
  updateHistory();
  localStorage.removeItem('historyStack');
  alert('Історію очищено!');
}

function updateHistory() {
    const historyContainer = document.getElementById('historyContainer');
    historyContainer.innerHTML = "";
  
    const table = document.createElement('table');
    table.classList.add('history-table');
  
    for (let i = historyStack.length - 1; i >= 0; i--) {
      const row = document.createElement('tr');
      
     
      const urlColumn = document.createElement('td');
      urlColumn.classList.add('history-url-column');
      urlColumn.innerHTML = historyStack[i].url;
  
      const dateColumn = document.createElement('td');
      dateColumn.classList.add('history-date-column');
      dateColumn.innerHTML = formatDate(historyStack[i].timestamp);
  
      const deleteColumn = document.createElement('td');
      deleteColumn.classList.add('history-delete-column');
      
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Видалити';
      deleteButton.onclick = () => deleteHistoryItem(i);
  
      deleteColumn.appendChild(deleteButton);
  
      // Додаємо стовпці до рядка
      row.appendChild(urlColumn);
      row.appendChild(dateColumn);
      row.appendChild(deleteColumn);
  
      // Додаємо обробник кліка для переходу за URL історії
      row.onclick = () => navigateToHistory(historyStack[i].url);
  
      // Додаємо рядок до таблиці
      table.appendChild(row);
    }
  
    // Додаємо таблицю до контейнера історії
    historyContainer.appendChild(table);
  }
  

function deleteHistoryItem(index) {
  historyStack.splice(index, 1);
  localStorage.setItem('historyStack', JSON.stringify(historyStack)); // Оновити локальне сховище
  updateHistory();
}

function navigateToHistory(url) {
  // Перенаправлення на головну сторінку з вказаним URL
  window.location.href = `index.html?url=${encodeURIComponent(url)}`;
}

function formatDate(timestamp) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return new Date(timestamp).toLocaleDateString('en-US', options);
}
