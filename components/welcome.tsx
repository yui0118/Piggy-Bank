import { useState } from "react";

export default function Welcome() {
  return (
    <>
      <h1>自己投資貯金箱</h1>
      <p>
        自己投資貯金箱は、「達成したい目標に対していくら投資したのか」を可視化できるサービスです！
      </p>
      {/* 豚の貯金箱の画像を挿入 */}
      <p>早速目標を入力して、自己投資貯金を始めましょう!!</p>
    </>
  );
}