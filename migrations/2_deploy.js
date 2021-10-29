const NightManToken = artifacts.require("NightManToken.sol");
const DayManToken = artifacts.require("DayManToken.sol");

module.exports = async function (deployer, network, accounts){
    await deployer.deploy(NightManToken);
}