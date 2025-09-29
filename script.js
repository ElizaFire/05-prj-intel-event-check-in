const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const welcomeMessage = document.getElementById("welcomeMessage");

let count = 0;
const maxCount = 50;

// Store team keys for easy looping
const teams = [
  { key: "water", name: "Team Water Wise" },
  { key: "zero", name: "Team Net Zero" },
  { key: "power", name: "Team Renewables" },
];

// Load saved data from localStorage
function loadAttendanceData() {
  const saved = localStorage.getItem("attendanceData");
  if (saved) {
    return JSON.parse(saved);
  }
  // Default structure
  return {
    count: 0,
    teams: {
      water: [],
      zero: [],
      power: [],
    },
  };
}

// Save data to localStorage
function saveAttendanceData(data) {
  localStorage.setItem("attendanceData", JSON.stringify(data));
}

// Render all counts and lists from data
function renderAttendance(data) {
  // Total count
  const attendeeCount = document.getElementById("attendeeCount");
  if (attendeeCount) {
    attendeeCount.textContent = data.count;
  }
  // Progress bar
  const percentage = Math.round((data.count / maxCount) * 100);
  const progressBar = document.getElementById("progressBar");
  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
    progressBar.textContent = `${percentage}%`;
  }
  // Teams
  for (let i = 0; i < teams.length; i++) {
    const teamKey = teams[i].key;
    const teamCounter = document.getElementById(teamKey + "Count");
    const teamList = document.getElementById(teamKey + "List");
    if (teamCounter) {
      teamCounter.textContent = data.teams[teamKey].length;
    }
    if (teamList) {
      teamList.innerHTML = "";
      for (let j = 0; j < data.teams[teamKey].length; j++) {
        const li = document.createElement("li");
        li.textContent = data.teams[teamKey][j];
        teamList.appendChild(li);
      }
    }
  }
}

// Initialize data and render on page load
let attendanceData = loadAttendanceData();
count = attendanceData.count;
renderAttendance(attendanceData);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  // Update data
  attendanceData.count++;
  attendanceData.teams[team].push(name);

  // Save and render
  saveAttendanceData(attendanceData);
  renderAttendance(attendanceData);

  // Show personalized welcome message
  welcomeMessage.textContent = `Welcome, ${name}! You have checked in to ${teamName}.`;

  form.reset();
});
