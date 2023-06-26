import { useEffect, useCallback, useState, useMemo } from 'react';
import type { City } from 'api/getCities';
import SortableHeader from './SortableHeader';
import styled from "styled-components";
import { navugateTableWithKeyboard } from "../utils/navigableTable";
const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
   td,
  th {
    padding: ${({ theme }) => theme.spacing.xxs} ${({ theme }) => theme.spacing.xs};
    text-align: left;
    width: 150px;
  } 

  th {
    span{
        display:flex;
        gap: ${({ theme }) => theme.spacing.xs};
    }
  } 

  td.active{
    background-color: ${({ theme }) => theme.colors.background}; 
    color:${({ theme }) => theme.colors.image}; 
    font-weight:${({ theme }) => theme.fontWeights.bold};
  }

  tbody tr {
    border-bottom: ${({ theme }) => theme.borderSize.xs} solid ${({ theme }) => theme.colors.border};
    height: 50px;
    color: ${({ theme }) => theme.colors.text}; 
    :hover {
      background-color: ${({ theme }) => theme.colors.background}; 
    }
  }
  thead > tr {
    color: ${({ theme }) => theme.colors.image}; 
    border-top: ${({ theme }) => theme.borderSize.xs} solid ${({ theme }) => theme.colors.border}; 
    border-bottom: ${({ theme }) => theme.borderSize.xs} solid ${({ theme }) => theme.colors.border};
    height: 40px;
    background-color: ${({ theme }) => theme.colors.background}; 
  }
  caption {
    font-size: ${({ theme }) => theme.fontSizes[1]};
    padding: ${({ theme }) => theme.spacing.xxs};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

`;

const StyledDiv = styled.div`
  ${({ theme }) => theme.mediaQueries.tablet}{
  overflow: scroll;
  }
`;

type SortableTableProps = {
  cities: City[]
}

enum SortingType {
  Ascending,
  Descending,
}

interface SortingConfiguration {
  propertyName: keyof City,
  sortType: SortingType,
  compareFunction: TableDataComparable

}
export type TableDataComparable = ((a: City, b: City) => number);

const SortableTable: React.FC<SortableTableProps> = ({ cities }) => {
  const [sortConfig, updateSortConfig] = useState<SortingConfiguration[]>([]);
  const sortBy = useCallback(
    (propertyName: keyof City, compareFunction: TableDataComparable) => {
      let pendingChange = [...sortConfig];
      const index = pendingChange.findIndex((config) => config.propertyName === propertyName)
      if (index > -1) {
        var currentSortType = pendingChange[index].sortType;
        pendingChange.splice(index, 1);
        //check if the sort type we saved is descending
        if (currentSortType === SortingType.Descending) {
          pendingChange = [
            ...pendingChange,
            { propertyName: propertyName, sortType: SortingType.Ascending, compareFunction: compareFunction },
          ];
        }
      } else {
        pendingChange = [
          ...pendingChange,
          { propertyName: propertyName, sortType: SortingType.Descending, compareFunction: compareFunction },
        ];
      }
      updateSortConfig([...pendingChange]);
    },
    [sortConfig]
  )

  const sortedRows = useMemo(() => {
    if (sortConfig.length === 0) {
      return [...cities];
    }
    let sorted = [...cities].sort(
      (a: City, b: City) => {
        for (const config of sortConfig) {
          const result = (config.compareFunction(a, b))
          if (result !== 0) {
            if (config.sortType === SortingType.Ascending) {
              return result;
            }
            else {
              return -result;
            }
          }
        }
        return 0;
      }
    )
    return (sorted)
  }, [sortConfig, cities]);

  useEffect(() => {
    navugateTableWithKeyboard();
  })

  return (
    <StyledDiv>
      <StyledTable id="navigableTable">
        <SortableHeader sortBy={sortBy} sortConfig={sortConfig} />
        <tbody>
          {sortedRows
            .map((city, e) => (
              <tr key={city.id}>
                <td tabIndex={0}>{city.id}</td>
                <td tabIndex={0}>{city.name}</td>
                <td tabIndex={0}>{city.nameAscii}</td>
                <td tabIndex={0}>{city.country}</td>
                <td tabIndex={0}>{city.countryIso3}</td>
                <td tabIndex={0}>{city.capital}</td>
                <td tabIndex={0}>{city.population}</td>
              </tr>
            ))}
        </tbody>
      </StyledTable>
    </StyledDiv>
  );
};

export default SortableTable;
