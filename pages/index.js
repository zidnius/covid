
import 'ant-design-pro/lib/Charts/style/index.less'
import Head from 'next/head'
import {
  ColStyled,
  DataTable,
} from '../components/dashboard-components'
import { Button, Row, Select } from 'antd'

import { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import Error from 'next/error'
import api from '../api'

const Dashboard = () => {
  const [listProvince, setListProvince] = useState([])
  const [listCity, setListCity] = useState([])
  const [keyProvince, setKeyProvince] = useState()
  const [keyCity, setKeyCity] = useState("KAB. PIDIE")
  const [faskes, setFaskes] = useState([])

  const [loading, setLoading] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provincePromise = api.post(
          `/get-province`
        )

        const [
          { data: rawProvince }
        ] = await Promise.all([
          provincePromise
        ])

        setListProvince(rawProvince.results)
      } catch (e) {
        const { statusCode, message } = e.response.data
        setError({
          statusCode,
          message
        })
      }
      setLoading(c => c + 1)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cityPromise = api.post(
          `/get-city`, { start_id: keyProvince }
        )

        const [
          { data: rawCity },
        ] = await Promise.all([
          cityPromise,
        ])

        setListCity(rawCity.results)
      } catch (e) {
        console.log(e);
      }
      setLoading(c => c + 1)
    }

    if (keyProvince) {
      fetchData()
    }
  }, [keyProvince])

  const fetchFaskes = async () => {
    try {
      let queryParam = ''
      if (keyProvince && keyCity) {
        queryParam = `province=${keyProvince}&city=${keyCity}`
      } else if (keyCity) {
        queryParam = `city=${keyCity}`
      } else if (keyProvince) {
        queryParam = `province=${keyProvince}`
      } else {
        return
      }
      const faskesPromise = api.get(
        `/get-faskes-vaksinasi?${queryParam}`
      )

      const [
        { data: rawFaskes },
      ] = await Promise.all([
        faskesPromise,
      ])
      let data = rawFaskes.data
      data.forEach((_, index) => {
        data[index].total1 = _.detail.length > 0 ? _.detail.reduce((a, b) => a + b.divaksin_1, 0) : 0
        data[index].total2 = _.detail.length > 0 ? _.detail.reduce((a, b) => a + b.divaksin_2, 0) : 0
        data[index].total = _.detail.length > 0 ? _.detail.reduce((a, b) => a + b.divaksin, 0) : 0
      })
      setFaskes(rawFaskes.data)
      setLoading(c => c + 1)
    } catch (e) {
      console.log(e);
    }
  }

  if (loading < 1) return <Loading />
  if (error)
    return <Error statusCode={error.statusCode} title={error.message} />
  return (
    <>
      <Head>
        <title>Dashboard - Covid</title>
      </Head>
      <Row gutter={16}>
        <ColStyled>
          <Row justify="center" align="middle" gutter={12}>
            <ColStyled xs={24} md={8}>
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Cari Provinsi"
                optionFilterProp="children"
                onChange={(val) => { setKeyProvince(val) }}
              >
                {listProvince?.map((item, index) => (
                  <Select.Option value={item.key} key={index}>{item.value}</Select.Option>
                ))}
              </Select>
            </ColStyled>
            <ColStyled xs={24} md={8}>
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Cari Kota/Kabupaten"
                optionFilterProp="children"
                onChange={(val) => { setKeyCity(val) }}
              >
                {listCity?.map((item, index) => (
                  <Select.Option value={item.key} key={index}>{item.value}</Select.Option>
                ))}
              </Select>
            </ColStyled>
            <ColStyled xs={24} md={8}>
              <Button style={{ width: '100%' }} onClick={fetchFaskes}>Cari</Button>
            </ColStyled>
          </Row>
        </ColStyled>
        <ColStyled >
          <DataTable data={faskes} />
        </ColStyled>
      </Row>
    </>
  )
}

export default Dashboard
