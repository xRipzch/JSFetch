// Get references to the input field, text area, and fetch button elements from the DOM
const inpUrl = document.getElementById("inpUrl");
const textArea = document.getElementById("txtOutput");
const pbFetch = document.getElementById("btnFetch");

// Add an event listener to the 'Fetch' button that triggers the function 'actionFetchUrl' when clicked
pbFetch.addEventListener("click", actionFetchUrl);

// Function to handle fetching data from the provided URL
async function actionFetchUrl() {
    // Get the URL value from the input field
    const url = inpUrl.value;

    try {
        // Call the fetchAnyUrl function to fetch the data from the given URL
        const jsonOutput = await fetchAnyUrl(url);

        // Debugging log to ensure the fetched data is received as JSON
        console.log("JSON Output:", jsonOutput);

        // If the fetched data is an array, format each object and join them with double new lines.
        // If it's not an array, simply format the object.
        textArea.textContent = Array.isArray(jsonOutput)
            ? jsonOutput.map(getKeysAndValuesFromObj).join('\n\n')
            : getKeysAndValuesFromObj(jsonOutput);
    } catch (error) {
        // If an error occurs during fetch, log the error and display an error message in the text area
        console.error("Error fetching URL:", error);
        textArea.textContent = "Error fetching URL";
    }
}


// Helper function to fetch the URL and return the JSON response
async function fetchAnyUrl(url) {
    // Fetch the data from the given URL
    const response = await fetch(url);

    // If the response status is not OK (i.e., not in the 200–299 range), throw an error
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Return the response parsed as JSON
    return response.json();
}

// Helper function to extract key-value pairs from a JSON object and format them
function getKeysAndValuesFromObj(obj) {
    // Map over the object's keys and return them formatted as 'key : value' strings, separated by new lines
    return Object.keys(obj).map(key => `${key} : ${obj[key]}`).join('\n');
}
