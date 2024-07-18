import React, { useEffect, useState } from "react";
import { Dropdown, Button } from "react-bootstrap";
import {
  UseConfigurationReducerContext,
  UseBreakerReducerContext,
} from "@context/globalContext";
import { Breakers } from "../../assets/BreakerSelectionOptions";
import { getBreakerDetails } from "@api_requests/fetch_products";
import { TInitialBreaker, TSelectedBreaker } from "@/app/context/types";
export default function BreakerMappings(props) {
  const { state, dispatch } = UseConfigurationReducerContext();
  const { breakerState, breakerDispatch } = UseBreakerReducerContext();
  // const [availableBreakers, setAvailableBreakers] = useState<TSelectedBreaker[] | []>([]);
  const [availableBreakers, setAvailableBreakers] =
    useState<TSelectedBreaker[]>(Breakers);
  const [showAddButton, setShowAddButton] = props.addButtonState;
  const filterByWidthandHeight = (breaker: TSelectedBreaker) => {
    return (
      breaker.BreakerWidth === state.Configuration.SelectedFrameSize &&
      breaker.BreakerHeight === breakerState.SelectedHeight
    );
  };
  const filterByBreakerSize = (breaker: TSelectedBreaker) => {
    // Making sure that breaker.size < state.Configuration.MaxBreakerSize
    if (
      breaker.Size + state.Configuration.CurrentBreakersSize <
      state.Configuration.MaxBreakerSize
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    // Get all Breakers
    // Parameter to generate description name
    let Breakers = getBreakerDetails(
      state.Configuration.SelectedVoltage,
      state.Configuration.SelectedKAICRating
    );

    // Filter based on Frame width and Breaker Height
    let filtered = Breakers.filter((breaker) =>
      filterByWidthandHeight(breaker)
    );
    // Filter based on X size
    // let filtered2 = filtered.filter((breaker) => filterByBreakerSize(breaker));

    setAvailableBreakers(filtered);
  }, [state.Configuration.SelectedBreakers, breakerState.SelectedHeight]);

  useEffect(() => {
    // Check if the smallest breaker + the current breakerSize/X is bigger than the max breaker sizeyy
    if (availableBreakers.length !== 0) {
      // Find smallest breaker in available breakers
      const smallestX = availableBreakers.reduce(
        (smallest, current) =>
          current.Size < (smallest || Infinity) ? current.Size : smallest,
        Infinity
      );
      // For smallest breaker filter
      // console.log('smallestX',smallestX,"smallestX + state.Configuration.CurrentBreakersSize",smallestX + state.Configuration.CurrentBreakersSize, 'MaxBrekrSize',state.Configuration.MaxBreakerSize);
      if (
        Number.isFinite(smallestX) &&
        smallestX + state.Configuration.CurrentBreakersSize >=
          state.Configuration.MaxBreakerSize
      ) {
        // console.log('Smallest breaker is bigger than max breaker size, hide add button and display max breaker message');
        setShowAddButton(false);
      } else {
        setShowAddButton(true);
      }
    }
  }, [state.Configuration.SelectedBreakers, availableBreakers]);

  return (
    <Dropdown.Menu>
      {availableBreakers.map((product: TSelectedBreaker, index: number) => (
        <Dropdown.Item key={index}>
          <Button
            data-testid={`selection-${product.Description}`}
            onClick={() =>
              breakerDispatch({
                type: "SET_SELECTED_BREAKER",
                payload: product,
              })
            }
            variant="outline-info"
            size="sm"
            className="w-100"
            // onClick={() => setSelected_Breaker(product)}
            // disabled={state.Configuration.CurrentBreakersSize > state.Configuration.MaxBreakerSize}
          >
            {product.Description}
          </Button>
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  );
}
