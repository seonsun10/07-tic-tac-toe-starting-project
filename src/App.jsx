import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

//플레이어 정보
const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

// init Board Status
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// 차례에 해당하는 플레이어 심볼 반환하는 함수
function deriveActivePlayer(gameTurns) {
  // 첫 시작 심볼
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

//좌표별 플레이어 정보 저장
function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD].map((array) => [...array]);

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

// 승리여부 판단
function deriveWinner(gameBoard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol  = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol  = gameBoard[combination[2].row][combination[2].col];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  // 게임 턴별 플레이어 정보 및 좌표 정보
  const [gameTurns, setGameTurns] = useState([]);

  // 활성화된 플레이어 정보
  const activePlayer = deriveActivePlayer(gameTurns);

  // 현재 게임 진행 보드 상태 
  const gameBoard = deriveGameBoard(gameTurns);

  // 승자 정보
  const winner = deriveWinner(gameBoard, players);

  // 비겼는지
  const hasDraw = gameTurns.length === 9 && !winner;

  // GameBoard에서 버튼을 누른 후 이벤트가 끝나면 이후 호출되는 이벤트
  function handleSelectSquare(rowIndex, colIndex) {
    // 게임 턴별 플레이어 정보 및 좌표 정보 업데이트
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      // 새로운 입력 정보 넣고 기존 정보 그대로 유지
      // 이미 선택된 데이터가 있으면 출력할 때 이전에 있던 데이터가 덮어씀
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  // 게임 종료 후 재시직 버튼 클릭
  function handleRestart() {
    setGameTurns([]);
  }

  // 사용자 이름 변경 시 플레이어 심볼에 해당하는 새로운 이름 업데이트
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
