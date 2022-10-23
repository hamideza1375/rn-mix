import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';

// const beforeUnloadListener = (event) => {
//   event.preventDefault();
//   return event.returnValue = "آیا سفارشتان را به پایان رساندین و خارج میشوید؟";
// };

export function foodState(p) {


  this.getImageProfile = () => {
    p.useEffects(() => {      
      (async () => {
        await p.getProfile().then(({ data }) => {
          data?.uri && p.setimageProfile(data.uri)
        })
      })()
    }, [p.change])

  }


  this.setorientation = () => {
    p.Dimensions.addEventListener('change', ({ window: { width, height } }) => {
      width < height ? p.setorientation("PORTRAIT") : p.setorientation("LANDSCAPE")
      p.setwidth(width); p.setheight(height)
    })
  }



  // EditFood
  this.getSingleTitleFoods = async () => {
    p.useEffect(() => {
      (async () => {
        const { data } = await p.getSingleTitleFoods(p.route.params.id)
        p.settitle(data.title)
        p.setImageUrl(data.imageUrl)
      })()
      return () => {
        p.settitle('')
        p.setImageUrl('')
      }
    }, [])
  }


  this.setPagination = () => {
    p.useFocusEffect(p.useCallback(() => {
      p.setcurrentPage(1)
      p.setpage(1);
      p.setcurrent([])
      // p.settextSearch('')
    }, []))
  }




  this.getChildFood = async () => {
    p.useEffects(() => {
      (async () => {
        var d = []
        let { data } = await p.getallchildfood()
        let w = data.child.filter((ch) => ch.refId == p.route.params.id)
        for (let k in w) {
          let l = p.map.get(w[k]._id)

          if (l !== undefined) {
            let f = JSON.parse(l)
            w[k].num = f.num
            w[k].total = f.total
            d.push(w[k])
          } else {
            d.push(w[k])
          }
        }
        p.foodMap.set(p.route.params.id, d)
        p.setfood2(d)
        p.setcurrentComment([])
      })()
      // return () => p.foodMap.set(p.route.params.id, p.food2)
    }, [p.changeChildfood])
  }



  this.sercher = (textSearch) => {
    const f = []
    let fd1 = p.food2.filter((f) => f.title.includes(textSearch))
    f.push(...fd1)
    let fd2 = p.food2.filter((f) => (f.title.includes(textSearch[0]) && f.title.includes(textSearch[1])) || (f.title.includes(textSearch[1]) && f.title.includes(textSearch[2])) || (f.title.includes(textSearch[2]) && f.title.includes(textSearch[3])) || (f.title.includes(textSearch[3]) && f.title.includes(textSearch[4])) || (f.title.includes(textSearch[4]) && f.title.includes(textSearch[5])) || (f.title.includes(textSearch[5]) && f.title.includes(textSearch[6])) || (f.title.includes(textSearch[6]) && f.title.includes(textSearch[7])) || (f.title.includes(textSearch[7]) && f.title.includes(textSearch[8])) || (f.title.includes(textSearch[8]) && f.title.includes(textSearch[9])) || (f.title.includes(textSearch[9]) && f.title.includes(textSearch[10])) || (f.title.includes(textSearch[10]) && f.title.includes(textSearch[11])))
    for (let i in fd1) {
      for (let n in fd2) {
        if (fd1[i]._id !== fd2[n]._id) {
          let find = f.find((f) => f._id === fd2[n]._id)
          if (!find) { textSearch[1] && f.push(fd2[n]) }
        }
      }
    }
    for (let n in fd2) {
      let find = f.find((f) => f._id === fd2[n]._id)
      if (!find) { textSearch[1] && f.push(fd2[n]) }
      }
    p.foodMap.set(p.route.params.id, f)
    if (f) {
      const currentPage = Math.max(0, Math.min(1, f.length))
      const offset = (currentPage - 1) * p.pageLimit
      const currentCountries = f.slice(offset, offset + p.pageLimit)
      p.setcurrent(currentCountries)
      p.setcurrentPage(currentPage)
      p.settextSearch('')
    }
  }


  this.foodAsc = (setpage) => {
    let foodMap = p.foodMap.get(p.route.params.id)
    if (foodMap) {
      p.foodMap.set(p.route.params.id, foodMap.sort((a, b) => a.price - b.price))
      p.setass(!p.ass)
      setpage(1)
    }
  }



  this.foodDesc = (setpage) => {
    let foodMap = p.foodMap.get(p.route.params.id)
    p.foodMap.set(p.route.params.id, foodMap.sort((a, b) => b['price'] - a['price']))
    p.setass(!p.ass)
    setpage(1)
  }



  this.allPrice = async () => {
    p.useEffects(() => {
      (async () => {
        let all = []
        for (let i of p.allfood) { all.push(i.total) }
        if (all.length) {
          const su = all.reduce((total, number) => total + number)
          p.setallprice(su < 0 ? 0 : su)
          p.map.set('allprice', JSON.stringify(su))

          // if(!su){
          //   removeEventListener("beforeunload", beforeUnloadListener, {capture: true});
          // }
        }
      })()
    }, [p.show1])
  }




  this.plustNum = async (inde, item, setpage, page) => {
    // addEventListener("beforeunload", beforeUnloadListener, {capture: true});
    if (p.route.name == 'ChildFood') {
      let h = [...p.foodMap.get(p.route.params.id)]
      let index = p.foodMap.get(p.route.params.id).findIndex(f => f._id == item._id)
      h[index].num = h[index].num + 1
      h[index].total = item.price * h[index].num
      let allfood = [...p.allfood]
      let fnd = allfood.findIndex((f) => f._id === item._id)
      if (!allfood[fnd]) {
        allfood.push(h[index])
        p.setallfood(allfood)
      }
      else {
        allfood[fnd] = h[index]
        p.setallfood(allfood)
      }
      p.map.set(item._id + '1', item._id)
      p.map.set(item._id, JSON.stringify(h[index]))
      let tit = p.map.get(item._id + '1')
      let gg = p.totalTitle.find((t) => t == item._id)
      if (tit && !gg) p.settotalTitle((t) => { return t.concat(tit) })
      p.foodMap.set(p.route.params.id, h)

      setpage(page)
      const offset = (page - 1) * p.pageLimit
      const currentCountries = h.slice(offset, offset + p.pageLimit)
      p.setcurrent(currentCountries)
      setpage(page)

      p.setshow1(!p.show1)
    }
    if (p.route.name == 'FinallFoodPayment') {
      let h = [...p.allfood]
      let index = h.findIndex(f => f._id == item._id)
      h[index].num = h[index].num + 1
      h[index].total = item.price * h[index].num
      p.map.set(item._id, JSON.stringify(h[index]))

      let f = p.foodMap.get(h[index].refId)
      let fIndex = f.findIndex((f) => (f._id === h[index]._id))
      f[fIndex].num = h[index].num
      p.foodMap.set(h[index].refId, f)

      p.setshow1(!p.show1)
    }

  }




  this.minusNum = async (inde, item, setpage, page) => {
    if (p.route.name == 'ChildFood') {
      let h = [...p.foodMap.get(p.route.params.id)]
      let index = p.foodMap.get(p.route.params.id).findIndex(f => f._id == item._id)
      h[index].num = h[index].num - 1
      h[index].total = item.price * h[index].num
      let allfood = [...p.allfood]
      let fnd = allfood.findIndex((f) => f._id === item._id)
      if (!allfood[fnd]) {
        allfood.push(h[index])
        p.setallfood(allfood)
      }
      else {
        allfood[fnd] = h[index]
        p.setallfood(allfood)
      }
      p.map.set(item._id + '1', item._id)

      p.map.set(item._id, JSON.stringify(h[index]))
      if (h[index].num == 0) {
        let gg = p.totalTitle.filter((t) => t != item._id)
        p.settotalTitle(gg)
        p.map.delete(item._id + '1')
      }
      p.foodMap.set(p.route.params.id, h)

      setpage(page)
      const offset = (page - 1) * p.pageLimit
      const currentCountries = h.slice(offset, offset + p.pageLimit)
      p.setcurrent(currentCountries)
      setpage(page)


      p.setshow1(!p.show1)
    }
    if (p.route.name == 'FinallFoodPayment') {
      let h = [...p.allfood]
      let index = h.findIndex(f => f._id == item._id)
      h[index].num = h[index].num - 1
      h[index].total = item.price * h[index].num
      p.map.set(item._id, JSON.stringify(h[index]))

      let f = p.foodMap.get(h[index].refId)
      let fIndex = f.findIndex((f) => (f._id === h[index]._id))
      f[fIndex].num = h[index].num
      p.foodMap.set(h[index].refId, f)

      p.setshow1(!p.show1)
      if (h[index].num == 0) {
        let gg = p.totalTitle.filter((t) => t != item._id)
        p.settotalTitle(gg)
        p.map.delete(item._id + '1')
      }
    }
  }



  this.deleteStorage = () => {
    p.Alert.alert(
      "از حذف سفارش مطمئنید؟",
      "",
      [
        { text: "Cancel", onPress: () => { } },
        { text: "OK", onPress:async()=>{
          for (let i of p.foods) {
            const { data } = await p.getallchildfood(i._id)
            for (let item of data.child) {
              p.map.delete(item._id)
              p.map.delete(item._id + '1')
            }
            p.map.delete('sum')
            p.map.delete('allprice')
            p.setallprice(0)
            p.setallfood([])
            p.settotalTitle([])
            p.setshow1(!p.show1)
          }
        }},
      ]
    )

  }



  this.getsinglefood = async () => {
    p.useEffects(() => {
      (async () => {
        const { data } = await p.getsinglechildfood(p.route.params.id, p.route.params.id2)
        p.setsinglefood(data.child)
        p.setpermission(data.permission)
      })()
      return () => (
        p.setsinglefood({}),
        p.setpermission(false),
        p.setallcomment([])
      )
    }, [])
  }




  this.header = () => {
    p.useEffects(() => {
      p.navigation.setOptions({ headerShown: (p.showForm2 || p.showForm) ? false : true, headerStyle: { backgroundColor: p.Platform.OS === 'android' ? '#fa5b' : '#f82' } })
    }, [p.showForm2, p.showForm])

  }



  this.getCommentSingle = async () => {
    p.useEffects(() => {
      (async () => {
        const { data } = await p.getcommentchildfood(p.route.params.id, p.route.params.id2)
        p.setallcomment(data.comment)
      })()
    }, [p.showForm, p.showForm2, p.changeComment])

    p.useEffects(() => {
      return () => {
        p.setshowForm(false)
        p.setshowForm2(false)
        p.setallcomment([])
        p.setsendMessage(true)
      }
    }, [])
  }

  this.findCmment = async () => {
    p.useEffects(() => {
      p.allcomment.forEach(item => {
        if (item.starId === p.tokenValue.userId) { p.setsendMessage(false) } 
      });
    }, [p.allcomment])
  }



  this.sendComment = async () => {
    await p.createcommentchildfood(p.route.params.id, p.route.params.id2, {
      starId: p.tokenValue.userId,
      fullname: p.tokenValue.fullname,
      imageUrl: p.imageProfile,
      message: p.message,
      allstar: Number(p.allstar),
      id: p.singlefood._id
    })
    p.setstar1(true),
      p.setstar2(true),
      p.setstar3(true),
      p.setstar4(true),
      p.setstar5(true),
      p.setfullname(''),
      p.setemail(''),
      p.setmessage(''),
      p.setshowForm(false)
      p.setass2(!p.ass2)
  }


  this.unmountComment = () => {
    p.useEffects(() => {
      return () => {
        p.setstar1(true)
        p.setstar2(true)
        p.setstar3(true)
        p.setstar4(true)
        p.setstar5(true)
        p.setmessage('')
      }
    }, [])
  }


  this.editComment = async id3 => {
    await p.editcomment(p.route.params.id, p.route.params.id2, id3, { message: p.message, allstar: p.allstar })
    p.setstar1(true)
    p.setstar2(true)
    p.setstar3(true)
    p.setstar4(true)
    p.setstar5(true)
    p.setemail('')
    p.setmessage('')
    p.setshowForm(false)
    let currentComment = p.currentComment.find(c => c._id === id3)
    currentComment.message = p.message,
      currentComment.allstar = p.allstar
  }



  this.deleteComment = async id3 => {
    p.Alert.alert(
      "از حذف کامنت مطمئنید؟",
      "",
      [
        { text: "Cancel", onPress: () => { } },
        {
          text: "OK", onPress: async () => {
            await p.deletecomment(p.route.params.id, p.route.params.id2, id3, p.tokenValue.userId)
            p.setcurrentComment(comment => comment.filter((c) => c._id != id3))
            p.setsendMessage(true)
          }
        }
      ]
    );
  }



  this.getEditComment = (id3) => {
    p.useEffects(() => {
      (async () => {
        const { data } = await p.getcommentsinglefood(p.route.params.id, p.route.params.id2, id3)
        p.setmessage(data.comment.message)
        p.setallstar(data.comment.allstar)
        if (data.comment.allstar == 1) p.setstar1(true)
        if (data.comment.allstar == 2) p.setstar1(true), p.setstar2(true)
        if (data.comment.allstar == 3) p.setstar1(true), p.setstar2(true), p.setstar3(true)
        if (data.comment.allstar == 4) p.setstar1(true), p.setstar2(true), p.setstar3(true), p.setstar4(true)
        if (data.comment.allstar == 5) p.setstar1(true), p.setstar2(true), p.setstar3(true), p.setstar4(true), p.setstar5(true)
     })()

    }, [])
  }



  this.pressIconEdit = (id) => {
    p.setshowForm(true)
    p.setid3(id ? id : '')
    p.setstar1(false)
    p.setstar2(false)
    p.setstar3(false)
    p.setstar4(false)
    p.setstar5(false)
  }



  this.backHandler = () => {
    if (p.Platform.OS === 'android') {
      p.useEffects(() => {
        let current = 0
        p.BackHandler.addEventListener("hardwareBackPress", () => {
          if (p.route.name === 'Home' && p.navigation?.getState()?.index === 0) {
            current += 1
            if (current === 2) { p.BackHandler.exitApp(); return true }
            p.ToastAndroid.show("برای خروج دوبار لمس کنید", p.ToastAndroid.SHORT)
            setTimeout(() => {
              current = 0
            }, 1000);
            return true
          }
        })
        // return BackHandler.exitApp()
      }, [])
    }
    else return null
    return () => p.Platform.OS === 'android' && p.BackHandler.removeEventListener('hardwareBackPress')
  }

}




//home
export const home = (p) => {
  p.useMemo(() => {
    (async () => {
      let newNotification = await p.localStorage.getItem('notification')
      const { data } = await p.notification()
      if (data)
        if (data.message && newNotification !== data.message) {
          p.create(data.title, data.message, require('../assets/images/logo.png'))
          await p.localStorage.setItem('notification', data.message)
        }
    })();

    setInterval(async () => {
      (async () => {
        let newNotification = await p.localStorage.getItem('notification')
        const { data } = await p.notification()
        if (data)
          if (data.message && newNotification !== data.message) {
            p.create(data.title, data.message, require('../assets/images/logo.png'))
            await p.localStorage.setItem('notification', data.message)
          }
      })();
    }, 15000);
  }, [p.width])


  p.useEffects(() => {      
      (async () => {
        await p.getProfile().then(({ data }) => {
          data?.uri && p.setimageProfile(data.uri)
        })
      })()
    }, [])


    const navigation = useNavigation()
    p.useEffects(() => {
    var toastOK = () => { p.toast.success('موفق آمیز', '✅',2500) }
    var toast500 = () => { p.toast.error('خطا', 'مشکلی از سمت سرور پیش آمده') }
    var toast400 = () => { p.toast.error('خطا', 'اصلاح کنید و دوباره امتحان کنید') }
    var toast399 = () => { p.toast.error('خطا', 'کد وارد شده اشتباه هست') }
    var toast398 = () => { p.toast.error('خطا', 'شما قبلا ثبت نام کردید') }
    var toast397 = () => { p.toast.error('خطا', 'شماره یا پسورد را اشتباه وارد کردید') }
   
    // Axios.interceptors.response.use(null, error => { if (error.response && error.response.status > 400 && error.response.status <= 500) { toast500() }; if (error.response.status === 400) { toast400() }; if (error.response.status === 399) { toast399() }; if (error.response.status === 398) { toast398() }; if (error.response.status === 397) { toast397() }; return Promise.reject(error); });
    Axios.interceptors.response.use(function (response) {
      if(response.config.method !== 'get' &&
      navigation.getCurrentRoute()?.name !== 'Payment' && navigation.getCurrentRoute()?.name !== 'Location' && (response.status === 200 || response.status === 201)) toastOK()
      return response  
    }, function (error) {
      if (error?.response?.status) {
        if (error.response.status > 400 && error.response.status <= 500) { toast500() };
        if (error.response.status === 400) { toast400() };
        if (error.response.status === 399) { toast399() };
        if (error.response.status === 398) { toast398() };
        if (error.response.status === 397) { toast397() };
      } return Promise.reject(error);
    });

  }, [])


  p.useEffects(()=>{
    (async()=>{
      const token = await p.localStorage.getItem("token"); if (token) Axios.defaults.headers.common["Authorization"] = token
    })()
  },[p.changeLoginUser])



  p.useMemo(() => {
      setTimeout(() => {
        p.setSplash(false)
      }, 1000)

    p.Dimensions.addEventListener('change', ({ window: { width, height } }) => {
      width < height ? p.setorientation("PORTRAIT") : p.setorientation("LANDSCAPE")
      p.setwidth(width); p.setheight(height)
    })

  }, [])


  p.useEffects(() => {
    (async () => {
      p.localStorage.getItem("token").then((token) => {
        if (token) {
          const user = p.jwt_decode(token)
          p.settokenValue(user)
        }
      })
    })()
  }, [])


  p.useEffects(() => {      
    (async () => {
      let { data } = await p.getfoods()
      p.setfoods(data)
    })()
  }, [p.changeTitle])

}
//home


