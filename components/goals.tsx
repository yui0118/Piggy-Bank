import { useState } from "react";

type Props = {
  goals: string[];
};

export default function Goals({ goals }: Props): JSX.Element {
  return (
    <>
      <h1>目標一覧</h1>
      {goals.map((goal, i) => {
        <ul key={i}>
          <li>{goal}</li>
          <button>削除</button>
          <button>編集</button>
        </ul>;
      })}
      <button>トップページへ</button>
    </>
  );
}
