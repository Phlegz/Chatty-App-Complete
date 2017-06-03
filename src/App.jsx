import React, {Component} from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name:""},
      messages: [],
      userNum: 0,
    };
    this.newMessage = this.newMessage.bind(this);
  }

  newMessage(username = "Anonymous", content) {
    const previousUser = this.state.currentUser.name || "Anonymous";
    if (username !== previousUser) {
      const nameChangeMessage = {
        username,
        content: `${previousUser} changed their name to ${username}`,
        type: "postNotification"
      };
      this.setState({currentUser: {name: username}});
      this.ws.send(JSON.stringify(nameChangeMessage));
    }
    const newMessage = {
      username,
      content,
      type: "postMessage"
    };
    this.ws.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
    const ws = new WebSocket(`ws://${window.location.hostname}:3001`);
    this.ws = ws;
    ws.onopen = (event => {
      console.log("connection establishded");
      ws.onmessage = (({ data }) => {
        const parsedData = JSON.parse(data);
        if (parsedData.type === "userNumNotification") {
          this.setState({userNum: parsedData.num});
        } else {
          const messages = this.state.messages.concat(parsedData);
          this.setState({messages});
        }
      });
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="user-num-section">Total users in channel:{ this.state.userNum }</span>
        </nav>
        <MessageList messages={ this.state.messages } />
        <ChatBar newMessage={ this.newMessage } />
      </div>
    );
  }

}
export default App;
