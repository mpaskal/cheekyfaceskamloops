// DOM Elements
const copyright = document.querySelector(".copyright");

// DOM Elements for Quote Modal
const quoteModal = document.getElementById("quoteModal");
const getQuoteButton = document.getElementById("getQuoteButton");
const closeButton = document.getElementById("closeButton");
const clearButton = document.getElementById("clearButton");
const calculateButton = document.getElementById("calculateButton");

// Form elements in the Quote Modal
const eventTypeSelect = document.getElementById("eventType");
const travelFeeSelect = document.getElementById("travelFee");
const quoteOutput = document.getElementById("quote");

// Event-based fields
const facesField = document.getElementById("facesField");
const durationField = document.getElementById("durationField");

// Show Modal and load saved data if available
getQuoteButton.addEventListener("click", (event) => {
  event.preventDefault();
  loadQuoteData(); // Load previously saved data if any
  quoteModal.style.display = "block";
});

// Close Modal
closeButton.addEventListener("click", () => {
  quoteModal.style.display = "none";
});

// Close Modal when clicking outside
// window.addEventListener("click", (event) => {
//   if (event.target === quoteModal) {
//     quoteModal.style.display = "none";
//   }
// });

// Clear all fields
clearButton.addEventListener("click", () => {
  eventTypeSelect.value = "birthday"; // Reset to default
  travelFeeSelect.value = "0";
  facesField.style.display = "block"; // Show faces field by default
  durationField.style.display = "none"; // Hide duration field by default
  quoteOutput.value = "";
  localStorage.removeItem("quoteData");
});

// Update fields based on event type selection
eventTypeSelect.addEventListener("change", () => {
  if (eventTypeSelect.value === "birthday") {
    facesField.style.display = "block";
    durationField.style.display = "none";
  } else {
    facesField.style.display = "none";
    durationField.style.display = "block";
  }
});

// Calculate Quote
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

  // Add travel fee
  quote += travelFee;
  quoteOutput.value = `$${quote.toFixed(2)}`;

  // Save data to localStorage
  const quoteData = {
    eventType: eventTypeSelect.value,
    travelFee,
    quote,
  };
  localStorage.setItem("quoteData", JSON.stringify(quoteData));
});

// Load saved data for Quote Modal
function loadQuoteData() {
  const savedData = JSON.parse(localStorage.getItem("quoteData"));
  if (savedData) {
    eventTypeSelect.value = savedData.eventType;
    travelFeeSelect.value = savedData.travelFee;
    quoteOutput.value = `$${savedData.quote.toFixed(2)}`;

    // Show relevant fields based on saved event type
    if (savedData.eventType === "birthday") {
      facesField.style.display = "block";
      durationField.style.display = "none";
    } else {
      facesField.style.display = "none";
      durationField.style.display = "block";
    }
  }
}

function updateCopyright() {
  const currentYear = new Date().getFullYear();
  copyright.innerHTML = `${currentYear} Cheeky Faces. All rights reserved.`;
}

(function () {
  updateCopyright();
})();
