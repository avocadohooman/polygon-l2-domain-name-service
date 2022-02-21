const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners();
	const domainContractFactory = await hre.ethers.getContractFactory('Domains');
	const domainContract = await domainContractFactory.deploy("avocado");
	await domainContract.deployed();
	console.log('Deployed contract to:', domainContract.address);
	console.log('Deployed by:', owner.address);

	let txn = await domainContract.register("mortal",  {value: hre.ethers.utils.parseEther('0.1')});
	await txn.wait();

	const domainOwner = await domainContract.getDomainOwnerAddress("mortal");
	console.log("Owner of domain:", domainOwner);

	const balance = await hre.ethers.provider.getBalance(domainContract.address);
	console.log("Contract balance:", hre.ethers.utils.formatEther(balance));  
}

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

runMain();