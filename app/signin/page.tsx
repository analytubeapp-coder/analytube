import { Suspense } from "react";
import SignInInner from "./SignInInner";

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInInner />
    </Suspense>
  );
}