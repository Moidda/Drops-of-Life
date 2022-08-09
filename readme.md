# Starting the app

From project directory
- **Start Metro:** ```npx react-native start```
- **Start Application:** ```npx react-native run-android```


# Different ways to create style

- In the same file

```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LotsOfStyles = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.red}>just red</Text>
        <Text style={styles.bigBlue}>just bigBlue</Text>
        <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
        <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default LotsOfStyles;
```

- Importing from another file with only style \
**style.js**
```js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;
```
```js
import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
const LogInScreen = (props) => {
    return (
        <View style={styles.imageContainer}>
            <Image 
            source={require('image.png')} 
            />
        </View>
    );
};

export default LogInScreen;
```

## Passing multiple styles to a component

It is possible to pass multiple styles to a component using an array

```js
<View style={ [styles.container, {marginBottom:30}] }>
...
</View>
```

In the above example, we passed two styles to the view
  - ```styles.container```
  - ```{marginBottom:30}``` 


# Using States to dynamically handle data in a view

[Youtube](https://www.youtube.com/watch?v=1FiIYaRr148&ab_channel=TheNetNinja)

# TextInputs

- [Youtube](https://www.youtube.com/watch?v=c9Sg9jDitm8&t=30s&ab_channel=TheNetNinja)
- No props for styling text inside TextInput. [Refer](https://github.com/callstack/react-native-paper/issues/546#issuecomment-458109566)

# react-native-vector-icons

- **Installing:**
  - Run: ```$ npm install --save react-native-vector-icons```
  - Edit ```android/app/build.gradle``` ( NOT ```android/build.gradle``` ) and add the following: 
    ```bash
    apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
    ```
- **Usage:**
  ```javascript
  import Icon from 'react-native-vector-icons/FontAwesome';
  
  const IconExample = (props) => {
      return (
        <View>
            <Icon name="rocket" size={30} color="#900" />
        </View>
    );
  };
  export default IconExample;
  ```

# Scrollable view

- Basic: [ScrollView](https://www.youtube.com/watch?v=W-pg1r6-T0g&ab_channel=TheNetNinja)
- Better: [Flatlist](https://www.youtube.com/watch?v=iMCM1NceGJY&ab_channel=TheNetNinja) 

# Drop down menu

## react-native-dropdown-select

- [Documentation](https://www.npmjs.com/package/react-native-dropdown-select-list)

- Install: 
  - ```$ yarn add react-native-dropdown-select-list```
  - reboot pc and restart project
- Usage:
  ```javascript
  import SelectList from 'react-native-dropdown-select-list'
  import * as Constants from "../../constants"; // my file with all constants

  const [selected, setSelected] = React.useState("");
  
  const data = [
      {key:'A+', value:'A+'},
      {key:'A-', value:'A-'},
      {key:'B+', value:'B+'},
      {key:'B-', value:'B-'},
      {key:'AB+', value:'AB+'},
      {key:'AB-', value:'AB-'},
      {key:'O+', value:'O+'},
      {key:'O-', value:'O-'},
  ];
  
  ...
  
  return (
    <SelectList
        boxStyles={{marginBottom: "5%", borderColor: Constants.DEFAULT_RED, width: "50%"}}
        placeholder="Blood Group"
        setSelected={setSelected} 
        search={false}
        data={data} 
        onSelect={() => {console.warn("Your blood type is " + selected);}} 
    />
  );
  ```
- ```data``` is an array of objects, with each object containing a ```key``` and a ```value```. The ```value``` will be displayed in the dropdown, and ```key``` will be the actual value that would be used when an item is selected


## Picker (didn't work well with me)

- [Documentation](https://www.npmjs.com/package/@react-native-picker/picker)
- Run: ```$ yarn add @react-native-picker/picker```. ```$ npm install @react-native-picker/picker --save``` did not work for me
- Reboot pc and restart the project
- Usage:
  ```javascript
  const [selectedLanguage, setSelectedLanguage] = React.useState();

  ...

  <Picker
    selectedValue={selectedLanguage}
    onValueChange={(itemValue, itemIndex) =>
        setSelectedLanguage(itemValue)
    }>
    <Picker.Item label="Java" value="java" />
    <Picker.Item label="JavaScript" value="js" />
  </Picker>
  ```

# Navigation

## Package Installation
  - Make sure that the ```react-navigation``` is installed
  - [Refer](https://reactnavigation.org/docs/getting-started)

## Usage
  - **App.js**
  ```javascript
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  
  const Stack = createNativeStackNavigator();
  
  const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="StartingScreen"
                    component={ StartingScreen }
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="LogInScreen"
                    component={ LogInScreen } 
                    options={{ headerShown: false }}
                />
                ...
            </Stack.Navigator>
        </NavigationContainer>
    );
  };
  export default App;
  ```
- The ```App.js``` should be wrapped in a ```NavigationContainer```
- Create a ```NativeStackNavigator```
  ```js
  const Stack = createNativeStackNavigator()
  ```
- ```createNativeStackNavigator()``` returns an object, which we named ```Stack```. contains two properties:
  - **Screen**
  - **Navigator** 

  Both of these are react components used for configuring the navigator. The ```Navigator``` should contain ```Screen``` elements as its children to define the configuring of *routes*.
  ```js
  <Stack.Navigator>
      <Stack.Screen 
          name="LogInScreen"
          component={ LogInScreen } 
          options={{ headerShown: false }}
      />
      ...
  </Stack.Navigator>
  ```
  Here we can see that, ```Navigator``` contains
  ```Screen``` as its children.

  Each of the UI Screens that have some sort of navigation in them, should be a ```Screen``` under this ```Navigation```

- **Switching between screens**: 
  - A *prop* named ```navigation``` is passed down to each **screen component** (screen component is described in previous bullet point).
  - We can call ```navigation.navigate``` with a **route** name
  - **route name:** The name property of the Screen
    ```js
    <Stack.Screen 
        name="LogInScreen" // <<-- Route name: "LogInScreen"
        component={ LogInScreen } 
        options={{ headerShown: false }}
    />
    ```
  - In ```StartingScreen```:
    ```js
    const StartingScreen = (props) => {

      const onPressLogin = () => {
          props.navigation.navigate("LogInScreen");
      };
      ...
    }

    export default StartingScreen;
    ```
    Here, ```StartingScreen``` already has a ```props``` prop passed in as the parameter to of the function. And since ```StartingScreen``` is a **screen component** defined in ```App.js```, a ```navigation``` prop is passed down too. We access that ```navigation``` prop through ```props.navigation```


# Setting Up Firebase

[Documentation](https://rnfirebase.io/)

## Installing using npm/yarn
```yarn add @react-native-firebase/app```

```yarn add @react-native-firebase/database```

## Create firebase project

## Add firebase to app
For adding firebase to app, follow the procedure for **kotlin**


# Firebase usage

[Documentation](https://rnfirebase.io/database/usage#usage)

Say we have the a table named ```User``` in realtime database of firebase as following:

  ![](https://lh3.googleusercontent.com/pJFpYNSy-R0HwRHvIZO--WNCkVQOaR-KhOyydlKE-VkeZFI5R3MpUJlEeE4USBNfAu_agazSA2lYZxPpmS-GQeHaeMxUKZaYqXpMiFKhe6kQm1Oe6c1YGN1N_qtuxKjil1oBf9KmpsGkuQF1--DiHqltTBLyFN442-7W6lt51EbsygzO402cWi9DxC_jMcWm7hNLYPrl4ei_pFXFocmema35i_UE3jqW4hbhYX0eSGCnIIeD5cz23Pt2Mj_cxNCkmyGwLZZLVdd9l87-8PWv_RAF8tkCXUS0Ru7s9cbBfcn6l3IARM9j5uaPmq-12iDjRKpVZr3DF2boMwwULhNPFLnkBKSmbxsYAmd741f4kLeO6zOsyfJFCCHTr95Qw6Aje1qVTkygwGjQhC8gf8YiKCisin4q5qmNahzhi4pIcv7JqfaRFvgyEei6CyEO2X2rU9rmK0VD_OiVxdKe9viRiJ9-5d8wQepmZH4Ns9z63FuTEuqNU1wp2QhjRRd51GwyC18WkiXj75NzN8OsDvPtPgL1NZ6ajZbzhddn6RyF8fW7GAer5H1nkxRv_W2ljt2HwukPOXhm65W0-yvPwjRqvdFtp_Op2xts6lucDh3kMj4t6Xg1RTGyUoQTg51Iv4va_x-Yw1Rin5y8jt26Y_B6VBAL7SXAwz9AxMgOWDfCPVZJc-9Raa_0EtPJRBLj-1dITICAM_gkXYKnOSHN8cq5BSxnHkp6zBZeuwrblMB3mVnFJ2PDic8=w380-h430-no?authuser=0)

In JSON, the table would look like: 

  ![](https://scontent.xx.fbcdn.net/v/t1.15752-9/283510137_588740299301618_6572747484012401768_n.png?stp=dst-png_p180x540&_nc_cat=111&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeE7-69DEpJmApd22hoMIgfXxBS93SmymEXEFL3dKbKYRY-mA9ccf1411Jv0EHiKv5H5qKfCT2tX2h6PW2BBXTgF&_nc_ohc=phHoZpwuiPIAX9z54Fj&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVKq_A_flV2yD3daOCvx654DPSRsTQ5vHHLc4TZIwo8HMw&oe=6316BEFA)


## Read from database

- To properly read from database, we have to use async functions. 
- Asyn functions return a Promise.
- To resolve promise, we have to use ```.then()```

```js
import { firebase } from '@react-native-firebase/database';
import * as Constants from "../../constants";

const func = async () => {
  var snapshot = await firebase
                .app()
                .database(Constants.REALTIME_DATABASE_URL)
                .ref('/User')
                .once('value');

  // users is an object that contains the JSON representative of the User table
  // This object can be iterated over to get info about all users
  const users = snapshot.val();
  return users;
};

func.then(users => {
  for(const u in users) {
    console.log(users[u]['bloodGroup']);
    console.log(users[u]['contact']);
    console.log(users[u]['email']);
    console.log(users[u]['location']);
    console.log(users[u]['name']);
    console.log(users[u]['password']);
    console.log('');
  }
});
```

## Write to database

We want to enter a new entry in the above ```User``` table

```js
import { firebase } from '@react-native-firebase/database';
import * as Constants from "../../constants";

const reference = firebase
                  .app()
                  .database(Constants.REALTIME_DATABASE_URL)
                  .ref('/User')
                  .push()
                  .set({
                      name: 'Moidda',
                      email: 'moidda@gmail.com',
                      contact: 'xxx',
                      location: 'xxx',
                      bloodGroup: 'O+',
                      password: '123',
                  })
                  .then(() => console.log('Data set.'));
```


# AsyncStorage for creating sessions

- **AsyncStorage** can be used to store data locally on the phone. 

- [Documentation](https://react-native-async-storage.github.io/async-storage/docs/install)


## Storing Data

- On successful login, we stored user data in the AsyncStorage

  ***LogInScreen/index.js***
  ```js
  import AsyncStorage from '@react-native-async-storage/async-storage';

  const storeUserData = async (name, contact, email, location, bloodGroup) => {
    try {
      await AsyncStorage.setItem('@name',         name);
      await AsyncStorage.setItem('@contact',      contact);
      await AsyncStorage.setItem('@email',        email);
      await AsyncStorage.setItem('@location',     location);
      await AsyncStorage.setItem('@bloodGroup',   bloodGroup);
    } catch (e) {
      console.error(e);
    }
  }
  ```

- Just call ```storeUserData``` with the correct arguments and the data will be stored on ```AsyncStorage```


## Read Data

- We can retrieve the data from ```AsyncStorage``` whenever needed

  ***CreateRequest/index.js***
  ```js
  import AsyncStorage from '@react-native-async-storage/async-storage';

  const getUserData = async (callBack) => {
    try {
      const name = await AsyncStorage.getItem('@name');
      const email = await AsyncStorage.getItem('@email');
      const contact = await AsyncStorage.getItem('@contact');
      const location = await AsyncStorage.getItem('@location');
      const bloodGroup = await AsyncStorage.getItem('@bloodGroup');
      callBack(name, email, contact, location, bloodGroup);  
    } 
    catch(e) {
      console.error(e);
    }
  }
  ```

- Since ```getUserData``` is an **async** function, we had to use a ```callBack``` function to actually set the value. 

- ```callBack``` uses ```React.useState``` to set the values

  ***CreateRequest/index.js***
  ```js
  const [name, setName] = React.useState('');
  const [email, setemail] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [bloodGroup, setBloodGroup] = React.useState('');

  getUserData((name, email, contact, location, bloodGroup) => {
    setName(name);
    setEmail(email);
    setContact(contact);
    setLocation(location);
    setBloodGroup(bloodGroup);
  });
  ```
