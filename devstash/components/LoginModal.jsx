import { SignIn } from "@clerk/nextjs";

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-xl relative">
        <button onClick={onClose} className="absolute top-2 right-4 text-xl">×</button>
        <SignIn />
      </div>
    </div>
  );
}