import {
  LockOutlined,
  MobileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Divider, Space, Tabs, message, theme, ConfigProvider } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import './App.css'

import {BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Homepage from './Homepage';

type LoginType = 'account' | 'phone';

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const App: React.FC = () => {

  const [loginType, setLoginType] = useState<LoginType>('account');
  const { token } = theme.useToken();

  // const navigate = useNavigate();
  const save = async (values: any) => {
    console.log(values);
  }
  // const onFinish = async (values: any) => {
  //   await save(values);
  //   navigate('/');
  // }


  return (
    <div
      style={{
        backgroundColor: 'rgba(50, 50, 50, 1)',
        height: '100vh',
      }}
    >
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              itemColor: 'rgba(255, 255, 255, 0.8)',
              itemActiveColor: '#099E64',
              itemSelectedColor: '#0BBD78',
              itemHoverColor: '#0DE491',
              inkBarColor: '#0BBD78'
            },

          }
        }}
      >
        <LoginFormPage
          backgroundImageUrl="https://s2.loli.net/2024/03/09/gbXerZBKy6HizEA.png"
          logo={<img src={"https://s2.loli.net/2024/03/09/3sapWQjuSxTUBwM.png"}
                     style={{width: '120px', height: '120px', marginLeft: '-60px', marginTop: '-20px'}}/>}
          title="Book Store"
          containerStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(4px)',
            borderRadius: '10%',
            boxShadow: '14px 14px 10px rgba(0, 0, 0, 0.2)',

          }}
          subTitle="by lostgeek"
          //onFinish={onFinish}
        >

          <Tabs
            animated={{inkBar: true, tabPane: true}}
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={'account'} tab={'账号密码登录'}/>
            <Tabs.TabPane key={'phone'} tab={'手机号登录'}/>
          </Tabs>
          {loginType === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: (
                    <UserOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={'prefixIcon'}
                    />
                  ),
                }}
                placeholder={'用户名'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: (
                    <LockOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={'prefixIcon'}
                    />
                  ),
                }}
                placeholder={'密码'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </>
          )}
          {loginType === 'phone' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: (
                    <MobileOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={'prefixIcon'}
                    />
                  ),
                }}
                name="mobile"
                placeholder={'手机号'}
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: (
                    <LockOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={'prefixIcon'}
                    />
                  ),
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'获取验证码'}`;
                  }
                  return '获取验证码';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
                onGetCaptcha={async () => {
                  message.success('获取验证码成功！验证码为：1234');
                }}
              />
            </>
          )}
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <span className={'links'}>
              <a className={'link'}>
                立即注册
              </a>
              <a className={'link'}>
                忘记密码
              </a>
            </span>

          </div>
        </LoginFormPage>
      </ConfigProvider>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <App />
    </ProConfigProvider>
  );
};