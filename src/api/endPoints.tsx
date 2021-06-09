
export const API_URL =
  // window.location.hostname === 'localhost'
  'https://netf-test.herokuapp.com/api';

export default {
  SINGLE_ORDER_ITEMS: `${API_URL}/singleOrderItems`,
  QUANTITIES: `${API_URL}/quantities`,
  IMAGES: `${API_URL}/images`,
  BUNDLES: `${API_URL}/bundles`,
  CATEGORIES: `${API_URL}/categories`,
  BRANCHES: `${API_URL}/branches`,
  ADDRESSES: `${API_URL}/addresses`,
  EMPLOYEES: `${API_URL}/employees`,
};
