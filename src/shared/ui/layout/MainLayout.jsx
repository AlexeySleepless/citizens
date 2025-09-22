import { Button, Layout, Menu } from "antd";
import { useState } from "react";
import { Outlet } from "react-router"
import classes from "./MainLayout.module.css"
import { MenuOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

export const MainLayout = ({itemsProps}) => {
    const [collapsed, setCollapsed] = useState(true);
    const closeSider = () => {
        if(!collapsed){
            setCollapsed(true);
        }
    }
    const openSider = () => {
        setCollapsed(false)
    }
    
    const asideItems = itemsProps.map(item => ({
        key: item.label,
        ...item,
        onClick: (event) => {
            item.onClick(event);
            //при выборе элемента навигации закрываем окно навигации
            closeSider();
        }
    }));


    return(
        <Layout className={classes.layout}>
            <Sider
                trigger = {null}
                collapsible
                collapsed={collapsed}
                theme="light"
                onCollapse={(value) => setCollapsed(value)}
                width={250}
                collapsedWidth={0}
                className={classes.sider}
            >
                <Menu
                    theme="light"
                    mode="inline"
                    className={classes.siderMenu}
                    items={asideItems}
                />
            </Sider>
            <Layout onClick={closeSider} className={classes.contentLayout}>
                {!collapsed&&
                    <div 
                        className={classes.shadow}
                        role="button"
                        aria-label="Закрыть меню навигации"
                    >
                    </div>}
                <Header className={classes.header}>
                    <Button
                        onClick={openSider}
                        type="primary"
                        shape="circle"
                        size="large"
                        icon={<MenuOutlined/>}
                        aria-label="Окрыть меню навигации"
                    />
                </Header>
                <Content className = {classes.content}>
                    <div className = {classes.contentBlock}>
                      <Outlet/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}