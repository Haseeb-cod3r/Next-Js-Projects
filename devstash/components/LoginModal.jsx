import { SignIn } from "@clerk/nextjs";

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-[2px] animate-[fadeSlideIn_150ms_ease-out]">
      <div className="bg-white p-6 rounded-2xl relative shadow-2xl animate-[modalPop_200ms_ease-out]">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl text-ink-muted hover:text-ink transition-colors duration-150 hover:rotate-90 duration-200"
        >
          ×
        </button>
        <SignIn />
      </div>
    </div>
  );
}