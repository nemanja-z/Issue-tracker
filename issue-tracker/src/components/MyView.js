import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import MyProjects from './project/MyProjects';
import AllProjects from './project/AllProjects';
import ModalProject from './project/ModalProject';

const MyView = ({history, my_projects, projects, username}) => {
  const [value, setValue] = useState('all');

    return(
        <>
        <>
        <ButtonGroup toggle>
        <ToggleButton
            key='All Projects'
            type="radio"
            variant="secondary"
            name="radio"
            value='a'
            checked={false}
            onChange={(e) => setValue(e.currentTarget.value)}
          >
            all
          </ToggleButton>
          <ToggleButton
            key='My Projects'
            type="radio"
            variant="secondary"
            name="radio"
            value='m'
            checked={false}
            onChange={(e) => setValue(e.currentTarget.value)}
          >
            my
          </ToggleButton>
          </ButtonGroup>
          </>
          <Container>
          <ModalProject history={history}/>
        {value === 'm' ? <MyProjects my_projects={my_projects}/> : <AllProjects projects={projects} username={username}/>}
        </Container>
        </>
    )
}

export default MyView;