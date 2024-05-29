// Initialize Web3 and connect to MetaMask
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        window.web3 = new Web3(window.ethereum);

        ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                console.log('Connected', accounts[0]);
                initializeContract();
            })
            .catch(error => {
                console.error('Error during MetaMask connection:', error);
            });
    } else {
        console.log('MetaMask is not installed!');
        alert('Please install MetaMask to interact with this feature!');
    }
});

function initializeContract() {
    // Assume contractABI and contractAddress are global variables declared in contracts.js
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    console.log('Contract initialized:', contract);

    // Setup contract interactions
    // E.g., Listening to an event
    contract.events.YourEvent({})
        .on('data', event => console.log('Event data:', event))
        .on('error', console.error);
}

// Function to call a contract read method
function getContractData() {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    contract.methods.yourContractMethod().call()
        .then(result => console.log('Data from contract:', result))
        .catch(error => console.error('Error calling contract method:', error));
}

// Function to send a transaction to the contract
function updateContractData(data) {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    contract.methods.yourSetterMethod(data).send({ from: ethereum.selectedAddress })
        .then(receipt => console.log('Transaction receipt:', receipt))
        .catch(error => console.error('Error sending transaction:', error));
}
