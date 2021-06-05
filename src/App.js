import styled from 'styled-components'
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './Main';

const Title = styled.h1`
  margin-left: 8px;
`;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Title>The simple To Do list</Title>
        <div>
          <Route path="/" exact component={Main} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;