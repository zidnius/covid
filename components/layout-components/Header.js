import { Icon, Layout } from 'antd'
const { Header } = Layout
import styled from 'styled-components'

const TriggerBlock = styled.div`
  display: inline-block;
  height: 100%;
  background:#d1d1d1;
`

export default ({ collapsed, handleToggle }) => {
  return (
    <Header
      style={{
        background: '#a1a1a1',
        padding: 0,
        boxShadow: '0 1px 4px rgba(0,21,41,.08)',
        display: 'flex'
      }}
    >
      <TriggerBlock>
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={handleToggle}
          style={{
            fontSize: 20,
            verticalAlign: 'middle',
            color:'#565656'
          }}
        />
      </TriggerBlock>
    </Header>
  )
}
