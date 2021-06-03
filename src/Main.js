import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const CreateNew = styled.div`
  margin: 0 0 22px 8px;
  > input {
    width: 290px;
    height: 24px;
  }
  > button {
    width: 90px;
    height: 30px;
    margin-left: 10px;
  }
`;

const List = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
  margin: 0 0 8px 8px;
`;

const Text = styled.p`
  width: 280px;
  margin: 0;
`;

const Buttons = styled.div`
  display: flex;
  > button {
    margin-left: 8px;
  }
`;

const Main = () => {
  const history = useHistory();
  const [allMemoData, setAllMemoData] = useState([]);
  const [text, setText] = useState("");
  useEffect(() =>{
    fetchAllMemoData();
  },[])

  const fetchAllMemoData = () => {
    const method = "GET";
    fetch('/memo', {method, headers})
      .then((res) => res.json())
      .then((data) => setAllMemoData(data.data.content));
  }

  const handleEdit = id => {
    history.push(`/memo/edit?id=${id}`)
  }

  const handleDelete = id => {
    history.push(`/memo/delete?id=${id}`)
  }

  const handleCreateNew = () => {
    const method = "POST";
    const obj = { text };
    const body = JSON.stringify(obj);
    fetch('/memo/add', {method, headers, body})
      .then((res) => {
        if (res.ok) fetchAllMemoData();
      })
  }

  return (
    <div>
      <CreateNew>
        <input type="text" name="text" onChange={e => setText(e.target.value)} />
        <button onClick={handleCreateNew}>新規追加</button>
      </CreateNew>
      <div>
        {allMemoData.map(memo => {
          return (
            <List key={memo.id}>
              <Text>{memo.text}</Text>
              <Buttons>
                <button onClick={() => handleEdit(memo.id)}>編集</button>
                <button onClick={() => handleDelete(memo.id)}>削除</button>
              </Buttons>
            </List>
          )
        })}
      </div>
    </div>
  );
}

export default Main;