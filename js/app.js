"use strict";
const timeElms = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  milliseconds: document.getElementById("milliseconds"),
};

const searchDropDownElem = document.getElementById("search-dropdown");

function EventDetails(eventName, targetDate) {
  this.eventName = eventName;
  this.targetDate = new Date(targetDate); //"2023-12-24T23:59:59"
  this.interval = null;
  this.days = 0;
  this.hours = 0;
  this.minutes = 0;
  this.seconds = 0;

  this.start = function () {
    this.interval = setInterval(() => {
      const now = new Date().getTime();
      const timeRemaining = this.targetDate.getTime() - now;

      if (timeRemaining <= 0) {
        clearInterval(this.interval);
        console.log("Countdown has ended!");
      } else {
        this.days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        this.hours = Math.floor(
          (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        this.minutes = Math.floor(
          (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        this.seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        this.milliseconds = timeRemaining % 100;

        this.renderTime();
      }
    }, 1000);
  };

  this.stop = function () {
    if (this.interval) {
      clearInterval(this.interval);
    }
  };

  this.renderSearchResult = function () {
    const liElement = document.createElement("li");
    const href = this.eventName.toLowerCase().replaceAll(" ", "-") + ".html";
    liElement.innerHTML = `<a class="dropdown-item" href="${href}">${this.eventName}</a>`;
    searchDropDownElem.appendChild(liElement);
  };

  this.renderTime = function () {
    timeElms.days.textContent = this.days;
    timeElms.hours.textContent = this.hours;
    timeElms.minutes.textContent = this.minutes;
    timeElms.seconds.textContent = this.seconds;
  };

  this.renderEventDetails = function () {
    const dateString = this.targetDate.toDateString();
    const timeString = this.targetDate.toLocaleTimeString();

    document.getElementById("event-date").textContent = dateString;

    document.getElementById("event-time").textContent = timeString;
  };
}

// collection of data
const ponyEvents = [
  new EventDetails("War Pony", "2023-11-20T14:00:00"),
  new EventDetails("Hero Pony", "2024-02-20T14:00:00"),
  new EventDetails("Fairy Tale Pony", "2024-02-20T14:00:00"),
  new EventDetails("Christmas", "2023-12-24T00:00:00"),
];

// event handler
function handleSearch(event) {
  event.preventDefault();

  // TODO change toggle to add, then write logic to remove when necessary
  searchDropDownElem.innerHTML = "";
  searchDropDownElem.classList.add("show");

  const filteredArray = ponyEvents.filter((element) =>
    element.eventName.toLowerCase().includes(event.target.value.toLowerCase())
  );

  console.log(filteredArray);

  filteredArray.forEach((element) => element.renderSearchResult());
}

// unique to each page
function handleWarPonyPageLoad() {
  ponyEvents[0].start();
  ponyEvents[0].renderEventDetails();
}

// unique to each page
function handleHomePageLoad() {
  ponyEvents[3].start();
  ponyEvents[3].renderEventDetails();
}
