import React from "react";
import {Text, View} from '@tarojs/components'
import {Button, DatetimePicker, Table, Toast} from '@antmjs/vantui'
import './index.less'
import {calc, getCurrentLocation, getCurrentTimeStr, getCurrentZone} from "../../utils";
import dayjs from "dayjs";
import Taro from "@tarojs/taro";


export default class Index extends React.Component {

  state = {
    locationLoading: true,
    location: {
      latitude: null,
      longitude: null
    },

    date: new Date(),
    dataSource: [] // 日出日落结果
  }

  componentDidMount() {
    console.log('index componentDidMount')
    getCurrentLocation().then(rs => {
      this.setState({location: rs}, this.calc)
    }).catch(e => {
      Toast.show({
        type: 'fail',
        message: e.errMsg
      })
    }).finally(() => {
      this.setState({locationLoading: false})
    })


  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  calc = () => {
    const rs = calc(this.state.date, this.state.location.latitude, this.state.location.longitude)
    this.setState({dataSource: rs})
  };

  render() {
    return (
      <View className='index'>
        <View>
        日期：  {dayjs(this.state.date).format('YYYY-MM-DD')}

          <DatetimePicker
            showArrowRight
            mode="content"

            type="date"
            onInput={(e) => {
              let date = e.detail.value;
              // @ts-ignore
              date = dayjs(date).toDate()
              this.setState({date: date}, this.calc)
            }}
            renderContent={(d) => {
              if (d && d.length) {
                return `${d[0]}-${d[1]}-${d[2]}`
              } else return '请选择日期'
            }}
          />
        </View>
        <View>
          <Text>
            {this.state.locationLoading ? '加载位置中...' : '加载位置成功'}
          </Text>
          <View>
            坐标 : {this.state.location.longitude},{this.state.location.latitude}
          </View>
        </View>


        <Table columns={[
          {
            dataIndex: 'type',
            title: '类型'
          },
          {
            dataIndex: 'sunrise',
            title: '日出时间'
          },
          {
            dataIndex: 'sunset',
            title: '日落时间'
          },
          {
            dataIndex: 'remark',
            title: '备注',
            width: 300
          },
        ]}
               dataSource={this.state.dataSource}
               rowKey='type'
               style={{width: 750}}
               scroll={{x: 1000}}
        >

        </Table>
      </View>
    )
  }
}
