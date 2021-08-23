import { BarChart } from "@projects/olympics/BarChart";
import * as React from "react";
import useDataStore from "utils/dataStore";
import { data } from "./data";

export const DEFAULT_ANTIQUITY_DATA = [
  { range: [0], label: "Menos de 1 año" },
  { range: [1, 2], label: "1 - 2 años" },
  { range: [3, 4, 5], label: "3 - 5 años" },
  { range: [6, 7, 8, 9, 10], label: "6 - 10 años" },
  { range: [11, 12, 13, 14, 15], label: "11 - 15 años" },
  { range: [16, 17, 18, 19, 20], label: "16 - 20 años" },
  { range: null, label: "más de 20 años" }
];

export const getAntiquityRange = (years, config = DEFAULT_ANTIQUITY_DATA) => {
  return config.find((group) => (group.range ? group.range.includes(years) : true))?.label;
};
const yearDate = new Date().getFullYear();

export const Dashboard = (props) => {
  const [chartData1, setChartData1] = React.useState([]);

  const configDataStore = {
    dimensions: [
      {
        name: "antigüedad",
        function: (d) => getAntiquityRange(yearDate - new Date(d.fecha_ingreso_grupo).getFullYear())
      },
      {
        name: "antigüedad-ranges",
        function: (d) => getAntiquityRange(yearDate - new Date(d.fecha_ingreso_grupo).getFullYear())
      },
      {
        name: "nombre"
      },
      {
        name: "sexo"
      },
      {
        name: "estado_civil"
      },
      {
        name: "cargo"
      },
      {
        name: "division"
      },
      {
        name: "num_hijos"
      },
      {
        name: "nombre_empresa"
      },
      {
        name: "ingreso",
        function: (d) => new Date(d.fecha_ingreso_grupo).getTime(),
        filterByFunction: (value) => (d) => d <= new Date(value).getTime()
      },
      {
        name: "egreso",
        function: (d) => {
          return d.fecha_renuncia ? new Date(d.fecha_renuncia).getTime() : Infinity;
        },
        filterByFunction: (value) => (d) => {
          return d > new Date(value).getTime();
        }
      }
    ]
  };

  const { cf, filterBy, dimensions, filters, getData } = useDataStore(data, configDataStore);

  React.useEffect(() => {
    const tempChartData = dimensions["estado_civil"].group().reduceCount().all();
    setChartData1(
      tempChartData.map((r, idx) => ({
        ...r,
        country: r.key,
        value: r.value * 100,
        yPosition: 25 * idx + 8.5
      }))
    );
  }, [filters]);

  const configFilter = {
    count: true,
    sum: ["num_hijos"]
  };

  // console.log(getData("estado_civil", configFilter));
  return (
    <div>
      <pre>{JSON.stringify(filters, undefined, 2)}</pre>
      <button onClick={() => filterBy("sexo", "Masculino")}>Filter by Sexo:Masculino</button>
      <button onClick={() => filterBy("sexo", "Femenino")}>Filter by Sexo:Femenino</button>
      <button onClick={() => filterBy("division", "Banca Empresas e Intituciones")}>
        Filter by Division:Banca Empresas e Intituciones
      </button>
      <button onClick={() => filterBy("division", null)}>Unfilter by Division</button>
      {/* <h4>accumulated golds</h4> */}
      <pre>{}</pre>
      {/* <pre>{JSON.stringify(chartData1, undefined, 2)}</pre> */}
      <BarChart
        yTitle="Data"
        data={chartData1}
        values={[[{ property: "value", color: "#F7C655", label: "Gold Medals" }]]}></BarChart>
    </div>
  );
};
