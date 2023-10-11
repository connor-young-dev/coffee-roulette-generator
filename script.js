let names = [];
let pairs = [];

function addName() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();

    if (name) {
        names.push(name);
        nameInput.value = '';
        displayAddedNames();
    }
}

function generatePairs() {
    pairs = [];
    let totalWeeks = names.length - 1; // Number of weeks needed to pair everyone
    let oddPerson = null; // To keep track of an odd person

    let availableNames = [...names]; // Copy the list of names to pick from

    if (availableNames.length % 2 === 1) {
        oddPerson = availableNames.pop(); // Remove and save one name for the odd person
    }

    for (let week = 1; week <= totalWeeks; week++) {
        let currentWeekPairs = [];

        if (oddPerson) {
            currentWeekPairs.push([oddPerson, "No one"]);
        }

        for (let i = 0; i < availableNames.length; i += 2) {
            const name1 = availableNames[i];
            const name2 = availableNames[i + 1];
            currentWeekPairs.push([name1, name2]);
        }

        pairs.push({ [`Week ${week}`]: currentWeekPairs });

        // Rotate the list for the next week
        availableNames.unshift(availableNames.pop());
    }

    displayPairs();
}


function displayAddedNames() {
    const namesDiv = document.getElementById('addedNames');
    namesDiv.innerHTML = '';

    for (const name of names) {
        namesDiv.innerHTML += `<li>${name}</li>`;
    }
}

function displayPairs() {
    const pairsDiv = document.getElementById('pairs');
    pairsDiv.innerHTML = '';

    for (const weekPairs of pairs) {
        for (const [week, pairs] of Object.entries(weekPairs)) {
            pairsDiv.innerHTML += `<strong>${week}:</strong><ul>`;
            for (const pair of pairs) {
                pairsDiv.innerHTML += `<li>${pair[0]} and ${pair[1]}</li>`;
            }
            pairsDiv.innerHTML += `</ul>`;
        }
    }
}
