const randUnit = 10;
const uniqId = () => Math.random().toString().slice(-randUnit);

Component({
  data: {
    isOpen: false
  },

  props: {
    id: uniqId(), // 默认随机数
    title: '',
    isActive: false,
    showArrow: true,
    activeClass: '',
    className: '',
    titleClass: '',
    contentClass: '',
    disabled: false,
    onChange: () => {}
  },

  didMount() {
    const { isActive } = this.props;
    this.setData({ isOpen: isActive });
  },

  methods: {
    onCollapseTap(evt) {
      if (!this.props.disabled) {
        this.setData({ isOpen: !this.data.isOpen });
        const { dataset } = evt.currentTarget;
        evt.currentTarget.dataset = {
          ...dataset,
          isActive: this.data.isOpen
        };
        this.props.onChange(evt);
      }
    }
  }
})