// Colors
export const DEFAULT_RED = '#FF2156';
export const LIGHT_GREY = '#d9d9d9';
export const IMMEDIATE_RGB = '#Ffdfdf';
export const STANDBY_RGB = '#E6ffd1';
export const LONGTERM_RGB = '#bbe8ed';

// in meters
export const nearMeDistance = 4000;


// App.js
// route names for each screens in navigation stack
export const RouteName = {
    starting: "StartingScreen",
    login: "LogInScreen",
    register: "RegisterScreen",
    home: "HomeScreen",
    createRequest: "Create Request",
    requestFeed: "Request Feed",
    myRequests: "My Requests"
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

export const RequestState = {
    pending: "pending",
    donated: "donated"
};

export const REALTIME_DATABASE_URL = "https://drops-of-life-606b4-default-rtdb.asia-southeast1.firebasedatabase.app/";

export const LocationData = [
    {
        key: { name: "Dhanmondi", latitude: 23.7461, longitude: 90.3742 },
        value: "Dhanmondi" 
    },
    {
        key: { name: "Mohammadpur", latitude: 23.7662, longitude: 90.3589 },
        value: "Mohammadpur" 
    },
    {
        key: { name: "Shyamoli", latitude: 23.7710, longitude: 90.3639 },
        value: "Shyamoli" 
    },
    {
        key: { name: "Mipur", latitude: 23.8223, longitude: 90.3654 },
        value: "Mirpur" 
    },
    {
        key: { name: "Ajimpur", latitude: 23.7286, longitude: 90.3854 },
        value: "Ajimpur" 
    },
    {
        key: { name: "Motijheel", latitude: 23.7330, longitude: 90.4172 },
        value: "Motijheel" 
    },
    {
        key: { name: "Banani", latitude: 23.7937, longitude: 90.4066 },
        value: "Banani" 
    },
    {
        key: { name: "Gulshan", latitude: 23.7925, longitude: 90.4078 },
        value: "Gulshan" 
    },
    {
        key: { name: "Badda", latitude: 23.7805, longitude: 90.4267 },
        value: "Badda" 
    },
];
