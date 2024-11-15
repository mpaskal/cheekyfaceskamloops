// DOM Elements
const copyright = document.querySelector(".copyright");
const getQuoteButton = document.getElementById("getQuoteButton");
const quoteModal = document.getElementById("quoteModal");
const closeButtonTop = document.getElementById("closeButtonTop");
const closeButton = document.getElementById("closeButton");
const resetButton = document.getElementById("resetButton");
const calculateButton = document.getElementById("calculateButton");
const eventTypeSelect = document.getElementById("eventType");
const facesField = document.getElementById("facesField");
const facesNumber = document.getElementById("faces");
const durationField = document.getElementById("durationField");
const travelFeeSelect = document.getElementById("travelFee");
const quoteOutput = document.getElementById("quote");

// Show modal when "Get a Quote" button is clicked
getQuoteButton.addEventListener("click", (event) => {
  event.preventDefault();
  quoteModal.style.display = "block";
  updateFieldsVisibility(eventTypeSelect.value);
});

// Close modal when the close button is clicked
closeButtonTop.addEventListener("click", (event) => {
  event.preventDefault();
  closeModal();
});

// Close modal when the close button is clicked
closeButton.addEventListener("click", (event) => {
  event.preventDefault();
  closeModal();
});

// Function to close modal
function closeModal() {
  quoteModal.style.display = "none";
}

// Reset form fields
resetButton.addEventListener("click", (event) => {
  event.preventDefault();
  eventTypeSelect.value = "birthday";
  facesField.style.display = "block";
  durationField.style.display = "none";
  facesNumber.value = "8";
  travelFeeSelect.value = "0";
  quoteOutput.value = "";
  localStorage.removeItem("quoteData");
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

  // Save data
  const quoteData = {
    eventType: eventTypeSelect.value,
    travelFee,
    faces: facesField.value,
    quote,
  };
  localStorage.setItem("quoteData", JSON.stringify(quoteData));
});

// // Load saved quote data from localStorage
// function loadQuoteData() {
//   const savedData = JSON.parse(localStorage.getItem("quoteData"));
//   if (savedData) {
//     eventTypeSelect.value = savedData.eventType;
//     travelFeeSelect.value = savedData.travelFee;
//     facesField.value = savedData.faces || 8;
//     quoteOutput.value = `$${savedData.quote.toFixed(2)}`;
//     updateFieldsVisibility(savedData.eventType);
//   }
// }

// Update copyright year
function updateCopyright() {
  const currentYear = new Date().getFullYear();
  copyright.innerHTML = `${currentYear} Cheeky Faces. All rights reserved.`;
}

// Initial setup
(function () {
  updateCopyright();
})();
