import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
  token: null,
  userId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    function reducer(state = { conversations: {} }, action) {
      switch (action.type) {
        case "users_online":
          const conversations = { ...state.conversations };
          const usersOnline = action.data;
          for (let i = 0; i < usersOnline.length; i++) {
            const userId = usersOnline[i].userId;
            if (conversations[userId] === undefined) {
              conversations[userId] = {
                messages: [],
                username: usersOnline[i].username
              };
            }
          }
          return { ...state, usersOnline, conversations };
        case "private_message":
          const conversationId = action.data.conversationId;
          return {
            ...state,
            conversations: {
              ...state.conversations,
              [conversationId]: {
                ...state.conversations[conversationId],
                messages: [
                  action.data.message,
                  ...state.conversations[conversationId].messages
                ]
              }
            }
          };
        case "self_user":
          return { ...state, selfUser: action.data };     
    default:
      return state;
  }
};
