Component({
  props: {
    header: '',
    isActive: this.props.isActive
  },

  methods: {
    onPanelTap(e) {
      console.log('on panel tap clicked event: ', e);
    }
  }
})