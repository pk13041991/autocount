frappe.ready(function() {
    // Create the button
    var button = document.createElement('button');
    button.className = 'btn btn-primary btn-xs';
    button.innerText = 'Upload and Compare';

    // Add click event listener to the button
    button.addEventListener('click', function() {
        const file_url = $('input[data-fieldname="excel_file"]').val();
        
        console.log("File URL: ", file_url);  // Debugging
        // if (file_url) {
        //     frappe.call({
        //         method: 'your_app.your_module.api.upload_and_compare',
        //         args: {
        //             file_url: file_url
        //         },
        //         callback: function(r) {
        //             console.log("Response: ", r);  // Debugging
        //             if (r.message) {
        //                 window.open(r.message);
        //             } else {
        //                 frappe.msgprint(__('No response message.'));
        //             }
        //         },
        //         error: function(e) {
        //             console.log("Error: ", e);  // Debugging
        //             frappe.msgprint(__('Error occurred while processing.'));
        //         }
        //     });
        // } else {
        //     frappe.msgprint(__('Please upload an Excel file first.'));
        // }
    });

    // Append the button to the page footer
    document.querySelector('.page-footer').appendChild(button);
});
