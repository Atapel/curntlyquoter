import { TConfigurationState, TConfigurationActions } from "./types";
export const initialConfiguration: TConfigurationState = {
  Configuration: {
    SelectedFrameSize: null,
    SelectedVoltage: null,
    SelectedKAICRating: null,
    SelectedBusRating: null,
    SelectedPanelHeight: null,
    SelectedServiceDistribution: null,
    FeedThruLugs: false,
    SelectedFeedType: null,
    SelectedFeedPosition: null,
    SelectedBreakers: [],
    CurrentBreakersSize: 0,
    // MaxBreakeSize is not Static, rather depending on FrameSize, BusRating and PanelHeight
    MaxBreakerSize: 45,
  },
  Metadata: {
    Client: null,
    Project: null,
    DatabaseID: null,
    ResumeDraft: false,
  },
  Pricing: {
    OrderConfirmed: false,
    // Price: ;
    // OrderNumber: ;
    // OrderDate: ;
  },
};
export type TConfigReducer = (
  state: TConfigurationState,
  action: TConfigurationActions
) => TConfigurationState;

export const reducer: TConfigReducer = (state, action) => {
  let newSize: number;

  switch (action.type) {
    case "TOTAL_RESET":
      return initialConfiguration;

    case "RESET_CONFIGURATION":
      return {
        ...state,
        Configuration: initialConfiguration.Configuration,
      };

    case "LOAD_CONFIGURATION_FROM_DB":
      const {
        payload: {
          panel_width,
          panel_voltage,
          panel_KAIC_rating,
          panel_bus_rating,
          panel_height,
          panel_service_distribution,
          panel_feed_thru_lugs,
          panel_feed_type,
          panel_feed_position,
          selected_breakers,
          init_client,
          init_project,
          id,
          order_confirmed,
        },
      } = action;

      // Calculate current Breaker Size
      let sizeArray: number[] = [];

      selected_breakers &&
        selected_breakers.forEach((breaker) => {
          sizeArray.push(breaker["BreakerSize"]);
        });
      let newBreakersSize = sizeArray.reduce((total, num) => total + num, 0);

      return {
        Configuration: {
          SelectedFrameSize: panel_width,
          SelectedVoltage: panel_voltage,
          SelectedKAICRating: panel_KAIC_rating,
          SelectedBusRating: panel_bus_rating,
          SelectedPanelHeight: panel_height,
          SelectedServiceDistribution: panel_service_distribution,
          FeedThruLugs: panel_feed_thru_lugs,
          SelectedFeedType: panel_feed_type,
          SelectedFeedPosition: panel_feed_position,
          SelectedBreakers: selected_breakers,
          CurrentBreakersSize: newBreakersSize,
          MaxBreakerSize: 45,
        },
        Metadata: {
          Client: init_client,
          Project: init_project,
          DatabaseID: id,
          ResumeDraft: true,
        },
        Pricing: {
          OrderConfirmed: order_confirmed,
          // Price: action.payload.price;
          // OrderNumber: action.payload.price_order_number;
          // OrderDate: action.payload.price_order_date;
        },
      };

    case "SET_FRAME_SIZE":
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedFrameSize: action.payload,
        },
      };

    case "SET_VOLTAGE":
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedVoltage: action.payload,
        },
      };

    case "SET_KAIC_RATING":
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedKAICRating: action.payload,
        },
      };

    case "SET_BUS_RATING":
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedBusRating: action.payload,
        },
      };

    case "SET_PANEL_HEIGHT":
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedPanelHeight: action.payload,
        },
      };

    case "SET_SERVICE_OR_DISTRIBUTION":
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedServiceDistribution: action.payload,
        },
      };

    case "SET_FEED_THRU_LUGS":
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          FeedThruLugs: action.payload,
        },
      };

    case "SET_FEED_TYPE":
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedFeedType: action.payload,
        },
      };

    case "SET_FEED_POSITION":
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedFeedPosition: action.payload,
        },
      };

    case "ADD_BREAKER":
      // Size Checker
      newSize =
        state.Configuration.CurrentBreakersSize + action.payload["BreakerSize"];
      // Breaker Description labeling
      let modifiedPayload = { ...action.payload }; // Creating a shallow copy of action.payload

      modifiedPayload.BreakerDisplayName =
        action.payload.SelectedBreaker.Description;

      // Breaker Description labeling
      if (state.Configuration.SelectedVoltage === "208Y/120V") {
        if (state.Configuration.SelectedKAICRating === 65) {
          modifiedPayload.BreakerDisplayName += "N";
        } else if (state.Configuration.SelectedKAICRating === 100) {
          modifiedPayload.BreakerDisplayName += "H";
        } else if (state.Configuration.SelectedKAICRating === 150) {
          modifiedPayload.BreakerDisplayName += "L";
        }
      } else if (state.Configuration.SelectedVoltage === "480Y/270V") {
        if (state.Configuration.SelectedKAICRating === 35) {
          modifiedPayload.BreakerDisplayName += "N";
        } else if (state.Configuration.SelectedKAICRating === 65) {
          modifiedPayload.BreakerDisplayName += "H";
        } else if (state.Configuration.SelectedKAICRating === 100) {
          modifiedPayload.BreakerDisplayName += "L";
        }
      }

      if (newSize <= state.Configuration.MaxBreakerSize) {
        return {
          ...state,
          Configuration: {
            ...state.Configuration,
            SelectedBreakers: [
              ...state.Configuration.SelectedBreakers,
              modifiedPayload,
            ],
            CurrentBreakersSize: newSize,
          },
        };
      } else {
        console.warn("couldnt add breaker");
        return { ...state };
      }

    case "REMOVE_BREAKER":
      let newSelected_Breakers = state.Configuration.SelectedBreakers.filter(
        (_, index) => index !== action.payload
      );

      newSize =
        state.Configuration.CurrentBreakersSize -
        state.Configuration.SelectedBreakers[action.payload]["BreakerSize"];
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedBreakers: newSelected_Breakers,
          CurrentBreakersSize: newSize,
        },
      };

    case "INIT_NEW_CONFIG":
      console.log(action);
      return {
        // initialConfiguration,
        ...state,
        Metadata: {
          // Client: action.payload.Client as TConfigurationState["Metadata"]["Client"],
          // Project: action.payload.Project as TConfigurationState["Metadata"]["Project"],
          // DatabaseID: action.payload.DatabaseID as TConfigurationState["Metadata"]["DatabaseID"]
          Client: action.payload.Client,
          Project: action.payload.Project,
          DatabaseID: action.payload.DatabaseID,
          ResumeDraft: false,
        },
      };
  }
};
