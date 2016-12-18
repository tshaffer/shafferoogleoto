// ------------------------------------
// Constants
// ------------------------------------
const ADD_ALBUM = 'ADD_ALBUM';

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = [];

export default function(state = initialState, action) {

  switch (action.type) {

    case ADD_ALBUM: {

      console.log("**** ADD_ALBUM entry, state:");
      console.log("typeof state:", typeof state, ", array? ", state instanceof Array);
      let newState = Object.assign([], state);
      newState.push(action.payload);
      console.log("**** ADD_ALBUM exit, newState:");
      console.log(newState);
      console.log("typeof newState:", typeof newState, ", array? ", newState instanceof Array);
      return newState;
    }
  }

  return state;
}

// ------------------------------------
// Actions
// ------------------------------------
export function addAlbum(album) {

  console.log("addAlbum invoked:", album);

  return {
    type: ADD_ALBUM,
    payload: album
  };
}

