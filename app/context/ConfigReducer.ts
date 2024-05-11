import {TConfigurationState,TConfigurationActions} from "./types"
export const initialConfiguration: TConfigurationState = {
  Configuration: {
    SelectedFrameSize: 'Select Width',
    SelectedVoltage: 'Select Voltage',
    SelectedKAICRating: 'Select KAIC Rating',
    SelectedBusRating: 'Select Bus Rating',
    SelectedPanelHeight: 'Select Height',
    SelectedServiceDistribution: 'Select Service or Distribution',
    FeedThruLugs: false,
    SelectedFeedType: "Select Feed Type",
    SelectedFeedPosition: "Select Feed Position",
    SelectedBreakers: [],
    CurrentBreakersSize: 0,
    // MaxBreakeSize is not Static, rather depending on FrameSize, BusRating and PanelHeight
    MaxBreakerSize: 45
  },
  Metadata: {
    Client: 'Enter Client Name',
    Project: 'Enter Project Address',
    DatabaseID: null,
    ResumeDraft: false
  },
  Pricing: {
    OrderConfirmed:false,
    // Price: ;
    // OrderNumber: ;
    // OrderDate: ;
  }
};
export type TConfigReducer = (
  state: TConfigurationState, 
  action: TConfigurationActions) => TConfigurationState 

export const reducer: TConfigReducer = (state, action) => {
  let newSize: number

  switch (action.type) {
    
    case 'TOTAL_RESET':
      return initialConfiguration;

    case 'RESET_CONFIGURATION':
      return {
        ...state,
        Configuration: initialConfiguration.Configuration
      };

    case 'LOAD_CONFIGURATION_FROM_DB':
      // Calculate current Breaker Size
      let sizeArray = []

      action.payload.selected_breakers && action.payload.selected_breakers.forEach(breaker => {
        sizeArray.push(breaker["Size"])
      });
      let newBreakersSize = sizeArray.reduce((total, num) => total + num, 0)

      return {
        Configuration: {
          SelectedFrameSize: action.payload.panel_width,
          SelectedVoltage: action.payload.panel_voltage,
          SelectedKAICRating: action.payload.panel_KAIC_rating,
          SelectedBusRating: action.payload.panel_bus_rating,
          SelectedPanelHeight: action.payload.panel_height,
          SelectedServiceDistribution: action.payload.panel_service_distribution,
          FeedThruLugs: action.payload.panel_feed_thru_lugs,
          SelectedFeedType: action.payload.panel_feed_type,
          SelectedFeedPosition: action.payload.panel_feed_position,
          SelectedBreakers: action.payload.selected_breakers,
          CurrentBreakersSize: newBreakersSize,
          MaxBreakerSize: 45
        },
        Metadata: {
          Client: action.payload.init_client,
          Project: action.payload.init_project,
          DatabaseID: action.payload.id,
          ResumeDraft: true
        },
        Pricing: {
          OrderConfirmed:action.payload.order_confirmed,
          // Price: action.payload.price;
          // OrderNumber: action.payload.price_order_number;
          // OrderDate: action.payload.price_order_date;
        }
      }


    case 'SET_FRAME_SIZE':
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedFrameSize: action.payload as TConfigurationState["Configuration"]["SelectedFrameSize"]
        }
      };

    case 'SET_VOLTAGE':
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedVoltage: action.payload as TConfigurationState["Configuration"]["SelectedVoltage"]
        }
      };

    case 'SET_KAIC_RATING':
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedKAICRating: action.payload as TConfigurationState["Configuration"]["SelectedKAICRating"]
        }
      };

    case 'SET_BUS_RATING':
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedBusRating: action.payload as TConfigurationState["Configuration"]["SelectedBusRating"]
        }
      };

    case 'SET_PANEL_HEIGHT':
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedPanelHeight: action.payload as TConfigurationState["Configuration"]["SelectedPanelHeight"]
        }
      };

    case 'SET_SERVICE_OR_DISTRIBUTION':
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedServiceDistribution: action.payload as TConfigurationState["Configuration"]["SelectedServiceDistribution"]
        }
      };

    case 'SET_FEED_THRU_LUGS':
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          FeedThruLugs: action.payload
        }
      }

    case 'SET_FEED_TYPE':
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedFeedType: action.payload as TConfigurationState["Configuration"]["SelectedFeedType"]
        }
      }

    case 'SET_FEED_POSITION':
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedFeedPosition: action.payload as TConfigurationState["Configuration"]["SelectedFeedPosition"]
        }
      }

    case 'ADD_BREAKER':
      // Size Checker
      newSize = state.Configuration.CurrentBreakersSize + action.payload['BreakerSize']
      // Breaker Description labeling
      let modifiedPayload = { ...action.payload }; // Creating a shallow copy of action.payload

      // Breaker Description labeling
      if (state.Configuration.SelectedVoltage === "208Y/120V") {
        if (state.Configuration.SelectedKAICRating === 65) {
          modifiedPayload.SelectedBreaker.Description += 'N';
        } else if (state.Configuration.SelectedKAICRating === 100) {
          modifiedPayload.SelectedBreaker.Description += 'H';
        } else if (state.Configuration.SelectedKAICRating === 150) {
          modifiedPayload.SelectedBreaker.Description += 'L';
        }
      } else if (state.Configuration.SelectedVoltage === "480Y/270V") {
        if (state.Configuration.SelectedKAICRating === 35) {
          modifiedPayload.SelectedBreaker.Description += 'N';
        } else if (state.Configuration.SelectedKAICRating === 65) {
          modifiedPayload.SelectedBreaker.Description += 'H';
        } else if (state.Configuration.SelectedKAICRating === 100) {
          modifiedPayload.SelectedBreaker.Description += 'L';
        }
      }
      
      if (newSize < state.Configuration.MaxBreakerSize) {
        return {
          ...state,
          Configuration: {
            ...state.Configuration,
            SelectedBreakers: [...state.Configuration.SelectedBreakers, modifiedPayload],
            CurrentBreakersSize: newSize
          }
        };
      } else {
        console.warn("couldnt add breaker")
        return { ...state }
      }

    case 'REMOVE_BREAKER':
      let newSelected_Breakers = state.Configuration.SelectedBreakers.filter(
        (_, index) => index !== action.payload
      );

      newSize = state.Configuration.CurrentBreakersSize - state.Configuration.SelectedBreakers[action.payload]['Size']
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedBreakers: newSelected_Breakers,
          CurrentBreakersSize: newSize
        }
      };

    case 'INIT_NEW_CONFIG':
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
          ResumeDraft: false
        }
      } 
  }
};