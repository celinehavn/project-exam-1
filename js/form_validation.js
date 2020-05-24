// Validation for contact form
let contactForm = () => {
    let formElement = document.getElementById("contact_form");
    let user = {}

    let isValidated = false;

    // -1 because we don't need to include the submit button element
    for (let i = 0; i < formElement.length - 1; i++) {
        let [name, value, element] = [
            formElement.elements[i].name,
            formElement.elements[i].value,
            formElement.elements[i]
        ];

        // Add the element name and value to user object
        user[name] = value;

        // Validate the form
        if (value.length === 0) {
            element.style.border = '2px solid red';
            isValidated = false;
        } else {
            isValidated = true
            element.style.border = '2px solid #005288';
        }
    }

    // Display successfully message
    if (isValidated === true)
        alert('Hi, ' + user.name + ' this page is for testing purpose only.');

    // Prevent the page from reload
    return false
}