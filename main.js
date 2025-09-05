let lastScrollY = window.scrollY;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        // Scrolling down
        navbar.style.top = '-14vh'; // Adjust this value to match navbar height
    } else {
        // Scrolling up
        navbar.style.top = '0';
    }
    lastScrollY = window.scrollY;
});

document.addEventListener('DOMContentLoaded', () => {
    const bitelogo2 = document.getElementById('bitelogo2');
    setTimeout(() => {
        bitelogo2.classList.add('show');
    }, 1000); // 1000 ms = 1 second delay
});

// FAQ Dropdown functionality
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.classList.toggle('active');
    
    // Optional: Close other dropdowns (accordion style)
    const allDropdowns = document.querySelectorAll('.dropdown-content');
    allDropdowns.forEach(function(dd) {
        if (dd.id !== dropdownId) {
            dd.classList.remove('active');
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.hands-container');
  const description = document.querySelector('.hands-description');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Start timer only when visible
        setTimeout(() => {
          container.classList.add('separated');
          description.classList.add('visible');
        }, 1000);
        observer.unobserve(container); // Stop observing after first trigger
      }
    });
  }, { threshold: 0.1 }); // Trigger when 10% visible

  observer.observe(container);
});

/*timeline*/

function qs (selector, all = false) {
  return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}

const sections = qs('.timeline__section', true);
const timeline = qs('.timeline');
const line = qs('.timeline__line'); 

line.style.bottom = `calc(100% - 20px)`;
let prevScrollY = window.scrollY;
let up, down;
let full = false;
let set = 0;
const targetY = window.innerHeight * .8;

function scrollHandler(e) {
  const {scrollY} = window;
  
  up = scrollY < prevScrollY;
  down = !up;
  
  const timelineRect = timeline.getBoundingClientRect();
  const lineRect = line.getBoundingClientRect();
  // const lineHeight = lineRect.bottom - lineRect.top;
  const dist = targetY - timelineRect.top;
  
  console.log(dist);
  
  if (down && !full) {
    set = Math.max(set,dist);
    line.style.bottom = `calc(100% - ${set}px)`;
  }
  
  if (dist > timeline.offsetHeight + 50 && !full) {
    full = true;
    line.style.bottom = `-50px`;
  }
  
  sections.forEach(item => {
    // console.log(item);
    const rect = item.getBoundingClientRect();
//     console.log(rect);
    
    if (rect.top + item.offsetHeight / 2 < targetY) {
      item.classList.add('show-me');
    }
  });
  
  // console.log(up, down);
  prevScrollY = window.scrollY;
}

document.addEventListener('DOMContentLoaded', () => {
  const marqueeTrack = document.getElementById('marquee-track');
  
  // Clone all marquee items and append them to the track for seamless looping
  marqueeTrack.innerHTML += marqueeTrack.innerHTML;

  function updateMarqueeSpeed() {
    // Calculate the total width of the original set of images
    const marqueeItems = marqueeTrack.querySelectorAll('.marquee-item');
    let totalWidth = 0;
    
    // Only count the first half of items (original items, not clones)
    const originalItemCount = marqueeItems.length / 2;
    for (let i = 0; i < originalItemCount; i++) {
      const item = marqueeItems[i];
      totalWidth += item.offsetWidth + parseInt(getComputedStyle(item).marginRight || 0);
    }

    // Set the animation duration based on total width
    const speed = 100; // pixels per second (reduced for more reasonable speed)
    const animationDuration = totalWidth / speed; // duration in seconds

    // Apply the animation duration to the marquee-track
    marqueeTrack.style.animationDuration = `${animationDuration}s`;
  }

  // Initial calculation
  updateMarqueeSpeed();

  // Recalculate on window resize with debouncing
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateMarqueeSpeed, 150);
  });
});



scrollHandler();
line.style.display = 'block';
window.addEventListener('scroll', scrollHandler);


(function () {
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  //I'm adding this section so I don't have to keep updating this pen every year :-)
  //remove this if you don't need it
  let today = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"),
      yyyy = today.getFullYear(),
      nextYear = yyyy + 1,
      dayMonth = "09/26/",
      birthday = dayMonth + yyyy;
  
  today = mm + "/" + dd + "/" + yyyy;
  if (today > birthday) {
    birthday = dayMonth + nextYear;
  }
  //end
  
  const countDown = new Date(birthday).getTime(),
      x = setInterval(function() {    

        const now = new Date().getTime(),
              distance = countDown - now;

        document.getElementById("days").innerText = Math.floor(distance / (day)),
          document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
          document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
          document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

        //do something later when date is reached
        if (distance < 0) {
          document.getElementById("headline").innerText = "It's my birthday!";
          document.getElementById("countdown").style.display = "none";
          document.getElementById("content").style.display = "block";
          clearInterval(x);
        }
        //seconds
      }, 0)
  }());