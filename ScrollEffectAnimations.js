document.addEventListener('scroll', function() {
    const coverServices = document.querySelector('.cover_Services');
    const rect = coverServices.getBoundingClientRect();

    // Check if the element is in view
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
        coverServices.classList.add('visible'); // Add class to trigger animation
    } else {
        coverServices.classList.remove('visible'); // Remove class if not in view
    }
});

let hasAnimated = false; // Flag to prevent repeated animations

document.addEventListener('scroll', function () {
    const coverServices = document.querySelector('.cover_Services');
    const rect = coverServices.getBoundingClientRect();

    // Check if the element is in view
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
        // Add class to trigger the main animation
        coverServices.classList.add('visible');

        if (!hasAnimated) { // Only animate sparkles if not already animated
            const sparkles = document.querySelectorAll('.sparkle');

            // Trigger sparkle animations with staggered timing
            sparkles.forEach((sparkle, index) => {
                setTimeout(() => {
                    sparkle.style.opacity = '1'; // Fade in effect

                    // Reset sparkle classes to trigger animations
                    sparkle.classList.remove('left', 'right', 'bottom-left', 'bottom-right');

                    // Add animation classes based on the index
                    if (index === 0) {
                        sparkle.classList.add('left');
                    } else if (index === 1) {
                        sparkle.classList.add('right');
                    } else if (index === 2) {
                        sparkle.classList.add('bottom-left');
                    } else if (index === 3) {
                        sparkle.classList.add('bottom-right');
                    }
                }, index * 200); // Stagger the animations by 200ms
            });

            hasAnimated = true; // Set the flag to true after animation
        }
    } else {
        // Reset the animation if the user scrolls away
        hasAnimated = false; // Allow re-animation if needed
        coverServices.classList.remove('visible'); // Remove the visible class

        const sparkles = document.querySelectorAll('.sparkle');
        sparkles.forEach(sparkle => {
            sparkle.style.opacity = '0'; // Hide sparkles again
            sparkle.classList.remove('left', 'right', 'bottom-left', 'bottom-right'); // Remove animation classes
        });
    }
});

const subheadingElement = document.getElementById("subheading-text");
const mainTextElement = document.getElementById("main-text");
const contactButtonContainer = document.getElementById("contact-button-container");

// Extract text content for typing
const subheadingText = subheadingElement.textContent;
const mainText = mainTextElement.firstChild.textContent; // Only get "Creative" from the first text node of h1

// Clear the text initially
subheadingElement.textContent = "";
mainTextElement.firstChild.textContent = ""; // Clear only the "Creative" part

let subIndex = 0;
let mainIndex = 0;

function typeCharacter() {
  if (subIndex < subheadingText.length) {
    subheadingElement.textContent += subheadingText.charAt(subIndex);
    subIndex++;
    setTimeout(typeCharacter, 100); // Adjust speed (100ms delay per character)
  } else if (mainIndex < mainText.length) {
    mainTextElement.firstChild.textContent += mainText.charAt(mainIndex);
    mainIndex++;
    setTimeout(typeCharacter, 100); // Adjust speed (100ms delay per character)
  } else {
    // Animation is complete, show the "Contact Us" button
    setTimeout(() => {
      contactButtonContainer.style.display = "block"; // Show the button
    }, 500); // Optional delay before showing the button
  }
}

window.onload = typeCharacter;

document.addEventListener('DOMContentLoaded', function () {
    const sections = [
      { section: document.querySelector('#about-section'), main: '.main1', sectionClass: '.section1' },
      { section: document.querySelector('#about-section2'), main: '.main2', sectionClass: '.section2' },
      { section: document.querySelector('#about-section3'), main: '.main3', sectionClass: '.section3' },
      { section: document.querySelector('#about-section4'), main: '.main4', sectionClass: '.section4' },
      { section: document.querySelector('#about-section5'), main: '.main5', sectionClass: '.section5' },
    ];
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const mainDiv = entry.target.querySelector(entry.target.dataset.main);
          const sectionDiv = entry.target.querySelector(entry.target.dataset.section);
          mainDiv.classList.add('slide-in-left');
          sectionDiv.classList.add('slide-in-right');
        } else {
          const mainDiv = entry.target.querySelector(entry.target.dataset.main);
          const sectionDiv = entry.target.querySelector(entry.target.dataset.section);
          mainDiv.classList.remove('slide-in-left');
          sectionDiv.classList.remove('slide-in-right');
        }
      });
    });
  
    sections.forEach((item) => {
      const { section, main, sectionClass } = item;
      section.setAttribute('data-main', main);
      section.setAttribute('data-section', sectionClass);
      observer.observe(section);
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const targetElement = document.getElementById('start-project');
    const staticText = "Ready ";  // Text that stays visible
    const animatedContent = "to get started.<br>Let's work on your project."; // Animated text
    
    let i = 0;
  
    // Initialize with the static text ("Ready")
    targetElement.innerHTML = staticText;
  
    function typeWriter() {
      if (i < animatedContent.length) {
        // Append one character at a time from animatedContent
        if (animatedContent[i] === "<") {
          let closingTag = animatedContent.indexOf(">", i) + 1;
          targetElement.innerHTML += animatedContent.slice(i, closingTag);
          i = closingTag; // Move the pointer to after the tag
        } else {
          targetElement.innerHTML += animatedContent.charAt(i);
          i++;
        }
        setTimeout(typeWriter, 100); // Adjust typing speed here
      } else {
        // Pause before restarting the animation
        setTimeout(() => {
          i = 0; // Reset index to restart the animation
          targetElement.innerHTML = staticText; // Reset only the animated part, keeping "Ready"
          typeWriter(); // Restart the typing animation
        }, 2000); // 2-second pause after finishing the animation
      }
    }
  
    typeWriter();
  });
  