let web3;
let snsContract;

const snsAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_sphMailAddress",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "string",
                "name": "domain",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "expiration",
                "type": "uint64"
            }
        ],
        "name": "DomainRegistered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "string",
                "name": "domain",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "DomainTransferred",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_domain",
                "type": "string"
            }
        ],
        "name": "getDomainExpiration",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "",
                "type": "uint64"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_domain",
                "type": "string"
            }
        ],
        "name": "getDomainMailAddress",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_domain",
                "type": "string"
            }
        ],
        "name": "getDomainOwner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "getUsername",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_domain",
                "type": "string"
            }
        ],
        "name": "isDomainAvailable",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_domain",
                "type": "string"
            },
            {
                "internalType": "uint64",
                "name": "_expiration",
                "type": "uint64"
            },
            {
                "internalType": "string",
                "name": "_mailAddress",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_username",
                "type": "string"
            }
        ],
        "name": "registerDomain",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_domain",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_newOwner",
                "type": "address"
            }
        ],
        "name": "transferDomain",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const snsAddress = '0xc1f771b2e3c31f689f774e96afcc020a318f5084c68b0ed6f5f928be2c702975';

async function init() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            web3.eth.defaultAccount = accounts[0];
            snsContract = new web3.eth.Contract(snsAbi, snsAddress);
        } catch (error) {
            console.error("User denied account access...");
        }
    } else if (window.web3) {
        web3 = new Web3(web3.currentProvider);
        const accounts = await web3.eth.getAccounts();
        web3.eth.defaultAccount = accounts[0];
        snsContract = new web3.eth.Contract(snsAbi, snsAddress);
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
}

window.addEventListener('load', init);

// Function to show the SNS section specifically
function showSNS() {
    hideAllSections();
    const section = document.getElementById('sns-section');
    if (section) {
        section.style.display = 'block';
    }
}

// Function to register a domain from form input
async function registerDomainFromForm(event) {
    event.preventDefault(); // Prevent the form from submitting the default way
    const domain = document.getElementById('domain-register').value;
    const mailAddress = document.getElementById('mail-address').value + "@saphro";
    const username = document.getElementById('username').value;
    const expiration = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60; // One year from now

    if (!validateDomain(domain)) {
        alert('Invalid domain name.');
        return;
    }

    try {
        const result = await snsContract.methods.registerDomain(domain, expiration, mailAddress, username)
            .send({ from: web3.eth.defaultAccount });
        console.log('Domain registered:', result);
        alert('Domain registered successfully!');
    } catch (error) {
        console.error('Error registering domain:', error);
        alert('Failed to register domain. See console for details.');
    }
}

// Validate domain format
function validateDomain(domain) {
    const domainRegex = /^[a-zA-Z0-9-]{1,63}\.[a-zA-Z]{2,6}$/;
    return domainRegex.test(domain);
}

// Function to check if a domain is available
async function checkDomainAvailability() {
    const domain = document.getElementById('domain-search').value;
    if (!validateDomain(domain)) {
        alert('Invalid domain format.');
        return;
    }

    try {
        const isAvailable = await snsContract.methods.isDomainAvailable(domain).call();
        const domainOutput = document.getElementById('domain-output');
        const domainCheckmark = document.getElementById('domain-checkmark');
        if (isAvailable) {
            domainOutput.value = 'Domain is available!';
            domainCheckmark.style.color = 'green';
            domainCheckmark.innerHTML = '&#10003;'; // Checkmark
        } else {
            domainOutput.value = 'Domain is not available!';
            domainCheckmark.style.color = 'red';
            domainCheckmark.innerHTML = '&#10060;'; // Cross mark
        }
    } catch (error) {
        console.error('Error checking domain availability:', error);
        alert('Failed to check domain availability. See console for details.');
    }
}

// Function to transfer a domain
async function transferDomainFromForm() {
    const domain = document.getElementById('domain-transfer').value;
    const newOwner = document.getElementById('new-owner').value;

    if (!validateDomain(domain) || !web3.utils.isAddress(newOwner)) {
        alert('Invalid input.');
        return;
    }

    try {
        const result = await snsContract.methods.transferDomain(domain, newOwner)
            .send({ from: web3.eth.defaultAccount });
        console.log('Domain transferred:', result);
        alert('Domain transferred successfully!');
    } catch (error) {
        console.error('Error transferring domain:', error);
        alert('Failed to transfer domain. See console for details.');
    }
}

// Function to manage a domain
function manageDomain(domainName) {
    alert(`Managing domain: ${domainName}`);
}

// Function to hide all sections (utility function, might be used elsewhere too)
function hideAllSections() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');
}

