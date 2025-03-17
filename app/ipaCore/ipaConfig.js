const ipaConfig = {
  appName: "innovista-ravi",
  configUserType: "dev-train",
  applicationId: "fb99b33f-964d-4c8e-ae86-9230a93bba3d",
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
