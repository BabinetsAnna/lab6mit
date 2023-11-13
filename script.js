let historyStack = JSON.parse(localStorage.getItem('historyStack')) || [];
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
let currentURL = "";
function updateCurrentURL(url) {
    currentURL = url;
    document.getElementById("url").value = url;
  }
  

function goHome(){
    document.getElementById("myWebView").loadURL("https://www.google.com");
}
function goBack(){
    document.getElementById("myWebView").goBack();
}
function goForward(){
    document.getElementById("myWebView").goForward();
}
function search() {
    const urlInput = document.getElementById("url");
    const urlValue = urlInput.value.trim();
  
    if (urlValue !== "") {
  
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  
      if (urlPattern.test(urlValue)) {
        currentURL = urlValue;
        updateCurrentURL(currentURL);
        historyStack.push({ url: urlValue, timestamp: new Date() });
        localStorage.setItem('historyStack', JSON.stringify(historyStack));
        document.getElementById("myWebView").loadURL(urlValue);
      } else {
        const searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(urlValue);
        currentURL = searchUrl;
        updateCurrentURL(currentURL);
        historyStack.push({ url: searchUrl, timestamp: new Date() });
        localStorage.setItem('historyStack', JSON.stringify(historyStack));
        document.getElementById("myWebView").loadURL(searchUrl);
      }
    } else {
      alert("Будь ласка, введіть URL!");
    }
  }

  // Обробник події завантаження сторінки
document.getElementById("myWebView").addEventListener('did-navigate', (event) => {
    const url = event.url;
    updateCurrentURL(url);
  });

function showHistory() {
    // Перенаправлення на сторінку історії
    window.location.href = 'history.html';
  }

  window.onload = function() {
    if(bookmarks){
      showBookmarks();
      
    }
  };

  // Функція для додавання закладки
function addBookmark() {
    if (bookmarks.length >= 10) {
      alert('Досягнуто максимальну кількість закладок!');
  } else {
     // Перевірка, чи встановлено поточний URL
     if (!currentURL) {
      alert('Неможливо додати закладку без поточного URL');
      return;
    }
    bookmarks.push(currentURL);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  
    alert('Сайт додано до закладок!');
    window.onload();
  }
  
  }
  
  // Функція для видалення закладки
  function removeBookmark(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    showBookmarks(); // Оновити відображення закладок
  }
  
  function navigateToBookmark(url) {
    document.getElementById("myWebView").loadURL(url);
  }
  
  
  
  function showBookmarks() {
    const bookmarksContainer = document.getElementById('bookmarksContainer');
    bookmarksContainer.innerHTML = "";
  
    for (let i = 0; i < bookmarks.length; i++) {
      const bookmarkItem = document.createElement('div');
      bookmarkItem.innerHTML = `<i class="fas fa-bookmark"></i> <span class="bookmark-url" title="${bookmarks[i]}">${bookmarks[i]}</span>`;
      bookmarkItem.classList.add('bookmark-item');
  
      const deleteButton = document.createElement('button');
      deleteButton.id = "removeBm";
      deleteButton.innerHTML = '<i class="fas fa-times"></i>';
      deleteButton.onclick = () => removeBookmark(i);
  
      bookmarkItem.appendChild(deleteButton);
  
      bookmarkItem.onclick = () => navigateToBookmark(bookmarks[i]);
      bookmarksContainer.appendChild(bookmarkItem);
    }
  }
  