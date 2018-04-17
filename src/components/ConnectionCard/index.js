import React from 'react';
import { Card, Button, List } from 'semantic-ui-react'; 

const ConnectionCard = ({name, protocol, httpMethod, url, ip, port, editHandler}) => (
  <Card>
    <Card.Content>
      <Card.Header>
        {name}
      </Card.Header>
      <Card.Meta>
        {protocol}
      </Card.Meta>
    </Card.Content>
    <Card.Content>
      <List>
        {
          httpMethod &&
          <List.Item>
            <List.Header>HTTP Method</List.Header>
            {httpMethod}
          </List.Item>
        }
        {
          url &&
          <List.Item>
            <List.Header>URL</List.Header>
            {url}
          </List.Item>
        }
        {
          ip &&
          <List.Item>
            <List.Header>IP Address</List.Header>
            {ip}
          </List.Item>
        }
        {
          port &&
          <List.Item>
            <List.Header>Port</List.Header>
            {port}
          </List.Item>
        }
      </List>
    </Card.Content>
    <Card.Content extra>
      <Button onClick={editHandler} floated='right' color='green'>Edit</Button>
    </Card.Content>
  </Card>
)

export default ConnectionCard