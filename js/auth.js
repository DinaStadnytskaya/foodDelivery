   const buttonAuth = document.querySelector('.button-auth');
   const buttonOut = document.querySelector('.button-out');
   const buttonCart = document.querySelector('.button-cart');
   const modal = document.getElementById('myModal');
   const loginForm = document.getElementById('loginForm');
   const inputLogin = document.getElementById('login');
   const inputPassword = document.getElementById('password');
   const inputExit = document.getElementById('exit');
   const userName = document.querySelector('.user-name');   

   buttonOut.addEventListener('click', () => {
      logout();
   });
   const login = (user) => {
      buttonAuth.style.display = 'none';
      buttonOut.style.display = 'inline-flex';
      userName.style.display = 'inline-flex';
      userName.textContent = user.login;
      buttonCart.style.display = 'inline-flex';      
   }
   const logout = () => {
      buttonAuth.style.display = 'inline-flex';
      buttonOut.style.display = 'none';
      userName.style.display = 'none';
      userName.textContent = '';
      buttonCart.style.display = 'none';
      localStorage.removeItem('user');      
   }
   loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = {
         login: inputLogin.value,
         password: inputPassword.value
      }
      localStorage.setItem('user', JSON.stringify(user))
      login(user);
      modal.style.visibility = "hidden";
   })
   if (localStorage.getItem('user')) {
      login(JSON.parse(localStorage.getItem('user')));
   }
document.addEventListener('DOMContentLoaded', function () {
   M.AutoInit();
   let resolution = window.innerWidth;
   if (resolution <= 991) {
      
   }
});

