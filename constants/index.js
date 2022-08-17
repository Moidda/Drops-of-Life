// Colors
export const DEFAULT_RED = '#FF2156';
export const LIGHT_GREY = '#d9d9d9';

// App.js
// route names for each screens in navigation stack
export const RouteName = {
    starting: "StartingScreen",
    login: "LogInScreen",
    register: "RegisterScreen",
    home: "HomeScreen",
    createRequest: "Create Request"
};

export const bloodGroupData = [
    {key:'A+', value:'A+'},
    {key:'A-', value:'A-'},
    {key:'B+', value:'B+'},
    {key:'B-', value:'B-'},
    {key:'AB+', value:'AB+'},
    {key:'AB-', value:'AB-'},
    {key:'O+', value:'O+'},
    {key:'O-', value:'O-'},
];

export const bloodAmountData = [
    {key:1, value:'1 bag'},
    {key:2, value:'2 bag'},
    {key:3, value:'3 bag'},
    {key:4, value:'4 bag'},
    {key:5, value:'5 bag'},
];

export const urgency = {
    immediate: 'immediate',
    standBy: 'standBy',
    longTerm: 'longTerm',
    
    urgencyData: [
        {key:'immediate', value:'Immediate'},
        {key:'standBy', value:'Stand By'},
        {key:'longTerm', value:'Long Term'},
    ]
};

export const REALTIME_DATABASE_URL = "https://drops-of-life-606b4-default-rtdb.asia-southeast1.firebasedatabase.app/";