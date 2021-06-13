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
    width: 250px;
    height: 24px;
  }
  > button {
    width: 80px;
    height: 30px;
    margin-left: 11px;
  }
`;

const Loading = styled.div`
  position: absolute;
  top: 150px;
  left: 120px;
  background: white;
`;

const List = styled.div`
  width: 325px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 8px 8px;
  padding: 20px 12px;
  background: yellow;
`;

const Text = styled.p`
  width: 280px;
  margin: 0;
`;

const Buttons = styled.div`
  display: flex;
`;

const Icons = styled.img`
  margin-left: 12px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  :hover {
    opacity: 0.6;
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
    fetch(`${API_ENDPOINT}/memos`, {method, headers})
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
    const obj = { text: targetText };
    const body = JSON.stringify(obj);
    setIsLoading(true);
    fetch(`${API_ENDPOINT}/memos/${editTargetId}`, {method, headers, body})
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
    setIsLoading(true);
    fetch(`${API_ENDPOINT}/memos/${id}`, {method, headers})
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
    fetch(`${API_ENDPOINT}/memos`, {method, headers, body})
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
                <Icons onClick={() => handleEdit(memo.id, memo.text)} src={`${process.env.PUBLIC_URL}/edit.png`} alt="" />
                <Icons onClick={() => handleDelete(memo.id)} src={`${process.env.PUBLIC_URL}/delete.png`} alt="" />
              </Buttons>
            </List>
          )
        })}
      </div>
    </div>
  );
}

export default Main;