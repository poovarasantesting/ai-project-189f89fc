import { Toaster } from "@/components/ui/toaster";
import { UserForm } from "@/components/UserForm";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center p-6">
      <UserForm />
      <Toaster />
    </div>
  );
}