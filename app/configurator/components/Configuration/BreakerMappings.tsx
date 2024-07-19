import React, { useEffect, useState } from "react";
import { Dropdown, Button } from "react-bootstrap";
import {
  UseConfigurationReducerContext,
  UseBreakerReducerContext,
} from "@context/globalContext";
import { Breakers } from "../../assets/BreakerSelectionOptions";
import { TSelectedBreaker } from "@/app/context/types";
import {
  filterByWidthandHeight,
  filterByBreakerSize,
} from "./BreakerMappingFilters";
export default function BreakerMappings({ addButtonState }) {
  const { state, dispatch } = UseConfigurationReducerContext();
  const { breakerState, breakerDispatch } = UseBreakerReducerContext();
  const [availableBreakers, setAvailableBreakers] = useState<
    TSelectedBreaker[]
  >(Breakers());
  const [showAddButton, setShowAddButton] = addButtonState;

  useEffect(() => {
    if (
      state.Configuration.SelectedFrameSize !== null &&
      breakerState.SelectedHeight !== null
    ) {
      // Filter based on Frame width and Breaker Height
      let filtered = Breakers().filter((breaker) =>
        filterByWidthandHeight(breaker)
      );
      // Filter based on X size
      let filtered2 = filtered.filter((breaker) =>
        filterByBreakerSize(breaker)
      );
      if (filtered2.length === 0) {
        setShowAddButton(false);
      } else {
        setAvailableBreakers(filtered2);
      }
    }
  }, [breakerState.SelectedHeight, state.Configuration.SelectedFrameSize]);

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
