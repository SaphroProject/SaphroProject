// contracts.js
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        const web3 = new Web3(window.ethereum);

        ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                console.log('Connected', accounts[0]);
                initContracts(web3).then(contracts => {
                    window.contracts = contracts;
                    // Now you can call contract methods
                    setupEventListeners();
                });
            })
            .catch(error => {
                console.error('Error during MetaMask connection:', error);
            });
    } else {
        console.log('MetaMask is not installed!');
        alert('Please install MetaMask to interact with this feature!');
    }
});

async function initContracts(web3) {
    const snsContract = new web3.eth.Contract(contractABI, '0xec4db8097dce2cc05a43c9d62d8d0043e04b26d6');
    const SPHMailContract = new web3.eth.Contract(SPHMailABI, '0x9f04bb28bfd522f7ede22d18cae3929785906521');
    const SaphroInboxContract = new web3.eth.Contract(SaphroInboxABI, '0x90dd29fa814bc79ed84154a052eee1403bfe33d0');

    console.log('Contracts initialized');
    return { snsContract, SPHMailContract, SaphroInboxContract };
}

function setupEventListeners() {
    // Example: listen for an event
    window.contracts.snsContract.events.DomainRegistered({})
        .on('data', event => console.log('Domain Registered:', event))
        .on('error', console.error);
}
