const loadButton = document.getElementById('load-users');
const filterInput = document.getElementById('filter-input');
const statusText = document.getElementById('status');
const usersList = document.getElementById('users-list');

// Array to store fetched users so we can filter them locally
let allUsers = [];

// Function to draw users to the DOM
function renderUsers(list) {
    usersList.innerHTML = ''; // Clear current list

    if (list.length === 0) {
        statusText.textContent = "No users match your filter.";
        return;
    }

    list.forEach(user => {
        const li = document.createElement('li');
        li.className = 'user-card';

        const namePara = document.createElement('p');
        namePara.innerHTML = `<strong>Name:</strong> ${user.name}`;

        const emailPara = document.createElement('p');
        emailPara.textContent = `Email: ${user.email}`;

        const cityPara = document.createElement('p');
        cityPara.textContent = `City: ${user.address.city}`;

        const companyPara = document.createElement('p');
        companyPara.textContent = `Company: ${user.company.name}`;

        li.appendChild(namePara);
        li.appendChild(emailPara);
        li.appendChild(cityPara);
        li.appendChild(companyPara);

        usersList.appendChild(li);
    });
}

// Async function to fetch users
async function loadUsers() {
    try {
        // UI Loading State
        statusText.textContent = "Loading users...";
        statusText.style.color = "blue";
        loadButton.disabled = true;

        // Fetch data
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        allUsers = await response.json();
        
        // Success UI
        statusText.textContent = "Users loaded successfully!";
        statusText.style.color = "green";
        renderUsers(allUsers);

    } catch (error) {
        // Error UI
        statusText.textContent = `Failed to load users: ${error.message}`;
        statusText.style.color = "red";
    } finally {
        loadButton.disabled = false;
    }
}

// Event Listeners
loadButton.addEventListener('click', loadUsers);

filterInput.addEventListener('input', () => {
    const searchTerm = filterInput.value.toLowerCase().trim();
    
    // Filter the stored array locally
    const filteredUsers = allUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm)
    );
    
    // Clear status text when typing, except if there are no matches
    statusText.textContent = ""; 
    renderUsers(filteredUsers);
});