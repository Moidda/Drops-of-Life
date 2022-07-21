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

# Using States to dynamically handle data in a view

[Youtube](https://www.youtube.com/watch?v=1FiIYaRr148&ab_channel=TheNetNinja)

# TextInputs

- [Youtube](https://www.youtube.com/watch?v=c9Sg9jDitm8&t=30s&ab_channel=TheNetNinja)
- No props for styling text inside TextInput. [Refer](https://github.com/callstack/react-native-paper/issues/546#issuecomment-458109566)

# Installing react-native-vector-icons

- Run: ```$ npm install --save react-native-vector-icons```
- Edit ```android/app/build.gradle``` ( NOT ```android/build.gradle``` ) and add the following: 
  ```bash
  apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
  ```

## Usage

```javascript
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = <Icon name="rocket" size={30} color="#900" />;
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
      {key:'1', value:'A+'},
      {key:'2', value:'A-'},
      {key:'3', value:'B+'},
      {key:'4', value:'B-'},
      {key:'5', value:'AB+'},
      {key:'6', value:'AB-'},
      {key:'7', value:'O+'},
      {key:'8', value:'O-'},
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