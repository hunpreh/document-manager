import { Radio, Space, Button, Tooltip } from "antd";
import React, { Fragment, useState } from "react";

const generalTitle =
  "Los documentos contenidos tendrán seguridad y control del administrador.";
const registrosTitle =
  "Los documentos contenidos no requeriran ningun permiso del administrador";
const canceladosTitle = "Los documentos contenidos se cancelarán";
const derogadosTitle =
  "Los documentos contenidos se moverán al Nivel de Derogados";

const GeneralOptions = ({
  category,
  updateCategory = () => {},
  closeModal = () => {},
}) => {
  const [value, setValue] = useState(category);
  const [loading, setLoading] = useState(false);

  const onClickHandler = () => {
    setLoading(true);
    setTimeout(() => {
      updateCategory(value);
      setLoading(false);
      closeModal();
    }, 3000);
  };

  return (
    <Fragment>
      <Radio.Group
        onChange={({ target }) => {
          setValue(target.value);
        }}
        value={value}
      >
        <Space direction="vertical">
          <Radio value={"GENERAL"}>
            <Tooltip placement="right" title={generalTitle}>
              General
            </Tooltip>
          </Radio>
          <Radio value={"REGISTROS"}>
            <Tooltip placement="right" title={registrosTitle}>
              Registros
            </Tooltip>
          </Radio>
          <Radio value={"CANCELADOS"}>
            <Tooltip placement="right" title={canceladosTitle}>
              Cancelados
            </Tooltip>
          </Radio>
          <Radio value={"DEROGADOS"}>
            <Tooltip placement="right" title={derogadosTitle}>
              Derogados
            </Tooltip>
          </Radio>
        </Space>
      </Radio.Group>
      <div className="center">
        <Button
          type="primary"
          shape="round"
          loading={loading}
          onClick={onClickHandler}
          style={{ marginTop: 20, width: 200}}
          disabled={value === category}
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </Fragment>
  );
};
export default GeneralOptions;
