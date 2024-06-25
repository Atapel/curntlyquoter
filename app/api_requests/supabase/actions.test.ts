import { describe, expect, it } from "vitest";
import {
  insertConfigurationInit,
  updateConfiguration,
  confirmOrder,
} from "./actions";

describe("Updating a configuration", () => {
  it("to update", async () => {
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

    let updateConfig = await updateConfiguration(configObjectPass);
    expect(updateConfig).toBe("Record updated successfully!");
  });
});
