import { Dimensions } from "react-native";

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } =
  Dimensions.get("window");

// remove all markers / landmarks in MapView
export const mapStyle = [
  {
    elementType: "labels",
    stylers: [
      {
        // visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        // visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        // visibility: "off",
      },
    ],
  },
];
