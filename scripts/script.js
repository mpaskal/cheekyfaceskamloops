// DOM Elements
const elements = {
  copyright: document.querySelector(".copyright"),
};

function updateCopyright() {
  const currentYear = new Date().getFullYear();
  elements.copyright.innerHTML = `${currentYear} Cheeky Faces. All rights reserved.`;
}

(function () {
  updateCopyright();
})();
