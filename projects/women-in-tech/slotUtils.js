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
  "There is a clash between labels or the label is out of bounds, please increase number of slots";

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

const insertSlot = (slots, index, slotToRelocate) => {
  slots = [...slots];
  slots[index + 1] = { ...slotToRelocate, position: slots[index + 1].position };

  return slots;
};

const relocateSlot = (slots, slotToRelocate) => {
  slots = [...slots];
  const { slot: conflictSlot, index } = checkSlot(slots, slotToRelocate.position);
  const [prevIndex, nextIndex] = [index - 1, index + 1];

  // Try move up. (in this first case the positions are inversed (due to how svg works))
  if (slotToRelocate.position < conflictSlot.position) {
    if (slotIndexIsAvailable(slots, prevIndex)) {
      slots = insertSlot(slots, prevIndex, slotToRelocate);
    } else {
      console.warn(LABEL_UNAVAILABLE_TO_RELOCATE);
    }
  } else {
    if (slotIndexIsAvailable(slots, nextIndex)) {
      slots = insertSlot(slots, nextIndex, slotToRelocate);
    } else {
      console.warn(LABEL_UNAVAILABLE_TO_RELOCATE);
    }
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

    if (slot.label) {
      // Swap them to see which is the most appropiate slot for this label
      filledSlots = relocateSlot(filledSlots, point);
    } else {
      //Add it
      filledSlots[index] = point;
    }
  });

  return filledSlots;
};
