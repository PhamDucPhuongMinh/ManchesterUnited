import React from "react";
import { Button, Form, Input } from "antd";
import { loginAPI } from "../../services";
import { tokenLocalStorage } from "../../utils";
import { handleShowMessage } from "../Message";
import { useNavigate } from "react-router-dom";

interface FormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: FormValues) => {
    const resultLoginApi = await loginAPI(values);
    if (resultLoginApi.result) {
      localStorage.setItem(tokenLocalStorage, resultLoginApi.data.token);
      handleShowMessage(
        "success",
        resultLoginApi.msg || "Đăng nhập thành công."
      );
      navigate("/dashboard");
    } else {
      handleShowMessage("error", resultLoginApi.msg || "Đăng nhập thất bại.");
    }
  };

  return (
    <div className="login">
      <h1 className="text-center mb-4">Login</h1>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
        className="mx-auto"
      >
        <Form.Item
          wrapperCol={{ span: 24 }}
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 24 }}
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className="mt-2 bg-danger"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
