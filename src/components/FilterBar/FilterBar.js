import { useState } from "react";
import Button from "../Button/Button";
import { FilterBarContainer, FilterBarTitle } from "./FilterBarStyles";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";

//Instructions for use (See AdminPersonnelPage for example)
{
  /* <FilterBar
  filters={filters}
  handleFilterBarData={handleFilterBarData}
  buttonFilledColor={theme.primary}
/>; */
}
//Inputs required:
// 1. filters = {your array of filters}, requires an array of strings
// 2. A function in the parent element to handle the data from the child as this component will return an array of strings of the filters which are selected. (See AdminPersonnelPage for ref)
// 3. (Optional) Color of the button when the filter is selected

//Usage: 'All' will be there by default, if clicked, it will clear all filters. Clicking on another filter will remove All and apply that filter, clicking it again will remove the filter clicked, if there are no other filters, All will be default. Multiple filters may be selected.

const FilterBar = (props) => {
  const filters = props.filters;
  const [filtersSelected, setFiltersSelected] = useState(["All"]);
  const handleFilterClick = (newFilter) => {
    //checking if its in the array
    const indexOfFilter = filtersSelected.indexOf(newFilter);

    if (newFilter === "All") {
      //if click on all, then remove all filters and show all
      setFiltersSelected(["All"]);
    } else {
      if (indexOfFilter !== -1) {
        //filter is there, remove it
        setFiltersSelected(
          filtersSelected.filter((filter) => filter !== newFilter)
        );
      } else {
        //add new filter and remove all
        setFiltersSelected(
          [newFilter, ...filtersSelected].filter((filter) => filter !== "All")
        );
      }
    }
  };
  useEffect(() => {
    if (filtersSelected.length < 1) {
      setFiltersSelected(["All"]);
    }
    props.handleFilterBarData(filtersSelected);
  }, [filtersSelected]);
  return (
    <ThemeProvider theme={theme}>
      <FilterBarContainer>
        <FilterBarTitle>Filter By:</FilterBarTitle>
        <Button
          filled={filtersSelected.includes("All")}
          filledColor={props.buttonFilledColor}
          onClick={() => {
            handleFilterClick("All");
          }}
        >
          All
        </Button>
        {filters.map((filter, index) => {
          return (
            <Button
              key={index}
              filled={filtersSelected.includes(filter)}
              filledColor={props.buttonFilledColor}
              onClick={() => {
                handleFilterClick(filter);
              }}
            >
              {filter}
            </Button>
          );
        })}
      </FilterBarContainer>
    </ThemeProvider>
  );
};

export default FilterBar;
