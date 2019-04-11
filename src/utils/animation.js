import {throttle} from './throttle';

const animateHTML = () => {
  let elems;
  let windowHeight;
  let animType;
  function init(type) {
    elems = document.querySelectorAll('.hidden');
    windowHeight = window.innerHeight;
    animType = type;
    addEventHandlers();
    checkPosition();
  }
  function addEventHandlers() {
    window.addEventListener('scroll', throttle(checkPosition, 101, { leading: true, trailing: true}));
    window.addEventListener('resize', throttle(checkPosition, 101, { leading: true, trailing: true}));
  }
  function checkPosition() {
    for (var i = 0; i < elems.length; i++) {
      var positionFromTop = elems[i].getBoundingClientRect().top;
      if (positionFromTop - windowHeight <= -(windowHeight * 0.11)) {
        elems[i].className = elems[i].className.replace(
          'hidden',
          animType,
        );
      } else if (positionFromTop > windowHeight){
        elems[i].className = elems[i].className.replace(
          animType,
          'hidden'
        );
      }
    }
  }
  function unload() {
    window.removeEventListener('scroll', checkPosition);
    window.removeEventListener('resize', checkPosition);
  }
  return {
    init: init,
    unload: unload,
  };
};

export default animateHTML();