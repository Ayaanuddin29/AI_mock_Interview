import { useEffect } from "react";

const TawkToChat = () => {
  useEffect(() => {
    // Ensure script runs only on client side
    if (typeof window !== "undefined") {
      var Tawk_API = Tawk_API || {},
        Tawk_LoadStart = new Date();
      (function () {
        var s1 = document.createElement("script");
        s1.async = true;
        s1.src = "https://embed.tawk.to/67e2753bf95a2519093a5586/1in69jtgj";
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");
        document.body.appendChild(s1);
      })();
    }
  }, []);

  return null; // No UI element needed
};

export default TawkToChat;
