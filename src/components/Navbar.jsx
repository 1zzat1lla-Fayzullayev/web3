import React, { useState } from 'react'
import Web3 from 'web3'

function Navbar() {
	const [ethereum, setEthereum] = useState(false)
	const [address, setAddress] = useState('')
	const [balance, setBalance] = useState(null)

	const connectWallet = async () => {
		if (window.ethereum) {
			try {
				// Web3 instance yaratish
				const web3 = new Web3(window.ethereum)
				await window.ethereum.request({ method: 'eth_requestAccounts' })
				const accounts = await web3.eth.getAccounts()
				const balance = await web3.eth.getBalance(accounts[0])
				setAddress(accounts[0])
				setBalance(web3.utils.fromWei(balance, 'ether'))
				setEthereum(true)
				console.log(
					'Hisob balansi:',
					web3.utils.fromWei(balance, 'ether'),
					'ETH'
				)
				console.log('Ulangan hisoblar:', accounts)
			} catch (error) {
				console.error('Foydalanuvchi hisobga kirishni rad etdi', error)
			}
		} else {
			console.log(
				"MetaMask topilmadi. Iltimos, uni o'rnatganingizga ishonch hosil qiling."
			)
		}
	}

	return (
		<>
			<nav>
				<h2>Heading 2</h2>
				<button onClick={connectWallet}>Button</button>
			</nav>
			<h2 className='ethurmh2'>
				{ethereum ? 'Wallet bor' : "Wallet yo'q"}
				{ethereum && (
					<div>
						<p className='addres'>Manzil: {address}</p>
						<p className='balans'>Balans: {balance} ETH</p>
					</div>
				)}
			</h2>
		</>
	)
}

export default Navbar
