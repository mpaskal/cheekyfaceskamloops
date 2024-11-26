// DOM Elements
const copyright = document.querySelector(".copyright");
const quoteModalButton = document.getElementById("quoteModalButton");
const quoteModal = document.getElementById("quoteModal");
const closeButtonTopQuote = document.getElementById("closeButtonTopQuote");
const closeButtonQuote = document.getElementById("closeButtonQuote");
const resetButton = document.getElementById("resetButton");
const calculateButton = document.getElementById("calculateButton");
const facesField = document.getElementById("facesField");
const facesNumber = document.getElementById("faces");
const durationField = document.getElementById("durationField");
const quoteOutput = document.getElementById("quote");
const bookingModal = document.getElementById("bookingModal");
const closeButtonTopBooking = document.getElementById("closeButtonTopBooking");
const closeButtonBooking = document.getElementById("closeButtonBooking");
const eventTypeRadios = document.querySelectorAll('input[name="eventType"]');
const travelFeeRadios = document.querySelectorAll('input[name="travelFee"]');
const reviewModal = document.getElementById("reviewModal");
const reviewModalButton = document.getElementById("reviewModalButton");
const closeButtonReview = document.getElementById("closeButtonReview");
const closeButtonTopReview = document.getElementById("closeButtonTopReview");
const closeButtonFAQs = document.getElementById("closeButtonFAQs");
const closeButtonTopFAQs = document.getElementById("closeButtonTopFAQs");
const faqsModal = document.getElementById("faqsModal");
const faqQuestions = document.querySelectorAll(".faq-question");
const locationToggle = document.querySelector(".location-text");
const mapContainer = document.querySelector(".map-container");
const modals = [quoteModal, bookingModal, reviewModal, faqsModal];

// Function to open modal
function openModal(modalId) {
  modalId?.classList.add("active");
}

// Function to close modal
function closeModal(modalId) {
  modalId?.classList.remove("active");
}

// Function to close all modals
function closeAllModals() {
  modals.forEach((modal) => closeModal(modal));
}

const openButtons = [
  { button: reviewModalButton, modal: reviewModal },
  { button: bookingModalButton, modal: bookingModal },
  { button: quoteModalButton, modal: quoteModal },
  { button: faqsModalButton, modal: faqsModal },
];

// Toggle footer map display
locationToggle.addEventListener("click", () => {
  mapContainer.style.display =
    mapContainer.style.display === "none" || !mapContainer.style.display
      ? "block"
      : "none";
});

// Add event listeners for all open buttons
openButtons.forEach(({ button, modal }) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    closeAllModals();
    openModal(modal);

    // Specific logic for the "Get a Quote" modal
    if (modal === quoteModal) {
      const selectedEventType = document.querySelector(
        'input[name="eventType"]:checked'
      );
      updateFieldsVisibility(selectedEventType?.value || "birthday");
    }
  });
});

// All close buttons and their corresponding modals
const closeButtons = [
  { button: closeButtonBooking, modal: bookingModal },
  { button: closeButtonReview, modal: reviewModal },
  { button: closeButtonQuote, modal: quoteModal },
  { button: closeButtonFAQs, modal: faqsModal },
  { button: closeButtonTopBooking, modal: bookingModal },
  { button: closeButtonTopReview, modal: reviewModal },
  { button: closeButtonTopQuote, modal: quoteModal },
  { button: closeButtonTopFAQs, modal: faqsModal },
];

// Add event listeners for all close buttons
closeButtons.forEach(({ button, modal }) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    closeModal(modal);
  });
});

// Reset form fields
resetButton.addEventListener("click", (event) => {
  event.preventDefault();

  document.getElementById("birthday").checked = true;
  facesField.style.display = "block";
  durationField.style.display = "none";
  facesNumber.value = "8";

  document.getElementById("travelFee0").checked = true;

  quoteOutput.value = "";

  updateFieldsVisibility("birthday");
});

// Update field visibility
eventTypeRadios.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    updateFieldsVisibility(event.target.value);
  });
});

function updateFieldsVisibility(eventType) {
  if (eventType === "birthday") {
    facesField.style.display = "block";
    durationField.style.display = "none";
  } else {
    facesField.style.display = "none";
    durationField.style.display = "block";
  }
}

// Get the selected travel fee
function getSelectedTravelFee() {
  const selectedFee = document.querySelector('input[name="travelFee"]:checked');
  return selectedFee ? parseInt(selectedFee.value) : 0;
}

// Calculate button logic to use travel fee radio buttons
calculateButton.addEventListener("click", () => {
  let quote = 0;
  const travelFee = getSelectedTravelFee();

  const selectedEventType = document.querySelector(
    'input[name="eventType"]:checked'
  ).value;

  if (selectedEventType === "birthday") {
    const faces = parseInt(facesNumber.value) || 8;
    quote = 100 + (faces - 8) * 5;
  } else {
    const hours = parseInt(document.getElementById("hours").value) || 1;
    quote = hours * 100;
  }

  quote += travelFee;
  quoteOutput.value = `$${quote.toFixed(2)}`;
});

// Toggle FAQ answer visibility
faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const targetId = question.getAttribute("data-target");
    const answer = document.getElementById(targetId);

    if (answer.style.display === "block") {
      answer.style.display = "none"; // Collapse if already open
    } else {
      answer.style.display = "block"; // Expand on click
    }
  });
});

// Update copyright year
function updateCopyright() {
  const currentYear = new Date().getFullYear();
  copyright.innerHTML = `Copyright © ${currentYear} Cheeky Faces. All rights reserved`;
}

// Initial setup
(function () {
  updateCopyright();
})();
