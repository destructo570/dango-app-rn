import { Button, StyleSheet } from "react-native";
import axios from 'axios';
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import * as Linking from "expo-linking";
import { CONFIG } from "../../constants/Secret";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import URLParse from 'url-parse';

export default function TabOneScreen() {
  const [auth_state, setAuthState] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(()=>{
    if(auth_state){
      const parsedUrl = new URLParse(auth_state?.event?.url, true);
      const codeValue = parsedUrl.query.code;
      getAuthToken(codeValue);
    }
  }, [auth_state])

  const getAuthToken = async (code)=>{
    console.log(code);
    
    try{
      // const response = await axios.post('https://anilist.co/api/v2/oauth/token', {
      //   'grant_type': 'authorization_code',
      //   'client_id': CONFIG.CLIENT_ID,
      //   'client_secret': CONFIG.SECRET,
      //   'redirect_uri': CONFIG.REDIRECT_URI, // http://example.com/callback
      //   'code': code, // The Authorization Code received previously
      // }, { headers: {
      //   'Content-Type': 'application/json',
      //   'Accept': 'application/json',
      // }});

      const postData = {
        grant_type: 'authorization_code',
        client_id: CONFIG.CLIENT_ID,
        client_secret: CONFIG.SECRET,
        redirect_uri: "com.destructo570.dangoapprn://oauth", // http://example.com/callback
        code: code, // The Authorization Code received previously
      };
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      };
      
      const response = await axios.post('https://anilist.co/api/v2/oauth/token', postData, config)
  
      if(response && response.status === 200){
        console.log(response);
        setToken(response);
      }

    }catch(err){
      console.log(err); 
    }


  }
  const onPressHandler = async () => {
    _addLinkingListener();

    let result = await WebBrowser.openBrowserAsync(CONFIG.AUTH_URL_2).then(
      (result) => {
        console.log("Here", result);
      }
    );
    console.log(result);
  };

  const _addLinkingListener = () => {
    Linking.addEventListener("url", _handleRedirect);
  };

  const _handleRedirect = (event) => {
    setAuthState({ event });
  };

  return (
    <View style={styles.container}>
      <Button title="Login with Anilist" onPress={onPressHandler} />
      {/* <Text style={{ marginTop: 30 }}>{JSON.stringify(auth_state)}</Text> */}
      <Text style={{ marginTop: 30 }}>{JSON.stringify(token)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
