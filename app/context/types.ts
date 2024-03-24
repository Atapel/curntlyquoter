interface Configuration {
    SelectedFrameSize: string;
    SelectedVoltage: string; 
    SelectedKAICRating: string;
    SelectedBusRating: string;
    SelectedPanelHeight: string;
    SelectedServiceDistribution: string;
    FeedThruLugs: boolean;
    SelectedFeedType: string;
    SelectedFeedPosition: string;
    SelectedBreakers: string[];
    CurrentBreakersSize: number;
    MaxBreakerSize: number;
  }
  
  interface Metadata {
    Client: string;
    Project: string; 
    DatabaseID: string | null;
  }
  
  interface Pricing {}
  
  interface InitialConfiguration {
    Configuration: Configuration;
    Metadata: Metadata;
    Pricing: Pricing;
  }

  
  interface SelectedBreaker {
    Description: string;
  }
  
  interface InitialBreaker {
    SelectedSize: string;
    SelectedTrip: string;
    SelectedFeature: string;
    SelectedBreaker: SelectedBreaker;
    SelectedBreakerAmp: string; 
    SelectedBreakerPoles: string;
  }
  

