<script>
document.addEventListener('DOMContentLoaded', function() {
    // This function hides all sections, making it easy to manage which section is visible
    function hideAllSections() {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.style.display = 'none';
        });
    }

    // This function shows a specific section by ID, after hiding all others
    function showSection(sectionId) {
        hideAllSections();
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'block';
        }
    }

    // Functions for each button click to show the respective section
    function showSNS() {
        showSection("sns-section");
        // Assume fetchDomains() is defined to handle domain-related functionality
        fetchDomains(); 
    }

    function showSaphroMail() {
        showSection("mail-section");
        // Assume fetchEmails() is defined to handle email-related functionality
        fetchEmails(); 
    }

    function showSaphroInbox() {
        showSection("inbox-section");
        // This could fetch inbox-related data if required
        fetchInbox();
    }

    function showSaphroBlockscanChat() {
        showSection("Chat-section");
        // This could initialize or refresh the chat interface
        refreshChat();
    }

    function showStorage() {
        showSection("storageSection");
        // This could fetch storage-related data or refresh the interface
        refreshStorage();
    }

    function showWallet() {
        showSection("wallet-frame");
        // This could initialize or refresh the wallet interface
        refreshWallet();
    }

    // Example functions to fetch data or update UI for each section
    function fetchDomains() {
        console.log("Fetching domain data...");
        // Implementation to fetch and display domains
    }

    function fetchEmails() {
        console.log("Fetching emails...");
        // Implementation to fetch and display emails
    }

    function fetchInbox() {
        console.log("Fetching inbox...");
        // Implementation to fetch and display inbox messages
    }

    function refreshChat() {
        console.log("Refreshing chat...");
        // Implementation to refresh chat interface
    }

    function refreshStorage() {
        console.log("Refreshing storage...");
        // Implementation to refresh storage interface
    }

    function refreshWallet() {
        console.log("Refreshing wallet...");
        // Implementation to refresh wallet interface
    }

    // Optional: Automatically open a default section on page load
    showSNS();
});
</script>
