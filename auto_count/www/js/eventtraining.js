document.addEventListener("DOMContentLoaded", function() {
    fetchEventsAndTraining();

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
    
            // Create list item content with a single line for details
            listItem.innerHTML = `
                <a href="/event-details.html?id=${item.name}">
                    <h3>${item.event_name || item.training_name}</h3>
                    <div class="details">
                        <p>Venue: ${item.venue}</p>
                        <p>Date: ${item.event_date || item.training_date}</p>
                        <p>Start Time: ${item.start_time}</p>
                        <p>End Time: ${item.end_time}</p>
                    </div>
                    <button>Register</button>
                </a>
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
    
    function registerForItem(itemName) {
        // Implement registration logic here
        alert(`Registering for ${itemName}`);
    }
    
});
