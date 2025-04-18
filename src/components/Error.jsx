export default function Error({ message }) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded">
        <p>Error: {message}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 rounded"
        >
          Retry
        </button>
      </div>
    );
  }