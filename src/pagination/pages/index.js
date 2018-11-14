Component({
  props: {
    mode: 'basic',
    activeIndex: 1,
    pages: [],
    onPageTap: () => {}
  },

  methods: {
    onPageTap(evt) {
      this.props.onPageTap(evt);
    }
  }
});