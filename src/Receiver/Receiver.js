import React from 'react'
import './Receiver.css';

class Receiver extends React.Component{
    constructor(props){
        super(props);
        this.state={ content: []};
        this.clearDatabase = this.clearDatabase.bind(this);
    }

    componentDidMount(){
        // GET notes from database
        fetch('http://localhost:8080/api/messages')
            .then(res => res.json())
            .then(data => this.setState({content: data}), () => console.log(this.state.content))
            .catch(error => console.log(error));
        console.log(this.state);
    }

    clearDatabase(){
        // POST to clear database
        const requestOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ message: ""})
        }

        fetch('http://localhost:8080/api/clear', requestOption)
            .then(res => res.json())
            .then()
            .catch(error => console.log(error));
        const e = [];
        this.setState({content: e});
    }

    render() {

        return <div id='container'>
            <h4>Receiver Component</h4>
            <button value="clearDB" onClick={this.clearDatabase}>Clear DB</button>
            {this.state.content.length > 0 ?
            <div className='list'>
               <ul>
                   {this.state.content.map( c =>
                   <li>{c}</li>
                   )}
               </ul>
            </div>
                : <p>Database is empty</p> }
           </div>
    }
}

export default Receiver;