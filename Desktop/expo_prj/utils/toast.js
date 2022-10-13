import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Span, P } from "../Components/Html";
let toastProperties;

export function Toast(p) {
  this.show = (title, description) => {
    toastProperties = {
      id: Math.random(),
      id2: Math.random(),
      title,
      description,
      backgroundColor: '#555'
    }
    p.set_list(l=>[...l, toastProperties])
  };

  this.success = (title, description) => {
    toastProperties = {
      id: Math.random(),
      id2: Math.random(),
      title,
      description,
      backgroundColor: '#5cb85c'
    }
    p.set_list(l=>[...l, toastProperties])
  };

  this.error = (title, description) => {
    toastProperties = {
      id: Math.random(),
      id2: Math.random(),
      title,
      description,
      backgroundColor: '#d9534f'
    }
    p.set_list(l=>[...l, toastProperties])
  };

  this.info = (title, description) => {
    toastProperties = {
      id: Math.random(),
      id2: Math.random(),
      title,
      description,
      backgroundColor: '#5bc0de'
    }
    p.set_list(l=>[...l, toastProperties])
  };

  this.warning = (title, description) => {
    toastProperties = {
      id: Math.random(),
      id2: Math.random(),
      title,
      description,
      backgroundColor: '#f0ad4e'
    }
    p.set_list((l)=>[...l, toastProperties])
  };
}

const shadow = {
  elevation: 5,
  shadowColor: 'black',
  shadowOpacity: .7,
  shadowRadius: 3,
  shadowOffset: {
    width: 2,
    height: 2,
  },
}
let interval

const ToastProvider = (p) => {
  if (!p._list.length ) clearInterval(interval)

  useEffect(() => {
    for (let i in p._list) {
      interval = setTimeout(() => {
        if (p._list[i]) {
          p.set_list(list => list.filter((l) => l?.id !== list[i]?.id))
        }
        if (!p._list.length ) clearInterval(interval)
      }, 6000);
    }
  }, [p._list])

  if (!p._list.length ) clearInterval(interval)


  const fadeAnim = useRef(new Animated.Value(-270)).current;
  const start = () => {
    Animated.timing(fadeAnim, {
      toValue: 12,
      duration: 100,
      useNativeDriver: false
    }).start();
  };

  return (
    <>
      {p._list && p._list.map((toast, i) => (
        <Animated.View key={i}
          ref={() => { if (i === 0) { fadeAnim.setValue(-270) } }}
          onLayout={() => { start(); }}
          style={[{ ...shadow }, {
            zIndex: 1111,
            position: 'absolute', top: i * 120, right: fadeAnim, width: 300, height: 95, maxWidth: '75%',
            display: 'flex',
            marginTop: 12, backgroundColor: toast.backgroundColor, borderRadius: 5,
          }]}>
          <Span style={{ paddingHorizontal: 14, paddingTop: 8 }} >
            <P style={{ padding: 6, color: 'white', position: 'absolute', top: 1, alignSelf: 'flex-end' }}
              onClick={() => { let filter = p._list.filter((l) => l.id !== toast.id); p.set_list(filter); }}>X</P>
            <P style={{ width: '100%', color: 'white', textAlign: 'right', paddingTop: 3 }} >{toast.title}</P>
            <P style={{ width: '100%', color: 'white', textAlign: 'right', fontSize: 14, fontWeight: '200', paddingTop: 15 }} >{toast.description}</P>
          </Span>
        </Animated.View>
      ))
      }

      {p.children}

    </>
  )
}
export default ToastProvider
