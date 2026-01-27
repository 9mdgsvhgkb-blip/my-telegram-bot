window.addEventListener('DOMContentLoaded', async () => {        
    try {        
        const res = await fetch('/api/check_auth', {        
            credentials: 'include'  // важно, чтобы cookie уходили        
        });        
        if (!res.ok) throw new Error('Не авторизован');        
        const data = await res.json();        
    
        // ✅ проверяем authenticated    
        if (!data.authenticated) {        
            // вместо немедленного редиректа, можно показать сообщение или редиректить через setTimeout    
            console.warn('Не авторизован, редирект через 1 сек');     
            setTimeout(() => { window.location.href = '/log/'; }, 1000);    
        } else {    
            console.log('Пользователь авторизован', data);    
  
         }  
    } catch (e) {        
        console.warn('Ошибка проверки авторизации:', e);        
        // редирект только если действительно ошибка fetch    
        setTimeout(() => { window.location.href = '/log/'; }, 1000);    
    }        
});    
          
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
