import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const EditText = styled.div`
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

const Edit = () => {
  const history = useHistory();
  const [memoData, setMemoData] = useState({});
  const [text, setText] = useState("");
  useEffect(() =>{
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    const method = "GET";
    fetch(`/memo/edit?id=${id}`, {method, headers})
      .then((res) => res.json())
      .then((data) => setMemoData(data.data.memoData));
  },[])


  const handleEdit = () => {
    const method = "POST";
    const obj = { id: memoData.id, text: text };
    const body = JSON.stringify(obj);
    fetch('/memo/edit', {method, headers, body})
      .then((res) => {
        if (res.ok) history.push('/memo');
      })
  }

  return (
    <div>
      <EditText>
        <input type="text" name="text" defaultValue={memoData.text} onChange={e => setText(e.target.value)} />
        <button onClick={handleEdit}>更新</button>
      </EditText>
      <Link to="/memo">Back</Link>
    </div>
  );
}

export default Edit;