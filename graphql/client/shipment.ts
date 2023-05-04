import { gql } from '@apollo/client';

const CREATE_SHIPMENT = gql`
  mutation CreateShipment(
    $shipmentDate: String
    $shippedBunches: Int
    $deliveredWeight: Float
  ) {
    createShipment(
      shipmentDate: $shipmentDate
      shippedBunches: $shippedBunches
      deliveredWeight: $deliveredWeight
    ) {
      id
      shipmentDate
      shippedBunches
      deliveredWeight
      bunchWeight
    }
  }
`;
export { CREATE_SHIPMENT };
