import React from "react";
import { message } from "antd";

let handleShowMessage = (
  type: "error" | "success" | "warning",
  content: string,
  duration?: number
) => {};

const Message: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  handleShowMessage = (
    type: "success" | "error" | "warning",
    content: string,
    duration?: number
  ) => {
    messageApi.open({
      type,
      content,
      duration,
    });
  };

  return <>{contextHolder}</>;
};

export default Message;
export { handleShowMessage };
