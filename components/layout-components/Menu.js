import { Menu } from 'antd'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getUser } from '../../api/user'

const keys = ['/materi', '/tugas', '/user', '/pelajaran', '/pengajar', '/kelas', '/']


export default ({ style, closeDrawer }) => {
  const [data, setData] = useState([])
  const router = useRouter()
  const currentPath = router.route
  let selectedKeys = []
  let menu = [
    <Menu.Item key={keys[0]}>
      <Link href={keys[0]}>
        <a>
          <span>Materi</span>
        </a>
      </Link>
    </Menu.Item>,
    <Menu.Item key={keys[1]}>
      <Link href={keys[1]}>
        <a>
          <span>Tugas</span>
        </a>
      </Link>
    </Menu.Item>
  ]

  if (data?.tipe && data.tipe === 'admin' || data?.tipe && data.tipe === 'guru') {
    menu.push(...[
      <Menu.Item key={keys[2]}>
        <Link href={keys[2]}>
          <a>
            <span>User</span>
          </a>
        </Link>
      </Menu.Item>,
      <Menu.Item key={keys[3]}>
        <Link href={keys[3]}>
          <a>
            <span>Pelajaran</span>
          </a>
        </Link>
      </Menu.Item>,
      <Menu.Item key={keys[4]}>
        <Link href={keys[4]}>
          <a>
            <span>Pengajar</span>
          </a>
        </Link>
      </Menu.Item>,
      <Menu.Item key={keys[5]}>
        <Link href={keys[5]}>
          <a>
            <span>Kelas</span>
          </a>
        </Link>
      </Menu.Item>
    ]
    )
  }

  for (let i = keys.length - 1; i >= 0; i--) {
    if (currentPath.includes(keys[i])) {
      selectedKeys = [keys[i]]
      break
    }
  }

  async function getData() {
    await getUser()
    let result = await localStorage.getItem('user')
    result = JSON.parse(result)
    setData(result)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={selectedKeys}
      style={{ ...style, padding: '16px 0' }}
      onClick={({ key }) => {
        closeDrawer()
        router.push(key)
      }}
    >
      {menu}
    </Menu>
  )
}
