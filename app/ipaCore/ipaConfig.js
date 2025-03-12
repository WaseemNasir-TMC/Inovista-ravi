const ipaConfig = {
  appName: "TMC-Training-Twinit",
  configUserType: "dev-train",
  applicationId: "77b2cdca-c1a3-4d27-9d19-7b5358e3b337",
  scriptPlugins: [],
  css: [],
  redux: {
    slices: [
      { name: "userSettings", file: "userSettingsSlice.js" },
      { name: "myUser", file: "myUserSlice.js" },
    ],
  },
  components: {
    dashboard: [],
    entityData: [],
    entityAction: [],
  },
};


export default ipaConfig;