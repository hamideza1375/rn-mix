
export function adminState(p) {

  this.getAlluserAdmin = async () => {
    p.useFocusEffect(p.useCallback(() => {
      (async () => {
        const { data } = await p.getAlluserAdmin()
        p.setadmin(data)
      })()
    }, []))
  }


  this.addAdmin = async () => {
    await p.useradmin({ phone: p.phone });
    p.setphone('')
    p.navigation.goBack()
  }


  this.deleteAdmin = async () => {
    await p.deleteAdmin({ phone: p.phone });
    p.setphone('')
    p.navigation.goBack()
  }


  this.changeAdmin = async () => {
    await p.changeAdmin({ adminPhone: p.phone, newAdminPhone: p.input });
    p.setnavigateProfile(false)
    p.setnavigateUser(false)
    p.settokenValue({})
    p.settoken(false)
    await p.localStorage.removeItem("token");
    await p.localStorage.removeItem("exp");
    for (let i of p.foods) {
      const { data } = await p.getallchildfood(i._id)
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
    p.useFocusEffect(p.useCallback(() => {
      p.allAddress.forEach((address) => {
        total.push(address.price)
      })
      const su = total.length && total.reduce((total, number) => total + number)
      p.settotalPrices(su);

      p.localStorage.getItem('totalOldPrice').then((res) => {
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
    p.useEffect(() => {
      p.getAllAddress().then(({ data }) => {
        p.setallAddress(data)
        p.set_address(data)
      })
    }, [p.change])

    p.useMemo(() => {
      setInterval(() => {
        p.getAllAddress().then(({ data }) => {
          if (p.allAddress.length !== data.length)
            p.setallAddress(data)
          p.set_address(data)
        })
      }, 8000);
    }, [])


    p.useEffect(() => {
      for (let i in p.allAddress) {
        if (i == p.allAddress.length - 1)
          p.setfromMomemt(p.moment(p.allAddress[i]?.createdAt).format('jM/jD'))
  
      }
    }, [p.allAddress])

  }


  this.deleteAddress = (_id) => {
    p.Alert.alert(
      "مشتری حذف شود ؟",
      "",
      [
        { text: "Cancel", onPress:()=>{} },
        { text: "OK", onPress: async () => { await p.deleteAddress(_id); p.setchange(!p.change); } }
      ])
  }


  this.deleteAllAddress = () => {
    p.Alert.alert(
      "آیا از حذف تمام مشتریان مطمئنید؟",
      "",
      [
        { text: "Cancel", onPress:()=>{} },
        {
          text: "OK", onPress: async () => {
            p.Alert.alert(
              "",
              "بعد از حذف دیگر قادر به برگرداندن نخواهید بود!!",
              [
                { text: "Cancel", onPress:()=>{} },
                {
                  text: "yes", onPress: async () => {
                    await p.deleteAllAddress(); await p.localStorage.setItem('totalOldPrice', JSON.stringify(p.fromMomemt + '=' + p.totalPrices)); p.setchange(!p.change); p.setshowBtn(true); p.setfromMomemt(null)
                  }
                }])
          }
        }])
  }
  // address







  this.getEdit = async () => {
    p.useFocusEffect(p.useCallback(() => {
      (async () => {
        const { data } = await p.getsinglechildfood(p.route.params.id, p.route.params.id2)
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
    await p.createchildfood(p.route.params.id, { title: p.title, price: p.price, imageUrl: p.imageUrl, info: p.info })
    let current = [...p.current,{ title: p.title, price: p.price, imageUrl: p.imageUrl, info: p.info, available :true}]
    p.setcurrent(current)
    p.setchangeChildfood(!p.changeChildfood)
    p.settitle('')
    p.setprice('')
    p.setInfo('')
    p.setImageUrl('')
    p.navigation.goBack()
  }


  // createfood



  // createpartfood
  this.createFoodAction = async () => {
    await p.createfood({ title: p.title, imageUrl: p.imageUrl })
    p.setchangeFood(!p.changeFood)
    p.settitle('')
    p.setImageUrl('')
    p.navigation.goBack()
  }
  // createpartfood


  // DeleteFood
  this.deleteChildFoodAction = async (id, id2) => {
    await p.deletechildfood(id, id2)
    let current = [...p.current]
    let filter = current.filter(c=>c._id !== id2)
    p.setcurrent(filter)
    p.setchangeChildfood(!p.changeChildfood)
  }
  // DeleteFood
  this.deleteFoodAction = async (id) => {
    await p.deletefood(id)
    p.setchangeFood(!p.changeFood)
  }
  // DeleteFoods



  this.editeFoodAction = async () => {
    await p.editchildfood(p.route.params.id, p.route.params.id2, { title: p.title, price: p.price, imageUrl: p.imageUrl, info: p.info })
    let current = p.current.find(c=>c._id === p.route.params.id2)
    if(current){
    current.title = p.title
    current.price = p.price
    current.imageUrl = p.imageUrl
    current.info = p.info
    p.setchangeChildfood(!p.changeChildfood)
   }
    p.navigation.goBack()
  }

  this.unmountEditFood = async () => {
    p.useFocusEffect(p.useCallback(() => {
      let foodMap = p.foodMap.get(p.route.params.id2);
      return () => p.foodMap.set(p.route.params.id, foodMap)
    }, []))
  }



  this.editeFoods = async () => {
    await p.editfood(p.route.params.id, { title: p.title, imageUrl: p.imageUrl })
    p.navigation.goBack()
  }
  //EditeFoods



  this.available = async (available, id, id2) => {
    await p.unAvailable({ available }, id, id2)
    let current = [...p.current]
    let find = current.findIndex(c=>c._id === p.id2)
    if(current) current[find].available = available
    p.setcurrent(current)
    p.setchangeChildfood(!p.changeChildfood)
  }


  this.listAvailable = async () => {
    p.useFocusEffect(p.useCallback(() => {
      p.listAvailable().then(({ data }) => {
        p.setlist(data)
      })
    }, [p.showModalAvailabe, p.id, p._id]))
  }



  this.sendAvailable = async () => {
    await p.unAvailable({ available: true }, p.id, p._id)
    p.setshowModalAvailabe(!p.showModalAvailabe)
  }




  this.notifee = async () => {
    await p.createNotification({ title: p.title, message: p.info })
    p.navigation.goBack()
  }

}