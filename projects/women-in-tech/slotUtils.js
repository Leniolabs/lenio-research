import { scaleLinear } from "d3-scale";

// n is 5 => [1,2,3,4,5]; n is 10 => [1,2,3,4,5,6,7,8,9,10];
export const getScaledArray = (n) => new Array(n).fill(null).map((_, i) => i + 1);

// It works only vertically for the moment
export const SlotDirection = Object.freeze({
  VERTICAL: "vertical",
  // Todo: implement
  HORIZONTAL: "horizontal",
  AREA: "area"
});

const LABEL_UNAVAILABLE_TO_RELOCATE =
  "There's a clash between labels or the label is out of bounds, please increase number of slots. Displayed data may be lost";

export const getSlotPositionFromRange = (domain, range, n) => {
  const getSlotPosition = scaleLinear().domain(domain).range(range);
  return getSlotPosition(n);
};

export const generateSlots = ({
  direction = SlotDirection.VERTICAL,
  numOfSlots,
  bottomLimit,
  topLimit
} = {}) => {
  const slots = getScaledArray(numOfSlots);

  const mappedSlots = slots.map((slot) => {
    const position = getSlotPositionFromRange([1, numOfSlots], [bottomLimit, topLimit], slot);
    return { position: Math.round(position) };
  });

  return mappedSlots;
};

// checks which slot we use and return it
const checkSlot = (slots, position) => {
  const domain = [0, slots.length - 1];
  const range = [slots[0].position, slots[slots.length - 1].position];

  const slotIndex = Math.round(getSlotPositionFromRange(range, domain, position));

  return { slot: slots[slotIndex], index: slotIndex };
};

const slotIndexIsAvailable = (slots, index) => {
  const nextSlotIsAvailable = slots[index]?.label == null;
  const isOutOfRange = index >= slots.length;

  return nextSlotIsAvailable && !isOutOfRange;
};

const insertSlot = (slots, index, slotToInsert) => {
  slots = [...slots];
  slots[index] = {
    ...slotToInsert,
    position: slots[index].position,
    value: slotToInsert.value
  };

  return slots;
};

const relocateSlot = (slots, slotToRelocate) => {
  slots = [...slots];
  const { slot: conflictSlot, index } = checkSlot(slots, slotToRelocate.position);

  // determine which index we should check next
  const relocateIndex = slotToRelocate.value < conflictSlot.value ? index + 1 : index - 1;

  if (slotIndexIsAvailable(slots, relocateIndex)) {
    slots = insertSlot(slots, relocateIndex, slotToRelocate);
  } else {
    console.warn(LABEL_UNAVAILABLE_TO_RELOCATE);
    // Call recursively?
  }

  return slots;
};

// Takes array of slots [{position:83}, {position:113}] and [{position: 100, label: 'label'}, ...]
// returns filled slots;
export const getFilledSlots = (slots, points) => {
  let filledSlots = [...slots];

  points.forEach((point) => {
    const { position } = point;
    const { slot, index } = checkSlot(filledSlots, position);

    // An existing label means the slot is already in use
    if (slot.label) {
      // Swap them to see which is the most appropiate slot for this label
      filledSlots = relocateSlot(filledSlots, point);
    } else {
      //Add it
      filledSlots = insertSlot(filledSlots, index, point);
    }
  });

  return filledSlots;
};
