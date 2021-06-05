import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const DeleteText = styled.div`
  margin: 0 0 22px 8px;
  > button {
    width: 90px;
    height: 30px;
  }
`;

const Delete = () => {
  const history = useHistory();
  const [memoData, setMemoData] = useState({});
  useEffect(() =>{
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    const method = "GET";
    fetch(`${API_ENDPOINT}/memo/delete?id=${id}`, {method, headers})
      .then((res) => res.json())
      .then((data) => setMemoData(data.data.memoData));
  },[])

  const handleDelete = () => {
    const method = "POST";
    const obj = { id: memoData.id };
    const body = JSON.stringify(obj);
    fetch(`${API_ENDPOINT}/memo/delete`, {method, headers, body})
      .then((res) => {
        if (res.ok) history.push('/');
      })
  }

  return (
    <div>
      <p>以下のメモを削除しますか？</p>
      <p>{memoData.text}</p>
      <DeleteText>
        <button onClick={handleDelete}>削除</button>
      </DeleteText>
      <Link to="/">Back</Link>
    </div>
  );
}

export default Delete;