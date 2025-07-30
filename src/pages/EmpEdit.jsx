import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Spin, Alert, Card } from "antd";
import { useEmployee, useUpdateEmployee } from "../hooks/employeeHook";
import { useEffect } from "react";

export default function EmpEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data, isLoading, error } = useEmployee(id);
  const { mutate: updateEmployee, isPending } = useUpdateEmployee(id);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        email: data.email,
      });
    }
  }, [data, form]);

  if (isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin tip="Loading employee..." />
      </div>
    );
  }

  if (error) {
    return <Alert type="error" message="Error loading employee data" />;
  }

  const onFinish = (values) => {
    const updatedData = values;

    updateEmployee(
      { id, updatedData },
      {
        onSuccess: () => {
          navigate("/");
        },
        onError: () => {
          alert("Failed to update employee.");
        },
      }
    );
  };

  return (
    <Card title="Edit Employee" style={{ maxWidth: 600, margin: "auto" }}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter an email" },
            { type: "email", message: "Invalid email format" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
