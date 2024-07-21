import { useState, useEffect } from "react";
interface SelectionItemDropdownProps {
  ItemName: string;
  SelectableItemsArray: string[] | number[];
  dispatchFunc: React.Dispatch<any>; // Replace with the appropriate action type
  dispatchAction: string; // Replace with the appropriate action type
  disabledBool: boolean;
  resetSignal?: any;
}
function SelectionItemDropdown({
  ItemName,
  SelectableItemsArray,
  dispatchFunc,
  dispatchAction,
  disabledBool,
  resetSignal,
}: SelectionItemDropdownProps) {
  const [selectedItem, setSelectedItem] = useState(`Select ${ItemName}`);

  useEffect(() => {
    if (resetSignal) {
      setSelectedItem(`Select ${ItemName}`);
    }
  }, [resetSignal])
  function setValue(Item) {
    setSelectedItem(Item);
    dispatchFunc({ type: dispatchAction, payload: Item });
  }
  return (
    <div className="dropdown d-flex col justify-content-around align-items-baseline p-2 border">
      <h5>Selected {ItemName}:</h5>
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-testid={`Dropdown-${ItemName}`}
        disabled={disabledBool}
      >
        {selectedItem}
      </button>
      <ul className="dropdown-menu">
        {SelectableItemsArray.map((Item) => (
          <li key={Item} className="m-2">
            <button
              data-testid={`selection-${Item}`}
              className="btn btn-outline-info w-100"
              onClick={() => setValue(Item)}
            >
              {Item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default SelectionItemDropdown;
