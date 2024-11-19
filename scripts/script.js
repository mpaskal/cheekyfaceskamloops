// DOM Elements
const copyright = document.querySelector(".copyright");
const getQuoteButton = document.getElementById("getQuoteButton");
const quoteModal = document.getElementById("quoteModal");
const closeButtonTopQuote = document.getElementById("closeButtonTopQuote");
const closeButtonQuote = document.getElementById("closeButtonQuote");
const resetButton = document.getElementById("resetButton");
const calculateButton = document.getElementById("calculateButton");
const eventTypeSelect = document.getElementById("eventType");
const facesField = document.getElementById("facesField");
const facesNumber = document.getElementById("faces");
const durationField = document.getElementById("durationField");
const travelFeeSelect = document.getElementById("travelFee");
const quoteOutput = document.getElementById("quote");
const bookingModal = document.getElementById("bookingModal");
const closeButtonTopBooking = document.getElementById("closeButtonTopBooking");
const closeButtonBooking = document.getElementById("closeButtonBooking");

// Function to open modal
function openModal(modalId) {
  modalId.classList.add("active"); // Add the active class to center the modal
}

// Function to close modal
function closeModal(modalId) {
  modalId.classList.remove("active"); // Remove the active class to hide the modal
}

// Show modal when "Get a Quote" button is clicked
getQuoteButton.addEventListener("click", (event) => {
  event.preventDefault();
  closeModal(bookingModal);
  openModal(quoteModal);
  updateFieldsVisibility(eventTypeSelect.value); // Update fields based on the event type
});

// Close quote modal when the close button (top) is clicked
closeButtonTopQuote.addEventListener("click", (event) => {
  event.preventDefault();
  closeModal(quoteModal);
});

// Close quote modal when the close button (bottom) is clicked
closeButtonQuote.addEventListener("click", (event) => {
  event.preventDefault();
  closeModal(quoteModal);
});

// Reset form fields
resetButton.addEventListener("click", (event) => {
  event.preventDefault();
  eventTypeSelect.value = "birthday";
  facesField.style.display = "block";
  durationField.style.display = "none";
  facesNumber.value = "8";
  travelFeeSelect.value = "0";
  quoteOutput.value = "";
  updateFieldsVisibility(eventTypeSelect.value);
});

// Update field visibility based on event type selection
eventTypeSelect.addEventListener("change", () => {
  updateFieldsVisibility(eventTypeSelect.value);
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

// Calculate quote when calculate button is clicked
calculateButton.addEventListener("click", () => {
  let quote = 0;
  const travelFee = parseInt(travelFeeSelect.value);

  if (eventTypeSelect.value === "birthday") {
    const faces = parseInt(facesNumber.value) || 8;
    quote = 100 + (faces - 8) * 5;
  } else {
    const hours = parseInt(document.getElementById("hours").value);
    quote = hours * 100;
  }

  quote += travelFee;
  quoteOutput.value = `$${quote.toFixed(2)}`;
});

// Booking Modal
bookingModalButton.addEventListener("click", (event) => {
  event.preventDefault();
  closeModal(quoteModal);
  openModal(bookingModal);
  updateFieldsVisibility(eventTypeSelect.value);
});

closeButtonTopBooking.addEventListener("click", (event) => {
  event.preventDefault();
  closeModal(bookingModal);
});

// Close modal when the close button (bottom) is clicked
closeButtonBooking.addEventListener("click", (event) => {
  event.preventDefault();
  closeModal(bookingModal);
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
