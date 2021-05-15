
export const API_URL =
  // window.location.hostname === 'localhost'
  'https://netf-test.herokuapp.com/api';

export default {
  SINGLE_ORDER_ITEMS: `${API_URL}/singleOrderItems`,
  QUANTITIES: `${API_URL}/quantities`,
  IMAGES: `${API_URL}/images`,
  BUNDLE: `${API_URL}/bundle`,
  CATEGORIES: `${API_URL}/categories`,
};
