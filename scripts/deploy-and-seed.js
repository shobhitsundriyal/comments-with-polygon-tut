// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat')

async function main() {
	// Hardhat always runs the compile task when running scripts with its command
	// line interface.
	//
	// If this script is run directly using `node` you may want to call compile
	// manually to make sure everything is compiled
	// await hre.run('compile');

	// We get the contract to deploy
	const CommentsContract = await hre.ethers.getContractFactory('Comments')
	const contract = await CommentsContract.deploy()

	await contract.deployed()
	console.log('Contract deployed to:', contract.address)

	const tx1 = await contract.addComment('my-blog-post1', 'My first comment')
	await tx1.wait()

	const tx2 = await contract.addComment('my-blog-post1', 'My second comment')
	await tx2.wait()

	await contract.getComments('my-blog-pos1').then((resp) => console.log(resp))

	console.log('-----------------------------------')

	const tx3 = await contract.addComment(
		'my-blog-post2',
		'My first comment on second'
	)
	await tx3.wait()

	const tx4 = await contract.addComment(
		'my-blog-post2',
		'My second comment on second log'
	)
	await tx4.wait()

	await contract
		.getComments('my-blog-post2')
		.then((resp) => console.log(resp))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
