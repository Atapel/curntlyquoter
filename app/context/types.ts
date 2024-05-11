export type TConfigurationState = {
  Configuration: TConfiguration
  Metadata: TMetadata
  Pricing: TPricing
};
export type TConfiguration = {
  SelectedFrameSize: 'Select Width' | number;
  SelectedVoltage: string; 
  SelectedKAICRating: 'Select KAIC Rating' | number;
  SelectedBusRating: 'Select Bus Rating' | number;
  SelectedPanelHeight: "Select Height" | number;
  SelectedServiceDistribution: string;
  FeedThruLugs: boolean;
  SelectedFeedType: string;
  SelectedFeedPosition: string;
  SelectedBreakers: TInitialBreaker[];
  CurrentBreakersSize: number;
  MaxBreakerSize: number;
}
export type TMetadata = {
  Client: string;
  Project: string; 
  DatabaseID: string | null;
  ResumeDraft: boolean
};
export type TPricing = {
  Price?: number;
  OrderNumber?: string;
  OrderDate?: string;
  OrderConfirmed: boolean;
}
export type TConfigurationActions = 
  | { type: 'TOTAL_RESET' }
  | { type: 'RESET_CONFIGURATION' }
  | { type: 'LOAD_CONFIGURATION_FROM_DB'; payload: TConfigDB}
  | { type: 'SET_FRAME_SIZE'; payload: string }
  | { type: 'SET_VOLTAGE'; payload: string }
  | { type: 'SET_KAIC_RATING'; payload: string }
  | { type: 'SET_BUS_RATING'; payload: number }
  | { type: 'SET_PANEL_HEIGHT'; payload: string }
  | { type: 'SET_SERVICE_OR_DISTRIBUTION'; payload: string }
  | { type: 'SET_FEED_THRU_LUGS'; payload: boolean }
  | { type: 'SET_FEED_TYPE'; payload: string }
  | { type: 'SET_FEED_POSITION'; payload: string }
  | { type: 'ADD_BREAKER'; payload:  TInitialBreaker}
  | { type: 'REMOVE_BREAKER'; payload: number }
  | { type: 'INIT_NEW_CONFIG'; payload: TMetadata }

export type TConfigDB =  {
    id: string,
    created_at: string,
    user_id: string,
    panel_width: number | null,
    panel_height: number | null,
    panel_voltage: string | null,
    panel_KAIC_rating: number | null,
    panel_bus_rating: number | null,
    panel_service_distribution: string | null,
    panel_feed_thru_lugs: boolean | null,
    panel_feed_type: string | null,
    panel_feed_position: string | null,
    selected_breakers: TInitialBreaker[] | null,
    order_confirmed: boolean,
    init_client: string,
    init_project: string,
    init_drawn_by: string,
    last_updated_at: null
}

export type TSelectedBreaker = {
    Description: string;
    Name?: string,
    MaxAmp?: number,
    BreakerSize?: string
};
  
export type TInitialBreaker = {
    SelectedSize: string;
    SelectedTrip: any;
    SelectedFeature: any;
    SelectedBreaker: TSelectedBreaker;
    SelectedBreakerAmp: "Select Amperage" | number; 
    SelectedBreakerPoles: string;
    BreakerSize: number,
    MaxAmp: number
};

export type TBreakerActions = 
  | { type: 'RESET_BREAKER_STATE' }
  | { type: 'SET_SELECTED_SIZE', payload:  string}
  | { type: 'SET_SELECTED_TRIP', payload:  any}
  | { type: 'SET_SELECTED_FEATURE', payload:  any}
  | { type: 'SET_SELECTED_BREAKER', payload: TSelectedBreaker }
  | { type: 'SET_SELECTED_BREAKER_AMP', payload:  string}
  | { type: 'SET_SELECTED_BREAKER_POLES', payload:  string}