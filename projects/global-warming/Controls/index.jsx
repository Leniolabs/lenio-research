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
  daysThreshold,
  onDaysThresholdChange
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
            value: 30,
            label: "30 days"
          },
          {
            value: 45,
            label: "45 days"
          },
          {
            value: 60,
            label: "60 days"
          },
          {
            value: 90,
            label: "90 days"
          },
          {
            value: 120,
            label: "120 days"
          }
        ]}
        selectedOption={{
          value: daysThreshold.toString(),
          label: `${daysThreshold} days`
        }}
        label=""
        isDisabled={false}
        onChange={onDaysThresholdChange}
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
