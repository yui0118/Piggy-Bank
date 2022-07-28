import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import Goals from "../components/goals";
import Welcome from "../components/welcome";
import { Modal } from "../components/modal";

const Home: NextPage = () => {
  const [goals, setGoals] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <>
      {goals.length > 0 ? <Goals goals={goals} /> : <Welcome />}
      {isModalOpen ? (
        <Modal onAddGoals={(goal: string) => setGoals([...goals, goal])} />
      ) : (
        <button>目標を入力</button>
      )}
    </>
  );
};

export default Home;
