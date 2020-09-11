import * as types from '../constants';

export function getNews(value) {
  return {
    type: types.GET_NEWS,
    payload: value
  }
}
