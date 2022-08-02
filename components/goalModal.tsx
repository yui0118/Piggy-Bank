import { useState } from "react";
import {
  TextInput,
  Button,
  Group,
  Box,
  NumberInput,
  Modal,
} from "@mantine/core";
import { useForm } from "@mantine/form";

type Form = {
  newGoal: string;
  maximumAmount: number;
};

type Props = {
  onAddGoals: (goal: string) => void;
  opened: boolean;
  onClose: (close: boolean) => void;
};
export default function GoalModal({ onAddGoals, opened, onClose }: Props) {
  const [newGoal] = useState<string>("");
  const form = useForm<Form>({
    validateInputOnChange: ["newGoal", "maximumAmount"],
    initialValues: {
      newGoal: "",
      maximumAmount: 1000,
    },

    validate: (values) => ({
      newGoal:
        values.newGoal.length === undefined
          ? "目標は、入力必須項目です"
          : values.newGoal.length >= 2
          ? null
          : "目標は、2文字以上で入力してください",
      maximumAmount:
        values.maximumAmount === undefined
          ? "使用できる金額は、入力必須項目です"
          : values.maximumAmount < 1000
          ? "使用できる金額の入力は、1,000円以上でお願いします"
          : values.maximumAmount > 10000000
          ? "使用できる金額の入力上限は、10,000,000円です。"
          : null,
    }),
  });

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
          // console.log(form.errors);
          onAddGoals(newGoal);
          form.reset;
          onClose(false);
          console.log("stateの中身を見てみる", newGoal);
        })}
      >
        <TextInput
          required
          label="目標"
          placeholder="達成したい目標"
          {...form.getInputProps("newGoal")}
        />

        <NumberInput
          required
          mt="md"
          label="使用できる金額(1000円以上)"
          placeholder="1000"
          min={1000}
          max={10000000}
          {...form.getInputProps("maximumAmount")}
        />

        <Group position="right" mt="md">
          <Button
            type="submit"
            variant="gradient"
            gradient={{ from: "teal", to: "lime", deg: 105 }}
            onClick={() => {
              // onAddGoals(newGoal);
              // form.reset;
              // onClose(false);
            }}
          >
            保存
          </Button>
        </Group>
      </form>
    </Box>
  );
}

// export const Modal = ({ onAddGoals }: any) => {
//   const [newGoal, setNewGoal] = useState<string>("");
//   const [maximumAmount, setMaximumAmount] = useState<number>(0);
//   return (
//     <>
//       <form>
//         <div>
//           <label>達成したい目標</label>
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="目標を入力"
//             value={newGoal}
//             onChange={(e) => setNewGoal(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>目標に投資できる金額</label>
//         </div>
//         <div>
//           <input
//             type="number"
//             value={maximumAmount}
//             onChange={(e) => {
//               const value: number = Number(e.target.value);
//               setMaximumAmount(value);
//             }}
//           />
//         </div>

//         <button onClick={() => onAddGoals(newGoal)}>目標を作成</button>
//       </form>
//     </>
//   );
// };
