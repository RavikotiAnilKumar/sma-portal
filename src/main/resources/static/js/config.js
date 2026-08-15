// SMA Portal Smart Configuration
const CONFIG = {
    // Automatically detect if we are on localhost or on the cloud
    get API_BASE_URL() {
        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.protocol === "file:") {
            return "http://localhost:8080"; // Local testing
        } else {
            return window.location.origin; // Live cloud link
        }
    }
};
console.log("SMA Portal connecting to API at:", CONFIG.API_BASE_URL);
