import React, { useEffect, useState } from "react";
import { Dropdown, Button } from "react-bootstrap";
import { UseConfigurationReducerContext, UseBreakerReducerContext } from "@/context/globalContext";
import { getBreakerDetails } from "@api_requests/fetch_products"; 
export default function BreakerMappings(props) {
    const { state, dispatch } = UseConfigurationReducerContext();
    const { breakerState, breakerDispatch } = UseBreakerReducerContext()
    const [availableBreakers, setAvailableBreakers] = useState([]);
    const [showAddButton, setShowAddButton] = props.addButtonState
  
    useEffect(() => {
      console.log(availableBreakers);
    // Making sure that breaker.size < state.Configuration.MaxBreakerSize
    const filterByBreakerSize = (breaker) => {
      if (breaker.Size + state.Configuration.CurrentBreakersSize < state.Configuration.MaxBreakerSize) {
        // console.log('filter condition: ',
        // // breaker,
        // breaker.Size + state.Configuration.CurrentBreakersSize < state.Configuration.MaxBreakerSize,
        // breaker.Size,
        // state.Configuration.CurrentBreakersSize,
        // state.Configuration.MaxBreakerSize
        // );
        return true;
      }
      return false
    }
    
    let {
      Single_breakers_46,
      Double_breakers_46,
      Single_breakers_36,
      Double_breakers_36,
    } = getBreakerDetails(state.Configuration);
    if (breakerState.SelectedSize == "Single" && state.Configuration.SelectedFrameSize === 46) {
      
      let filtered = Single_breakers_46.filter(breaker => filterByBreakerSize(breaker));
      // console.log('Filtered Breakers', filtered, Single_breakers_46, state.Configuration.CurrentBreakersSize);
      setAvailableBreakers(filtered)
    } else if (
      breakerState.SelectedSize == "Single" &&
      state.Configuration.SelectedFrameSize === 36
    ) {
      
      let filtered = Single_breakers_36.filter(breaker => filterByBreakerSize(breaker));
      // console.log('Filtered Breakers', Single_breakers_36, state.Configuration.CurrentBreakersSize);
      setAvailableBreakers(filtered)
    } else if (
      breakerState.SelectedSize == "Double" &&
      state.Configuration.SelectedFrameSize === 46
    ) {
      
      let filtered = Double_breakers_46.filter(breaker => filterByBreakerSize(breaker));
      // console.log('Filtered Breakers', filtered,Double_breakers_46, state.Configuration.CurrentBreakersSize);
      setAvailableBreakers(filtered)
    } else if (
      breakerState.SelectedSize == "Double" &&
      state.Configuration.SelectedFrameSize === 36
    ) {
      
      let filtered = Double_breakers_36.filter(breaker => filterByBreakerSize(breaker));
      setAvailableBreakers(filtered)
    }
    
  },[state.Configuration.SelectedBreakers, breakerState.SelectedSize])

  // Check if the smallest breaker + the current breakerSize/X is bigger than the max breaker size
  useEffect(() => {
    if (availableBreakers.length !== 0) {
      // Find smallest breaker in available breakers
      const smallestX = availableBreakers.reduce((smallest, current) => (
        current.Size < (smallest || Infinity) ? current.Size : smallest
      ), Infinity);
      // For smallest breaker filter
      // console.log('smallestX',smallestX,"smallestX + state.Configuration.CurrentBreakersSize",smallestX + state.Configuration.CurrentBreakersSize, 'MaxBrekrSize',state.Configuration.MaxBreakerSize);
      if(Number.isFinite(smallestX) && smallestX + state.Configuration.CurrentBreakersSize >= state.Configuration.MaxBreakerSize) {
        // console.log('Smallest breaker is bigger than max breaker size, hide add button and display max breaker message');
        setShowAddButton(false)
      } else {
        setShowAddButton(true)
      }
    }
    
  },[state.Configuration.SelectedBreakers, availableBreakers])

    return (
      <Dropdown.Menu>
        {availableBreakers.map((product, index) => (
            <Dropdown.Item key={index}>
                <Button
                data-testid={`selection-${product.Description}`}
                onClick={() => breakerDispatch({ type: 'SET_SELECTED_BREAKER', payload: product })}
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
    )
}