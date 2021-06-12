import styled from 'styled-components';

const EditText = styled.div`
  > input {
    width: 250px;
    height: 24px;
    margin-bottom: 8px;
  }
`;

const Buttons = styled.div`
  display: flex;
  > button {
    margin-right: 8px;
    height: 26px;
  }
`;

const Edit = props => {
  const { text, onChange, applyEdit, stopEdit } = props;
  return (
    <>
      <EditText>
        <input type="text" name="text" defaultValue={text} onChange={onChange} />
        <Buttons>
          <button onClick={applyEdit}>更新</button>
          <button onClick={stopEdit}>キャンセル</button>
        </Buttons>
      </EditText>
    </>
  );
}

export default Edit;