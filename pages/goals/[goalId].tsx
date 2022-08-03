import React from 'react';
import { useRouter } from 'next/router'; // routerオブジェクトにアクセスするためのフック

export default function Goal() {
  const router = useRouter();
  const { goalId } = router.query;
  return (
    <div>
      <h1>目標</h1>
      <div>id: {goalId}</div>
    </div>
  );
}
