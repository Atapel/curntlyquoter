import { describe, test, expect, it } from "vitest";
import { POST } from "./route";

describe("Pricing", () => {
  it("generates a quote", async () => {
    
    let configObjectPass = {
      Configuration: {
        SelectedFrameSize: 36,
        SelectedVoltage: "208Y/120V",
        SelectedKAICRating: 65,
        SelectedBusRating: 800,
        SelectedPanelHeight: 90,
        SelectedServiceDistribution: "Distribution",
        FeedThruLugs: false,
        SelectedFeedType: "Main Breaker",
        SelectedFeedPosition: "Select Feed Position",
        SelectedBreakers: [],
        CurrentBreakersSize: 6,
        MaxBreakerSize: 45,
      },
      Metadata: {
        Client: "loc",
        Project: "oo",
        DatabaseID: "854c5366-7641-4cb3-b76a-139cd135361b",
        ResumeDraft: false,
      },
      Pricing: { OrderConfirmed: false },
    };

    let quote = await POST(configObjectPass)

    expect(quote).toBe({
      pannel: 0,
      breakers: 0,
      total: 0
    })

  });
});


let configObjectFail = {
  Configuration: {
    SelectedFrameSize: 36,
    SelectedVoltage: "208Y/120V",
    SelectedKAICRating: 100,
    SelectedBusRating: 1500,
    SelectedPanelHeight: 90,
    SelectedServiceDistribution: "Distribution",
    FeedThruLugs: false,
    SelectedFeedType: "Main Breaker",
    SelectedFeedPosition: "Select Feed Position",
    SelectedBreakers: [],
    CurrentBreakersSize: 6,
    MaxBreakerSize: 45,
  },
  Metadata: {
    Client: "Enter Client Name",
    Project: "Enter Project Address",
    DatabaseID: null,
    ResumeDraft: false,
  },
  Pricing: { OrderConfirmed: false },
};


