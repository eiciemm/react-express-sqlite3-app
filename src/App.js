import styled from 'styled-components'
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './Main';
import Edit from './Edit';
import Delete from './Delete';


const Title = styled.h1`
  margin-left: 8px;
`;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Title>To Do List</Title>
        <div>
          <Route path="/memo" exact component={Main} />
          <Route path="/memo/edit" exact component={Edit} />
          <Route path="/memo/delete" exact component={Delete} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;