import React from 'react'
import './Sender.css';

class Sender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: []};
        this.sendMessage = this.sendMessage.bind(this);
        this.clearMessage = this.clearMessage.bind(this);
    }

    componentDidMount() {

    }

    sendMessage() {
        const content = document.getElementById('message').value;
        const requestOption = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({message: content})
        }
        fetch('http://localhost:8080/api/messages', requestOption)
            .then(response => response.json())
            .then(content => this.setState({content}))
            .catch(error => console.log(error));
    }

    clearMessage(){
        document.getElementById('message').value = "";
    }

    render() {

        return <div>
            <div id='container'>
                <h4>Sender Component</h4>
                <form >
                <label><h4>Take notes</h4></label>
                    <textarea id='message' type="text" name="message" placeholder="Enter note" required/>
                    <br></br>
                 <button type="reset" value="Clear" onClick={this.clearMessage}>Clear</button>
                <button type="submit" value="Send" onClick={this.sendMessage}>Save</button>
                </form>
            </div>
        </div>
    }
}

export default Sender;