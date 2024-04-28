import {selectableFrameOptions} from "../../app/configurator/assets/FrameSelectionOptions"
import {Breakers} from "../../app/configurator/assets/BreakerSelectionOptions"

describe('Graphics Render Test', () => {

    beforeEach(() => {
        const email = Cypress.env("testUserEmail")
        const password = Cypress.env("testUserPassword")
        cy.login(email, password)
      })

        // // Rendering all posible frame graphics
    // enum ConfigurationOptions {
    //   Width36DistributionMainBreaker = 0,
    //   Width36DistributionMainLugTop = 1,
    //   Width36DistributionMainLugBottom = 2,
    //   Width36DistributionMainLugFeedThru = 3,
    //   Width36ServiceMainBreaker = 4,
    //   Width36ServiceMainLugTop = 5,
    //   Width36ServiceMainLugBottom = 6,
    //   Width36ServiceMainLugFeedThru = 7,
    //   Width46DistributionMainBreaker = 8,
    //   Width46DistributionMainLugTop = 9,
    //   Width46DistributionMainLugBottom = 10,
    //   Width46DistributionMainLugFeedThru = 11,
    //   Width46ServiceMainBreaker = 12,
    //   Width46ServiceMainLugTop = 13,
    //   Width46ServiceMainLugBottom = 14,
    //   Width46ServiceMainLugFeedThru = 15
    // }
    
    // selectableFrameOptions.frameSize.forEach((size, index) => {
    //   selectableFrameOptions.serviceDistribution.forEach((option, index) => {
    //     selectableFrameOptions.feedType.forEach((type, index) => {
    //       if (type === "Main Lug") {
    //         selectableFrameOptions.feedPosition.forEach((position, index) => {
    //           cy.addFrame(
    //             size,
    //             90,
    //             "208Y/120V",
    //             "100",
    //             "1500",
    //             option,
    //             type,
    //             position
    //           )
    //         })
    //       }
    //       // selectableFrameOptions.serviceDistribution.forEach((option, index) => {
    
    //       // })
    //     })
    //   })
      
    // })
})