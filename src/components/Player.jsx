import { useState } from "react";

/**
 *
 * @initialName : 플레이어 이름 기본값
 * @symbol : 플레이어의 틱택토 심볼
 * @isActive : 자기 차례인지에 대한 정보
 * @returns
 */
export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  // 플레이어 이름 정보
  const [playerName, setPlayerName] = useState(initialName);

  //플레이어 이름 입력필드 관리 -> true일 경우 input창으로 변경
  const [isEditing, setIsEditing] = useState(false);

  //버튼 클릭 이벤트
  function handleEditClick(e) {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  // 이름 입력칸 수정할 때 마다 발생하는 이벤트
  function handleChange(e) {
    // 이름 업데이트
    setPlayerName(e.target.value);
  }

  // 사용자 이름 표시 요소
  let editablePlayerName = <span className="player-name">{playerName}</span>;

  // 이름 입력에 따른 텍스트
  let btnCaption = "Edit";

  // Edit 버튼을 눌렀을 경우
  if (isEditing) {
    //input창으로 변경하여 이름 입력받음
    editablePlayerName = (
      <input onChange={handleChange} type="text" required value={playerName} />
    );
    // Edit 버튼을 Save텍스트로 변경
    btnCaption = "Save";
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  );
}
