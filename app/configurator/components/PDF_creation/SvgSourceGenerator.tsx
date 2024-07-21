import {TConfiguration} from "@context/types"
import {
  container_46_w_dimensions_SVG,
  container_36_w_dimensions_SVG,
} from "../../assets/switch_board.jsx";
import {
  sideViewBreaker, 
  sideViewFrame, 
  sideViewServiceDimensions, 
  sideViewMainLugTop, 
  sideViewMainLugBottom} from "../../assets/SideViewBoard.js"
// import {technicalViewBreaker, technicalViewFrame} from "../../assets/TechnicalView"
export function frontViewSvgSource(configStateObject) {
  // Set front view src
  if (configStateObject.SelectedFrameSize === 36) {
    return ("data:image/svg+xml," + encodeURIComponent(container_36_w_dimensions_SVG))
  } else if (configStateObject.SelectedFrameSize === 46) {
    return ("data:image/svg+xml," + encodeURIComponent(container_46_w_dimensions_SVG))
  }   
}
export function sideViewSvgSource(configStateObject: TConfiguration) {
  let sideViewSource = sideViewFrame

  if (configStateObject.SelectedFeedType === "Main Lug") {
    console.log('Main Lug');
    if(configStateObject.SelectedFeedPosition === "Top"){
      console.log('Top');
      sideViewSource = sideViewSource + encodeURIComponent(sideViewMainLugTop)
    }
    else if(configStateObject.SelectedFeedPosition === "Bottom"){
      console.log('Bottom');
      sideViewSource = sideViewSource + encodeURIComponent(sideViewMainLugBottom);
    }
    else if(configStateObject.SelectedFeedPosition === "FeedThru (Top/Bottom)"){
      console.log('FeedThru');
      sideViewSource = sideViewSource + encodeURIComponent(sideViewMainLugTop + sideViewMainLugBottom);
    }
  }
  else if (configStateObject.SelectedServiceDistribution === "Service"){
    console.log('Service'); 
     sideViewSource = sideViewSource + encodeURIComponent(sideViewServiceDimensions);
  }
  return ("data:image/svg+xml," + sideViewSource + '</svg>')
}
// export function techViewSvgSource(configStateObject) {
//   let techViewSource = technicalViewFrame
//   techViewSource = techViewSource + encodeURIComponent(technicalViewBreaker);
//   return ("data:image/svg+xml, " + techViewSource + '</svg>')
// }
