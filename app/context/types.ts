export type TConfigurationState = {
  Configuration: TConfiguration;
  Metadata: TMetadata;
  Pricing: TPricing;
};
export type TConfiguration = {
  SelectedFrameSize: number | null;
  SelectedVoltage: string | null;
  SelectedKAICRating: number | null;
  SelectedBusRating: number | null;
  SelectedPanelHeight: number | null;
  SelectedServiceDistribution: string | null;
  FeedThruLugs: boolean;
  SelectedFeedType: string | null;
  SelectedFeedPosition: string | null;
  SelectedBreakers: TInitialBreaker[];
  CurrentBreakersSize: number | null;
  MaxBreakerSize: number;
};
export type TMetadata = {
  Client: string | null;
  Project: string | null;
  DatabaseID: string | null;
  ResumeDraft: boolean;
};
export type TPricing = {
  Price?: number;
  OrderNumber?: string;
  OrderDate?: string;
  OrderConfirmed: boolean;
};
export type TConfigurationActions =
  | { type: "TOTAL_RESET" }
  | { type: "RESET_CONFIGURATION" }
  | { type: "LOAD_CONFIGURATION_FROM_DB"; payload: TConfigDB }
  | { type: "SET_FRAME_SIZE"; payload: number }
  | { type: "SET_VOLTAGE"; payload: string }
  | { type: "SET_KAIC_RATING"; payload: number }
  | { type: "SET_BUS_RATING"; payload: number }
  | { type: "SET_PANEL_HEIGHT"; payload: number }
  | { type: "SET_SERVICE_OR_DISTRIBUTION"; payload: string }
  | { type: "SET_FEED_THRU_LUGS"; payload: boolean }
  | { type: "SET_FEED_TYPE"; payload: string }
  | { type: "SET_FEED_POSITION"; payload: string }
  | { type: "ADD_BREAKER"; payload: TInitialBreaker }
  | { type: "REMOVE_BREAKER"; payload: number }
  | { type: "INIT_NEW_CONFIG"; payload: TMetadata };

export type TConfigDB = {
  id: string;
  init_created_at: string;
  user_id: string;
  panel_width: number | null;
  panel_height: number | null;
  panel_voltage: string | null;
  panel_KAIC_rating: number | null;
  panel_bus_rating: number | null;
  panel_service_distribution: string | null;
  panel_feed_thru_lugs: boolean | null;
  panel_feed_type: string | null;
  panel_feed_position: string | null;
  selected_breakers: TInitialBreaker[] | null;
  order_confirmed: boolean;
  init_client: string;
  init_project: string;
  init_drawn_by: string;
  last_updated_at: null;
};

export type TSelectedBreaker = {
  Name?: string;
  MaxAmp?: number;
  Description: string;
  Max_Amperage?: number;
  BreakerWidth: number;
  BreakerHeight: string;
  PolesOptions?: string[];
  AmperageOptions?: number[];
  Size: number;
  SVG_str?: string;
};

export type TInitialBreaker = {
  SelectedHeight: string | null;
  SelectedTrip: any;
  SelectedFeature: any;
  SelectedBreaker: TSelectedBreaker | null;
  SelectedBreakerAmp: number | null;
  SelectedBreakerPoles: string | null;
  BreakerDisplayName: null | string;
  BreakerSize: number | null;
  MaxAmp: number | null;
  Name: string | null;
};

export type TBreakerActions =
  | { type: "RESET_BREAKER_STATE" }
  | { type: "SET_SELECTED_SIZE"; payload: string }
  | { type: "SET_SELECTED_TRIP"; payload: any }
  | { type: "SET_SELECTED_FEATURE"; payload: any }
  | { type: "SET_SELECTED_BREAKER"; payload: TSelectedBreaker }
  | { type: "SET_SELECTED_BREAKER_AMP"; payload: number }
  | { type: "SET_SELECTED_BREAKER_POLES"; payload: string };
