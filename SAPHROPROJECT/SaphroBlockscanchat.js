document.addEventListener('DOMContentLoaded', function () {
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    let chatContract, snsContract, storageContract;

    async function init() {
        const networkId = await web3.eth.net.getId();

        // Assuming you have the network configurations for the contracts
        const chatDeployedNetwork = chatContractNetworks[networkId];
        const snsDeployedNetwork = snsContractNetworks[networkId];
        const storageDeployedNetwork = storageContractNetworks[networkId];

        chatContract = new web3.eth.Contract(
            chatABI,
            chatDeployedNetwork && chatDeployedNetwork.address,
        );

        snsContract = new web3.eth.Contract(
            snsABI,
            snsDeployedNetwork && snsDeployedNetwork.address,
        );

        storageContract = new web3.eth.Contract(
            storageABI,
            storageDeployedNetwork && storageDeployedNetwork.address,
        );

        // Additional functionalities such as event listeners for messages
    }

    window.sendMessage = async function(recipient, messageContent) {
        const accounts = await web3.eth.getAccounts();
        chatContract.methods.sendMessage(recipient, messageContent).send({from: accounts[0]})
            .then(result => console.log('Message sent: ', result))
            .catch(error => console.error('Error sending message: ', error));
    };

    window.registerDomainAndStartChat = async function(domain, expiration, mailAddress, username) {
        const accounts = await web3.eth.getAccounts();
        snsContract.methods.registerDomainAndStartChat(domain, expiration, mailAddress, username)
            .send({ from: accounts[0] })
            .then(result => console.log('Domain registered and chat started: ', result))
            .catch(error => console.error('Error registering domain and starting chat: ', error));
    };

    window.uploadFile = async function(fileName, fileData) {
        const accounts = await web3.eth.getAccounts();
        storageContract.methods.uploadFile(fileName, fileData)
            .send({ from: accounts[0] })
            .then(result => console.log('File uploaded: ', result))
            .catch(error => console.error('Error uploading file: ', error));
    };

    window.joinGroupChat = async function(groupChatAddress) {
        const accounts = await web3.eth.getAccounts();
        chatContract.methods.joinGroupChat(groupChatAddress)
            .send({ from: accounts[0] })
            .then(result => console.log('Joined group chat: ', result))
            .catch(error => console.error('Error joining group chat: ', error));
    };

    window.leaveGroupChat = async function(groupChatAddress) {
        const accounts = await web3.eth.getAccounts();
        chatContract.methods.leaveGroupChat(groupChatAddress)
            .send({ from: accounts[0] })
            .then(result => console.log('Left group chat: ', result))
            .catch(error => console.error('Error leaving group chat: ', error));
    };

    window.fetchGroupMessages = async function(groupChatAddress) {
        const accounts = await web3.eth.getAccounts();
        return chatContract.methods.getGroupChatMessages(groupChatAddress)
            .call({ from: accounts[0] })
            .then(messages => {
                console.log('Fetched group chat messages: ', messages);
                return messages;
            })
            .catch(error => {
                console.error('Error fetching messages: ', error);
                return [];
            });
    };

    window.markMessageAsRead = async function(groupChatAddress, messageIndex) {
        const accounts = await web3.eth.getAccounts();
        chatContract.methods.markMessageAsRead(groupChatAddress, messageIndex)
            .send({ from: accounts[0] })
            .then(() => console.log('Message marked as read'))
            .catch(error => console.error('Error marking message as read: ', error));
    };

    window.deleteMessage = async function(groupChatAddress, messageIndex) {
        const accounts = await web3.eth.getAccounts();
        chatContract.methods.deleteMessage(groupChatAddress, messageIndex)
            .send({ from: accounts[0] })
            .then(() => console.log('Message deleted'))
            .catch(error => console.error('Error deleting message: ', error));
    };

    init();
});
