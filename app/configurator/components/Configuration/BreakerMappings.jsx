import React, { useEffect, useState } from "react";

export default function BreakerMappings(props) {
    const { state, dispatch } = UseConfigurationReducerContext();
    const { breakerState, breakerDispatch } = UseBreakerReducerContext()

    let products = [];

    let {
      Single_breakers_46,
      Double_breakers_46,
      Single_breakers_36,
      Double_breakers_36,
    } = getBreakerDetails(state.Configuration);
    if (breakerState.SelectedSize == "Single" && state.Configuration.SelectedFrameSize === 46) {
      products = Single_breakers_46;
    } else if (
      breakerState.SelectedSize == "Single" &&
      state.Configuration.SelectedFrameSize === 36
    ) {
      products = Single_breakers_36;
    } else if (
      breakerState.SelectedSize == "Double" &&
      state.Configuration.SelectedFrameSize === 46
    ) {
      products = Double_breakers_46;
    } else if (
      breakerState.SelectedSize == "Double" &&
      state.Configuration.SelectedFrameSize === 36
    ) {
      products = Double_breakers_36;
    }
    
    
    
    // Checking on when to display the max breaker message
    // useEffect(() => {

    // ############
    // #1: After adding each breaker, take the lenght X of each product and add them on top of state.Configuration.CurrentBreakersSize
    // if bellow Max Breaker Size then map onto SET_SELECTED_BREAKER, but if above then dont map them
    // #2: if all are greyed out then setShowAddButton = false


    // console.log(maxBreakerMsg, state.Configuration.CurrentBreakersSize);
        
        // if (product["size"] + state.Configuration.CurrentBreakersSize > state.Configuration.MaxBreakerSize) {
        //   console.log(maxBreakerMsg);
        //   setMaxBreakerMsg(true)
        // }
    //   state.Configuration.CurrentBreakersSize + breakerState.SelectedSize >
    //   state.Configuration.MaxBreakerSize
    // },[])


    return (
        <Dropdown.Menu>
            {products.map((product, index) => (
                <Dropdown.Item key={index}>
                    <Button
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




