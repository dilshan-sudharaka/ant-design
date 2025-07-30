import { Form, Input, Button, Card, message } from "antd";
import { useState } from "react";
import { loginUser } from "../services/authService"; // adjust path as needed
import { useNavigate } from "react-router-dom"; // for redirection

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // hook to redirect

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const user = await loginUser(values); // calls the API
      message.success(`Welcome back, ${user.name || user.email}!`);
      navigate("/dashboard"); // or wherever you want to go after login
    } catch (error) {
      message.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: "40px auto" }}>
      <Form
        name="login-form"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Log In
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
