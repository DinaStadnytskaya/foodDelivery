// .modal - overlay {
//    position: fixed;
//    width: 100 %;
//    height: 100 %;
//    background - color: rgba(0, 0, 0, 0.258);
//    top: 0;
//    left: 0;
//    overflow - x: hidden;
//    overflow - y: auto;
//    -webkit - overflow - scrolling: touch;
//    display: flex;
//    flex - flow: column nowrap;
//    justify - content: center;
//    align - items: center;
//    opacity: 0;
//    visibility: hidden;
//    transition: all .8s  ease;
// }
// .modal - overlay.open {
//    visibility: visible;
//    opacity: 1;
// }
// .modal - overlay.open.modal - auth {
//    transform: perspective(600px) translate(0px, 0 %) rotateX(0deg);
//    opacity: 1;
// }

// .modal - wrap {
//    min - height: 100 %;
//    display: flex;
//    align - items: center;
//    justify - content: center;
//    padding: 30px 10px;

// }

// .modal - auth {
//    background: #fff;
//    color: #000;
//    width: 600px;
//    height: 500px;
//    padding: 30px 10px;
//    display: flex;
//    align - items: flex - start;
//    justify - content: space - between;
//    background - color: rgb(169, 232, 252);
//    transition: all .8s ease;
//    opacity: 0;
//    transform: perspective(600px) translate(0px, -100 %) rotateX(45deg);

// }

// a.modal - close {
//    width: 80px;
//    height: 20px;
//    background - color: violet;
//    display: flex;
//    align - items: center;
//    justify - content: center;
//    border - radius: 10px;
//    color: black;
//    text - decoration: none;
// }

// .modal - text {
//    font - size: 24px;
//    color: blue;
// }
const popup = () => {
   const modalLinks = document.querySelectorAll('.modal-link');
   const body = document.querySelector('body');
   const lockPaddings = document.querySelectorAll('.lock-padding');
   const closeButtons = document.querySelectorAll('.modal-close');
   let unlock = true;
   const timeout = 600;

   if (modalLinks.length > 0) {
      for (let index = 0; index < modalLinks.length; index += 1) {
         const modalLink = modalLinks[index];
         modalLink.addEventListener('click', function (e) {
            const modalName = modalLink.getAttribute('href').replace('#', '');
            const currentModal = document.getElementById(modalName);
            modalOpen(currentModal);
            e.preventDefault();
         });
      }
   }

   if (closeButtons.length > 0) {
      for (let index = 0; index < closeButtons.length; index += 1) {
         const closeButton = closeButtons[index];
         closeButton.addEventListener('click', function (e) {
            modalClose(closeButton.closest('.modal-overlay'));
            e.preventDefault();
         });
      }
   }
   function modalOpen(currentModal) {
      if (currentModal && unlock) {
         const modalActive = document.querySelector('modal-overlay.open');
         if (modalActive) {
            modalClose(modalActive, false);
         } else {
            bodyLock();
         }
         currentModal.classList.add('open');
         currentModal.addEventListener('click', function (e) {
            if (!e.target.closest('.modal-content')) {
               modalClose(e.target.closest('.modal-overlay'));
            }
         });
      }
   }
   function modalClose(modalActive, doUnlock = true) {
      if (unlock) {
         modalActive.classList.remove('open');
         if (doUnlock) {
            bodyUnlock();
         }
      }
   }
   function bodyLock() {
      const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
      if (lockPaddings.length > 0) {
         for (let index = 0; index < lockPaddings.length; index += 1) {
            const lockPadding = lockPaddings[index];
            lockPadding.style.paddingRight = lockPaddingValue;
         }
      }
      body.style.paddingRight = lockPaddingValue;
      body.classList.add('lock');
      unlock = false;
      setTimeout(function () {
         unlock = true;
      }, timeout);
   }

   function bodyUnlock() {
      setTimeout(function () {
         if (lockPaddings.length > 0) {
            for (let index = 0; index < lockPaddings.length; index += 1) {
               const lockPadding = lockPaddings[index];
               lockPadding.style.paddingRight = '0px';
            }
         }
         body.style.paddingRight = '0px';
         body.classList.remove('lock');
      }, timeout);
      unlock = false;
      setTimeout(function () {
         unlock = true;
      }, timeout);
   }

   // document.addEventListener('keydown', function (e) {
   //    if (e.which === 27) {
   //       const modalActive = document.querySelector('.modal-overlay.open');
   //       modalClose(modalActive);
   //    }
   // });
}
popup();
