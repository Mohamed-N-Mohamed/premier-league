//gets pl data only
const url =
  "https://api.football-data.org/v2/competitions/PL/standings?standingType=TOTAL";

//gets match data only
const url2 =
  "https://api.football-data.org/v2/competitions/PL/matches?dateFrom=2020-05-01&dateTo=2020-05-30";
//key to access data
const token = "f614d65eae1141b49ddba63d88b10ec5";

const displayData = document.getElementById("data");

const displayMatches = document.getElementById("matches");

//fetches data from api
async function getPLData() {
  const response = await fetch(url, {
    method: "GET",
    headers: { "X-Auth-Token": token },
  });
  const data = await response.json();
  //get all premier league data
  let standings = data.standings[0].table;
  //send data to create UI
  createTable(standings);
}

//fetch match data from api
async function getMatchData() {
  const response = await fetch(url2, {
    method: "GET",
    headers: { "X-Auth-Token": token },
  });
  const data = await response.json();
  createMatchUI(data);
}

//creates DOM table
function createTable(data) {
  let html = "";
  data
    .map((data) => {
      html += `
       
          <tr>
            <th scope="row">${data.position}</th>
            <td>${data.team.name}</td>
            <td>${data.playedGames}</td>
            <td>${data.won}</td>
            <td>${data.draw}</td>
            <td>${data.lost}</td>
            <td>${data.goalsFor}</td>
            <td>${data.goalsAgainst}</td>
            <td>${data.goalDifference}</td>
            <td>${data.points}</td>
          </tr>
      
    `;
    })
    .join("");

  displayData.innerHTML = `
  <table class="table">
       <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Team</th>
            <th scope="col">GP</th>
            <th scope="col">W</th>
            <th scope="col">D</th>
            <th scope="col">L</th>
            <th scope="col">F</th>
            <th scope="col">A</th>
            <th scope="col">GD</th>
            <th scope="col">Pts</th>
          </tr>
        </thead>
        <tbody>
        ${html}
        </tbody> 
        </table>
  `;
}

function createMatchUI(matches) {
  matches.matches
    .map((match) => {
      const awayTeam = match.awayTeam.name;
      const homeTeam = match.homeTeam.name;
      displayMatches.innerHTML = ` <ul class="list-group list-group-horizontal-lg">
    <li class="list-group-item">${awayTeam}</li>
    <li class="list-group-item"><strong>VS</strong></li>
    <li class="list-group-item">${homeTeam}</li>`;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  //fetch data from api and display them
  getPLData();
  getMatchData();
});
