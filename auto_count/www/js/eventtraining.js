// Function to handle redirection
function registerForItem(event_name) {

    // Construct the registration URL dynamically
    let registration_url = '/eventregistration.html?' + 
                            'event_name=' + encodeURIComponent(event_name) ;

    // Redirect to the registration page
    window.location.href = registration_url;
}


document.addEventListener("DOMContentLoaded", function() {
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
    
        items.forEach(item => {
            const listItem = document.createElement('li');
            console.log(item.name)
            // Create list item content with a single line for details
            listItem.innerHTML = `
                            <h3>${item.event_name || item.training_name}</h3>
                            <div class="details">
                                <p>Venue: ${item.venue}</p>
                                <p>Date: ${item.event_date || item.training_date}</p>
                                <p>Start Time: ${item.start_time}</p>
                                <p>End Time: ${item.end_time}</p>
                            </div>
                            <button onclick="registerForItem('${item.name}')">Register</button>
                        `;

    
            // Append to the correct list
            if (item.event_type === 'Event') {
                eventsList.appendChild(listItem);
            } else if (item.event_type === 'Training') {
                trainingList.appendChild(listItem);
            }
        });
    
        if (!items.length) {
            eventsList.innerHTML = '<li>No upcoming events found.</li>';
            trainingList.innerHTML = '<li>No upcoming training found.</li>';
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
