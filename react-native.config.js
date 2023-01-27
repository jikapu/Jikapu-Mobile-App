module.exports = {
    project: {
      ios: {},
      android: {}, // grouped into "project"
    },
    dependencies: {
      'local-rn-library': {
        root: '/root/libraries',
      },
      'react-native-vector-icons': {
        platforms: {
          ios: null,
        },
      },
    },
    
    assets: ["./assets/fonts/"], // stays the same
};