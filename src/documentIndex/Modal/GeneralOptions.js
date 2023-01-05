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
        <Radio value={"general"}>General</Radio>
        <Radio value={"registros"}>Registros</Radio>
        <Radio value={"cancelados"}>Cancelados</Radio>
        <Radio value={"derogados"}>Derogados</Radio>
      </Space>
    </Radio.Group>
  );
};
export default GeneralOptions;
