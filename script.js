const hamburger = document.getElementById('hamburger');        
const sidebar = document.getElementById('sidebar');        
const overlay = document.getElementById('overlay');        
const closeBtn = document.getElementById('closeBtn');        
        
hamburger.addEventListener('click', () => {        
  sidebar.classList.add('active');        
  overlay.classList.add('active');        
});        
        
closeBtn.addEventListener('click', () => {        
  sidebar.classList.remove('active');        
  overlay.classList.remove('active');        
});        
        
overlay.addEventListener('click', () => {        
  sidebar.classList.remove('active');        
  overlay.classList.remove('active');        
});        
        
const menuLinks = document.querySelectorAll('.sidebar a');        
        
menuLinks.forEach(link => {        
  link.addEventListener('click', () => {        
    menuLinks.forEach(l => l.classList.remove('active'));        
    link.classList.add('active');        
  });        
});        
        
const modal = document.getElementById('modal');        
const modalContent = document.querySelector('.modal-content');         
const modalTitle = document.getElementById('modalTitle');        
const modalText = document.getElementById('modalText');        
const modalImage = document.getElementById('modalImage');        
const modalButton = document.getElementById('modalButton');        
const modalClose = document.getElementById('modalClose');        
        
const floatingButtons = document.querySelectorAll('.icon-btn-wrapper');        
        
floatingButtons.forEach((btnWrapper, index) => {        
  btnWrapper.addEventListener('click', () => {        
    modal.classList.add('active');        
    modalContent.classList.add('show');         
        
    if(index === 0) {        
      modalTitle.textContent = "Нарезка клипов";        
      modalText.textContent = "ИИ автоматически ищет лучшие моменты, добавляет субтитры и режет под формат коротких видео.";        
      modalImage.src = "clip.jpg";        
    } else if(index === 1) {        
      modalTitle.textContent = "ИИ Субтитры";        
      modalText.textContent = "ИИ автоматически добавляет субтитры в ваше видео.";        
      modalImage.src = "subtitles.jpg";         
    } else if(index === 2) {        
      modalTitle.textContent = "Редактор";        
      modalText.textContent = "Загрузите и редактируйте свои видео.";        
      modalImage.src = "editor.jpg";         
    }        
  });        
});        
        
modalClose.addEventListener('click', () => {        
  modal.classList.remove('active');        
  modalContent.classList.remove('show');         
});        
        
modal.addEventListener('click', (e) => {        
  if(e.target === modal) {        
    modal.classList.remove('active');        
    modalContent.classList.remove('show');         
  }        
});        
        
const fileInput = document.getElementById('videoFile');        
        
modalButton.addEventListener('click', () => {        
  fileInput.click();        
});        
        
fileInput.addEventListener('change', () => {        
  const file = fileInput.files[0];        
  if (!file) return;        
        
  let endpoint = '';        
  let redirectUrl = '';        
        
  if(fileInput.dataset.uploadType === 'full' || modalTitle.textContent.includes('Нарезка')) {        
    endpoint = '/upload_video_full';        
  }         
  else if(modalTitle.textContent.includes('Субтитры')) {        
    endpoint = '/upload_video_subtitles';        
  }         
  else if(modalTitle.textContent.includes('Редактор')) {        
    endpoint = '/upload_video';        
    redirectUrl = '/editor';        
  }         
  else {        
    endpoint = '/upload_video';        
  }        
        
  uploadVideo(file, endpoint, redirectUrl);        
        
  fileInput.value = '';        
  delete fileInput.dataset.uploadType;        
});        
        
function uploadVideo(file, endpoint, redirectUrl = '') {        
  const formData = new FormData();        
  formData.append('file', file);        
        
  fetch(endpoint, {        
    method: 'POST',        
    body: formData        
  })        
  .then(res => res.json())        
  .then(data => {        
    console.log('Ответ сервера:', data);        
    alert('Видео отправлено! ID работы: ' + data.job_id);        
        
    modal.classList.remove('active');        
    modalContent.classList.remove('show');        
        
    if (redirectUrl) {        
      window.location.href = redirectUrl + '?video_id=' + data.job_id;        
    }        
  })        
  .catch(err => {        
    console.error(err);        
    alert('Ошибка при загрузке видео');        
  });        
}        
        
const mainUploadBtn = document.getElementById('mainUploadBtn');        
        
mainUploadBtn.addEventListener('click', () => {        
  fileInput.dataset.uploadType = 'full';         
  fileInput.click();        
});  

const youtubeInput = document.getElementById("youtube-url");
const youtubeSend = document.getElementById("youtube-send");

const placeholders = ["YouTube", "VK Видео", "Rutube", "Twitch"];
let index = 0;

setInterval(() => {
  youtubeInput.placeholder = `Введите ссылку ${placeholders[index]}`;
  index = (index + 1) % placeholders.length;
}, 1000);

youtubeSend.addEventListener("click", () => {
  const url = youtubeInput.value.trim();
  if(url) {
    console.log("Ссылка для отправки:", url);
  } else {
    alert(`Введите ссылку ${placeholders[index === 0 ? placeholders.length-1 : index-1]}!`);
  }
});
