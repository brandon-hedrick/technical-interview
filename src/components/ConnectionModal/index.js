
import React, { Component } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';


const communicationMethods = [
  { key: 'http', text: 'HTTP', value: 'HTTP' },
  { key: 'tcp', text: 'TCP', value: 'TCP' }
]

const httpMethods = [
  { key: 'post', text: 'POST', value: 'POST' },
  { key: 'put', text: 'PUT', value: 'PUT' }
]

const defaultState = {
  id: null,
  name: '',
  protocol: '',
  httpMethod: '',
  url: '',
  ip: '',
  port: '',
}

class ConnectionModal extends Component {

  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  render() {
    return (
      <Modal open={this.props.isOpen}>
        <Modal.Header>
          { this.props.editMode ? 'Edit an Existing Connection' : 'Add a New Connection' }
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Input 
                fluid width={14} 
                label='Connection Name' 
                value={this.state.name} 
                onChange={(e, d) => this.changeStateHandler('name' , d.value)} 
                placeholder='New Connection' 
              />
              <Form.Select 
                fluid width={4} 
                options={communicationMethods} 
                value={this.state.protocol} 
                onChange={(e, d) => this.changeStateHandler('protocol' , d.value)} 
                placeholder='Method' label='Method' 
              />
            </Form.Group>
            {
              this.state.protocol === 'HTTP' &&
              <Form.Group>
                <Form.Select 
                  width={4} fluid 
                  options={httpMethods} 
                  value={this.state.httpMethod} 
                  onChange={(e, d) => this.changeStateHandler('httpMethod' , d.value)} 
                  placeholder='HTTP Method' label='HTTP Method' 
                />
                <Form.Input 
                  width={12} fluid 
                  label='URL' 
                  value={this.state.url} 
                  onChange={(e, d) => this.changeStateHandler('url' , d.value)} 
                  placeholder='example.com/' 
                />
              </Form.Group>
            }
            {
              this.state.protocol === 'TCP' &&
              <Form.Group>
                <Form.Input 
                  width={6} fluid 
                  label='IP Address' 
                  value={this.state.ip} 
                  onChange={(e, d) => this.changeStateHandler('ip' , d.value)} 
                  placeholder='0.0.0.0' 
                />
                <Form.Input 
                  width={3} fluid 
                  label='Port' 
                  value={this.state.port} 
                  onChange={(e, d) => this.changeStateHandler('port' , d.value)} 
                  placeholder='8000' 
                />
              </Form.Group>
            }
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.closeModalHandler} negative > Cancel </Button>
          <Button 
            positive 
            icon={this.props.editMode ? 'save' : 'plus'} 
            labelPosition='right'
            content={this.props.editMode ? 'Update' : 'Create'}
            onClick={this.submitHandler}
          />
        </Modal.Actions>
        </Modal>
    );
  }

  componentWillReceiveProps(nextProps){
    this.setState({ ...defaultState , ...nextProps.modalData })
  }

  /**
   * Helper function to set local state more efficiently
   * @param {string} key - key to be updated in state
   * @param {string} value - value to update key with
   */
  changeStateHandler = (key, value) => {
    this.setState({[`${key}`]: value})
  }

  /**
   * Responsbile for handling submissions of modal form to proper context function
   * Prunes non relevant values depending on the method
   * Closes modal
   */
  submitHandler = () => {
    const { httpMethod, url, ip, port, ...requiredDetails } = this.state;
    const prunedDetails = requiredDetails.protocol === 'HTTP'
      ? { httpMethod , url }
      : { ip, port };
    this.props.contextHandler({ ...requiredDetails, ...prunedDetails });
    this.props.closeModalHandler();
  }

}

export default ConnectionModal;