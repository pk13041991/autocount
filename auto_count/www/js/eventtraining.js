// Function to handle redirection
function registerForItem(event_name) {
    console.log(frappe.session["user"])
    if (frappe.session["user"] === "Guest" || !frappe.session["user"]) {
        // Redirect to login page
        window.location.href = '/login'; // Adjust this path if needed
        return;
    }

    // Construct the registration URL dynamically
    let registration_url = '/eventregistration.html?' + 
                            'event_name=' + encodeURIComponent(event_name) ;

    // Redirect to the registration page
    window.location.href = registration_url;
}


document.addEventListener("DOMContentLoaded", function() {
    // Check if the user is a guest
    console.log(frappe.session["user"])
    if (frappe.session["user"] === "Guest") {
        // Redirect to login page
        window.location.href = '/login'; // Adjust this path if needed
        return;  // Stop further execution
    }
    fetchEventsAndTraining();
    
    // Set up the event handler for the child table 'Registration'
    frappe.ui.form.on('Registration', {
        register: function(frm, cdt, cdn) {
            var row = locals[cdt][cdn];

            // Pass the event or item name from the child table to the function
            registerForItem(row.event_name);  // Adjust 'event_name' field as needed
        }
    });

    async function fetchEventsAndTraining() {
        try {
            const response = await fetch('/api/method/lms.lms.utils.get_events');
            const data = await response.json();
            
            if (data.message && Array.isArray(data.message)) {
                displayContent(data.message);
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            console.error('Error fetching events and training:', error);
            document.getElementById('events-list').innerHTML = '<li>No upcoming events found.</li>';
            document.getElementById('training-list').innerHTML = '<li>No upcoming training found.</li>';
        }
    }
    
    function displayContent(items) {
        const eventsList = document.getElementById('events-list');
        const trainingList = document.getElementById('training-list');
        
        eventsList.innerHTML = '';
        trainingList.innerHTML = '';
    
        // Create card containers
        const eventsContainer = document.createElement('div');
        eventsContainer.classList.add('card-container');
        const trainingContainer = document.createElement('div');
        trainingContainer.classList.add('card-container');
        
        items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            console.log(item.name);
            
            // Create card content
            card.innerHTML = `
                <h3>${item.event_name || item.training_name}</h3>
                <div class="details">
                    <p>Venue: ${item.venue}</p>
                    <p>Date: ${item.event_date || item.training_date}</p>
                    <p>Start Time: ${item.start_time}</p>
                    <p>End Time: ${item.end_time}</p>
                </div>
                <button onclick="registerForItem('${item.name}')">Register</button>
            `;
        
            // Append to the correct container
            if (item.event_type === 'Event') {
                eventsContainer.appendChild(card);
            } else if (item.event_type === 'Training') {
                trainingContainer.appendChild(card);
            }
        });
    
        // Append card containers to the DOM
        eventsList.appendChild(eventsContainer);
        trainingList.appendChild(trainingContainer);
    
        if (!items.length) {
            eventsList.innerHTML = '<p>No upcoming events found.</p>';
            trainingList.innerHTML = '<p>No upcoming training sessions found.</p>';
        }
    }
    
    
    // Call the function on page load
    document.addEventListener('DOMContentLoaded', fetchEventsAndTraining);
    
    
    function displayNoItemsMessage() {
        const eventsList = document.getElementById('events-list');
        const trainingList = document.getElementById('training-list');
    
        eventsList.innerHTML = '<p>Error fetching events.</p>';
        trainingList.innerHTML = '<p>Error fetching training sessions.</p>';
    }
    
    
});
