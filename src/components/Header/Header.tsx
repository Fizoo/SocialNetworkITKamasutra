import React from 'react';
import s from './Header.module.css';
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {logout} from "../../redux/auth-reducer";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";


const { Header} = Layout;


const AppHeader: React.FC = (props) => {

    const  dispatch =useDispatch()
    const login=useSelector((state:AppStateType)=>state.auth.login)
    const isAuth=useSelector((state:AppStateType)=>state.auth.isAuth)
    const logouted=()=>dispatch(logout())


    return <Header className="header">
        <Row>
            <Col span={18}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">
                        <Link to="users">Developers</Link>
                    </Menu.Item>
                </Menu>
            </Col>
            {isAuth
                ?<> <Col span={1}>
                    <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                </Col>
                <Col span={5}>
                    <Button onClick={logouted}>Log out</Button>
                </Col>
                </>
                :<Col span={6}>
                    <Button>
                        <Link to={'/login'}>Login</Link>
                    </Button>
                </Col>
            }
        </Row>
    </Header>
}
export default AppHeader;
