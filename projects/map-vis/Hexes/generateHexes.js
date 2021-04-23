const getPoint = (size, center, i) => {
  const angle_rad = -Math.PI / 6 + (Math.PI / 3) * i;
  return [center[0] + size * Math.cos(angle_rad), center[1] + size * Math.sin(angle_rad)];
};

export const generateBigHex = ({ size, topLeftCorner, center }) => {
  let corners;
  if (!center) {
    center = [
      topLeftCorner[0] + size * Math.cos(Math.PI / 6),
      topLeftCorner[1] + size * Math.sin(Math.PI / 6)
    ];
  }
  corners = [0, 1, 2, 3, 4, 5].map((i) => getPoint(size, center, i));
  return corners;
};

const getEvenRow = (x, y, width, length = 6) => {
  return Array(length)
    .fill(0)
    .map((_, i) => [x + i * width, y]);
};

export const generateHexGrid = ({ size, topLeftCorner }) => {
  const innerSize = size / 5;
  const width = Math.sqrt(3) * innerSize;
  const sameRowCenter = [topLeftCorner[0], topLeftCorner[1] - 2 * innerSize];
  const oddRowCenter = [topLeftCorner[0] + width / 2, topLeftCorner[1] - innerSize / 2];
  const firstRow = getEvenRow(sameRowCenter[0], sameRowCenter[1], width, 4).map((center) =>
    generateBigHex({ size: innerSize, center })
  );
  const secondRow = getEvenRow(oddRowCenter[0], oddRowCenter[1], width, 5).map((center) =>
    generateBigHex({ size: innerSize, center })
  );
  const thirdRow = getEvenRow(
    sameRowCenter[0],
    sameRowCenter[1] + innerSize * 3,
    width
  ).map((center) => generateBigHex({ size: innerSize, center }));
  const fourthRow = getEvenRow(
    oddRowCenter[0],
    oddRowCenter[1] + innerSize * 3,
    width,
    5
  ).map((center) => generateBigHex({ size: innerSize, center }));
  const fifthRow = getEvenRow(
    sameRowCenter[0],
    sameRowCenter[1] + innerSize * 6,
    width
  ).map((center) => generateBigHex({ size: innerSize, center }));
  const sixthRow = getEvenRow(
    oddRowCenter[0],
    oddRowCenter[1] + innerSize * 6,
    width,
    5
  ).map((center) => generateBigHex({ size: innerSize, center }));
  const lastRow = getEvenRow(
    sameRowCenter[0],
    sameRowCenter[1] + innerSize * 9,
    width
  ).map((center) => generateBigHex({ size: innerSize, center }));
  // const evenRows = [
  // ...getEvenRow(sameRowCenter[0], sameRowCenter[1], width).map((center) =>
  //   generateBigHex({ size: innerSize, center })
  // )
  // ...getEvenRow(sameRowCenter[0], sameRowCenter[1] + innerSize * 3, width).map((center) =>
  //   generateBigHex({ size: innerSize, center })
  // ),
  // ...getEvenRow(sameRowCenter[0], sameRowCenter[1] + innerSize * 6, width).map((center) =>
  //   generateBigHex({ size: innerSize, center })
  // ),
  // ...getEvenRow(sameRowCenter[0], sameRowCenter[1] + innerSize * 9, width).map((center) =>
  //   generateBigHex({ size: innerSize, center })
  // )
  // ];
  // const oddRows = [
  // ...getEvenRow(oddRowCenter[0], oddRowCenter[1], width).map((center) =>
  //   generateBigHex({ size: innerSize, center })
  // ),
  // ...getEvenRow(oddRowCenter[0], oddRowCenter[1] + innerSize * 3, width).map((center) =>
  //   generateBigHex({ size: innerSize, center })
  // ),
  // ...getEvenRow(oddRowCenter[0], oddRowCenter[1] + innerSize * 6, width).map((center) =>
  //   generateBigHex({ size: innerSize, center })
  // )
  // ];
  return [
    ...[firstRow[2].slice(0, 4), firstRow[3].slice(1, 5)],
    ...[secondRow[0].slice(0, 4), ...secondRow.slice(1, 4), secondRow[4].slice(1, 5)],
    ...[
      [thirdRow[0][5], ...thirdRow[0].slice(0, 3)],
      ...thirdRow.slice(1, 5),
      thirdRow[5].slice(2, 6)
    ],
    ...[...fourthRow],
    ...[
      [fifthRow[0][5], ...fifthRow[0].slice(0, 3)],
      ...fifthRow.slice(1, 5),
      fifthRow[5].slice(2, 6)
    ],
    ...[
      [sixthRow[0][4], sixthRow[0][5], sixthRow[0][0], sixthRow[0][1]],
      ...sixthRow.slice(1, 4),
      [sixthRow[4][3], sixthRow[4][4], sixthRow[4][5], sixthRow[4][0]]
    ],
    ...[
      [lastRow[2][4], lastRow[2][5], lastRow[2][0], lastRow[2][1]],
      [lastRow[3][3], lastRow[3][4], lastRow[3][5], lastRow[3][0]]
    ]
  ];
};
