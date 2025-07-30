import { PageHeader } from "@ant-design/pro-components";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    console.log("log out settings");
    navigate("/login");
  }

  return (
    <PageHeader
      title="Emp"
      subTitle="employee management system"
      onBack={() => window.history.back()}
      extra={[
        <Button onClick={() => navigate("/add-emp")}>Add Employee</Button>,
        <Button type="primary" onClick={handleLogout}>
          Logout
        </Button>,
      ]}
    />
  );
}
