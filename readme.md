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