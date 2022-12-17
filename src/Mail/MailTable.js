import { Button, Table, Space, Tooltip, Divider } from "antd";
import {
  StarOutlined,
  ReloadOutlined,
  MoreOutlined,
  ContainerOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
  MailOutlined,
  CheckCircleOutlined,
  LoginOutlined,
  TagOutlined,
} from "@ant-design/icons";
import React, { Fragment, useState } from "react";

const data = [];
for (let i = 1; i < 11; i++) {
  data.push({
    key: i,
    id: i,
    name: `Edward King ${i}`,
    date: `Dic ${i}`,
    asunto: `Titulo del correo`,
    contenido:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nisi omnis rerum ea porro. Molestiae perspiciatis quis officiis, accusamus, doloremque laudantium maxime ut quam facilis a explicabo esse corrupti quisquam.",
  });
}

const MailTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [onHover, setOnHover] = useState();
  const [rowI, setRowI] = useState();

  const columns = [
    {
      dataIndex: "key",
      title: () => {
        if (hasSelected) {
          return (
            <Space className={!hasSelected ? "app-hide" : "mail_actions"}>
              <Tooltip title="Archivar">
                <Button
                  shape="circle"
                  icon={<ContainerOutlined />}
                  className="mail_btn"
                />
              </Tooltip>
              <Tooltip title="Marcar como spam">
                <Button
                  shape="circle"
                  icon={<ExclamationCircleOutlined />}
                  className="mail_btn"
                />
              </Tooltip>
              <Tooltip title="Eliminar">
                <Button
                  shape="circle"
                  icon={<DeleteOutlined />}
                  className="mail_btn"
                />
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="Marcar como no leido">
                <Button
                  shape="circle"
                  icon={<MailOutlined />}
                  className="mail_btn"
                />
              </Tooltip>
              <Tooltip title="Posponer">
                <Button
                  shape="circle"
                  icon={<ClockCircleOutlined />}
                  className="mail_btn"
                />
              </Tooltip>
              <Tooltip title="Aniadir tareas">
                <Button
                  shape="circle"
                  icon={<CheckCircleOutlined />}
                  className="mail_btn"
                />
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="Mover a">
                <Button
                  shape="circle"
                  icon={<LoginOutlined />}
                  className="mail_btn"
                />
              </Tooltip>
              <Tooltip title="Etiquetas">
                <Button
                  shape="circle"
                  icon={<TagOutlined />}
                  className="mail_btn"
                />
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="Mas opciones">
                <Button
                  shape="circle"
                  icon={<MoreOutlined />}
                  className="mail_btn"
                />
              </Tooltip>
            </Space>
          );
        } else {
          return (
            <Space className={hasSelected ? "app-hide" : "mail_actions"}>
              <Tooltip title="Actualizar">
                <Button
                  shape="circle"
                  icon={<ReloadOutlined />}
                  className="mail_btn"
                />
              </Tooltip>
              <Tooltip title="Mas opciones">
                <Button
                  shape="circle"
                  icon={<MoreOutlined />}
                  className="mail_btn"
                />
              </Tooltip>
            </Space>
          );
        }
      },
      colSpan: 3,
      onCell: () => {
        return { rowSpan: 0 };
      },
    },
    {
      dataIndex: "name",
      width: "15%",
      ellipsis: true,
      render: (_, { name }) => (
        <Space>
          <Tooltip title="Favorito">
            <Button
              shape="circle"
              icon={<StarOutlined />}
              className="mail_btn"
            />
          </Tooltip>
          <span>{name}</span>
        </Space>
      ),
    },
    {
      dataIndex: "asunto",
      width: "55%",
      render: (_, { asunto, contenido }) => (
        <Fragment>
          <p className="ellipsis">
            <strong>{asunto}</strong> - {contenido}
          </p>
        </Fragment>
      ),
      onCell: () => {
        return { colSpan: 2 };
      },
      ellipsis: true,
    },
    {
      dataIndex: "date",
      width: "15%",
      render: (_, { date }, index) => {
        if (!hasSelected && index === rowI && onHover) {
          return (
            <Space className="mail_row">
              <Tooltip title="Archivar">
                <Button
                  shape="circle"
                  icon={<ContainerOutlined />}
                  className="mail_btn"
                />
              </Tooltip>
              <Tooltip title="Eliminar">
                <Button
                  shape="circle"
                  icon={<DeleteOutlined />}
                  className="mail_btn"
                />
              </Tooltip>
              <Tooltip title="Marcar como no leido">
                <Button
                  shape="circle"
                  icon={<MailOutlined />}
                  className="mail_btn"
                />
              </Tooltip>
              <Tooltip title="Posponer">
                <Button
                  shape="circle"
                  icon={<ClockCircleOutlined />}
                  className="mail_btn"
                />
              </Tooltip>
            </Space>
          );
        } else return <p>{date}</p>;
      },
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    //console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Fragment>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        scroll={{
          y: 350,
        }}
        onRow={(record, rowIndex) => {
          return {
            onMouseEnter: (event) => {
              setRowI(rowIndex);
              setOnHover(true);
            }, // mouse enter row
            onMouseLeave: (event) => {
              setRowI("");
              setOnHover(false);
            }, // mouse leave row
          };
        }}
      />
    </Fragment>
  );
};
export default MailTable;
