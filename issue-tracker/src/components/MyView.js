import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import MyProjects from './project/MyProjects';
import AllProjects from './project/AllProjects';
import ModalProject from './project/ModalProject';
import Card from 'react-bootstrap/Card';

const MyView = ({history, my_projects, projects, username}) => {
  const [value, setValue] = useState('all');

    return(
        <>
        <Container>
        <Card>
        <Card.Header as="h2">Home</Card.Header>
        </Card>
        <ButtonGroup toggle>
        <ToggleButton
            key='a'
            type="radio"
            variant="secondary"
            name="radio"
            value='a'
            checked={false}
            onChange={(e) => setValue(e.currentTarget.value)}
          >
            All Projects
          </ToggleButton>
          <ToggleButton
            key='m'
            type="radio"
            variant="secondary"
            name="radio"
            value='m'
            checked={false}
            onChange={(e) => setValue(e.currentTarget.value)}
          >
            My Projects
          </ToggleButton>
          </ButtonGroup>
          </Container>
          <Container>
          <ModalProject history={history}/>
        {value === 'm' ? <MyProjects my_projects={my_projects}/> : <AllProjects projects={projects} username={username}/>}
        </Container>
        </>
    )
}

export default MyView;