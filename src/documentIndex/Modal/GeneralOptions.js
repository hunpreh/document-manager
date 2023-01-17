import { Radio, Space } from "antd";
import React, { useState } from "react";

const GeneralOptions = ({category}) => {
  const [value, setValue] = useState(category);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        <Radio value={"GENERAL"}>General</Radio>
        <Radio value={"REGISTROS"}>Registros</Radio>
        <Radio value={"CANCELADOS"}>Cancelados</Radio>
        <Radio value={"DEROGADOS"}>Derogados</Radio>
      </Space>
    </Radio.Group>
  );
};
export default GeneralOptions;
