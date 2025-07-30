import { useParams } from "react-router-dom";
import { useEmployee } from "../hooks/employeeHook";
import { Card, Descriptions, Spin, Alert, Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function EmpDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useEmployee(id);

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
        <Spin tip="Loading employee..." size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message="Error" description={error.message} type="error" />;
  }

  return (
    <Card
      title={`Employee Details - ${data.name}`}
      extra={<Button onClick={() => navigate(-1)}>Back</Button>}
      style={{ maxWidth: 600, margin: "0 auto" }}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{data.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
