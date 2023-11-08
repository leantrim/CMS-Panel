import { SECTION_TYPES } from '@mediapartners/shared-types/types/ecommerce/ProductType';

export default function getBlockName(type: SECTION_TYPES) {
  switch (type) {
    case SECTION_TYPES.ImageTextBlock:
      return 'Bild Text Block';
    case SECTION_TYPES.ImageBlock:
      return 'Bild block';
    case SECTION_TYPES.Measurments:
      return 'Mätnings block';
    case SECTION_TYPES.TextBlock:
      return 'Text block';
    case SECTION_TYPES.Usps:
      return 'Uspar (up sell points)';

    default:
      return 'Not found';
  }
}
