import { useState } from "react";

export const Modal = ({ onAddGoals }: any) => {
  const [newGoal, setNewGoal] = useState<string>("");
  const [maximumAmount, setMaximumAmount] = useState<number>(0);
  return (
    <>
      <form>
        <div>
          <label>達成したい目標</label>
        </div>
        <div>
          <input
            type="text"
            placeholder="目標を入力"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          />
        </div>
        <div>
          <label>目標に投資できる金額</label>
        </div>
        <div>
          <input
            type="number"
            value={maximumAmount}
            onChange={(e) => {
              const value: number = Number(e.target.value);
              setMaximumAmount(value);
            }}
          />
        </div>

        <button onClick={() => onAddGoals(newGoal)}>目標を作成</button>
      </form>
    </>
  );
};
