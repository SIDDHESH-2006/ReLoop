import { Button } from "../components/ui";
import { RadialEmblem } from "../components/effects";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 pt-40 pb-24 text-center">
      <RadialEmblem size={120} />
      <h1 className="mt-8 font-display text-7xl font-extrabold uppercase">404</h1>
      <p className="mt-3 text-muted-foreground">This page found its next life somewhere else.</p>
      <Button to="/" className="mt-8">Back home</Button>
    </div>
  );
}
