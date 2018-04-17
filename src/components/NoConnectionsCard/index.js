
import React from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';

const NoConnectionsCard = ({ openModalHandler }) => (
  <Card>
    <Card.Content>
      <Card.Header>
        <Icon name='warning sign' color='yellow'/>
        No Connections Found! 
      </Card.Header>
      <Card.Description>
      You currently don't have any saved connections. :( FYI, we support both HTTPS and TCP connections. Any new connections you add will be seen here!
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button floated='right' primary onClick={openModalHandler}>New</Button>
    </Card.Content>
  </Card>
);

export default NoConnectionsCard;