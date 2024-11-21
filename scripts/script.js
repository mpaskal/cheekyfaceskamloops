// DOM Elements
const copyright = document.querySelector(".copyright");
const getQuoteButton = document.getElementById("getQuoteButton");
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

// Function to open modal
function openModal(modalId) {
  modalId?.classList.add("active");
}

// Function to close modal
function closeModal(modalId) {
  modalId?.classList.remove("active");
}

// Show modal when "Get a Quote" button is clicked
getQuoteButton.addEventListener("click", (event) => {
  event.preventDefault();
  closeModal(bookingModal);
  openModal(quoteModal);

  const selectedEventType = document.querySelector(
    'input[name="eventType"]:checked'
  );
  updateFieldsVisibility(selectedEventType?.value || "birthday");
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

// Booking Modal
bookingModalButton.addEventListener("click", (event) => {
  event.preventDefault();
  closeModal(quoteModal);
  openModal(bookingModal);
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
