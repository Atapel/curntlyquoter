export const initialConfiguration = {
    Configuration: {
      SelectedFrameSize: 'Select Width',
      SelectedVoltage: 'Select Voltage',
      SelectedKAICRating: 'Select KAIC Rating',
      SelectedBusRating: 'Select Bus Rating',
      SelectedBreakers: []
    },
    Metadata: {
      Client: 'Enter Client Name',
      Project: 'Enter Project Address'
    },
    Pricing: {}
  };

export const reducer = (state, action) => {
    switch (action.type) {
      case 'RESET_CONFIGURATION':
        return {
          ...state,
          Configuration: initialConfiguration.Configuration
        };

      case 'LOAD_CONFIGURATION_FROM_DB':
        return {
          Configuration: {
            SelectedFrameSize: action.payload.panel_width,
            SelectedVoltage: action.payload.panel_voltage,
            SelectedKAICRating: action.panel_KAIC_rating,
            SelectedBusRating: action.payload.panel_bus_rating,
            SelectedBreakers: action.payload.selected_breakers
          },
          Metadata: {
            Client: action.payload.init_client,
            Project: action.payload.init_project  
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

      case 'ADD_BREAKER':
        let newItemSize = action.payload.Size;

        // Calculate the total size of existing breakers in the array
        let currentSize = state.Configuration.SelectedBreakers.reduce((totalSize, breaker) => {
          return totalSize + breaker.Size;
        }, 0);

        // Check if adding the new breaker would exceed the maximum size
        if (currentSize + newItemSize <= 45) {
          // If validation passes, update the state
          return {
            ...state,
            Configuration: {
              ...state.Configuration,
              SelectedBreakers: [...state.Configuration.SelectedBreakers, action.payload]
            }
          };
        } else {
          // If validation fails, return the current state
          console.warn('Cannot add breaker. Exceeds maximum size.');
          return state;
        }

      case 'REMOVE_BREAKER':
        // IMPLEMENT LOGIC TO SUBSTRACT FROM ITEMSIZE 
        const delItemSize = action.payload.Size;

        // Calculate the total size of existing breakers in the array
        currentSize = state.Configuration.SelectedBreakers.reduce((totalSize, breaker) => {
          return totalSize - breaker.Size;
        }, 0);
        // Ensure to use slice to create a new array instead of modifying the existing one
        const updatedBreakers = state.Configuration.SelectedBreakers.slice();
        updatedBreakers.splice(action.payload, 1);
        return {
          ...state,
          Configuration: {
            ...state.Configuration,
            SelectedBreakers: updatedBreakers
          }
        };

      case 'SET_CLIENT':
        return {
          ...state,
          Metadata: {
            ...state.Metadata,
            Client: action.payload
          }
        };

      case 'SET_PROJECT':
        return {
          ...state,
          Metadata: {
            ...state.Metadata,
            Project: action.payload
          }
        };

      default:
        return state;
    }
};