export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-full w-full bg-gray-200">{children}</div>;
}
