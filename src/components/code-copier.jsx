import { Snackbar } from "@deriv-com/quill-ui";
import { useEffect, useState } from "react";

const CodeCopier = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const handleClick = (event) => {
      const textarea = event.target.closest(".code-area");

      if (textarea) {
        try {
          textarea.select();
          textarea.focus();
          document.execCommand("copy");
          setShowSnackbar(true);

          setTimeout(() => {
            setShowSnackbar(false);
          }, 3000);

          textarea.select();
        } catch (err) {
          console.error("Failed to copy: ", err);
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <Snackbar
      actionText=""
      isVisible={showSnackbar}
      message="Code copied to clipboard!"
      onCloseAction={() => setShowSnackbar(false)}
    />
  );
};

export default CodeCopier;
