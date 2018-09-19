import fetch from 'node-fetch';

// TODO: use selfkey domain here
const CONFIG_URL =
	'https://us-central1-kycchain-master.cloudfunctions.net/airtable?tableName=Contracts';

export class StakingService {
	constructor({ web3Service }) {
		this.activeContract = null;
		this.deprecatedContracts = [];
		this.web3 = web3Service;
	}
	parseRemoteConfig(entities) {
		return entities
			.map(entity => entity.data)
			.sort((d1, d2) => {
				d1 = d1.createdAt ? new Date(d1.createdAt).getTime() : 0;
				d2 = d2.createdAt ? new Date(d2.createdAt).getTime() : 0;
				return d1 - d2;
			})
			.reduce(
				(acc, curr) => {
					curr = { ...curr, abi: JSON.parse(curr.abi || '{}') };
					if (curr.deprecated) {
						acc.deprecatedContracts.push(curr);
						return acc;
					}
					acc.activeContract = curr;
					return acc;
				},
				{ activeContract: null, deprecatedContracts: [] }
			);
	}
	async fetchConfig() {
		try {
			let res = await fetch(CONFIG_URL);
			let data = await res.json();
			if (!data.entities) {
				throw new Error('Invalid responce');
			}
			return this.parseRemoteConfig(data.entities);
		} catch (error) {
			console.error(error);
			throw new Error('Could not fetch from airtable');
		}
	}
	async acquireContract() {
		let config = await this.fetchConfig();
		this.activeContract = config.activeContract;
		this.deprecatedContracts = config.deprecatedContracts;
	}
}

export class EtheriumContract {
	constructor(web3, address, abi) {
		this.web3 = web3;
		this.address = address;
		this.abi = abi;
	}

	send(options) {
		return this.web3.waitForTicket({
			method: 'send',
			contractMethodArgs: options.args || [],
			contractAddress: this.address,
			contractMethod: options.method,
			customAbi: this.abi,
			args: [{ from: options.from }]
		});
	}

	call(options) {
		return this.web3.waitForTicket({
			method: 'call',
			contractMethodArgs: options.args || [],
			contractAddress: this.address,
			contractMethod: options.method,
			customAbi: this.abi,
			args: [{ from: options.from }]
		});
	}
}

export class StakingContract extends EtheriumContract {
	constructor(web3, address, abi, isDeprecated) {
		super(web3, address, abi);
		this.isDeprecated = isDeprecated;
	}

	getBalance(sourceAddress, serviceAddress, serviceId) {
		return this.call({
			from: sourceAddress,
			args: [sourceAddress, serviceAddress, serviceId],
			method: 'balances'
		});
	}

	deposit(sourceAddress, ammount, serviceAddress, serviceId) {
		return this.send({
			from: sourceAddress,
			args: [ammount, serviceAddress, serviceId],
			method: 'deposit'
		});
	}

	withdraw(sourceAddress, serviceAddress, serviceId) {
		return this.send({
			from: sourceAddress,
			args: [serviceAddress, serviceId],
			method: 'withdraw'
		});
	}

	getReleaseDate(sourceAddress, serviceAddress, serviceId) {
		return this.call({
			from: sourceAddress,
			args: [sourceAddress, serviceAddress, serviceId],
			method: 'releaseDates'
		});
	}

	getLockPeriod(sourceAddress, serviceAddress, serviceId) {
		return this.call({
			from: sourceAddress,
			args: [sourceAddress, serviceAddress, serviceId],
			method: 'lockPeriods'
		});
	}
}

export class SelfKeyTokenContract extends EtheriumContract {
	approve(sourceAddress, depositVaultAddress, maxAmmount) {
		return this.send({
			from: sourceAddress,
			args: [depositVaultAddress, maxAmmount],
			method: 'approve'
		});
	}
}

export default StakingService;
