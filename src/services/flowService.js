import * as fcl from "@onflow/fcl";

// Import the flow.json file
import flowJSON from '../flow.json';

// Configure FCL settings and load data from flow.json
fcl.config({
    'flow.network': 'testnet',
    'accessNode.api': 'https://rest-testnet.onflow.org',
    'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn'
}).load({ flowJSON });

// Get account from latest block height
const account = await fcl.account("0x7684334a1e575ca0");

// Function to register land
export const registerLand = async (location, area) => {
    try {
        const transactionId = await fcl.send([
            // Define transaction to register land
            fcl.transaction`
                import LandRegistry from ${fcl.script`
                    import LandRegistry from 0xContractAddress

                    pub fun main(location: String, area: Int): @LandRegistry.Land {
                        return LandRegistry.registerLand(location: location, area: area)
                    }
                `}
                transaction {
                    prepare(acct: AuthAccount) {
                        let land <- LandRegistry.main(location: location, area: area)
                        acct.save(<-land, to: /storage/LandRegistry/Land)
                    }
                }
            `,
            fcl.args([
                fcl.arg(location, "String"),
                fcl.arg(area, "Int"),
            ]),
            fcl.proposer(fcl.authz),
            fcl.payer(fcl.authz),
            fcl.authorizations([fcl.authz]),
            fcl.limit(100),
        ]).then(fcl.decode);

        console.log('Land registered successfully. Transaction ID:', transactionId);
        return transactionId;
    } catch (error) {
        console.error('Error registering land:', error);
        throw error;
    }
};

// Function to transfer ownership of land
export const transferOwnership = async (location, newOwner) => {
    try {
        const transactionId = await fcl.send([
            // Define transaction to transfer ownership
            fcl.transaction`
                import LandRegistry from ${fcl.script`
                    import LandRegistry from 0xContractAddress

                    pub fun main(location: String, newOwner: Address): @LandRegistry.Land? {
                        return LandRegistry.transferOwnership(location: location, newOwner: newOwner)
                    }
                `}
                transaction {
                    prepare(acct: AuthAccount) {
                        let land = LandRegistry.transferOwnership(location: location, newOwner: newOwner)
                        acct.save(land, to: /storage/LandRegistry/Land)
                    }
                }
            `,
            fcl.args([
                fcl.arg(location, "String"),
                fcl.arg(newOwner, "Address"),
            ]),
            fcl.proposer(fcl.authz),
            fcl.payer(fcl.authz),
            fcl.authorizations([fcl.authz]),
            fcl.limit(100),
        ]).then(fcl.decode);

        console.log('Ownership transferred successfully. Transaction ID:', transactionId);
        return transactionId;
    } catch (error) {
        console.error('Error transferring ownership:', error);
        throw error;
    }
};

// Access the current user
const currentUser = await fcl.currentUser.snapshot();
console.log("The Current User", currentUser);
