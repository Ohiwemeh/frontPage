export default function ErrorFallback({ error }) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Error loading content</h1>
        <p className="mt-2 text-red-500">{error.message}</p>
      </div>
    );
  }