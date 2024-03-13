import {insertConfigurationInit}  from '../api_requests/supabase/actions'
export const initialConfiguration = {
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
    DatabaseID: null
  },
  Pricing: {}
};

export const reducer = (state, action) => {
  let newSize

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
      action.payload.selected_breakers.forEach(breaker => {
        sizeArray.push(breaker["Size"])
      });
      let newBreakersSize = sizeArray.reduce((total, num) => total + num, 0)

      return {
        Configuration: {
          SelectedFrameSize: action.payload.panel_width,
          SelectedVoltage: action.payload.panel_voltage,
          SelectedKAICRating: action.payload.panel_KAIC_rating,
          SelectedBusRating: action.payload.panel_bus_rating,
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
        Pricing: {}
      }


    case 'SET_FRAME_SIZE':
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedFrameSize: action.payload
        }
      };

    case 'SET_VOLTAGE':
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedVoltage: action.payload
        }
      };

    case 'SET_KAIC_RATING':
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedKAICRating: action.payload
        }
      };

    case 'SET_BUS_RATING':
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedBusRating: action.payload
        }
      };

    case 'SET_PANEL_HEIGHT':
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedPanelHeight: action.payload
        }
      };

    case 'SET_SERVICE_OR_DISTRIBUTION':
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedServiceDistribution: action.payload
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
          SelectedFeedType: action.payload
        }
      }

    case 'SET_FEED_POSITION':
      return {
        ...state,
        Configuration: {
          ...state.Configuration,
          SelectedFeedPosition: action.payload
        }
      }

    case 'ADD_BREAKER':
      newSize = state.Configuration.CurrentBreakersSize + action.payload['Size']

      if (newSize < state.Configuration.MaxBreakerSize) {
        return {
          ...state,
          Configuration: {
            ...state.Configuration,
            SelectedBreakers: [...state.Configuration.SelectedBreakers, action.payload],
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
      // TODO: Get User first and last name, then pass them 
      // into insertConfigurationInit
      const databaseId = insertConfigurationInit({
        Client: action.payload.client,
        Project: action.payload.project,
        // DrawnByName: 0
      })

      return {
        // initialConfiguration,
        ...state,
        Metadata: {
          Client: action.payload.client,
          Project: action.payload.project,
          DatabaseID: databaseId
        }
      } 
  }
};