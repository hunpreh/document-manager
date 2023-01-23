import { Button, Transfer, Switch, Space, Divider, Select } from "antd";
import React, { Fragment, useEffect, useState } from "react";

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

const options = [
  {
    value: "r",
    title: "Permiso de lectura",
    label: "Lectura",
  },
  {
    value: "w",
    title: "Permiso de escritura",
    label: "Escritura",
  },
  {
    value: "wr",
    title: "Permiso de ejecución",
    label: "Ejecución",
  },
  {
    value: "a",
    title: "Todos los permisos",
    label: "Completo",
  },
];

const borderless = { border: "none" };

const SecurityPermissions = ({ isLeaf, closeModal = () => {} }) => {
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [showSearch, setShowSearch] = useState(true);
  const [option, setOption] = useState(false);
  const [change, setChange] = useState(false);

  const getMock = () => {
    const tempTargetKeys = [];
    const tempMockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `usuario ${i + 1}`,
        description: option,
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
    if (option) getMock();
    else if (!isLeaf) getMock();
  }, [option]);

  const handleChange = (newTargetKeys) => {
    setChange(true);
    setTargetKeys(newTargetKeys);
  };

  return (
    <Fragment>
      <Space align="center" size="small" style={{ marginBottom: "15px" }}>
        <Switch
          defaultChecked={showSearch}
          checkedChildren={"Barra de búsqueda"}
          unCheckedChildren={"Barra de búsqueda"}
          onChange={(x) => {
            setShowSearch(x);
          }}
        />
        {isLeaf && (
          <Fragment>
            <Divider type="vertical" />
            <Select
              size="small"
              bordered={false}
              placeholder="Permisos"
              style={{
                width: 100,
              }}
              onChange={(value) => {
                setOption(value);
              }}
              options={options}
            />
          </Fragment>
        )}
        <Divider type="vertical" />
        <Button
          size="small"
          style={borderless}
          onClick={getMock}
          disabled={!option && isLeaf}
        >
          Actualizar Información
        </Button>
        <Divider type="vertical" />
        <Button
          size="small"
          style={borderless}
          onClick={closeModal}
          disabled={!change}
        >
          Guardar
        </Button>
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
