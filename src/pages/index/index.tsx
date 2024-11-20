import React from "react";
import {Text, View} from '@tarojs/components'
import {Button, Toast} from '@antmjs/vantui'
import './index.less'
import {calc, getCurrentLocation, getCurrentTimeStr, getCurrentZone} from "../../utils";




export default class Index extends React.Component {


  componentDidMount () {
    getCurrentLocation().then(rs=>{
      this.setState({location:rs})
    }).catch(e=>{
      Toast.show({
        type:'fail',
        message: e.errMsg
      })
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  state ={
    locationLoading:true,
    location:{
      latitude: null,
      longitude:null
    }
  }


  render () {
    return (
      <View className='index'>
        <View>
          {getCurrentTimeStr()} {getCurrentZone()}
        </View>
        <View>
          <Text>
          {this.state.locationLoading ? '加载位置中...': '加载位置成功'}
          </Text>
          <View>
          经度 : {this.state.location.longitude}
          纬度：{this.state.location.latitude}</View>
        </View>

        <View>
          日出时间：{calc(new Date(), this.state.location.latitude, this.state.location.longitude)}
        </View>
      </View>
    )
  }
}
