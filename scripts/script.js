// DOM Elements
const copyright = document.querySelector(".copyright");
const getQuoteButton = document.getElementById("getQuoteButton");
const quoteModal = document.getElementById("quoteModal");
const closeButton = document.getElementById("closeButton");
const clearButton = document.getElementById("clearButton");
const calculateButton = document.getElementById("calculateButton");
const eventTypeSelect = document.getElementById("eventType");
const facesField = document.getElementById("facesField");
const durationField = document.getElementById("durationField");
const travelFeeSelect = document.getElementById("travelFee");
const quoteOutput = document.getElementById("quote");

// Show modal when "Get a Quote" button is clicked
getQuoteButton.addEventListener("click", (event) => {
  event.preventDefault();
  quoteModal.style.display = "block";
  loadQuoteData(); // Load saved data if available
});

// Close modal when the close button is clicked
closeButton.addEventListener("click", () => {
  closeModal("quoteModal");
});

// Function to close modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Close modal when clicking outside of the modal content
window.addEventListener("click", (event) => {
  if (event.target === quoteModal) {
    closeModal("quoteModal");
  }
});

// Clear form fields
clearButton.addEventListener("click", () => {
  eventTypeSelect.value = "birthday";
  facesField.style.display = "block";
  durationField.style.display = "none";
  travelFeeSelect.value = "0";
  quoteOutput.value = "";
  localStorage.removeItem("quoteData");
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
    const faces = parseInt(document.getElementById("faces").value);
    quote = 100 + Math.max(0, faces - 8) * 5;
  } else {
    const hours = parseInt(document.getElementById("hours").value);
    quote = hours * 100;
  }

  quote += travelFee;
  quoteOutput.value = `$${quote.toFixed(2)}`;

  // Save data
  const quoteData = {
    eventType: eventTypeSelect.value,
    travelFee,
    quote,
  };
  localStorage.setItem("quoteData", JSON.stringify(quoteData));
});

// Load saved quote data from localStorage
function loadQuoteData() {
  const savedData = JSON.parse(localStorage.getItem("quoteData"));
  if (savedData) {
    eventTypeSelect.value = savedData.eventType;
    travelFeeSelect.value = savedData.travelFee;
    quoteOutput.value = `$${savedData.quote.toFixed(2)}`;
    updateFieldsVisibility(savedData.eventType);
  }
}

// Update copyright year
function updateCopyright() {
  const currentYear = new Date().getFullYear();
  copyright.innerHTML = `${currentYear} Cheeky Faces. All rights reserved.`;
}

// Initial setup
(function () {
  updateCopyright();
})();
