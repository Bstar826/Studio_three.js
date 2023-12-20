// Wrap every letter in a span
var textWrappers = document.querySelectorAll('.animation-text1');

for (let i = 0; i < textWrappers.length; i++) {
  textWrappers[i].innerHTML =textWrappers[i].textContent.replace(/\S/g, "<span class='letter1'>$&</span>");  
}

anime.timeline({loop: 1})
  .add({
    targets: '.animation-text1 .letter1',
    translateY: [100,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 2000,
    delay: (el, i) => 0 + 30 * i
  })

