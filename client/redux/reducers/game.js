const initialState = {
  total: {
    width: 7,
    height: 7
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOTAL': {
      return { ...state, total: action.total }
    }
    default:
      return {
        ...state
      }
  }
}
export function setGameNumbers(width, height) {
  return { type: 'SET_TOTAL', total: { width, height } }
}
