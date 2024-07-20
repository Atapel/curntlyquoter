import React, { useEffect, useState } from "react";
import { Dropdown, Button } from "react-bootstrap";
import {
  UseConfigurationReducerContext,
  UseBreakerReducerContext,
} from "@context/globalContext";
import { Breakers } from "../../assets/BreakerSelectionOptions";
import { TSelectedBreaker } from "@/app/context/types";
export default function BreakerMappings({ addButtonState }) {
  const { state, dispatch } = UseConfigurationReducerContext();
  const { breakerState, breakerDispatch } = UseBreakerReducerContext();
  const [availableBreakers, setAvailableBreakers] = useState<
    TSelectedBreaker[]
  >(Breakers());
  const [showAddButton, setShowAddButton] = addButtonState;
  const filterByWidth = (breaker: TSelectedBreaker) => {
    return breaker.BreakerWidth === state.Configuration.SelectedFrameSize;
  };
  const filterByHeight = (breaker: TSelectedBreaker) => {
    return breaker.BreakerHeight === breakerState.SelectedHeight;
  };
  const filterByBreakerSize = (breaker: TSelectedBreaker) => {
    // Making sure that all breakers that can be selected are bellow the Max breaker size
    if (
      breaker.Size + state.Configuration.CurrentBreakersSize <=
      state.Configuration.MaxBreakerSize
    ) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (state.Configuration.SelectedFrameSize !== null) {
      // Filter based on Frame width and Breaker Height
      let filtered = Breakers().filter((breaker) => filterByWidth(breaker));
      if (breakerState.SelectedHeight !== null) {
        filtered = filtered.filter((breaker) => filterByHeight(breaker));
      }
      // Filter based on X size
      let filtered2 = filtered.filter((breaker) =>
        filterByBreakerSize(breaker)
      );
      setAvailableBreakers(filtered2);
      if (filtered2.length === 0) {
        setShowAddButton(false);
      } else {
        setShowAddButton(true);
      }
    }
  }, [
    breakerState.SelectedHeight,
    state.Configuration.SelectedFrameSize,
    state.Configuration.SelectedBreakers,
  ]);
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
          >
            {product.Description}
          </Button>
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  );
}
