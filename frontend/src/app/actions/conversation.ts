import { Dispatch } from "redux";
import { appAPI } from "../apiConn";
import { store } from "../store";
import { ConverationWebsocketMessage, Conversation, ConversationActions, Message } from "../types/conversation";

var conversationSocket: WebSocket;

/**
 * Get a list of public conversation channels
 */
export const GetPublicConversations = () => (dispatch: Dispatch) => {
  appAPI.get("/conversation?public=true", { headers: { "Authorization": localStorage.getItem("authToken") } }).then(res => {
    // Get the Conversation List from the Response
    let conversations: Conversation[] = res.data;

    // Do the Dispatch
    dispatch({
      type: ConversationActions.GET_PUBLIC_CONVERSATIONS,
	    conversations: conversations,
    })

    // If we don't have a current conversation, set it to the first item in the return array
    if (store.getState().conversationState.currentConversation === undefined && conversations !== undefined) {
      appAPI.get("/conversation/" + conversations[0].id, { headers: { "Authorization": localStorage.getItem("authToken") } }).then(res => {
        // Get the Conversation List from the Response
        let conversation: Conversation = res.data;
    
        // Do the Dispatch
        dispatch({
          type: ConversationActions.SET_CURRENT_CONVERSATION,
          conversation: conversation,
        })
      }).catch(error => {
        // Handle the Error Response
      })
    }
  }).catch(error => {
    // Handle the Error Response
  })
}

/**
 * Get a list of private conversation channels
 */
export const GetPrivateConversations = () => (dispatch: Dispatch) => {
  appAPI.get("/conversation", { headers: { "Authorization": localStorage.getItem("authToken") } }).then(res => {
    // Get the Conversation List from the Response
    let conversations: Conversation[] = res.data;

    // Do the Dispatch
    dispatch({
      type: ConversationActions.GET_PRIVATE_CONVERSATIONS,
	    conversations: conversations,
    })
  }).catch(error => {
    // Handle the Error Response
  })
}

/**
 * Set the Current Conversation
 */
export const SetCurrentConversation = (conversationID: string | undefined) => (dispatch: Dispatch) => {
  appAPI.get("/conversation/" + conversationID, { headers: { "Authorization": localStorage.getItem("authToken") } }).then(res => {
    // Get the Conversation List from the Response
    let conversation: Conversation = res.data;

    // Do the Dispatch
    dispatch({
      type: ConversationActions.SET_CURRENT_CONVERSATION,
	    conversation: conversation,
    })
  }).catch(error => {
    // Handle the Error Response
  })
}

/**
 * Send a Message
 */
export const SendMessage = (message: Message) => (dispatch: Dispatch) => {
  appAPI.post("/message", message, { headers: { "Authorization": localStorage.getItem("authToken") } }).then(res => {
  }).catch(error => {});
}

export const ConnectConversationWebsocket = () => (dispatch: Dispatch) => {
  // Create the WebSocket
  const token = localStorage.getItem("authToken");
  document.cookie = `authToken=${token}; path=/`;
  conversationSocket = new WebSocket(`${process.env.REACT_APP_WS_URL}/conversations`);

  // Create the Event Listeners
  conversationSocket.onopen = event => {
    console.log("Conversation websocket opened, getting fresh data...");
  }
  conversationSocket.onmessage = event => {
    // Get the Event
    let wsEvent: ConverationWebsocketMessage = JSON.parse(event.data);
    switch (wsEvent.type) {
      case "MESSAGE":
        console.log("message received...");
        ProcessNewMessage(wsEvent.data as Message, dispatch);
        break;
      default:
        console.log("unknown packet type...");
    }
  }
  conversationSocket.onclose = event => {
    console.log("Conversation websocket closed...");
  }
  conversationSocket.onerror = error => {
    console.log("Socket Error: ", error);
  }
}

// Process Handling of new message on websocket
const ProcessNewMessage = (message: Message, dispatch: Dispatch) => {
  // Define the API States
  const conversationState = store.getState().conversationState;
  
  // Check if the message belongs to the current conversation
  if (message.conversation_id === conversationState.currentConversation?.id) {
    // Get the Current Conversation
    let conversation = conversationState.currentConversation;

    // Check if we have the conversation
    if (conversation !== undefined) {
      // Check if we have an array of messages
      if (conversation?.messages === undefined) {
        conversation.messages = new Array()
      }

      // Add the Message
      conversation?.messages?.push(message);
    }

    // Do the Dispatch
    dispatch({
      type: ConversationActions.SET_CURRENT_CONVERSATION,
	    conversation: conversation,
    })
  }
}

export const CloseConversationWebsocket = () => {
  conversationSocket.close()
}