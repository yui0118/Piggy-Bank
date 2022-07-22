import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";

const Home: NextPage = () => {
  const [havingGoals, setHavingGoals] = useState(false);
  return (
    <>
      {!havingGoals ? (
        <>
          <h1>自己投資貯金箱</h1>
          <p>
            自己投資貯金箱は、「達成したい目標に対していくら投資したのか」を可視化できるサービスです！
          </p>
          {/* 豚の貯金箱の画像を挿入 */}
          <p>早速目標を入力して、自己投資貯金を始めましょう!!</p>
          <button onClick={() => setHavingGoals(true)}>目標を入力</button>
        </>
      ) : (
        <>
          <h1>目標一覧</h1>
          <button onClick={() => setHavingGoals(false)}>トップページへ</button>
        </>
      )}
    </>
  );
};

export default Home;
