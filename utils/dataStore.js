import React from "react";
import crossfilter from "crossfilter2";

// export interface DataStoreConfiguration {
//   dimensions: {
//     name: string;
//     function?: (row: any) => any;
//     filterByFunction?: (value: any) => (d: any) => boolean;
//   }[];,
//   filters: {
//     name: string;
//     value: any;
//   }
// }

// export interface GetDataConfig<T> {
//   group?: boolean;
//   reduceAdd: (p: unknown, v: unknown, nf: boolean) => T;
//   reduceRemove: (p: unknown, v: unknown, nf: boolean) => T;
//   reduceInitial: () => T;
//   [name: string]: any;
// }

// export function useDataStore(data: any[], config: DataStoreConfiguration) {
export function useDataStore(data, config) {
  const cf = React.useRef(crossfilter(data));

  const customDimentions2 = config.dimensions.reduce((acc, dim) => {
    const func = dim.function ? dim.function : (row) => row[dim.name];
    return { ...acc, [dim.name]: cf.current.dimension(func) };
  }, {});

  const [dimensions] = React.useState(customDimentions2);
  const [filters, setFilters] = React.useState({});

  const filterBy = React.useCallback(
    (dimension, value) => {
      if (dimensions[dimension]) {
        if (value === null) {
          dimensions[dimension].filterAll();
        } else {
          let filterByFunction = config.dimensions.find(
            (dim) => dim.name === dimension
          )?.filterByFunction;
          if (!filterByFunction) {
            filterByFunction = (value) => (d) => d === value;
          }
          dimensions[dimension].filterFunction(filterByFunction(value));
        }
        setFilters({
          ...filters,
          [dimension]: value
        });
      }
    },
    [dimensions, filters]
  );

  const getData = React.useCallback(
    // eslint-disable-next-line no-unused-vars
    (dimension, config) => {
      // config = {
      //   count: true,
      //   sum: ['acc_gold', 'acc_silver']
      // }
      // return [
      //   {"key":"AS","count":1, "sum_acc_gold": 2, "sum_acc_silver": 2,},
      //   {"key":"AS","count":2, "sum_acc_gold": 4, "sum_acc_silver": 5,},
      // ]
      // do something with the config instead of using the reduceCount for all.
      // return dimensions[dimension]
      //   .group()
      //   .reduce(config.reduceAdd, config.reduceRemove, config.reduceInitial);
      return dimensions[dimension].group().reduceCount().all();
    },
    [dimensions]
  );

  return {
    filterBy,
    cf: cf.current,
    dimensions,
    getData,
    filters
  };
}

export default useDataStore;
