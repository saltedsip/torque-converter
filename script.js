// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header background change on scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.background = "#ffffff";
    header.style.backdropFilter = "none";
  }
});

// Add to cart functionality
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    const productCard = this.closest(".product-card");
    const productName = productCard.querySelector("h3").textContent;
    const productPrice =
      productCard.querySelector(".product-price").textContent;

    // Create a temporary notification
    const notification = document.createElement("div");
    notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
                color: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                animation: slideIn 0.3s ease;
            ">
                <i class="fas fa-check-circle"></i>
                ${productName} added to cart!
            </div>
        `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);

    // Add animation keyframes if not already present
    if (!document.querySelector("#slideInAnimation")) {
      const style = document.createElement("style");
      style.id = "slideInAnimation";
      style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
      document.head.appendChild(style);
    }
  });
});

// Contact form handling
document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Simple validation
    if (!name || !email || !subject || !message) {
      showNotification("Please fill in all required fields.", "error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]@[^\s@]\.[^\s@]$/;
    if (!emailRegex.test(email)) {
      showNotification("Please enter a valid email address.", "error");
      return;
    }

    // Simulate form submission
    const submitBtn = this.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      showNotification(
        "Thank you for your message! We'll get back to you soon.",
        "success"
      );
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });

// Notification function
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  const backgroundColor =
    type === "success"
      ? "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)"
      : "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)";

  notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${backgroundColor};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        ">
            <i class="fas fa-${
              type === "success" ? "check-circle" : "exclamation-triangle"
            }"></i>
            ${message}
        </div>
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe product cards for animation
document.addEventListener("DOMContentLoaded", function () {
  const productCards = document.querySelectorAll(".product-card");
  const features = document.querySelectorAll(".feature");

  // Set initial styles for animation
  [...productCards, ...features].forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });
});

// Mobile menu toggle (if needed for smaller screens)
document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".nav");
  const header = document.querySelector(".header");

  // Add mobile menu button for very small screens
  if (window.innerWidth <= 480) {
    const mobileMenuBtn = document.createElement("button");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            display: none;
        `;

    // Add to header
    header.querySelector(".container").appendChild(mobileMenuBtn);

    // Toggle menu
    mobileMenuBtn.addEventListener("click", function () {
      nav.style.display = nav.style.display === "none" ? "block" : "none";
    });

    // Show mobile menu button on small screens
    if (window.innerWidth <= 480) {
      mobileMenuBtn.style.display = "block";
      nav.style.display = "none";
    }
  }
});

// Image loading with proper handling
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    // If image is already loaded, show it immediately
    if (img.complete && img.naturalHeight !== 0) {
      img.style.opacity = "1";
    } else {
      // Set initial opacity to 0 and fade in when loaded
      img.style.opacity = "0";
      img.style.transition = "opacity 0.3s ease";

      img.onload = function () {
        img.style.opacity = "1";
      };

      // Fallback for images that fail to load
      img.onerror = function () {
        img.style.opacity = "1";
        console.warn("Image failed to load:", img.src);
      };
    }
  });
});
