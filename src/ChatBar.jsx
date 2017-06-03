import React, {Component} from "react";

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      content: ""
    };
    this.onContent = this.onContent.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  onNameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  onContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  onEnter(event) {
    const { content, username } = this.state;
    if (!content.trim()) return;
    if (event.key === "Enter") {
      this.props.newMessage(username, content);
      this.setState({content:""});
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)"
          onChange={ this.onNameChange }
          value={ this.state.username }
        />
        <input className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onChange={ this.onContent }
          onKeyDown={ this.onEnter } //TODO define a function that checks if "enter" and then call onEnter
          value={ this.state.content }
         />
      </footer>
    );
  }

}
export default ChatBar;
