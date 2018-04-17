import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

import { CardGroup, Button } from 'semantic-ui-react';

import NoConnectionsCard from './components/NoConnectionsCard';
import ConnectionModal from './components/ConnectionModal';
import ConnectionCard from './components/ConnectionCard';

const defaultState = {
  isModalOpen: false,
  isEditMode: false,
  modalData: {},
  connections: [],
}
class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">My Connections</h1>
          <Button primary onClick={() => this.openModal()}>Add New Connection</Button>
        </header>
        <CardGroup>
          {
            this.state.connections && this.state.connections.length > 0 &&
            this.state.connections.map(i => {
              return (
                <ConnectionCard 
                  key={i.id}
                  name={i.name}
                  protocol={i.protocol}
                  httpMethod={i.httpMethod}
                  url={i.url}
                  ip={i.ip}
                  port={i.port}
                  editHandler={() => this.openModal(i)}
                />
              );
            })
          }
          {
            this.state.connections && !this.state.connections.length > 0 &&
            <NoConnectionsCard openModalHandler={() => this.openModal()}/>
          }
        </CardGroup>
        <ConnectionModal 
          isOpen={this.state.isModalOpen}
          closeModalHandler={this.closeModal}
          editMode={this.state.isEditMode}
          contextHandler={this.state.isEditMode ? this.putConnection : this.postConnection }
          modalData={this.state.modalData}
        />
      </div>
    );
  }

  componentDidMount() {
    this.updateConnectionsState();
  }

  /**
   * Reponsible for fetching connections from localstorage
   * Initalizes localstorage if necessary
   * @returns An array of connections
   */
  fetchConnections() {
    // GET
    let connections = JSON.parse(localStorage.getItem('connections'));
    if (!connections) {
      localStorage.setItem('connections', JSON.stringify([]));
      connections =  JSON.parse(localStorage.getItem('connections'));
    }
    return connections;
  }

  /** Fetches connections => set state */
  updateConnectionsState = () => this.setState({connections: this.fetchConnections()});

  /** 
   * Responsible for posting new connections to localstorage 
   * @param {object} connection - object literal representing a connection
   */
  postConnection = (connection) => {
    const connections = this.fetchConnections();
    // quick & dirty id generator
    connections.push({...connection, id: Math.floor(Math.random() * 100000)});
    // POST
    localStorage.setItem('connections', JSON.stringify(connections));
    this.updateConnectionsState();
  }

  /**
   * Responsible for editing and putting an existing connection to localstorage (overwrites previous value)
   * @param {object} connection - object literal representing a connection
   */
  putConnection = (connection) => {
    const connections = this.fetchConnections();
    const indexOfMatch = connections.findIndex(i => i.id && i.id === connection.id );
    if (indexOfMatch >= 0) {
      const before = connections.slice(0, indexOfMatch);
      const after = connections.slice(indexOfMatch + 1);
      // PATCH
      localStorage.setItem('connections', JSON.stringify([...before, connection , ...after]));
      this.updateConnectionsState();
    }
  }
  /**
   * Responsible for opening modal and setting revelant state nameably editMode and modalData for form prepopulation
   * @param {object} connection - object literal representing a connection
   */
  openModal = (connection) => {
    this.setState({
      isModalOpen : true,
      modalData: connection ? connection : {},
      isEditMode : !!connection
    });
  }

  /** Closes modal */
  closeModal = () => this.setState({isModalOpen : false});
}

export default App;
