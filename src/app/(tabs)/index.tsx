import { View } from "react-native";
import { StepCards } from "../../components/StepsCards";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-100">
      <Header/>
     <StepCards/>
    </View>
  );
}