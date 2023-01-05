import { Button, Transfer, Switch, Space, Divider } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";

const locale = {
  itemUnit: "usuario",
  itemsUnit: "usuarios",
  notFoundContent: "Sin datos",
  searchPlaceholder: "Buscar usuario",
  selectAll: "Seleccionar todo",
  selectCurrent: "Seleccionar esta pagina",
  selectInvert: "Invertir seleccion",
  remove: "Quitar",
  removeAll: "Quitar todos",
  removeCurrent: "Quitar esta pagina",
  titles: ["Sin Acceso", "Con Acceso"],
};

const SecurityPermissions = () => {
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [showSearch, setShowSearch] = useState(true);

  const getMock = () => {
    const tempTargetKeys = [];
    const tempMockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `usuario ${i + 1}`,
        description: `descripcion`,
        chosen: i % 2 === 0,
      };
      if (data.chosen) {
        tempTargetKeys.push(data.key);
      }
      tempMockData.push(data);
    }
    setMockData(tempMockData);
    setTargetKeys(tempTargetKeys);
  };

  useEffect(() => {
    getMock();
  }, []);

  const handleChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };

  return (
    <Fragment>
      <Space align="center" size='small' style={{ marginBottom: "15px" }}>
        <Button
          size="small"
          shape="round"
          icon={<ReloadOutlined />}
          onClick={getMock}
        >
          Actualizar
        </Button>
        <Divider type='vertical' />
        <Button
          size="small"
          shape="round"
          onClick={() => {alert("Guardado")}}
        >
          Guardar Cambios
        </Button>
        <Divider type='vertical' />
        <Switch
          defaultChecked={showSearch}
          checkedChildren={"Barra de búsqueda"}
          unCheckedChildren={"Barra de búsqueda"}
          onChange={(x) => {
            setShowSearch(x);
          }}
        />
      </Space>
      <Transfer
        dataSource={mockData}
        targetKeys={targetKeys}
        showSearch={showSearch}
        listStyle={{
          width: 300,
          height: 300,
        }}
        onChange={handleChange}
        render={(item) => `${item.title} - ${item.description}`}
        pagination
        locale={locale}
      />
    </Fragment>
  );
};
export default SecurityPermissions;
