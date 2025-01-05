
/**
 *
 * @onSelectSquare : 빈칸을 클릭했을 때 App.jsx의 플레이어 심볼 업데이트
 * @returns
 */
export default function GameBoard({ onSelectSquare, board }) {
  
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
