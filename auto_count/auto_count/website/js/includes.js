function includeHTML() {
    let elements = document.querySelectorAll('[include-html]');
    elements.forEach((element) => {
        let file = element.getAttribute('include-html');
        fetch(file)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    return 'Page not found.';
                }
            })
            .then(data => {
                element.outerHTML = data;
            });
    });
}

document.addEventListener('DOMContentLoaded', includeHTML);
