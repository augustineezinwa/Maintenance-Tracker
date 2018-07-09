'use strict';

function ToggleNavBar() {
  var nav = document.querySelector('.getNav');
  console.log(nav);
  return nav.classList.toggle('nav-bar-toggle-display');
}
document.querySelector('.nav-bar-icon-toggle').addEventListener('click', ToggleNavBar);