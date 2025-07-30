import { Button, Card, Form, Input } from "antd";
import { useCreateEmployee } from "../hooks/employeeHook";
import { useNavigate } from "react-router-dom";

export default function AddEmp() {
  const [form] = Form.useForm();
  const { mutate: addEmployee, isPending } = useCreateEmployee();
  const navigate = useNavigate();

  const onFinish = (values) => {
    addEmployee(values, {
      onSuccess: () => {
        form.resetFields();
        navigate("/");
      },
      onError: (error) => {
        throw new Error(error);
      },
    });
  };
  return (
    <Card title="Add Employee" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Name is required" },
            { min: 3, message: "Name must be more than 3 characters" },
          ]}
        >
          <Input placeholder="enter your name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Enter valid email address" },
          ]}
        >
          <Input placeholder="enter your email" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isPending}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
