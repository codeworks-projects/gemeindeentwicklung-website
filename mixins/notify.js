export default {
  methods: {
    notifyGenericError() {
      this.notifyError(this.$t('genericError'))
    },

    notifySavedChanges() {
      this.notifySuccess(this.$t('settingsSaved'))
    },

    notifyError(message) {
      this.$notify({
        group: 'main',
        text: message,
        duration: 5000,
        type: 'error',
      })
    },

    notifySuccess(message) {
      this.$notify({
        group: 'main',
        text: message,
        duration: 3000,
        type: 'success',
      })
    },
  },
}
