export default function Footer() {
  return (
    <footer className="p-6 bg-background border-t">
      <div className="container mx-auto text-center text-sm text-gray-500">
        © {new Date().getFullYear()} QuestLog. All rights reserved.
      </div>
    </footer>
  );
}