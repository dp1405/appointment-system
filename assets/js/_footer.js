document.getElementById("scroll-to-top").addEventListener("click", function() {
    scrollToTop(1000); // Adjust the duration of the scroll (in milliseconds) as needed
  });
  
  function scrollToTop(duration) {
    const start = document.documentElement.scrollTop || document.body.scrollTop;
    const end = 0;
    const change = end - start;
    const increment = 20;
  
    function animateScroll(elapsedTime) {
      elapsedTime += increment;
      const position = easeInOut(elapsedTime, start, change, duration);
      document.documentElement.scrollTop = position;
      document.body.scrollTop = position;
  
      if (elapsedTime < duration) {
        requestAnimationFrame(animateScroll);
      }
    }
  
    function easeInOut(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }
  
    requestAnimationFrame(animateScroll);
  }