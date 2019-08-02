import qs from 'querystring';

export const stringify: (params?: any) => string = (params = {}) => {
  return '?' + qs.stringify(params);
};