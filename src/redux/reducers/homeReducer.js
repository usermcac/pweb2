import * as types from '../constants';

export default function reducer(state={ currentTheme: 0 }, actions) {
  switch (actions.type) {

    case types.GET_NEWS:
      return {
        ...state,
        aes_news: actions.payload
      }

    default:
      return state
  }
}
