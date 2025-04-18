// services/blogKeepAlive.js
export const keepAlive = (collection, id) => {
    const interval = setInterval(async () => {
      await updateDoc(doc(db, collection, id), {
        last_accessed: serverTimestamp()
      });
    }, 3600000); // 1 hour
  
    return () => clearInterval(interval);
  };
  
  // Usage in SinglePage:
  useEffect(() => {
    if (!blog) return;
    const cleanup = keepAlive(params.collection, params.id);
    return cleanup;
  }, [blog]);