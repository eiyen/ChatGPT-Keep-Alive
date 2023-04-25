// ==UserScript==
// @name                ChatGPT Keep-Alive
// @namespace           https://github.com/eiyen
// @version             1
// @description:zh-CN   每隔30秒自动发送一次请求到ChatGPT，防止出现错误提示: "Something went wrong. If this issue persists, please contact us through our helper center at help.openai.com."
// @description:en      Automatically ping ChatGPT every 30 seconds to prevent the error message: "Something went wrong. If this issue persists, please contact us through our helper center at help.openai.com."
// @homepage            宇吾
// @match               https://chat.openai.com/*
// ==/UserScript==

(() => {
  "use strict";

  // Helper function to check if user is on the chat page
  const isUserOnChatPage = () => {
    const navSelector = "nav>a.flex";
    const buttonSelector = "button.justify-center";

    return (
      document.querySelector(navSelector) ||
      document.querySelector(buttonSelector)
    );
  };

  // Function to ping ChatGPT API every 30 seconds
  const pingChatGPT = () => {
    const apiEndpoint = `/api/auth/session`;

    // Request session data from the API
    fetch(apiEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };

  // Main function to initialize the script
  const main = () => {
    setInterval(() => {
      if (isUserOnChatPage()) {
        pingChatGPT();
      }
    }, 1000 * 30);
  };

  main();
})();