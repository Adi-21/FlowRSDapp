import * as fcl from '@onflow/fcl';

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
                fcl.arg(location, fcl.String),
                fcl.arg(area, fcl.Int),
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
