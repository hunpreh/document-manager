import React, { Fragment, useState } from "react";
import { Layout, Row, Col, Typography } from "antd";
import "./layout.css";
import proanLogo from "../assets/proan_logo.png";
import { useLocation } from "react-router-dom";

import MenuNav from "./MenuNav.js";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const AppLayout = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const currentPage = pathSnippets.slice(0, 1)[0];

  const onCollapseHandler = (toggle) => {
    setCollapsed(toggle);
  };

  if (currentPage === "ckeditor")
    return <Fragment>{props.children}</Fragment>;

  return (
    <Layout className={"layout-site"}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapseHandler}>
        <Row type="flex" justify="center">
          <Col align="middle">
            <img src={proanLogo} alt="logo Proan" className={"layout-logo"} />
          </Col>
        </Row>
        <MenuNav />
      </Sider>

      <Layout className={"site_layout"}>
        <Header className={"layout-header"}>
          <Title
            className={"layout-title"}
            level={3}
            ellipsis={true}
            style={{ color: "white" }}
          >
            Editor de Documentos SGD
          </Title>
        </Header>

        <Content className={"layout-content"}>
          <div className={"layout-card flex-overflow"}>
            <div className={"flex-overflow"}>{props.children}</div>
          </div>
        </Content>

        <Footer className={"layout-footer"}>
          PROAN ©{new Date().getFullYear()} Created by Humberto Gutierrez
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
