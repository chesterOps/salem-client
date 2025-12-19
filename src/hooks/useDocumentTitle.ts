import { useEffect } from "react";

function useDocumentTitle(title: string | undefined) {
  useEffect(() => {
    // Store the original title to restore on cleanup
    const originalTitle = document.title;
    // Set the new document title
    document.title = title ? `${title} | Salem` : "Salem - Men's Fashion Store";
    // Cleanup function to restore original title
    return () => {
      document.title = originalTitle;
    };
  }, [title]);
  return null;
}

export default useDocumentTitle;
