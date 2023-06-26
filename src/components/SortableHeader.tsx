import { useEffect, useCallback, useState, useMemo } from 'react';
import type { City } from 'api/getCities';
import styled from 'styled-components'
import { ReactComponent as Sort } from '../assets/Sort.svg';
import { ReactComponent as ArrowUp } from '../assets/ArrowUp.svg';
import { ReactComponent as ArrowDown } from '../assets/ArrowDown.svg';

interface SortingConfiguration {
  propertyName: keyof City,
  sortType: SortingType,
  compareFunction: TableDataComparable

}
export type TableDataComparable = ((a: City, b: City) => number);
enum SortingType {
  Ascending,
  Descending,
}

type SortableHeaderProps = {
  sortBy: (string: keyof City, compareFunction: TableDataComparable) => void;
  sortConfig: SortingConfiguration[];
}
const SortableHeader: React.FC<SortableHeaderProps> = ({ sortBy, sortConfig }) => {
  const CompareByEquality = (column: keyof City) => (a: City, b: City) => {
    if (a[column] === b[column]) {
      return 0
    } else {
      if (a[column] > b[column]) {
        return 1;
      }
      return -1;
    }
  }

  const tableColumn = [
    {
      label: 'ID',
      property: 'id',
      compareFunction: CompareByEquality('id')
    },
    {
      label: 'Name',
      property: 'name',
      compareFunction:
        (a: City, b: City) => {
          return a['name'].localeCompare(b['name'] as string)
        }
    },
    {
      label: 'NameAscii',
      property: 'nameAscii',
      compareFunction:
        (a: City, b: City) => {
          return a['nameAscii'].localeCompare(b['nameAscii'] as string)
        }
    },
    {
      label: 'Country',
      property: 'country',
      compareFunction:
        (a: City, b: City) => {
          return a['country'].localeCompare(b['country'] as string)
        }
    },
    {
      label: 'CountryIso3',
      property: 'countryIso3',
      compareFunction:
        (a: City, b: City) => {
          return a['countryIso3'].localeCompare(b['countryIso3'] as string)
        }
    },
    {
      label: 'Capital',
      property: 'capital',
      compareFunction:
        (a: City, b: City) => {
          return a['capital'].localeCompare(b['capital'] as string)
        }
    },
    {
      label: 'Population',
      property: 'population',
      compareFunction: CompareByEquality('population')
    }

  ] as any;


  const getSortDirection = (property: keyof City) => {
    var config = sortConfig.find((sortConfig) => sortConfig.propertyName === property)
    return config ?
      config.sortType === SortingType.Descending ?
        <ArrowDown fill="#4C4E52" />
        : <ArrowUp fill="#4C4E52" />
      : <Sort fill="#4C4E52" />
  }
  return (
    <thead>
      <tr>
        {tableColumn.map((column: any, index: number) => {
          return (
            <th key={index}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  sortBy(column.property, column.compareFunction)
                }
              }}
              onClick={() => sortBy(column.property, column.compareFunction)}
            >
              <span>
                {column.label}
                {getSortDirection(column.property)}
              </span>
            </th>
          )
        })}

      </tr>
    </thead>
  );
};


export default SortableHeader;
