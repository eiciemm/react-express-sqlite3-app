import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Edit from './Components/Edit'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

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

const Loading = styled.div`
  position: absolute;
  top: 150px;
  left: 120px;
  background: white;
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
    height: 30px;
  }
`;

const Main = () => {
  const [allMemoData, setAllMemoData] = useState([]);
  const [editTargetId, setEditTargetId] = useState(null);
  const [targetText, setTargetText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  useEffect(() =>{
    setIsLoading(true);
    fetchAllMemoData();
  },[])

  const fetchAllMemoData = () => {
    const method = "GET";
    fetch(`${API_ENDPOINT}/memo`, {method, headers})
      .then((res) => res.json())
      .then((data) => {
        setAllMemoData(data.data.content);
        setIsLoading(false);
      });
  }

  //edit
  const handleEdit = (id, text) => {
    setEditTargetId(id);
    setTargetText(text);
  }

  const applyEdit = () => {
    const method = "PUT";
    const obj = { id: editTargetId, text: targetText };
    const body = JSON.stringify(obj);
    setIsLoading(true);
    fetch(`${API_ENDPOINT}/memo`, {method, headers, body})
      .then((res) => {
        if (res.ok) {
          fetchAllMemoData();
          stopEdit();
        } else {
          setIsLoading(false);
        }
      })
  }

  const stopEdit = () => {
    setEditTargetId(null);
    setTargetText("");
  }

  //delete
  const handleDelete = id => {
    const method = "DELETE";
    const obj = { id: id };
    const body = JSON.stringify(obj);
    setIsLoading(true);
    fetch(`${API_ENDPOINT}/memo`, {method, headers, body})
      .then((res) => {
        if (res.ok) {
          fetchAllMemoData();
          stopEdit();
        } else {
          setIsLoading(false);
        }
      })
  }

  //create new
  const handleCreateNew = () => {
    textInputRef.current.value = "";
    const method = "POST";
    const obj = { text };
    const body = JSON.stringify(obj);
    setIsLoading(true);
    fetch(`${API_ENDPOINT}/memo`, {method, headers, body})
      .then((res) => {
        if (res.ok) {
          fetchAllMemoData();
        } else {
          setIsLoading(false);
        }
      })
  }

  const textInputRef = React.createRef();

  return (
    <div>
      <CreateNew>
        <input ref={textInputRef} type="text" name="text" onChange={e => setText(e.target.value)} />
        <button onClick={handleCreateNew}>新規追加</button>
      </CreateNew>
      {isLoading && (
        <Loading><img src={`${process.env.PUBLIC_URL}/loading.gif`} alt="" /></Loading>
      )}
      <div>
        {allMemoData.map(memo => {
          return (
            <List key={memo.id}>
              {editTargetId === memo.id ? (
                <Edit
                  text={memo.text}
                  onChange={e => setTargetText(e.target.value)}
                  applyEdit={applyEdit}
                  stopEdit={stopEdit}
                />
              ) : (
                <Text>{memo.text}</Text>
              )}
              <Buttons>
                <button onClick={() => handleEdit(memo.id, memo.text)}>編集</button>
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