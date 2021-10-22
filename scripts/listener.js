  // We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers, network } = require("hardhat");
const hre = require("hardhat");



async function main() {
  // 0. chains are up and running
  const [deployer] = await hre.ethers.getSigners();

//const provider = new ethers.providers.Web3Provider(network.provider)
//console.log(network.provider);
const provider = ethers.getDefaultProvider("ropsten", {
 alchemy : "5IpbXcoSPVdyaeaeTqoQnMcgNUiduR70", 
}
);

  const Testy = await hre.ethers.getContractFactory("MyTestContract");
  const Fee = await hre.ethers.getContractFactory("FeeCollector");

  const amountToTransfer = 100;
  const testchain_addr = "0x4fE2fEde247aF939805a281974CFA4475dDfb6C4";
  const feecollector_addr = "0x090b168bc94926C7b869B1c34328C94058F12F95";

  const depl = "0x6e5D8bc50dFFe230c0057c100d57b8509B8Ba898";
  const dep = await Fee.attach(depl);
  const fee = await Fee.attach(feecollector_addr);

  const _test = await Testy.attach(testchain_addr);
  //const val = await fee.balanceOf(feecollector_addr); 
  //const _val = ethers.utils.formatUnits(val, 18);
  //console.log(_val.toString());
  const prat = "0x6b510DD0454CA949eF8c7F31fE538aD56ca7848e";
  const amount = "100000000000000000000";
  await fee.transfer(feecollector_addr, amount);
  //await fee.transfer(prat, amount);

  abi = [
   "event Transfer(address indexed src, address indexed dst, uint val)",
   "function balanceOf(address account) public view virtual override returns (uint256)"
  ];
  // listen for TTY transfer for my feecollector addr
  const tty = new ethers.Contract(
    testchain_addr, abi, provider
  )
  filterTo = tty.filters.Transfer(null, feecollector_addr);
  tty.on(filterTo, async (from, to, value)  =>  {
    const _valueFormatted = ethers.utils.formatUnits(value, 18);
    console.log(`Addr From : ${from}, Addr To:${to} , Amt:${_valueFormatted.toString()}`);

    console.log(`To FEE addr: ${to} Val: ${await fee.balanceOf(to)}`);
    console.log(`FROM FEE addr: ${from} Val: ${await fee.balanceOf(from)}`);
    //await fee.transfer(from, "10000000000000000000");
    await _test.transfer(from, 100);
    }
  );
}


main();
 /* .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });*/
