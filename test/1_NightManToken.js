const NightManToken = artifacts.require('./contracts/NightManToken.sol');
const DayManToken = artifacts.require('./contracts/NightManToken.sol');

contract('NightManToken', function(accounts) {
    it('Should deploy linked', async () => {
        const token = await NightManToken.deployed();
        assert(true);
    });

    it('Should mint with an ititial rate of 1 ETH to 1000 NMTX', async () => {
        const token = await NightManToken.deployed();
        await token.purchaseTokens({from: accounts[0], value: 1000});
        const balance = await token.balanceOf(accounts[0]);
        assert(balance.toNumber() == 1000000);
    });

    it('Should take the troll toll when transfering', async () => {
        const token = await NightManToken.deployed();
        await token.transfer(accounts[1],1000000);
        const balance = await token.balanceOf(accounts[1]);
        assert(balance.toNumber() == 990000);
    });

    it('Should mint with a lower rate after a burn', async () => {
        const token = await NightManToken.deployed();
        await token.purchaseTokens({from: accounts[0], value: 1000});
        const balance = await token.balanceOf(accounts[0]);
        assert(balance.toNumber() < 1000000);
    });

    it('Should refund the same amount of ETH put in', async () => {
        const token = await NightManToken.deployed();
        const preBalance = web3.eth.getBalance(accounts[0]);
        await token.purchaseTokens({from: accounts[0], value: 1000});
        await token.exchangeTokens(accounts[0],1000000);
        assert(web3.eth.getBalance(accounts[0] == preBalance));
    });

});

