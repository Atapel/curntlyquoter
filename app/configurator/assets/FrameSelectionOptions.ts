export const selectableFrameOptions = {
    frameSize: [36, 46],
    panelHeight: [90, 77.5, 65],
    voltage: [`208Y/120V`, `480Y/270V`],
    kaicRating: {
      "208Y/120V": [65, 100, 150],
      "480Y/270V": [35, 65, 100]
    },
    busRating: [800, 1500, 2250],
    serviceDistribution: ["Distribution", "Service"],
    feedType: ["Main Breaker", "Main Lug"],
    feedPosition: ["Top", "Bottom", "FeedThru (Top/Bottom)"]
  };
  