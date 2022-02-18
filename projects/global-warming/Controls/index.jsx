import React from "react";

import { ControlsWrapper } from "../global-warming.style";
import { Timeline } from "./Timeline";
import CustomSelect from "@components/select/select";

export function Controls({
  region,
  onRegionChange,
  isPlaying,
  onPlay,
  onPause,
  onYearClick,
  year,
  percentile,
  onPercentileChange
}) {
  return (
    <ControlsWrapper>
      <CustomSelect
        options={[
          {
            value: "world",
            label: "World"
          },
          {
            value: "NA",
            label: "North America"
          },
          {
            value: "EU",
            label: "Europe"
          },
          {
            value: "ASIA",
            label: "Asia"
          }
        ]}
        selectedOption={region}
        label=""
        isDisabled={false}
        onChange={onRegionChange}
        disabledSearch
        width={300}
        maxWidth={700}
      />
      <CustomSelect
        options={[
          {
            value: 0,
            label: "1-in-20 Low"
          },
          {
            value: 1,
            label: "Median"
          },
          {
            value: 2,
            label: "1-in-20 High"
          }
        ]}
        selectedOption={{
          value: percentile.toString(),
          label: (() => {
            switch (percentile) {
              case 0:
                return "1-in-20 Low";
              case 1:
                return "Median";
              case 2:
              default:
                return "1-in-20 High";
            }
          })()
        }}
        label=""
        isDisabled={false}
        onChange={onPercentileChange}
        disabledSearch
        width={300}
        maxWidth={700}
      />
      <Timeline
        isPlaying={isPlaying}
        onPlay={onPlay}
        onPause={onPause}
        onYearClick={onYearClick}
        year={year}
      />
    </ControlsWrapper>
  );
}
