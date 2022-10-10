import { useCallback, useEffect, useMemo } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { getAllAddress, deleteAddress, deleteAllAddress, useradmin, deleteAdmin, getAlluserAdmin, changeAdmin, createfood, editfood, deletefood, createchildfood, editchildfood, deletechildfood, createNotification, unAvailable, listAvailable } from "../services/adminService";
import { getallchildfood, getsinglechildfood } from "../services/foodService"
import localStorage from "@react-native-async-storage/async-storage";
import Alert from '../utils/alert'
import moment from "moment-jalaali";

export function adminState(p) {

  this.getAlluserAdmin = async () => {
    useFocusEffect(useCallback(() => {
      (async () => {
        const { data } = await getAlluserAdmin()
        p.setadmin(data)
      })()
    }, []))
  }


  this.addAdmin = async () => {
    await useradmin({ phone: p.phone });
    p.setphone('')
    p.navigation.goBack()
  }


  this.deleteAdmin = async () => {
    await deleteAdmin({ phone: p.phone });
    p.setphone('')
    p.navigation.goBack()
  }


  this.changeAdmin = async () => {
    await changeAdmin({ adminPhone: p.phone, newAdminPhone: p.input });
    p.setnavigateProfile(false)
    p.setnavigateUser(false)
    p.settokenValue({})
    p.settoken(false)
    await localStorage.removeItem("token");
    await localStorage.removeItem("exp");
    for (let i of p.foods) {
      const { data } = await getallchildfood(i._id)
      for (let item of data.child) {
        p.map.delete(item._id)
        p.map.delete(item.title)
      }
    }
    p.map.delete('sum')
    p.map.delete('allprice')
    p.setallprice(0)

    p.setphone('')

    p.navigation.navigate("Home")
  }



  this.totalAllAddress = () => {
    let total = []
    useFocusEffect(useCallback(() => {
      p.allAddress.forEach((address) => {
        total.push(address.price)
      })
      const su = total.length && total.reduce((total, number) => total + number)
      p.settotalPrices(su);

      localStorage.getItem('totalOldPrice').then((res) => {
        res && p.setoldPrice(JSON.parse(res))
      })
    }, [p.allAddress]))
  }


  // this.getAllAddress = async () => {
  //   useFocusEffect(useCallback(() => {
  //     getAllAddress().then(({ data }) => {
  //       p.setallAddress(data)
  //       p.set_address(data)
  //     })
  //   }, [p.change]))
  // }

  this.getAllAddress = async () => {
    useEffect(() => {
      getAllAddress().then(({ data }) => {
        p.setallAddress(data)
        p.set_address(data)
      })
    }, [p.change])

    useMemo(() => {
      setInterval(() => {
        getAllAddress().then(({ data }) => {
          if (p.allAddress.length !== data.length)
            p.setallAddress(data)
          p.set_address(data)
        })
      }, 8000);
    }, [])


    useEffect(() => {
      for (let i in p.allAddress) {
        if (i == p.allAddress.length - 1)
          p.setfromMomemt(moment(p.allAddress[i]?.createdAt).format('jM/jD'))
  
      }
    }, [p.allAddress])

  }


  this.deleteAddress = (_id) => {
    Alert.alert(
      "مشتری حذف شود ؟",
      "",
      [
        { text: "Cancel", onPress:()=>{} },
        { text: "OK", onPress: async () => { await deleteAddress(_id); p.setchange(!p.change); } }
      ])
  }


  this.deleteAllAddress = () => {
    Alert.alert(
      "آیا از حذف تمام مشتریان مطمئنید؟",
      "",
      [
        { text: "Cancel" },
        {
          text: "OK", onPress: async () => {
            Alert.alert(
              "",
              "بعد از حذف دیگر قادر به برگرداندن نخواهید بود!!",
              [
                { text: "Cancel" },
                {
                  text: "yes", onPress: async () => {
                    await deleteAllAddress(); await localStorage.setItem('totalOldPrice', JSON.stringify(p._moment + '=' + p.totalPrices)); p.setchange(!p.change);
                  }
                }])
          }
        }])
  }
  // address







  this.getEdit = async () => {
    useFocusEffect(useCallback(() => {
      (async () => {
        const { data } = await getsinglechildfood(p.route.params.id, p.route.params.id2)
        p.settitle(data.child.title)
        p.setprice(data.child.price.toString())
        p.setImageUrl(data.child.imageUrl)
        p.setInfo(data.child.info)
      })()

      return () => {
        p.settitle('')
        p.setprice('')
        p.setImageUrl('')
        p.setInfo('')
      }
    }, []))
  }


  // createfood
  this.createChild = async () => {
    await createchildfood(p.route.params.id, { title: p.title, price: p.price, imageUrl: p.imageUrl, info: p.info })
    p.settitle('')
    p.setprice('')
    p.setInfo('')
    p.setImageUrl('')
    p.setchangeFood(!p.changeFood)
    p.navigation.goBack()
    p.setchangeFood(!p.changeFood)
  }


  // createfood



  // createpartfood
  this.createFoodAction = async () => {
    await createfood({ title: p.title, imageUrl: p.imageUrl })
    p.setchangeFood(!p.changeFood)
    p.settitle('')
    p.setImageUrl('')
    p.navigation.goBack()
  }
  // createpartfood


  // DeleteFood
  this.deleteChildFoodAction = async (id, id2) => {
    await deletechildfood(id, id2)
    // p.setchangeFood(!p.changeFood)
  }
  // DeleteFood

  this.deleteFoodAction = async (id) => {
    await deletefood(id)
    p.setchangeFood(!p.changeFood)
  }
  // DeleteFoods



  this.editeFoodAction = async () => {
    await editchildfood(p.route.params.id, p.route.params.id2, { title: p.title, price: p.price, imageUrl: p.imageUrl, info: p.info })
    p.setchangeFood(!p.changeFood)
    p.navigation.goBack()
  }

  this.unmountEditFood = async () => {
    useFocusEffect(useCallback(() => {
      let foodMap = p.foodMap.get(p.route.params.id2);
      return () => p.foodMap.set(p.route.params.id, foodMap)
    }, []))
  }



  this.editeFoods = async () => {
    await editfood(p.route.params.id, { title: p.title, imageUrl: p.imageUrl })
    p.navigation.goBack()
  }
  //EditeFoods



  this.available = async (available, id, id2) => {
    await unAvailable({ available }, id, id2)
    p.setchangeFood(!p.changeFood)
  }


  this.deleteUnmunt = async (id2) => {
    p.setchangeFood(!p.changeFood)

  }


  this.listAvailable = async () => {
    useFocusEffect(useCallback(() => {
      listAvailable().then(({ data }) => {
        p.setlist(data)
      })
    }, [p.showModalAvailabe, p.id, p._id]))
  }



  this.sendAvailable = async () => {
    await unAvailable({ available: true }, p.id, p._id)
    p.setshowModalAvailabe(!p.showModalAvailabe)
  }




  this.notifee = async () => {
    await createNotification({ title: p.title, message: p.info })
    p.navigation.goBack()
  }

}