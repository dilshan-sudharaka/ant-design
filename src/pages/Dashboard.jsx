import { Alert, Button, Space, Spin, Table } from "antd";
import { useDeleteEmployee, useEmployees } from "../hooks/employeeHook";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { data, isLoading, error } = useEmployees();
  const { mutate: deleteEmployee, isPending: isDeleting } = useDeleteEmployee();
  const navigate = useNavigate();

  function handleDelete(id) {
    deleteEmployee(id, {
      onSuccess: () => {
        Alert("Employee delete successfully");
      },
      onError: (error) => {
        throw new Error(error);
      },
    });
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            onClick={() => navigate(`/emp-details/${record.id}`)}
          >
            View
          </Button>
          <Button
            size="small"
            onClick={() => navigate(`/emp-edit/${record.id}`)}
          >
            Update
          </Button>
          <Button
            size="small"
            danger
            isLoading={isDeleting}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div
        style={{
          height: "100vh", // Full viewport height
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin tip="Data loading..." size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert message="Error" description="error fetching data" type="error" />
    );
  }

  return (
    <div>
      <h2>All Employees</h2>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
