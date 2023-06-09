import { gql } from '@apollo/client';

const GET_FILTERED_SHIPMENTS = gql`
  query FilterShipments($dateFilters: DateFilters) {
    filterShipments(dateFilters: $dateFilters) {
      id
      shipmentDate
      shippedBunches
      bunchWeight
      deliveredWeight
    }
  }
`;

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
export { CREATE_SHIPMENT, GET_FILTERED_SHIPMENTS };
